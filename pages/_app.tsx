import "../styles/globals.css";
import "../styles/reset.css";
import "../public/fonts/custom/custom.css";

import Layout from "@components/structures/Layout";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
