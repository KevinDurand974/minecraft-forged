import { ChildrenProps } from "@CustomTypes";
import Head from "next/head";
import { FC, Fragment } from "react";

import Footer from "./Footer";
import Header from "./Header";

const Layout: FC<ChildrenProps> = ({ children }) => {
  return (
    <Fragment>
      <Head>
        <title>Minecraft Forged</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <Header />
      <main className="flex flex-col min-h-[100vh] w-full">{children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
