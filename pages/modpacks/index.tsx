import { gql, useQuery } from "@apollo/client";
import Background from "@components/Background";
import Modpack from "@components/lists/Modpack";
import { client } from "@forged/apollo";
import { maxItemPerPage } from "@forged/curseforge";
import { Mod, Pagination } from "@forged/types";
import { useOneScreen } from "hooks/UseOnScreen";
import { NextPage } from "next";
import Head from "next/head";
import { Fragment, useEffect, useRef, useState } from "react";

type Props = {
  modpacks: Mod[];
  pagination: Pagination;
};

const graphqlQuery = gql`
  query FindMany($args: ModpackInput) {
    findMany(args: $args) {
      mods {
        id
        name
        logo {
          thumbnailUrl
        }
      }
      pagination {
        index
        totalCount
      }
    }
  }
`;

const CategoriePage: NextPage<Props> = ({ modpacks, pagination }) => {
  const [packLoaded, setPackNumber] = useState(0);
  const [packUpdate, setPackUpdate] = useState(false);
  const [modpackArray, setModpackArray] = useState(modpacks);
  const packRef = useRef(null);
  const isTriggerFetchVisible = useOneScreen(packRef, {
    rootMargin: "400px 0px",
    threshold: 0.1,
  });
  const { loading, fetchMore, refetch } = useQuery(graphqlQuery);

  useEffect(() => {
    const pageCount = pagination.totalCount;
    if (
      isTriggerFetchVisible &&
      !loading &&
      !packUpdate &&
      pageCount > 50 &&
      packLoaded < maxItemPerPage - 50
    ) {
      const run = async () => {
        setPackUpdate(true);
        const { data } = await refetch({
          args: { index: packLoaded + 50 },
        });
        const packs: Mod[] = data.findMany.mods;
        setModpackArray(modpackArray => [...modpackArray, ...packs]);
        setPackNumber(num => num + 50);
        setPackUpdate(false);
      };
      run();
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
        <h1 className="text-5xl font-bold small-case text-center my-10">
          All modpacks availables
        </h1>
        <div className="flex gap-4 justify-center mb-8">
          <button className="btn-filter">
            <span>Display ▸</span>
            <span>ICON GRID</span>
          </button>

          <button className="btn-filter">
            <span>Version ▸</span>
            <span>All</span>
          </button>

          <button className="btn-filter">
            <span>Mod Loader ▸</span>
            <span>Forge</span>
          </button>

          <button className="btn-filter">
            <span>Sort By ▸</span>
            <span>Popularity</span>
          </button>
        </div>

        <div className="p-6 grid grid-cols-8 gap-6 m-auto w-fit">
          {modpackArray.map(pack => (
            <Modpack pack={pack} key={pack.id} />
          ))}
          {packUpdate && (
            <div
              className="bg-tertiary h-48 w-48 m-auto relative group"
              key="loading"
            >
              <h3 className="absolute bottom-0 left-0 p-2 z-10 bg-black bg-opacity-90 font-bold w-full tracking-wider">
                Loading...
              </h3>
              <div className="absolute w-full h-full text-[150px] flex justify-center items-center animate-spin slow-speed opacity-50">
                <i className="icon-media-repeat-v4" />
              </div>
            </div>
          )}
        </div>
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
    },
    revalidate: 3600,
  };
};

export default CategoriePage;
