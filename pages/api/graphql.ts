import "reflect-metadata";

import {
  CFModsResolver,
  ModLoaderResolver,
  VersionResolver,
} from "@forged/graphql/resolver";
import { ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";
import { buildSchema } from "type-graphql";

const schema = await buildSchema({
  resolvers: [CFModsResolver, VersionResolver, ModLoaderResolver],
});

const cors = Cors();

const server = new ApolloServer({
  schema,
  // context: () => prisma here
  cache: "bounded",
});

const startServer = server.start();

export default cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await startServer;

  await server.createHandler({
    path: "/api/graphql",
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
