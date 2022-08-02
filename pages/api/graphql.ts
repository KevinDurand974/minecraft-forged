import "reflect-metadata";

import { ExempleResolver } from "@forged/graphql/resolver";
import { ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";
import { buildSchema } from "type-graphql";

const schema = await buildSchema({
  resolvers: [ExempleResolver],
});

const cors = Cors();

const server = new ApolloServer({
  schema,
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
