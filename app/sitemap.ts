import type { MetadataRoute } from "next";
import { services, siteUrl } from "./site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const corePages: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/sprint`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/book`, changeFrequency: "monthly", priority: 0.7 },
  ];

  return [
    ...corePages,
    ...services.map((service) => ({
      url: `${siteUrl}/services/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
