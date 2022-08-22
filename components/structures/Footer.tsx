import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full mt-auto bg-s-alt px-4 py-8 flex lg:flex-row gap-4 justify-center items-center flex-col-reverse">
      <div>
        <div className="text-center mb-5 font-semibold small-case">
          Powered by{" "}
          <a
            href="https://docs.curseforge.com/#getting-started"
            target="_blank"
            rel="noreferrer"
            className="transition duration-200 underline-offset-4 underline hover:text-accent"
          >
            CurseForge API
          </a>
        </div>
        <div className="grid gt-md:grid-cols-3 lt-lg:grid-cols-1 gap-5 flex-row justify-center font-bold small-case">
          <p className="lt-lg:text-center">Copyright © 2022</p>
          <p className="lt-lg:text-center">Minecraft Forged</p>
          <p className="lt-lg:text-center">All Rights Reserved</p>
        </div>
      </div>

      <div className="lg:w-[1px] lg:h-16 bg-primary mx-5 w-3/4 h-[1px]" />

      <div>
        <nav className="grid gt-md:grid-cols-4 lt-lg:grid-cols-2 gap-10">
          <ul className="flex flex-col gap-1">
            <li>
              <Link href="/about-us">
                <a className="footer-link">About-Us</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a className="footer-link">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/search">
                <a className="footer-link">Search</a>
              </Link>
            </li>
          </ul>
          <ul className="flex flex-col gap-1">
            <li>
              <Link href="/modpacks">
                <a className="footer-link">Modpacks</a>
              </Link>
            </li>
            <li>
              <Link href="/mods">
                <a className="footer-link">Mods</a>
              </Link>
            </li>
            <li>
              <Link href="/ressource-packs">
                <a className="footer-link">Ressource Packs</a>
              </Link>
            </li>
          </ul>
          <ul className="flex flex-col gap-1">
            <li>
              <Link href="/privacy-policy">
                <a className="footer-link">Privacy Policy</a>
              </Link>
            </li>
            <li>
              <Link href="/terms-of-use">
                <a className="footer-link">Terms Of Use</a>
              </Link>
            </li>
            <li>
              <Link href="/bug-report">
                <a className="footer-link">Report a Bug</a>
              </Link>
            </li>
          </ul>
          <ul className="">
            <li>
              <a
                href="https://www.curseforge.com"
                target="_blank"
                className="col-start-3 footer-link"
                rel="nofollow noreferrer"
              >
                CurseForge
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
