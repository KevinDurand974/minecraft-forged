import { ReactNode } from "react";

export * from "./curseforge";

export interface ChildrenProps {
  children?: ReactNode;
}

export interface GameVersion {
  version: string;
  list: string[];
}
