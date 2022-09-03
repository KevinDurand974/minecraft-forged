import { DocumentNode, gql } from "@apollo/client";
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
import SidebarCategory from "@components/sidebar/SidebarCategories";
import Sidenav from "@components/Sidenav";
import {
  getCFCategories,
  getCFMods,
  getMinecraftVersionList,
  maxItemForAllPage,
  maxItemPerPage,
} from "@forged/curseforge";
import {
  BasicCFSearchPage,
  Category,
  DisplayFilter,
  GameVersion,
  Mod,
  ModsSearchSortField,
  Pagination,
  SearchArgs,
} from "@forged/types";
import { useOnScreen } from "hooks/UseOnScreen";
import { NextPage } from "next";
import Head from "next/head";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { BehaviorSubject, debounceTime } from "rxjs";

interface Props {
  category: BasicCFSearchPage;
  minecraftCategories: Category[];
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
  category: number;
}

const query = gql`
  query Query($args: CFSearchInput) {
    getSearch(args: $args) {
      mods {
        id
        name
        slug
        classId
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
    getCategories {
      id
      name
      slug
      iconUrl
      isClass
    }
  }
`;

const SearchPage: NextPage<Props> = ({
  mods,
  pagination,
  minecraftVersions,
  minecraftCategories,
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
    category: 0,
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
  const categoryArray = [
    { name: "Modpacks", value: 4471 },
    { name: "Mods", value: 6 },
    { name: "Resource Packs", value: 12 },
    { name: "Worlds", value: 17 },
    { name: "All Categories", value: 0 },
  ];

  const packRef = useRef(null);

  const fetchCfMods = useCallback(async (args: Partial<SearchArgs>) => {
    try {
      const res = await getCFMods(null, args);
      if (!res?.data.length) return { mods: [] };
      return {
        mods: res.data,
        pagination: res.pagination,
      };
    } catch (err) {
      return { mods: [] };
    }
  }, []);

  const isTriggerFetchVisible$ = new BehaviorSubject(
    useOnScreen(packRef, {
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
          const { mods } = await fetchCfMods(queryArg);
          setModpackArray(oldPacks => [...oldPacks, ...(mods as Mod[])]);
          setQueryArg(oldQuery => ({
            ...oldQuery,
            index: oldQuery.index! + maxItemPerPage,
          }));
          if (mods.length % maxItemPerPage === 0) {
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
    fetchCfMods,
    isTriggerFetchVisible$,
    packLoaded,
    packUpdate,
    paginationInfo,
    queryArg,
  ]);

  // Handle Search
  const handleNewSearch = async (queryNewArg: Partial<SearchArgs>) => {
    try {
      setNewSearchLoaded(false);
      setPackUpdate(true);

      const newQueryArg = { ...queryArg, ...queryNewArg };
      const { mods, pagination } = await fetchCfMods(newQueryArg);

      setModpackArray(() => mods);
      setPaginationInfo(() => pagination!);
      setQueryArg(() => ({ ...newQueryArg, index: maxItemPerPage }));
      setPackNumber(() => maxItemPerPage);
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
    const { mods, pagination } = await fetchCfMods({
      ...queryArg,
      index: 0,
      gameVersion: version === "all" ? "" : version,
    });
    setPackNumber(() => maxItemPerPage);
    setQueryArg(pre => ({
      ...pre,
      index: pre.index! + maxItemPerPage,
    }));
    setModpackArray(() => mods);
    setPaginationInfo(() => pagination!);
    setPackUpdate(false);
  };
  const handleFilterChoiceSortBy = async (sortby: ModsSearchSortField) => {
    setFilters(pre => ({ ...pre, sortby }));
    setQueryArg(pre => ({
      ...pre,
      index: 0,
      sortField: sortby,
      sortOrder: sortby === 4 ? "asc" : "desc",
    }));
    setPackUpdate(true);
    setModpackArray([]);
    const { mods, pagination } = await fetchCfMods({
      ...queryArg,
      index: 0,
      sortField: sortby,
      sortOrder: sortby === 4 ? "asc" : "desc",
    });
    setPackNumber(() => maxItemPerPage);
    setQueryArg(pre => ({
      ...pre,
      index: pre.index! + maxItemPerPage,
    }));
    setModpackArray(() => mods);
    setPaginationInfo(() => pagination!);
    setPackUpdate(false);
  };
  const handleFilterChoiceCategory = async (category: number) => {
    setFilters(pre => ({ ...pre, category }));
    setQueryArg(pre => ({
      ...pre,
      index: 0,
      classId: categoryArray.find(cat => cat.value === category)?.value,
    }));
    setPackUpdate(true);
    setModpackArray([]);
    const { mods, pagination } = await fetchCfMods({
      ...queryArg,
      index: 0,
      classId: categoryArray.find(cat => cat.value === category)?.value,
    });
    setPackNumber(() => maxItemPerPage);
    setQueryArg(pre => ({
      ...pre,
      index: pre.index! + maxItemPerPage,
    }));
    setModpackArray(() => mods);
    setPaginationInfo(() => pagination!);
    setPackUpdate(false);
  };

  return (
    <Fragment>
      <Head>
        <title>Search Zone | Minecraft Forged</title>
        <meta
          name="description"
          content="Search what you want, that can be a mod, a modpack, a resource pack... Anything you want!"
        />
      </Head>
      <section className="lt-lg:p-4">
        <div className="flex justify-between items-center gt-xl:mt-20 lt-sm:mt-4 gt-sm:mt-10 lt-sm:mb-4 mb-10 mx-auto gt-2xl:max-w-screen-2xl gt-xl:max-w-screen-lg gt-lg:max-w-screen-md lt-sm:flex-col lt-sm:gap-4">
          <h1 className="text-5xl font-bold small-case text-center">
            Want do you want to search?
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

        <div className="flex justify-evenly gt-2xl:max-w-screen-2xl gt-xl:max-w-screen-lg gt-lg:max-w-screen-md mx-auto mb-10 gap-4 lt-sm:hidden">
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
          <Filter
            title="Category"
            value={
              categoryArray.find(cat => cat.value === getFilters.category)?.name
            }
            onClick={() => setShowFilterSidebar(true)}
          />
        </div>

        <Search
          fetchQuery={handleNewSearch}
          loaded={isNewSearchLoaded}
          placeholder={`Search...`}
        />

        {!modpackArray.length && !packUpdate && <PackRowNoResult type="" />}

        {getFilters.display === "tiles" && (
          <div className="gt-2xl:max-w-screen-2xl gt-xl:max-w-screen-lg gt-lg:max-w-screen-md py-4 grid gt-2xl:grid-cols-7 gt-xl:grid-cols-5 gt-md:grid-cols-3 lt-md:grid-cols-2 gap-6 m-auto">
            {modpackArray.map(pack => (
              <Pack
                pack={pack}
                type="tiles"
                categories={minecraftCategories}
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
          <div className="gt-2xl:max-w-screen-2xl gt-xl:max-w-screen-lg gt-lg:max-w-screen-md flex flex-col gap-4 m-auto w-full py-4">
            {modpackArray.map(pack => (
              <Pack
                pack={pack}
                type="rows"
                categories={minecraftCategories}
                key={pack.id}
              />
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
        <SidebarCategory
          onClick={handleFilterChoiceCategory}
          current={getFilters.category}
        />
      </Sidenav>
      <Background num="11" />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  try {
    const res = await getCFMods(null, {});
    if (!res?.data.length) return { notFound: true };

    const packs = (res.data as Mod[]).map(
      pack =>
        ({
          id: pack.id,
          name: pack.name,
          slug: pack.slug,
          summary: pack.summary,
          classId: pack.classId,
          logo: {
            id: pack.logo.id,
            thumbnailUrl: pack.logo.thumbnailUrl,
          },
          downloadCount: pack.downloadCount,
          dateModified: pack.dateModified,
          dateCreated: pack.dateCreated,
          categories: pack.categories.map(cat => ({
            id: cat.id,
            name: cat.name,
            slug: cat.slug,
            iconUrl: cat.iconUrl,
          })),
        } as Mod)
    );
    const pagination: Pagination = res.pagination;
    const minecraftVersions = await getMinecraftVersionList();
    const minecraftCategories = await getCFCategories();

    if (!packs.length) return { notFound: true };

    return {
      props: {
        mods: packs,
        pagination,
        minecraftVersions,
        minecraftCategories,
      },
    };
  } catch (error: any) {
    console.log(error.message);
    return { notFound: true };
  }
};

export default SearchPage;
