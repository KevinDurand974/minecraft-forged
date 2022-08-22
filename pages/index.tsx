import Background from "@components/Background";
import HomeLink from "@components/HomeLink";
import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";

import modpacksImg from "../public/images/modpacks.jpg";
import modsImg from "../public/images/mods.jpg";
import ressourceImg from "../public/images/ressource-packs.jpg";
import searchImg from "../public/images/search.jpg";

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Minecraft Forged | Home</title>
        <meta
          name="description"
          content="Welcome to Minecraft forged, A new way of searching and downloading for minecraft java edition."
        />
      </Head>

      <section className="flex flex-col gt-md:justify-center items-center p-4 gt-md:min-h-screen gt-md:-mt-[76px] relative">
        <h1 className="gt-md:text-5xl lt-lg:text-2xl font-bold small-case gt-md:mb-16 lt-lg:mb-4 lt-lg:text-center">
          What do you want to do?
        </h1>

        <nav className="grid gt-md:grid-cols-4 lt-lg:grid-cols-2 gap-4">
          <HomeLink link="/modpacks" source={modpacksImg} title="Modpacks" />
          <HomeLink link="/mods" source={modsImg} title="Mods" />
          <HomeLink
            link="/resource-packs"
            source={ressourceImg}
            title="Ressource Packs"
          />
          <HomeLink link="/search" source={searchImg} title="Search" />
        </nav>

        <a
          href="#about-website"
          className="flex flex-col justify-end items-center absolute bottom-2 lt-lg:hidden"
        >
          <p className="italic font-light">More info about this website</p>
          <div className="text-xs text-gray-400">
            <i className="icon-iconly-curved-arrow-down" />
            <i className="icon-iconly-curved-arrow-down" />
          </div>
        </a>
      </section>
      <section
        id="about-website"
        className="flex flex-col 2xl:max-w-screen-2xl xl:max-w-screen-xl lg:max-w-screen-lg mx-auto gt-md:justify-center p-4 gt-md:min-h-screen gt-md:pt-[76px] gt-md:gap-10 lt-lg:gap-4"
      >
        <h1 className="self-center gt-md:text-5xl lt-lg:text-2xl font-bold small-case 2xl:mb-16 xl:mb-0 text-center">
          What&apos;s the difference between official Curseforge website and
          this one?
        </h1>

        <article className="grid gt-md:grid-cols-2 lt-lg:grid-cols-1 4xl:grid-cols-3 2xl:gap-10 gap-4">
          <div className="bg-secondary p-5 border-2 border-tertiary rounded-md min-h-[132px] shadow-md shadow-t-alt">
            <h3 className="text-2xl font-semibold mb-2 small-case">
              ➙ <span className="text-accent">C</span>ompletly remastered
            </h3>
            <p>
              It&apos;s litteraly a completly new website, It&apos;s goal is to
              do what you want, when you want. Check that out!
            </p>
          </div>
          <div className="bg-secondary p-5 border-2 border-tertiary rounded-md min-h-[132px] shadow-md shadow-t-alt">
            <h3 className="text-2xl font-semibold mb-2 small-case">
              ➙ <span className="text-accent">B</span>etter speed
            </h3>
            <p>
              You already know, sometime the curseforge website has some loading
              problems, be reassured, here there will be no problem.
            </p>
          </div>
          <div className="bg-secondary p-5 border-2 border-tertiary rounded-md min-h-[132px] shadow-md shadow-t-alt">
            <h3 className="text-2xl font-semibold mb-2 small-case">
              ➙ <span className="text-accent">A</span> real search
            </h3>
            <p>
              This falsy research who don&apos;t work. Lot a frustration but
              resolved here!
            </p>
          </div>
          <div className="bg-secondary p-5 border-2 border-tertiary rounded-md min-h-[132px] shadow-md shadow-t-alt">
            <h3 className="text-2xl font-semibold mb-2 small-case">
              ➙ <span className="text-accent">N</span>ew filter system
            </h3>
            <p>
              Filters, the base of a good research. It&apos;s all good now, you
              can found a &quot;real&quot; search here!
            </p>
          </div>
          <div className="bg-secondary p-5 border-2 border-tertiary rounded-md min-h-[132px] shadow-md shadow-t-alt">
            <h3 className="text-2xl font-semibold mb-2 small-case">
              ➙ <span className="text-accent">B</span>atch download
            </h3>
            <p>
              Yes, you can. Yes that&apos;s right. Download them all at once!
              You don&apos;t need to have 50 tabs open to start the download on
              each one.
            </p>
          </div>
          <div className="bg-secondary p-5 border-2 border-tertiary rounded-md min-h-[132px] shadow-md shadow-t-alt">
            <h3 className="text-2xl font-semibold mb-2 small-case">
              ➙ <span className="text-accent">A</span>nd mores
            </h3>
            <p>
              It&apos;s possible that all differencies are not listed here, who
              know (lol).
            </p>
          </div>
        </article>
      </section>
      <Background />
    </Fragment>
  );
};

export default Home;
