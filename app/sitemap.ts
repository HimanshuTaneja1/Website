import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { workList } from "@/lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/work", "/services", "/about", "/process", "/book", "/contact"];
  const base = site.url.replace(/\/$/, "");
  return [
    ...pages.map((p) => ({
      url: `${base}${p || "/"}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.7,
    })),
    ...workList.map((w) => ({
      url: `${base}/work/${w.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
