import Background from "@components/Background";
import { Description, Files } from "@components/pack";
import PackItem from "@components/PackItem";
import { SidebarFiles } from "@components/sidebar";
import {
  getCompleteCFMod,
  modpackId,
  modsId,
  resourcepacksId,
} from "@forged/curseforge";
import { CompleteMod, SearchArgs } from "@forged/types";
import { format, formatDistanceToNowStrict } from "date-fns";
import { GetStaticPaths, GetStaticPropsContext, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  mod: CompleteMod;
}

type Categories =
  | "description"
  | "files"
  | "images"
  | "dependencies"
  | "relations";

const CategorieItemPage: NextPage<Props> = props => {
  const { mod } = props;
  const router = useRouter();

  const handleChangeTab = (value: Categories) => {
    if (value === "description") {
      delete router.query.tab;
      router.push(router, undefined, { shallow: true });
    } else {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, tab: value },
        },
        undefined,
        { shallow: true }
      );
    }
    setSubCategory(value);
  };

  const [subCategory, setSubCategory] = useState(
    router.query.tab || "description"
  );

  return (
    <>
      <div className="flex">
        <div className="w-72 sticky top-[76px] h-full bg-s-alt bg-opacity-95 border-b border-tertiary">
          <nav className="flex flex-col justify-center gap-8 py-4 px-8 sticky top-[76px] h-[calc(100vh_-_76px)]">
            {/* <button className="pack-link mb-12 items-center">
              <i className="icon-iconly-outline-arrow-left-square text-2xl" />
              <span>Hide</span>
            </button> */}

            <button
              className={`pack-link ${
                subCategory === "description" &&
                "bg-accent bg-opacity-95 shadow-accent"
              }`}
              onClick={() => handleChangeTab("description")}
            >
              Description
            </button>
            <button
              className={`pack-link ${
                subCategory === "files" &&
                "bg-accent bg-opacity-95 shadow-accent"
              }`}
              onClick={() => handleChangeTab("files")}
            >
              All Files
            </button>
            <button
              className={`pack-link ${
                subCategory === "images" &&
                "bg-accent bg-opacity-95 shadow-accent"
              }`}
              onClick={() => handleChangeTab("images")}
            >
              Images
            </button>
            <button
              className={`pack-link ${
                subCategory === "dependencies" &&
                "bg-accent bg-opacity-95 shadow-accent"
              }`}
              onClick={() => handleChangeTab("dependencies")}
            >
              Dependencies
            </button>
            <button
              className={`pack-link ${
                subCategory === "relations" &&
                "bg-accent bg-opacity-95 shadow-accent"
              }`}
              onClick={() => handleChangeTab("relations")}
            >
              Relations
            </button>
            <a
              href={`https://www.curseforge.com/minecraft/${router.query.category}/${router.query.slug}`}
              className="pack-link"
            >
              CurseForge
            </a>
          </nav>
        </div>

        <section className="p-4 flex flex-col gap-4 w-[calc(100%_-_36rem)]">
          <div className="flex items-center gap-4">
            <div className="min-h-[8rem] min-w-[8rem] relative">
              <Image
                src={mod.logo.thumbnailUrl}
                objectFit="cover"
                alt={mod.name}
                layout="fill"
              />
            </div>

            <h1 className="text-4xl small-case tracking-wider font-semibold">
              {mod.name}
            </h1>
          </div>

          {subCategory === "description" && (
            <Description description={mod.description} />
          )}
          {subCategory === "files" && (
            <Files files={mod.files} modId={mod.id} />
          )}
        </section>

        <aside className="bg-s-alt bg-opacity-95 border-b border-tertiary flex flex-col mb-auto gap-8 p-4 sticky top-[76px] w-72 h-full max-h-[calc(100vh_-_76px)] overflow-auto">
          <PackItem title="Project">
            <div className="flex justify-center">
              <div className="flex flex-col gap-2">
                <p className="flex items-center gap-2">
                  <i className="icon-iconly-outline-plus text-xl" />
                  <span className="mt-[0.25rem]">
                    {format(new Date(mod.dateCreated), "MMM d, Y")}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <i className="icon-iconly-outline-edit text-xl" />
                  <span className="mt-[0.25rem]">
                    {formatDistanceToNowStrict(new Date(mod.dateModified), {
                      addSuffix: true,
                    })}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <i className="icon-iconly-outline-arrow-down-square text-xl" />
                  <span className="mt-[0.25rem] tracking-widest">
                    {new Intl.NumberFormat("en-US", {
                      style: "decimal",
                    }).format(mod.downloadCount)}
                  </span>
                </p>
              </div>
            </div>
          </PackItem>

          <PackItem title={`Categor${mod.categories.length > 1 ? "ies" : "y"}`}>
            <div className="flex justify-center">
              <div className="flex gap-2">
                {mod.categories.map(cat => (
                  <Link href={`/category/${cat.slug}`} key={cat.id}>
                    <a className="flex items-center gap-2">
                      <div className="relative h-8 w-8">
                        <Image
                          src={cat.iconUrl}
                          alt={cat.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </PackItem>

          <PackItem title={`Author${mod.authors.length > 1 ? "s" : ""}`}>
            <div className="flex justify-center">
              <div className="flex flex-col gap-2">
                {mod.authors.map(author => (
                  <p className="flex items-center gap-2" key={author.id}>
                    <i className="icon-iconly-bold-profile text-xl" />
                    <a href={author.url} target="_blank" rel="noreferrer">
                      <span className="mt-[0.25rem] font-bold">
                        {author.name}
                      </span>
                    </a>
                  </p>
                ))}
              </div>
            </div>
          </PackItem>

          <SidebarFiles files={mod.files} />
        </aside>
      </div>
      <Background num="15" />
    </>
  );
};

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  try {
    // Prepare Fetch Arguments
    const fetchArguments: Partial<SearchArgs> = {};
    switch (ctx.params!.category) {
      case "modpacks":
        fetchArguments["classId"] = modpackId;
        break;
      case "mods":
        fetchArguments["classId"] = modsId;
        break;
      case "texture-packs":
        fetchArguments["classId"] = resourcepacksId;
        break;
    }
    fetchArguments["slug"] = ctx.params!.slug as string;

    const data = await getCompleteCFMod(fetchArguments);

    if (!data) return { notFound: true };

    const mod = {
      id: data.id,
      name: data.name,
      slug: data.slug,
      classId: data.classId,
      links: {
        websiteUrl: data.links.websiteUrl,
        wikiUrl: data.links.wikiUrl,
        issuesUrl: data.links.issuesUrl,
        sourceUrl: data.links.sourceUrl,
      },
      status: data.status,
      downloadCount: data.downloadCount,
      isFeatured: data.isFeatured,
      categories: data.categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        iconUrl: cat.iconUrl,
        isClass: cat.isClass,
      })),
      authors: data.authors.map(author => ({
        id: author.id,
        name: author.name,
        url: author.url,
      })),
      logo: {
        id: data.logo.id,
        modId: data.logo.modId,
        title: data.logo.title,
        thumbnailUrl: data.logo.thumbnailUrl,
        url: data.logo.url,
      },
      screenshots: data.screenshots.map(screenshot => ({
        id: screenshot.id,
        title: screenshot.title,
        thumbnailUrl: screenshot.thumbnailUrl,
        url: screenshot.url,
      })),
      latestFilesIndexes: data.latestFilesIndexes.map(file => ({
        gameVersion: file.gameVersion,
        fileId: file.fileId,
        filename: file.filename,
        releaseType: file.releaseType,
      })),
      dateCreated: data.dateCreated,
      dateModified: data.dateModified,
      allowModDistribution: data.allowModDistribution,
      gamePopularityRank: data.gamePopularityRank,
      description: data.description,
      files: data.files.map(file => ({
        id: file.id,
        isAvailable: file.isAvailable,
        displayName: file.displayName,
        dependencies: file.dependencies.map(dep => ({
          relationType: dep.relationType,
          modId: dep.modId,
        })),
        changelog: encodeURI(file.changelog || ""),
        fileName: file.fileName,
        releaseType: file.releaseType,
        fileStatus: file.fileStatus,
        fileDate: file.fileDate,
        fileLength: file.fileLength,
        downloadCount: file.downloadCount,
        downloadUrl: file.downloadUrl,
        isServerPack: file.isServerPack,
        gameVersions: file.gameVersions,
        modId: file.modId,
      })),
    };

    return {
      props: { mod },
      revalidate: 7200,
    };
  } catch (error: any) {
    console.log(error.message);
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default CategorieItemPage;
