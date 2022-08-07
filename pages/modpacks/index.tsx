import { gql, useQuery } from "@apollo/client";
import Background from "@components/Background";
import Display from "@components/filters/Display";
import ModLoader from "@components/filters/ModLoader";
import SortBy from "@components/filters/SortBy";
import Version from "@components/filters/Version";
import Modpack from "@components/lists/Modpack";
import { client } from "@forged/apollo";
import { maxItemForAllPage, maxItemPerPage } from "@forged/curseforge";
import { Mod, Pagination } from "@forged/types";
import { useOneScreen } from "hooks/UseOnScreen";
import { NextPage } from "next";
import Head from "next/head";
import { Fragment, useEffect, useRef, useState } from "react";

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
  const [packLoaded, setPackNumber] = useState(0);
  const [packUpdate, setPackUpdate] = useState(false);
  const [modpackArray, setModpackArray] = useState(modpacks);
  const packRef = useRef(null);
  const isTriggerFetchVisible = useOneScreen(packRef, {
    rootMargin: "200px 0px",
    threshold: 0.1,
  });
  const { loading, fetchMore, refetch } = useQuery(graphqlQuery);
  const [displayType, setDisplayType] = useState("rows");

  useEffect(() => {
    const pageCount = pagination.totalCount;
    if (
      isTriggerFetchVisible &&
      !loading &&
      !packUpdate &&
      pageCount > maxItemPerPage &&
      packLoaded < maxItemForAllPage - maxItemPerPage
    ) {
      const run = async () => {
        setPackUpdate(true);
        const { data } = await refetch({
          args: { index: packLoaded + maxItemPerPage },
        });
        const packs: Mod[] = data.findMany.mods;
        setModpackArray(modpackArray => [...modpackArray, ...packs]);
        setPackNumber(num => num + maxItemPerPage);
        setPackUpdate(false);
      };
      // run();
    }
  }, [
    fetchMore,
    isTriggerFetchVisible,
    loading,
    packLoaded,
    packUpdate,
    pagination,
    refetch,
  ]);

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

        {displayType === "tiles" && (
          <div className="max-w-screen-2xl py-4 grid grid-cols-7 gap-6 m-auto w-fit">
            {modpackArray.map(pack => (
              <Modpack pack={pack} type="tiles" key={pack.id} />
            ))}
            {packUpdate && (
              <div
                className="bg-tertiary h-48 w-48 m-auto relative group"
                key="loading"
              >
                <h3 className="absolute bottom-0 left-0 p-2 z-10 bg-black bg-opacity-90 font-bold w-full tracking-wider">
                  Loading...
                </h3>
                <div className="absolute w-full h-full text-[150px] flex justify-center items-center animation-spin speed-xl opacity-50">
                  <i className="icon-media-repeat-v4" />
                </div>
              </div>
            )}
          </div>
        )}
        {displayType === "rows" && (
          <div className="max-w-screen-2xl flex flex-col gap-4 m-auto w-full py-4">
            {modpackArray.map(pack => (
              <Modpack pack={pack} type="rows" key={pack.id} />
            ))}
            {packUpdate && (
              <div className="bg-tertiary max-w-screen-2xl m-auto flex px-4 py-2 gap-4">
                <div className="animation-spin speed-md">
                  <i className="icon-media-repeat-v4" />
                </div>
                <h3 className="font-bold tracking-wider">Loading...</h3>
              </div>
            )}
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
      display: "rows",
    },
    revalidate: 3600,
  };
};

export default CategoriePage;
