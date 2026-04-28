import { MetadataRoute } from "next";
import { allSections } from "@/lib/data";

const BASE_URL = "https://www.haeyounglab.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
    ];

    const detailRoutes: MetadataRoute.Sitemap = Object.entries(allSections).flatMap(
        ([section, { items }]) =>
            items.map((item) => ({
                url: `${BASE_URL}/detail/${section}/${item.slug}`,
                lastModified: new Date(),
                changeFrequency: "monthly" as const,
                priority: 0.7,
            }))
    );

    return [...staticRoutes, ...detailRoutes];
}