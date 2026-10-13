import type { MetadataRoute } from "next";

import { LEGAL_NAV_ITEMS, NAV_ITEMS } from "@/config/navigation";
import { getBaseUrl } from "@/lib/url";

const siteUrl = getBaseUrl();

/** The English translation of the privacy policy, which has no link of its own in the footer. */
const LEGAL_TRANSLATIONS = ["/privacy"];

/** Every page reachable from the navigation; pages that aren't live yet are left out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = NAV_ITEMS.filter((item) => !item.disabled).map((item) => ({
    url: item.href === "/" ? siteUrl : `${siteUrl}${item.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));

  const legalPages: MetadataRoute.Sitemap = [
    ...LEGAL_NAV_ITEMS.map((item) => item.href),
    ...LEGAL_TRANSLATIONS,
  ].map((href) => ({
    url: `${siteUrl}${href}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  return [...pages, ...legalPages];
}
