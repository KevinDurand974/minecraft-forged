import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  // uri: "http://192.168.0.107:3000/api/graphql",
  cache: new InMemoryCache(),
});
