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
  /** Short note shown as the tooltip when the tech is featured as an icon. */
  tagline?: string;
  /** Small status label rendered next to the name, e.g. "waiting for stable". */
  badge?: string;
  href?: string;
};

export type TechGroup = {
  label?: string;
  items: readonly Tech[];
};

export type TechCategory = {
  id: string;
  label: string;
  caption?: string;
  /** Always visible. */
  core: readonly Tech[];
  /** Hidden behind "show more". */
  more?: readonly TechGroup[];
  /** Start with the whole category collapsed. */
  collapsed?: boolean;
};
