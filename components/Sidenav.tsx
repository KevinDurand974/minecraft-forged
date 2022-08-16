import { ChildrenProps } from "@forged/types";
import { useDisableBodyScroll } from "hooks/useDisableBodyScroll";
import { FC, useEffect, useState } from "react";

interface Props extends ChildrenProps {
  show: boolean;
  title: string;
  onClose?: () => void;
  className?: string;
}

const Sidenav: FC<Props> = ({ show, onClose, children, title, className }) => {
  useDisableBodyScroll(show);

  const handleCloseSidebar = (e: any) => {
    e.preventDefault();
    if (onClose) onClose();
  };

  return (
    <div
      className={`fixed w-screen h-screen top-0 left-0 z-100 ${
        !show && "pointer-events-none"
      }`}
    >
      <div
        className={`h-screen bg-black transition duration-300 ${
          show ? "opacity-80" : "opacity-0"
        }`}
        onClick={handleCloseSidebar}
      />
      <div
        className={`bg-primary min-w-xs h-full fixed top-0 max-h-screen overflow-auto left-0 flex flex-col gap-2 transition duration-300 ${
          !show && "-translate-x-full"
        }`}
      >
        <button
          className="w-full flex justify-end items-center uppercase font-semibold text-3xl px-2 py-2 transition duration-300 group bg-primary bg-gradient-to-l to-primary from-transparent hover:bg-tertiary"
          onClick={handleCloseSidebar}
        >
          <i className="icon-iconly-bold-arrow-left-circle" />
          <div className="text-lg pr-0 transition-all duration-300 group-hover:pr-3">
            Close
          </div>
        </button>
        {title && (
          <h2 className="text-center text-2xl font-semibold small-case border-b-2 w-3/5 mx-auto px-4">
            {title}
          </h2>
        )}
        <main className={`${className + " "}`}>{children}</main>
      </div>
    </div>
  );
};

export default Sidenav;
