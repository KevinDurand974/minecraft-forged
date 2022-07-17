import ScrollToTop from "@components/ScrollToTop";
import { ChildrenProps } from "@types";
import { FC, Fragment } from "react";

import Footer from "./Footer";
import Header from "./Header";

const Layout: FC<ChildrenProps> = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <main className="flex flex-col min-h-[100vh] w-full">{children}</main>
      <ScrollToTop className="transition duration-200 fixed bottom-5 right-5 bg-secondary rounded-full p-4 border-1 border-tertiary shadow-md shadow-tertiary" />
      <Footer />
    </Fragment>
  );
};

export default Layout;
