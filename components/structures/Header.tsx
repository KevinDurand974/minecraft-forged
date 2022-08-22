import Logo from "@components/icons/Logo";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import HeaderMenu from "./HeaderMenu";
import HeaderNavigation from "./HeaderNavigation";

const Header = () => {
  const [showNavigation, setShowNavigation] = useState(true);
  const [showSearch, setShowSearch] = useState(true);

  useEffect(() => {
    setShowNavigation(false);
    setShowSearch(false);
  }, []);

  return (
    <header className="grid grid-cols-3 items-center sticky top-0 bg-tertiary p-4 z-50">
      <Link href="/">
        <a className="flex flex-row items-center gap-3 justify-self-start bg-secondary rounded-[10px] px-3 py-2">
          <Logo className="h-6 fill-normal" />
          <span className="text-xl font-bold lt-md:hidden">
            Minecraft Forged
          </span>
          <span className="text-xl font-bold gt-md:hidden">MF</span>
        </a>
      </Link>

      {showNavigation && <HeaderNavigation />}

      <HeaderMenu showSearch={showSearch} />
    </header>
  );
};

export default Header;
