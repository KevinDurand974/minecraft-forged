import { client } from "@forged/apollo";
import { modpackId, modsId, resourcepacksId } from "@forged/curseforge";
import { CompleteMod } from "@forged/graphql/schema";
import { SearchArgs } from "@forged/types";
import { gql } from "apollo-server-micro";
import { GetServerSidePropsContext, NextPage } from "next";

interface Props {
  mod: CompleteMod;
}

const CategorieItemPage: NextPage<Props> = ({ mod }) => {
  return <h1>{mod.name}</h1>;
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
