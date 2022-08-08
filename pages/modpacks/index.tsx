import { gql, useQuery } from "@apollo/client";
import Background from "@components/Background";
import { Display, ModLoader, SortBy, Version } from "@components/filters";
import {
  Modpack,
  ModpackRowLoading,
  ModpackRowNoResult,
  ModpackTileLoading,
} from "@components/lists";
import Search from "@components/Search";
import { client } from "@forged/apollo";
import { maxItemForAllPage, maxItemPerPage } from "@forged/curseforge";
import { Mod, Pagination, SearchArgs } from "@forged/types";
import { useOneScreen } from "hooks/UseOnScreen";
import { NextPage } from "next";
import Head from "next/head";
import { Fragment, useEffect, useRef, useState } from "react";
import { BehaviorSubject, debounceTime } from "rxjs";

type Props = {
  modpacks: Mod[];
  pagination: Pagination;
  display: "rows" | "tiles";
};

const graphqlQuery = gql`
  query FindMany($args: ModpackInput) {
    findMany(args: $args) {
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
  }
`;

const CategoriePage: NextPage<Props> = ({ modpacks, pagination, display }) => {
  const [paginationInfo, setPaginationInfo] = useState(pagination);
  const [packLoaded, setPackNumber] = useState(maxItemPerPage);
  const [packUpdate, setPackUpdate] = useState(false);
  const [modpackArray, setModpackArray] = useState(modpacks);
  const [displayType, setDisplayType] = useState(display);
  const [queryArg, setQueryArg] = useState({
    index: packLoaded,
  } as Partial<SearchArgs>);
  const [isNewSearchLoaded, setNewSearchLoaded] = useState(false);

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
            ...(data.findMany.mods as Mod[]),
          ]);
          setQueryArg(oldQuery => ({
            ...oldQuery,
            index: oldQuery.index! + maxItemPerPage,
          }));
          if (data.findMany.mods.length % 20 === 0) {
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

  const handleNewSearch = async (queryNewArg: Partial<SearchArgs>) => {
    setNewSearchLoaded(false);
    setPackUpdate(true);
    const { data } = await refetch({
      args: queryNewArg,
    });
    setModpackArray(() => data.findMany.mods);
    setPaginationInfo(() => data.findMany.pagination);
    setQueryArg(() => ({ ...queryNewArg, index: maxItemPerPage }));
    setPackNumber(() => 20);
    setNewSearchLoaded(true);
    setPackUpdate(false);
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
            <button className="btn-filter text-xl">
              <i className="icon-bold-setting" />
              <span>Change Filter</span>
            </button>
          </div>
        </div>

        <div className="flex justify-evenly max-w-screen-2xl mx-auto mb-10">
          <Display />
          <Version />
          <ModLoader />
          <SortBy />
        </div>

        <Search fetchQuery={handleNewSearch} loaded={isNewSearchLoaded} />

        {!modpackArray.length && !packUpdate && <ModpackRowNoResult />}

        {displayType === "tiles" && modpackArray.length && (
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
        {displayType === "rows" && modpackArray.length && (
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
      <Background num="11" />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const { data } = await client.query({ query: graphqlQuery });

  const packs: Mod[] = data.findMany.mods;
  const pagination: Pagination = data.findMany.pagination;

  if (!packs.length) return { notFound: true };

  return {
    props: {
      modpacks: packs,
      pagination,
      display: "tiles",
    },
    revalidate: 3600,
  };
};

export default CategoriePage;
