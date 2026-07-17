import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "yalla-startup.sites.openai.com";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", metadataBase).toString();

  return {
    title: "Yalla Startup | Strategy, Finance & Fundraising for Startups",
    description:
      "UAE-based startup advisors for go-to-market strategy, business plans, valuations, pitch decks, fundraising support and virtual CFO services.",
    metadataBase,
    openGraph: {
      title: "Yalla Startup — From big idea to investable",
      description: "Strategy that moves. Numbers that hold up. A story investors remember.",
      type: "website",
      locale: "en_AE",
      images: [{ url: socialImage, width: 1536, height: 1024, alt: "Yalla Startup — From big idea to investable" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Yalla Startup — From big idea to investable",
      description: "Strategy, finance and capital support for ambitious founders.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
