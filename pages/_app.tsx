import "../styles/globals.css";
import "../styles/reset.css";
import "../public/fonts/custom/custom.css";

import { ApolloProvider } from "@apollo/client";
import Layout from "@components/structures/Layout";
import { client } from "@forged/apollo";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
