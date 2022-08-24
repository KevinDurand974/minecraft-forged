import Background from "@components/Background";
import PackItem from "@components/PackItem";
import { client } from "@forged/apollo";
import { modpackId, modsId, resourcepacksId } from "@forged/curseforge";
import { CompleteMod } from "@forged/graphql/schema";
import { SearchArgs } from "@forged/types";
import { gql } from "apollo-server-micro";
import { GetServerSidePropsContext, NextPage } from "next";
import Image from "next/image";

interface Props {
  mod: CompleteMod;
}

const CategorieItemPage: NextPage<Props> = ({ mod }) => {
  const parseDescriptionLinks = (description: string) => {
    const _dUri = (text: string) =>
      decodeURIComponent(decodeURIComponent(text));
    let desc = description;
    const matches = description.match(
      /href="\/linkout\?remoteUrl=([\w+\S]+)\"/gm
    );
    matches?.forEach(match => {
      desc = desc.replace(
        match,
        _dUri(
          match.replace(
            /href="\/linkout\?remoteUrl=([\w+\S]+)\"/,
            `href="$1" target="_blank"`
          )
        )
      );
    });
    return desc;
  };

  return (
    <>
      <div className="grid pack-page-grid">
        <div className="h-full w-full bg-s-alt bg-opacity-95 border-b border-tertiary">
          <nav className="flex flex-col justify-center gap-8 py-4 px-8 sticky top-[76px] h-[calc(100vh_-_76px)]">
            <button className="pack-link mb-12 items-center">
              <i className="icon-iconly-outline-arrow-left-square text-2xl" />
              <span>Hide</span>
            </button>

            <a href="#a" className="pack-link">
              All Files
            </a>
            <a href="#a" className="pack-link">
              Images
            </a>
            <a href="#a" className="pack-link">
              Dependency
            </a>
            <a href="#a" className="pack-link">
              Relations
            </a>
            <a href="#a" className="pack-link">
              CurseForge
            </a>
          </nav>
        </div>

        <section className="p-4 flex flex-col gap-4">
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

          <div
            dangerouslySetInnerHTML={{
              __html: parseDescriptionLinks(mod.description),
            }}
            className="p-4 border-2 border-t-alt bg-t-alt bg-opacity-30 shadow-xs shadow-tertiary user-reset"
          />
        </section>

        <aside className="bg-s-alt bg-opacity-95 border-b border-tertiary flex flex-col justify-center gap-8 p-4 sticky top-[76px] max-h-[calc(100vh_-_76px)]">
          <PackItem title="About Project">
            <p>Created 2 year ago</p>
            <p>Created 2 year ago</p>
            <p>Created 2 year ago</p>
          </PackItem>
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
