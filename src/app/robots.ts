import type { MetadataRoute } from "next";

import { getBaseUrl } from "@/lib/url";

const siteUrl = getBaseUrl();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
