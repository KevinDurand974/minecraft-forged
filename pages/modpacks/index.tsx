import { gql } from "@apollo/client";
import Background from "@components/Background";
import Modpack from "@components/lists/Modpack";
import { client } from "@forged/apollo";
import { Mod } from "@forged/types";
import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";

type Props = {
  modpacks: Mod[];
};

const CategoriePage: NextPage<Props> = ({ modpacks }) => {
  return (
    <Fragment>
      <Head>
        <title>Modpacks List | Minecraft Forged</title>
        <meta
          name="description"
          content="Find your best Modpack in any version and play it easly!"
        />
      </Head>
      <section className="">
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
          {modpacks.map(pack => (
            <Modpack pack={pack} key={pack.id} />
          ))}
        </div>
      </section>
      <Background num="11" />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query FindMany {
        findMany {
          id
          name
          logo {
            thumbnailUrl
          }
        }
      }
    `,
  });

  const packs: Mod[] = data.findMany;

  if (!packs.length) return { notFound: true };

  return {
    props: {
      modpacks: packs,
    },
    revalidate: 3600,
  };
};

export default CategoriePage;
