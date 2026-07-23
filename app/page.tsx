import type { Metadata } from "next";
import { ArrowDownRight, ArrowUpRight, LockKeyhole, MapPin, Phone, Sparkles } from "lucide-react";
import Countdown from "./components/countdown";
import { ResourceGateForm } from "./components/lead-forms";
import SiteFooter from "./components/site-footer";
import SiteHeader from "./components/site-header";
import ScrollAnimations from "./scroll-animations";
import { contactDetails, credentialItems, outcomeCards, processSteps, services, siteUrl, sprintConfig } from "./site-config";

export const metadata: Metadata = {
  title: { absolute: "Yalla Startup Venture Studio | Founder Cohort and Advisory" },
  description: "Yalla Startup is a venture studio, founder cohort and advisory platform helping ambitious companies in the United Arab Emirates and Saudi Arabia become commercially and investor ready.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Yalla Startup Venture Studio | From big ideas to investable",
    description: "Yalla Sprint and disciplined advisory for founders in the United Arab Emirates, Saudi Arabia and beyond.",
    type: "website",
  },
};

const marqueeItems = ["Yalla Sprint", ...services.map((service) => service.title), "Fundraising readiness"];

export default function Home() {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Yalla Startup Venture Studio",
    alternateName: "Yalla Startup",
    url: siteUrl,
    description: "Venture studio, founder cohort and advisory platform for ambitious companies in the United Arab Emirates and Saudi Arabia.",
  };

  return (
    <main>
      <ScrollAnimations />
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Venture studio + founder cohort</p>
          <h1><span className="hero-title-line">From big ideas</span><span className="hero-title-line">to <em>investable.</em></span></h1>
          <p className="hero-intro">Build through Yalla Sprint, or bring our strategy and finance team into a specific business challenge. Two clear paths from potential to a business ready for market, capital and scale.</p>
          <div className="hero-actions cta-pair">
            <a className="button button-primary" href="/sprint#apply">Apply to Yalla Sprint <ArrowUpRight aria-hidden="true" /></a>
            <a className="button button-outline" href="/book">Book a call</a>
          </div>
          <div className="hero-deadline-strip">
            <div><span>Applications close</span><strong>{sprintConfig.applicationDeadlineLabel}</strong></div>
            <Countdown target={sprintConfig.applicationDeadline} label={sprintConfig.applicationDeadlineLabel} />
          </div>
        </div>

        <div className="hero-stage" aria-label="Yalla process from diagnosis to scale">
          <div className="stage-orbit orbit-one" /><div className="stage-orbit orbit-two" />
          <div className="stage-core-rotator"><div className="stage-core"><span className="stage-kicker">YALLA / UAE / KSA</span><strong>Idea</strong><ArrowDownRight className="stage-arrow" aria-hidden="true" /><strong>Scale</strong></div></div>
          <div className="stage-chip chip-one"><span>01</span> Diagnose</div><div className="stage-chip chip-two"><span>02</span> Build</div><div className="stage-chip chip-three"><span>03</span> Ready</div><div className="stage-chip chip-four"><span>04</span> Scale</div>
          <div className="stage-stamp">MOVE<br />FORWARD<br /><b>يلا</b></div>
        </div>

        <div className="hero-foot"><p>United Arab Emirates.<br />Saudi Arabia.</p><p>Founder thinking.<br />CFO discipline.</p><div className="scroll-cue"><i><ArrowDownRight aria-hidden="true" /></i></div></div>
      </section>

      <section className="credential-strip" aria-label="Founder credentials">
        <div className="shell credential-grid">{credentialItems.map((item, index) => <div key={item}><span>0{index + 1}</span><p>{item}</p></div>)}</div>
      </section>

      <section className="home-sprint-section content-section" id="sprint">
        <div className="shell">
          <div className="section-heading light">
            <div><p className="eyebrow"><span /> The critical founder programme</p><h2>Yalla Sprint.<br /><em>Diagnose to Scale.</em></h2></div>
            <p>A focused four-week cohort that turns the real business—strategy, numbers, evidence and narrative—into one connected case for growth.</p>
          </div>
          <div className="home-sprint-grid">
            <article className="home-sprint-main">
              <span className="pathway-label">What it is</span>
              <h3>A working cohort.<br />Not startup theatre.</h3>
              <p>Founders work directly on their own company, pressure-testing what matters and leaving with practical outputs for the next serious conversation.</p>
              <div className="sprint-mini-process">{processSteps.map((step) => <div key={step.number}><span>{step.number}</span><strong>{step.title}</strong></div>)}</div>
            </article>
            <aside className="home-sprint-terms">
              <span className="pathway-label">Terms and dates</span>
              <strong>{sprintConfig.fee}</strong>
              <p>{sprintConfig.successFee} · {sprintConfig.equity}</p>
              <dl><div><dt>Applications close</dt><dd>{sprintConfig.applicationDeadlineLabel}</dd></div><div><dt>Programme</dt><dd>{sprintConfig.programmeDates}</dd></div></dl>
              <a className="button button-dark" href="/sprint#apply">Apply to Yalla Sprint <ArrowUpRight aria-hidden="true" /></a>
              <a className="card-link" href="/sprint">Read the full programme</a>
            </aside>
          </div>
        </div>
      </section>

      <section className="signal-strip" aria-label="Yalla Startup capabilities"><div className="marquee-track">{[0, 1].map((copy) => <div className="marquee-group" aria-hidden={copy === 1} key={copy}>{marqueeItems.map((item) => <div className="marquee-item" key={`${copy}-${item}`}><span>{item}</span><Sparkles className="marquee-icon" aria-hidden="true" /></div>)}</div>)}</div></section>

      <section className="services-section shell" id="services">
        <div className="section-heading"><div><p className="eyebrow dark"><span /> The Core Four</p><h2>Four connected outputs.<br />One <em>investable business.</em></h2></div><p>Strategy, planning, valuation and narrative are built together so every claim is supported by the commercial and financial logic beneath it.</p></div>
        <div className="service-grid core-four-grid">{services.slice(0, 4).map((service) => <article className="service-card" key={service.slug}><div className="card-top"><span className="service-number">{service.number}</span><span className="service-arrow"><ArrowUpRight aria-hidden="true" /></span></div><p className="service-tag">{service.tag}</p><h3>{service.title}</h3><p className="service-text">{service.summary}</p><p className="service-price-preview">{service.price}</p><a className="card-link" href={`/services/${service.slug}`}>View service</a><div className="service-line" /></article>)}</div>
      </section>

      <section className="addons shell" id="stay-in-motion">
        <div className="addon-intro"><p className="eyebrow"><span /> Stay in Motion</p><h2>Support beyond<br /><em>the core build.</em></h2><p>Keep momentum through the raise and bring senior financial discipline into the business as it grows.</p></div>
        <article className="addon-card lime-card"><span className="addon-index">01 · CAPITAL</span><span className="addon-mark"><ArrowUpRight aria-hidden="true" /></span><h3>Fundraising Support</h3><p>Preparation, investor process support and decision discipline through the capital journey.</p><a className="card-link" href="/book">Discuss fundraising support</a></article>
        <article className="addon-card sand-card"><span className="addon-index">02 · FINANCE</span><span className="addon-mark"><ArrowUpRight aria-hidden="true" /></span><h3>Virtual CFO</h3><p>Ongoing cash visibility, reporting, planning and board-ready financial leadership.</p><strong className="addon-price">{services[4].price}</strong><a className="card-link" href={`/services/${services[4].slug}`}>View Virtual CFO</a></article>
      </section>

      <section className="approach-section" id="approach"><div className="shell"><div className="section-heading light"><div><p className="eyebrow"><span /> How we work</p><h2>Diagnose. Build.<br /><em>Ready. Scale.</em></h2></div><p>The same discipline runs through the Sprint and every advisory engagement. No generic workshops and no disconnected deliverables.</p></div><div className="steps">{processSteps.map((step) => <article className="step" key={step.number}><span>{step.number}</span><div className="step-dot" /><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></div></section>

      <section className="outcomes-section shell content-section" id="outcomes"><div className="section-heading"><div><p className="eyebrow dark"><span /> Proof, without breaking trust</p><h2>Commercial outcomes.<br /><em>Names stay confidential.</em></h2></div><p>We work with sensitive strategy, financial information and fundraising materials. These anonymised examples show the kind of change we help create.</p></div><div className="outcomes-grid">{outcomeCards.map((outcome, index) => <article className="outcome-card" key={outcome}><span>0{index + 1}</span><p>{outcome}</p><LockKeyhole aria-label="Client identity kept confidential" /></article>)}</div></section>

      <section className="founders-section shell" id="founders"><div className="founder-lead"><p className="eyebrow dark"><span /> Meet the founders</p><h2>Operator instinct.<br /><em>Financial rigour.</em></h2><p>Two complementary perspectives and 20+ years across Big Four, banking, corporate finance, strategy, transformation and venture building.</p><p className="confidentiality-note"><LockKeyhole aria-hidden="true" /> Every founder conversation and engagement is treated as confidential.</p></div><div className="founder-cards"><article className="founder-card founder-nabeil"><div className="founder-monogram">NS</div><div className="founder-body"><p className="founder-role">Founder · Venture & strategy</p><h3>Nabeil Schaik</h3><p>Fellow Chartered Accountant and entrepreneur with 20+ years across Big Four, investment banking, corporate finance, transformation and startup acceleration.</p><a href="https://www.linkedin.com/in/nabeilschaik/" target="_blank" rel="noreferrer">LinkedIn profile <span><ArrowUpRight className="inline-icon" aria-hidden="true" /></span></a></div></article><article className="founder-card founder-moosa"><div className="founder-monogram">MR</div><div className="founder-body"><p className="founder-role">Founder · Finance & capital</p><h3>Moosa Raza</h3><p>Chartered Accountant with deep regional banking experience spanning treasury risk, capital management, regulatory reporting and governance.</p><a href="https://www.linkedin.com/in/moosa-raza-aca-110m/" target="_blank" rel="noreferrer">LinkedIn profile <span><ArrowUpRight className="inline-icon" aria-hidden="true" /></span></a></div></article></div></section>

      <section className="resource-section"><div className="shell resource-layout"><div><p className="eyebrow"><span /> Free founder resource</p><h2>Is the business ready<br />for its <em>next serious conversation?</em></h2><p>Download the Founder Readiness Checklist for a practical review of strategy, numbers, narrative and diligence readiness.</p></div><ResourceGateForm /></div></section>

      <section className="contact-section" id="contact"><div className="contact-bg-word" aria-hidden="true">YALLA</div><div className="shell contact-content"><p className="eyebrow"><span /> Two paths · One clear next move</p><h2>Ready to make the business<br /><em>make sense?</em></h2><p>Join Yalla Sprint for a concentrated founder programme, or book a focused advisory conversation around the exact decision in front of you.</p><div className="contact-actions cta-pair"><a className="button button-light" href="/sprint#apply">Apply to Yalla Sprint <ArrowUpRight aria-hidden="true" /></a><a className="button button-outline-dark" href="/book">Book a call</a></div><address className="contact-details"><span><MapPin aria-hidden="true" /> {contactDetails.address}</span>{contactDetails.phones.map((phone) => <a href={phone.href} key={phone.href}><Phone aria-hidden="true" /> {phone.label}</a>)}</address></div></section>

      <SiteFooter />
    </main>
  );
}
