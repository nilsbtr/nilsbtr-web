import type { IconType } from "@icons-pack/react-simple-icons";

export type TechMark = {
  Component: IconType;
  brand: string;
  label: string;
};

export type Tech = {
  id: string;
  name: string;
  marks?: TechMark[];
  initials?: string;
  description: string;
  href?: string;
};

export type TechCategoryId = "core" | "toolkit" | "exploring";

export type TechCategory = {
  id: TechCategoryId;
  label: string;
  caption: string;
  items: readonly Tech[];
};
