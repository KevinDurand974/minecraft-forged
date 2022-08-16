import { gql, useQuery } from "@apollo/client";
import Background from "@components/Background";
import { Filter } from "@components/filters";
import {
  Modpack,
  ModpackRowLoading,
  ModpackRowNoResult,
  ModpackTileLoading,
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
  DisplayFilter,
  GameVersion,
  Mod,
  ModLoaderType,
  ModsSearchSortField,
  Pagination,
  SearchArgs,
} from "@forged/types";
import { useOneScreen } from "hooks/UseOnScreen";
import { NextPage } from "next";
import Head from "next/head";
import { Fragment, useEffect, useRef, useState } from "react";
import { BehaviorSubject, debounceTime } from "rxjs";

interface Props {
  modpacks: Mod[];
  pagination: Pagination;
  minecraftVersions: GameVersion[];
}

interface Filters {
  display: DisplayFilter;
  version: string;
  sortby: ModsSearchSortField;
}

const graphqlQuery = gql`
  query Query($args: ModpackInput) {
    getModpacks(args: $args) {
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

const CategoriePage: NextPage<Props> = ({
  modpacks,
  pagination,
  minecraftVersions,
}) => {
  const [paginationInfo, setPaginationInfo] = useState(pagination);
  const [packLoaded, setPackNumber] = useState(maxItemPerPage);
  const [packUpdate, setPackUpdate] = useState(false);
  const [modpackArray, setModpackArray] = useState(modpacks);
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

  const { refetch } = useQuery(graphqlQuery);

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
            ...(data.getModpacks.mods as Mod[]),
          ]);
          setQueryArg(oldQuery => ({
            ...oldQuery,
            index: oldQuery.index! + maxItemPerPage,
          }));
          if (data.getModpacks.mods.length % maxItemPerPage === 0) {
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
      setModpackArray(() => data.getModpacks.mods);
      setPaginationInfo(() => data.getModpacks.pagination);
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
  const handleFilterChoiceVersion = (version: string) => {
    setFilters(pre => ({ ...pre, version }));
    setQueryArg(pre => ({
      ...pre,
      gameVersion: version === "all" ? "" : version,
    }));
  };
  const handleFilterChoiceSortBy = (sortby: ModsSearchSortField) => {
    setFilters(pre => ({ ...pre, sortby }));
    setQueryArg(pre => ({
      ...pre,
      sortField: sortby,
    }));
  };

  return (
    <Fragment>
      <Head>
        <title>Modpacks List | Minecraft Forged</title>
        <meta
          name="description"
          content="Find your best Modpack in any version and play it easly!"
        />
      </Head>
      <section>
        <div className="flex justify-between items-center content-center mt-20 mb-10 max-w-screen-2xl mx-auto">
          <h1 className="text-5xl font-bold small-case text-center">
            All modpacks availables
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

        <Search fetchQuery={handleNewSearch} loaded={isNewSearchLoaded} />

        {!modpackArray.length && !packUpdate && <ModpackRowNoResult />}

        {getFilters.display === "tiles" && modpackArray.length && (
          <div className="max-w-screen-2xl py-4 grid grid-cols-7 gap-6 m-auto">
            {modpackArray.map(pack => (
              <Modpack pack={pack} type="tiles" key={pack.id} />
            ))}
            {packUpdate &&
              Array(3)
                .fill(1)
                .map((k, i) => <ModpackTileLoading key={k + "" + i} />)}
          </div>
        )}
        {getFilters.display === "rows" && modpackArray.length && (
          <div className="max-w-screen-2xl flex flex-col gap-4 m-auto w-full py-4">
            {modpackArray.map(pack => (
              <Modpack pack={pack} type="rows" key={pack.id} />
            ))}
            {packUpdate &&
              Array(3)
                .fill(1)
                .map((k, i) => <ModpackRowLoading key={k + "" + i} />)}
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

export const getStaticProps = async () => {
  try {
    const { data } = await client.query({ query: graphqlQuery });
    const packs: Mod[] = data.getModpacks.mods;
    const pagination: Pagination = data.getModpacks.pagination;
    const minecraftVersions: GameVersion[] = data.getVersions;

    if (!packs.length) return { notFound: true };

    return {
      props: {
        modpacks: packs,
        pagination,
        minecraftVersions,
      },
      revalidate: 3600,
    };
  } catch (error: any) {
    console.log(error.message);
    return { notFound: true };
  }
};

export default CategoriePage;
