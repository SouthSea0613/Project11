import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteConfig";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      /** 채용 제출용 비공개 URL — 직접 링크로만 접근, 크롤러 색인 억제 */
      disallow: ["/Namhae_Kim/rabbithole"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
