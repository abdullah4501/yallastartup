import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import { notFound } from "next/navigation";
import SiteFooter from "../../components/site-footer";
import SiteHeader from "../../components/site-header";
import ScrollAnimations from "../../scroll-animations";
import { services } from "../../site-config";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  return {
    title: { absolute: `${service.title} | Yalla Startup Venture Studio` },
    description: `${service.description} Typical investment: ${service.price}.`,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: `${service.title} | Yalla Startup`, description: service.description, type: "website" },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: { "@type": "Organization", name: "Yalla Startup Venture Studio" },
    areaServed: ["United Arab Emirates", "Saudi Arabia"],
    offers: { "@type": "Offer", priceSpecification: { "@type": "PriceSpecification", priceCurrency: "AED", description: service.price } },
  };

  return (
    <main className="inner-page service-page">
      <ScrollAnimations />
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <section className="simple-hero shell service-hero">
        <p className="eyebrow"><span /> Advisory · {service.number}</p>
        <h1>{service.title}.<br /><em>{service.tag}.</em></h1>
        <p className="hero-intro">{service.description}</p>
        <div className="cta-pair"><a className="button button-primary" href="/sprint#apply">Apply to Yalla Sprint <ArrowUpRight aria-hidden="true" /></a><a className="button button-outline" href="/book">Book a call</a></div>
      </section>
      <section className="service-detail shell content-section">
        <div className="service-price-card"><span>Typical investment</span><strong>{service.price}</strong><p>{service.timeframe}</p><small>Final scope and fee are confirmed after a focused diagnosis.</small></div>
        <div className="service-outcomes"><p className="eyebrow dark"><span /> What changes</p><h2>Connected outputs.<br /><em>Clearer decisions.</em></h2>{service.outcomes.map((outcome) => <p className="outcome-line" key={outcome}><Check aria-hidden="true" /> {outcome}</p>)}</div>
      </section>
      <section className="confidentiality-band"><div className="shell"><strong>Confidential by default.</strong><p>We work with commercially sensitive plans, investor materials and financial information. Confidentiality is part of the engagement—not an afterthought.</p></div></section>
      <SiteFooter />
    </main>
  );
}
