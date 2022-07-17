import React, { useEffect, useState } from "react";

type Props = {
  className?: string;
};

const ScrollToTop: React.FC<Props> = ({ className = "" }) => {
  const [offset, setOffset] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [bodyHeight, setBodyHeight] = useState(0);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const scrollEvent: any = document.addEventListener("scroll", () => {
      setOffset(window.scrollY);
      setViewportHeight(window.innerHeight);
      setBodyHeight(document.querySelector("main")!.clientHeight);
    });

    return () => {
      document.removeEventListener("scroll", scrollEvent);
    };
  }, []);

  useEffect(() => {
    const resiveEvent: any = document.addEventListener("resize", () => {
      setViewportHeight(window.innerHeight);
      setBodyHeight(document.querySelector("main")!.clientHeight);
    });

    return () => {
      document.removeEventListener("resize", resiveEvent);
    };
  }, []);

  return (
    <button
      type="button"
      className={`${
        offset > 0 && bodyHeight > viewportHeight
          ? "pointer-events-auto"
          : "pointer-events-none opacity-0"
      } ${className}`}
      onClick={() => handleClick()}
    >
      <i className="icon-upload" />
    </button>
  );
};

export default ScrollToTop;
