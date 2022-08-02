import Background from "@components/Background";
import Modpack from "@components/lists/Modpack";
import { getModpacks } from "@forged/curseforge/modpack";
import { Mod } from "@forged/types";
import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";

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
  const res = await getModpacks();

  if (!res) return { notFound: true };

  const { data } = res;

  return {
    props: {
      modpacks: data,
    },
    revalidate: 3600,
  };
};

export default CategoriePage;
