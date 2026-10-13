export type NavItem = {
  href: string;
  label: string;
  /** Listed in the navigation but not available yet. */
  disabled?: boolean;
};

/** Primary navigation, in display order. */
export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/social", label: "Social" },
  { href: "/stack", label: "Stack" },
  { href: "/projects", label: "Projects", disabled: true },
  { href: "/blog", label: "Blog", disabled: true },
];

/**
 * Legal pages, linked from every page's footer. German law expects them to be
 * easy to find under these names.
 */
export const LEGAL_NAV_ITEMS: readonly NavItem[] = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
];
