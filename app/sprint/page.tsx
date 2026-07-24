import type { Metadata } from "next";
import { ArrowDown, ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import Countdown from "../components/countdown";
import { SprintApplicationForm } from "../components/lead-forms";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";
import ScrollAnimations from "../scroll-animations";
import { processSteps, siteUrl, sprintConfig } from "../site-config";

export const metadata: Metadata = {
  title: { absolute: "Yalla Sprint | Founder Cohort by Yalla Startup Venture Studio" },
  description: "Apply to Yalla Sprint: a focused founder cohort moving companies from diagnosis to investor readiness and scale. AED 1,200, 2% success fee, no equity.",
  alternates: { canonical: "/sprint" },
  openGraph: {
    title: "Yalla Sprint | From diagnosis to scale",
    description: "A focused founder cohort for ambitious companies in the United Arab Emirates, Saudi Arabia and beyond.",
    type: "website",
  },
};

const timeline = [
  ["Applications close", sprintConfig.applicationDeadlineLabel],
  ["Screening calls", sprintConfig.screeningDates],
  ["Yalla Sprint", sprintConfig.programmeDates],
  ["Readiness review", sprintConfig.readinessReviewDate],
] as const;

const afterApplying = [
  ["01", "Application review", "We review the founder, evidence, urgency and fit. Every application is handled under confidentiality."],
  ["02", "Screening call", "Shortlisted founders join a focused call to walk through the product, traction, numbers and current blocker."],
  ["03", "Deep dive", "Selected companies complete a structured diagnosis across strategy, commercial logic, finance and narrative."],
  ["04", "Decision and onboarding", "Accepted founders receive the cohort plan, working rhythm, terms and preparation checklist."],
] as const;

export default function SprintPage() {
  const programmeJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    name: sprintConfig.name,
    description: sprintConfig.descriptor,
    provider: { "@type": "Organization", name: "Yalla Startup Venture Studio", url: siteUrl },
    applicationDeadline: "2026-07-31",
    startDate: "2026-08-10",
    endDate: "2026-09-04",
    occupationalCategory: "Startup founder",
    offers: { "@type": "Offer", price: "1200", priceCurrency: "AED", description: "AED 1,200 programme fee plus a 2% success fee. No equity." },
  };

  return (
    <main className="inner-page sprint-page">
      <ScrollAnimations />
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(programmeJsonLd) }} />

      <section className="programme-hero shell">
        <div className="programme-hero-copy">
          <p className="eyebrow"><span /> Applications close {sprintConfig.applicationDeadlineLabel}</p>
          <h1>Four focused weeks.<br /><em>One investable business.</em></h1>
          <p className="hero-intro">Yalla Sprint is a founder cohort for companies that need sharper strategy, stronger numbers and a story that can survive investor scrutiny. You do the work with us—not around us.</p>
          <div className="cta-pair">
            <a className="button button-primary" href="#apply">Apply to Yalla Sprint <ArrowDown aria-hidden="true" /></a>
            <a className="button button-outline" href="/book">Book a call</a>
          </div>
        </div>
        <div className="programme-deadline-card">
          <span className="programme-kicker">Application deadline</span>
          <strong>31<br />August  </strong>
          <p>Limited founder cohort</p>
          <Countdown target={sprintConfig.applicationDeadline} label={sprintConfig.applicationDeadlineLabel} />
        </div>
      </section>

      <section className="terms-strip" aria-label="Yalla Sprint terms">
        <div className="shell terms-grid">
          <div><span>Programme fee</span><strong>{sprintConfig.fee}</strong></div>
          <div><span>On successful capital raised</span><strong>{sprintConfig.successFee}</strong></div>
          <div><span>Founder ownership</span><strong>{sprintConfig.equity}</strong></div>
          <div><span>Confidentiality</span><strong>Built into the process</strong></div>
        </div>
      </section>

      <section className="sprint-intro shell content-section">
        <div className="section-heading">
          <div><p className="eyebrow dark"><span /> Not an accelerator</p><h2>A working cohort.<br /><em>Built around your company.</em></h2></div>
          <p>The Sprint is designed for founders who already have something worth building but need commercial and financial clarity before the next major move.</p>
        </div>
        <div className="fit-grid">
          {["You have a product, proposition or early traction to pressure-test.", "A fundraising, market-entry or growth decision is approaching.", "You can commit founder time and share the real numbers.", "You want direct challenge, practical outputs and no theatre."].map((item) => (
            <article className="fit-card" key={item}><Check aria-hidden="true" /><p>{item}</p></article>
          ))}
        </div>
      </section>

      <section className="approach-section sprint-process">
        <div className="shell">
          <div className="section-heading light">
            <div><p className="eyebrow"><span /> The cohort journey</p><h2>Diagnose to Scale.<br /><em>Applied to the business.</em></h2></div>
            <p>Each stage produces decisions and working outputs. The programme is not a sequence of generic workshops.</p>
          </div>
          <div className="steps">
            {processSteps.map((step) => <article className="step" key={step.number}><span>{step.number}</span><div className="step-dot" /><h3>{step.title}</h3><p>{step.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="timeline-section shell content-section">
        <div className="section-heading compact-heading">
          <div><p className="eyebrow dark"><span /> Cohort dates</p><h2>Know the rhythm<br /><em>before you apply.</em></h2></div>
          <p>Applications are reviewed as they arrive. Applying early gives both sides more time for a useful screening conversation.</p>
        </div>
        <div className="programme-timeline">
          {timeline.map(([label, date], index) => <div className="timeline-item" key={label}><span>0{index + 1}</span><p>{label}</p><strong>{date}</strong></div>)}
        </div>
      </section>

      <section className="sprint-terms-section content-section" id="terms">
        <div className="shell split-panel">
          <div>
            <p className="eyebrow"><span /> Terms, plainly</p>
            <h2>{sprintConfig.fee}<br /><em>plus success.</em></h2>
          </div>
          <div className="plain-terms">
            <p><ShieldCheck aria-hidden="true" /> <span><strong>Programme fee.</strong> The {sprintConfig.fee} fee is invoiced only after written acceptance and is payable in full before onboarding. Applying is free.</span></p>
            <p><ShieldCheck aria-hidden="true" /> <span><strong>What the 2% covers.</strong> The success fee is 2% of gross external capital actually received by the company through an equity, SAFE or convertible instrument, or external debt financing, when the Sprint-supported materials or fundraising process contributed to that raise.</span></p>
            <p><ShieldCheck aria-hidden="true" /> <span><strong>When it is payable.</strong> The success fee becomes due only after the company receives the relevant funds and is payable within 10 business days. No completed raise means no success fee.</span></p>
            <p><ShieldCheck aria-hidden="true" /> <span><strong>What is excluded.</strong> Grants, customer revenue, founder or existing-shareholder funds, and financing already contractually committed before the Sprint application are excluded.</span></p>
            <p><ShieldCheck aria-hidden="true" /> <span><strong>No equity.</strong> Yalla Startup takes no shares, options, warrants or other ownership rights in the company.</span></p>
            <p><ShieldCheck aria-hidden="true" /> <span><strong>Cancellation and confidentiality.</strong> The programme fee becomes non-refundable once onboarding begins. If Yalla Startup cancels the cohort before delivery starts, the programme fee is refunded. Application information and Sprint materials are handled under confidentiality.</span></p>
          </div>
        </div>
      </section>

      <section className="after-apply shell content-section">
        <div className="section-heading compact-heading">
          <div><p className="eyebrow dark"><span /> After you apply</p><h2>A clear process.<br /><em>No black box.</em></h2></div>
          <p>We keep the application concise, review on a rolling basis and tell founders what happens next.</p>
        </div>
        <div className="after-apply-grid">
          {afterApplying.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="application-section" id="apply">
        <div className="shell application-layout">
          <div className="application-copy">
            <p className="eyebrow"><span /> Apply to Yalla Sprint</p>
            <h2>Be specific.<br /><em>Tell us the truth.</em></h2>
            <p>Clear, matter-of-fact answers are more useful than polished marketing language. We want to understand the company, the evidence and what must change.</p>
            <a className="text-link" href="/book">Not ready? Book a call first <ArrowUpRight aria-hidden="true" /></a>
          </div>
          <SprintApplicationForm />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
