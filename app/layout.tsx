import type { Metadata, Viewport } from "next";
import "./globals.css";
import { contactDetails, siteUrl } from "./site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Yalla Startup Venture Studio", template: "%s | Yalla Startup" },
  description: "Venture studio, founder cohort and disciplined advisory for ambitious companies in the United Arab Emirates and Saudi Arabia.",
  applicationName: "Yalla Startup Venture Studio",
  keywords: ["venture studio UAE", "startup programme UAE", "startup advisory Saudi Arabia", "founder cohort", "startup valuation", "virtual CFO UAE"],
  category: "business",
  robots: { index: true, follow: true },
  openGraph: {
    siteName: "Yalla Startup Venture Studio",
    locale: "en_AE",
    type: "website",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Yalla Startup Venture Studio" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#071b1f" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Yalla Startup Venture Studio",
    alternateName: "Yalla Startup",
    url: siteUrl,
    description: "Venture studio, founder cohort and advisory platform for ambitious companies.",
    areaServed: ["United Arab Emirates", "Saudi Arabia"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Silicon Oasis",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    telephone: contactDetails.phones.map((phone) => phone.label),
    founder: [
      { "@type": "Person", name: "Nabeil Schaik" },
      { "@type": "Person", name: "Moosa Raza" },
    ],
    sameAs: ["https://www.linkedin.com/in/nabeilschaik/", "https://www.linkedin.com/in/moosa-raza-aca-110m/"],
  };

  return (
    <html lang="en" dir="ltr">
      <body suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        {children}
      </body>
    </html>
  );
}
