import Background from "@components/Background";
import { Description } from "@components/pack";
import PackItem from "@components/PackItem";
import { SidebarFiles } from "@components/sidebar";
import { client } from "@forged/apollo";
import { modpackId, modsId, resourcepacksId } from "@forged/curseforge";
import { CompleteMod } from "@forged/graphql/schema";
import { SearchArgs } from "@forged/types";
import { gql } from "apollo-server-micro";
import { format, formatDistanceToNowStrict } from "date-fns";
import { GetServerSidePropsContext, NextPage } from "next";
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

const CategorieItemPage: NextPage<Props> = ({ mod }) => {
  const router = useRouter();

  const [subCategory, setSubCategory] = useState<Categories>("description");

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
              onClick={() => setSubCategory("description")}
            >
              Description
            </button>
            <button
              className={`pack-link ${
                subCategory === "files" &&
                "bg-accent bg-opacity-95 shadow-accent"
              }`}
              onClick={() => setSubCategory("files")}
            >
              All Files
            </button>
            <button
              className={`pack-link ${
                subCategory === "images" &&
                "bg-accent bg-opacity-95 shadow-accent"
              }`}
              onClick={() => setSubCategory("images")}
            >
              Images
            </button>
            <button
              className={`pack-link ${
                subCategory === "dependencies" &&
                "bg-accent bg-opacity-95 shadow-accent"
              }`}
              onClick={() => setSubCategory("dependencies")}
            >
              Dependencies
            </button>
            <button
              className={`pack-link ${
                subCategory === "relations" &&
                "bg-accent bg-opacity-95 shadow-accent"
              }`}
              onClick={() => setSubCategory("relations")}
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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    // Prepare Query Arguments
    const queryArguments: Partial<SearchArgs> = {};
    switch (ctx.params!.category) {
      case "modpacks":
        queryArguments["classId"] = modpackId;
        break;
      case "mods":
        queryArguments["classId"] = modsId;
        break;
      case "texture-packs":
        queryArguments["classId"] = resourcepacksId;
        break;
    }
    queryArguments["slug"] = ctx.params!.slug as string;

    // Query Apollo
    const { data } = await client.query({
      query: gql`
        query GetMod($args: CFSearchInput!) {
          getMod(args: $args) {
            id
            name
            slug
            classId
            links {
              websiteUrl
              wikiUrl
              issuesUrl
              sourceUrl
            }
            status
            downloadCount
            isFeatured
            categories {
              id
              name
              slug
              iconUrl
              isClass
            }
            authors {
              id
              name
              url
            }
            logo {
              id
              modId
              title
              thumbnailUrl
              url
            }
            screenshots {
              id
              title
              thumbnailUrl
              url
            }
            latestFilesIndexes {
              gameVersion
              fileId
              filename
              releaseType
            }
            dateCreated
            dateModified
            allowModDistribution
            gamePopularityRank
            description
            files {
              id
              isAvailable
              displayName
              dependencies {
                relationType
                modId
              }
              fileName
              releaseType
              fileStatus
              fileDate
              fileLength
              downloadCount
              downloadUrl
              isServerPack
              gameVersions
            }
          }
        }
      `,
      variables: {
        args: queryArguments,
      },
    });

    const mod: CompleteMod = data.getMod;

    if (!mod) return { notFound: true };
    return {
      props: { mod },
    };
  } catch (error: any) {
    console.log(error.message);
    return { notFound: true };
  }
};

export default CategorieItemPage;
