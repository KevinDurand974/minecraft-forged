import { DocumentNode, gql, useQuery } from "@apollo/client";
import Background from "@components/Background";
import { Filter } from "@components/filters";
import {
  Pack,
  PackRowLoading,
  PackRowNoResult,
  PackTileLoading,
} from "@components/lists";
import Search from "@components/Search";
import {
  SidebarDisplay,
  SidebarSortBy,
  SidebarVersion,
} from "@components/sidebar";
import Sidenav from "@components/Sidenav";
import { client } from "@forged/apollo";
import { maxItemForAllPage, maxItemPerPage } from "@forged/curseforge";
import {
  BasicCFSearchPage,
  DisplayFilter,
  GameVersion,
  Mod,
  ModsSearchSortField,
  Pagination,
  SearchArgs,
} from "@forged/types";
import { useOneScreen } from "hooks/UseOnScreen";
import { GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import { Fragment, useEffect, useRef, useState } from "react";
import { BehaviorSubject, debounceTime } from "rxjs";

interface Props {
  category: BasicCFSearchPage;
  query: QueryProps;
  mods: Mod[];
  pagination: Pagination;
  minecraftVersions: GameVersion[];
  page: PageProps;
}

interface QueryProps {
  query: DocumentNode;
  queryName: string;
}

interface PageProps {
  title: string;
  description: string;
}

interface Filters {
  display: DisplayFilter;
  version: string;
  sortby: ModsSearchSortField;
}
let queryVar: string;
let queryNameVar: string;
let pageTitleVar: string;
let pageDescriptionVar: string;

const CategoryPage: NextPage<Props> = ({
  mods,
  pagination,
  minecraftVersions,
  category,
  query: { query, queryName },
  page: { title, description },
}) => {
  const [paginationInfo, setPaginationInfo] = useState(pagination);
  const [packLoaded, setPackNumber] = useState(maxItemPerPage);
  const [packUpdate, setPackUpdate] = useState(false);
  const [modpackArray, setModpackArray] = useState(mods);
  const [queryArg, setQueryArg] = useState({
    index: packLoaded,
    sortField: 2,
    gameVersion: "",
  } as Partial<SearchArgs>);
  const [isNewSearchLoaded, setNewSearchLoaded] = useState(false);
  const [showFilterSiedbar, setShowFilterSidebar] = useState(false);
  const [getFilters, setFilters] = useState({
    display: "rows",
    version: "all",
    sortby: 2,
  } as Filters);

  const SortField = [
    "Featured",
    "Popularity",
    "Last Updated",
    "Name",
    "Author",
    "Total Downloads",
    "Category",
    "Game Version",
  ] as const;

  const packRef = useRef(null);

  const { refetch } = useQuery(
    gql`
      ${query}
    `
  );

  const isTriggerFetchVisible$ = new BehaviorSubject(
    useOneScreen(packRef, {
      rootMargin: "0px 0px 300px 0px",
      threshold: 0.1,
    })
  ).asObservable();

  // Fetch new {maxItemPerPage} Modpacks
  useEffect(() => {
    const sub$ = isTriggerFetchVisible$
      .pipe(debounceTime(500))
      .subscribe(async isVisible => {
        const hasReachEnd = packLoaded >= maxItemForAllPage;
        const hasMorePage = paginationInfo?.totalCount >= maxItemPerPage;

        if (!isVisible || packUpdate || hasReachEnd || !hasMorePage)
          return false;
        setPackUpdate(true);
        try {
          const { data } = await refetch({
            args: queryArg,
          });
          setModpackArray(oldPacks => [
            ...oldPacks,
            ...(data[queryName].mods as Mod[]),
          ]);
          setQueryArg(oldQuery => ({
            ...oldQuery,
            index: oldQuery.index! + maxItemPerPage,
          }));
          if (data[queryName].mods.length % maxItemPerPage === 0) {
            setPackNumber(num => num + maxItemPerPage);
          } else {
            setPackNumber(() => maxItemForAllPage + maxItemPerPage);
          }
          setPackUpdate(false);
        } catch (err) {
          setPackNumber(() => maxItemForAllPage + maxItemPerPage);
          setPackUpdate(false);
        }
      });

    return () => {
      sub$.unsubscribe();
    };
  }, [
    isTriggerFetchVisible$,
    packLoaded,
    packUpdate,
    paginationInfo,
    queryArg,
    queryName,
    refetch,
  ]);

  // Handle Search
  const handleNewSearch = async (queryNewArg: Partial<SearchArgs>) => {
    try {
      setNewSearchLoaded(false);
      setPackUpdate(true);

      const newQueryArg = { ...queryArg, ...queryNewArg };

      const { data } = await refetch({
        args: newQueryArg,
      });
      setModpackArray(() => data[queryName].mods);
      setPaginationInfo(() => data[queryName].pagination);
      setQueryArg(() => ({ ...newQueryArg, index: maxItemPerPage }));
      setPackNumber(() => 20);
      setNewSearchLoaded(true);
      setPackUpdate(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Filter Choices
  const handleFilterChoiceDisplay = (display: DisplayFilter) => {
    setFilters(pre => ({ ...pre, display }));
  };
  const handleFilterChoiceVersion = async (version: string) => {
    setFilters(pre => ({ ...pre, version }));
    setQueryArg(pre => ({
      ...pre,
      index: 0,
      gameVersion: version === "all" ? "" : version,
    }));
    setPackUpdate(true);
    setModpackArray([]);
    const { data } = await refetch({
      args: {
        ...queryArg,
        index: 0,
        gameVersion: version === "all" ? "" : version,
      },
    });
    setPackNumber(() => 20);
    setQueryArg(pre => ({
      ...pre,
      index: pre.index! + maxItemPerPage,
    }));
    setModpackArray(() => data[queryName].mods);
    setPaginationInfo(() => data[queryName].pagination);
    setPackUpdate(false);
  };
  const handleFilterChoiceSortBy = async (sortby: ModsSearchSortField) => {
    setFilters(pre => ({ ...pre, sortby }));
    setQueryArg(pre => ({
      ...pre,
      index: 0,
      sortField: sortby,
    }));
    setPackUpdate(true);
    setModpackArray([]);
    const { data } = await refetch({
      args: { ...queryArg, index: 0, sortField: sortby },
    });
    setPackNumber(() => 20);
    setQueryArg(pre => ({
      ...pre,
      index: pre.index! + maxItemPerPage,
    }));
    setModpackArray(() => data[queryName].mods);
    setPaginationInfo(() => data[queryName].pagination);
    setPackUpdate(false);
  };

  let packType = "";
  if (category === "modpacks") packType = "modpacks";
  else if (category === "mods") packType = "mods";
  else if (category === "resource-packs") packType = "resource packs";

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <section>
        <div className="flex justify-between items-center content-center mt-20 mb-10 max-w-screen-2xl mx-auto">
          <h1 className="text-5xl font-bold small-case text-center">
            All {packType} availables
          </h1>
          <div className="flex gap-4 justify-center">
            <button
              className="btn-filter text-xl"
              onClick={() => setShowFilterSidebar(true)}
            >
              <i className="icon-bold-setting" />
              <span>Change Filter</span>
            </button>
          </div>
        </div>

        <div className="flex justify-evenly max-w-screen-2xl mx-auto mb-10">
          <Filter title="Display" onClick={() => setShowFilterSidebar(true)}>
            {getFilters.display === "rows" && (
              <span>
                Rows <i className="icon-rows" />
              </span>
            )}
            {getFilters.display === "tiles" && (
              <span>
                Tiles <i className="icon-tiles" />
              </span>
            )}
          </Filter>
          <Filter
            title="Version"
            value={getFilters.version}
            onClick={() => setShowFilterSidebar(true)}
          />
          <Filter
            title="Sort By"
            value={SortField[getFilters.sortby - 1]}
            onClick={() => setShowFilterSidebar(true)}
          />
        </div>

        <Search
          fetchQuery={handleNewSearch}
          loaded={isNewSearchLoaded}
          placeholder={`Search a ${packType}...`}
        />

        {!modpackArray.length && !packUpdate && (
          <PackRowNoResult type={packType!} />
        )}

        {getFilters.display === "tiles" && (
          <div className="max-w-screen-2xl py-4 grid grid-cols-7 gap-6 m-auto">
            {modpackArray.map(pack => (
              <Pack
                pack={pack}
                type="tiles"
                category={category}
                key={pack.id}
              />
            ))}
            {packUpdate &&
              Array(3)
                .fill(1)
                .map((k, i) => <PackTileLoading key={k + "" + i} />)}
          </div>
        )}
        {getFilters.display === "rows" && (
          <div className="max-w-screen-2xl flex flex-col gap-4 m-auto w-full py-4">
            {modpackArray.map(pack => (
              <Pack pack={pack} type="rows" category={category} key={pack.id} />
            ))}
            {packUpdate &&
              Array(3)
                .fill(1)
                .map((k, i) => <PackRowLoading key={k + "" + i} />)}
          </div>
        )}
      </section>
      <div ref={packRef} className="invisible" />
      <Sidenav
        show={showFilterSiedbar}
        title="Filters"
        onClose={() => setShowFilterSidebar(false)}
        className="flex flex-col gap-3"
      >
        <SidebarDisplay
          onClick={handleFilterChoiceDisplay}
          current={getFilters.display}
        />
        <SidebarVersion
          onClick={handleFilterChoiceVersion}
          current={getFilters.version}
          minecraftVersions={minecraftVersions}
        />
        <SidebarSortBy
          onClick={handleFilterChoiceSortBy}
          current={getFilters.sortby}
        />
      </Sidenav>
      <Background num="11" />
    </Fragment>
  );
};

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  try {
    const category = ctx.params?.category as BasicCFSearchPage;
    if (!category) return { notFound: true };

    const createQuery = (
      queryName: string
    ) => `query Query($args: CFSearchInput) {
      ${queryName}(args: $args) {
        mods {
          id
          name
          slug
          summary
          downloadCount
          categories {
            iconUrl
            slug
            name
            id
          }
          logo {
            thumbnailUrl
          }
          dateCreated
          dateModified
        }
        pagination {
          index
          totalCount
        }
      }
      getVersions {
        version
        list
      }
    }
  `;

    switch (category) {
      case "modpacks":
        queryVar = createQuery("getModpacks");
        queryNameVar = "getModpacks";
        pageTitleVar = "Modpacks List";
        pageDescriptionVar =
          "Find your best Modpack in any version and play it easly!";
        break;
      case "mods":
        queryVar = createQuery("getMods");
        queryNameVar = "getMods";
        pageTitleVar = "Mods List";
        pageDescriptionVar =
          "Find your best mods in any version, had more fun to the history and play this new adventure!";
        break;
      case "resource-packs":
        queryVar = createQuery("getResourcePacks");
        queryNameVar = "getResourcePacks";
        pageTitleVar = "Resource Packs List";
        pageDescriptionVar = "o/";
        break;
    }

    const { data } = await client.query({
      query: gql`
        ${queryVar}
      `,
    });
    const packs: Mod[] = data[queryNameVar].mods;
    const pagination: Pagination = data[queryNameVar].pagination;
    const minecraftVersions: GameVersion[] = data.getVersions;

    if (!packs.length) return { notFound: true };

    return {
      props: {
        category,
        query: { query: queryVar, queryName: queryNameVar },
        mods: packs,
        pagination,
        minecraftVersions,
        page: {
          title: `${pageTitleVar} | Minecraft Forged`,
          description: pageDescriptionVar,
        },
      },
      revalidate: 3600,
    };
  } catch (error: any) {
    console.log(error.message);
    return { notFound: true };
  }
};

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { category: "modpacks" } },
      { params: { category: "mods" } },
      { params: { category: "resource-packs" } },
    ],
    fallback: false,
  };
};

export default CategoryPage;
