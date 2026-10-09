import type { MetadataRoute } from "next";

import { NAV_ITEMS } from "@/config/navigation";
import { getBaseUrl } from "@/lib/url";

const siteUrl = getBaseUrl();

/** Every page reachable from the navigation; pages that aren't live yet are left out. */
export default function sitemap(): MetadataRoute.Sitemap {
  return NAV_ITEMS.filter((item) => !item.disabled).map((item) => ({
    url: item.href === "/" ? siteUrl : `${siteUrl}${item.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
