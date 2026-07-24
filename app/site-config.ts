export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://staging.yallastartup.com").replace(/\/$/, "");

export const contactDetails = {
  address: "Silicon Oasis, Dubai, UAE",
  phones: [
    { label: "+44 7944 148580", href: "tel:+447944148580" },
    { label: "+971 56 864 8411", href: "tel:+971568648411" },
  ],
} as const;

export const sprintConfig = {
  name: "Yalla Sprint",
  descriptor: "A focused founder cohort by Yalla Startup Venture Studio",
  applicationDeadline: "2026-08-31T23:59:59+04:00",
  applicationDeadlineLabel: "31 August 2026",
  screeningDates: "3–7 September 2026",
  programmeDates: "10 September–4 November 2026",
  readinessReviewDate: "7 November 2026",
  fee: "$1,200",
  successFee: "2% success fee",
  equity: "No equity",
  cohortSize: "Limited founder cohort",
};

export const services = [
  {
    number: "01",
    slug: "strategy-revamp",
    title: "Strategy Revamp",
    tag: "Find your edge",
    summary: "Sharpen the position, priorities and commercial route that will move the business forward.",
    description: "A focused strategy engagement for founders who need a clearer market position, stronger commercial choices and an executable route to growth.",
    timeframe: "3–5 weeks",
    outcomes: ["Clear market position", "Priority customer segments", "Commercial model", "90-day execution roadmap"],
  },
  {
    number: "02",
    slug: "business-planning",
    title: "Business Planning",
    tag: "Build the roadmap",
    summary: "Connect ambition to milestones, resources, economics and a plan the team can actually execute.",
    description: "An operating and financial blueprint that makes the growth plan credible to founders, boards, lenders and investors.",
    timeframe: "3–5 weeks",
    outcomes: ["Operating plan", "Milestone roadmap", "Resource plan", "Integrated financial logic"],
  },
  {
    number: "03",
    slug: "valuation",
    title: "Valuation",
    tag: "Know your value",
    summary: "Build an evidence-led view of value, assumptions and scenarios before the negotiation begins.",
    description: "A defensible valuation range with transparent assumptions, scenario analysis and the evidence needed for investor or transaction scrutiny.",
    timeframe: "2–4 weeks",
    outcomes: ["Valuation range", "Assumption book", "Scenario analysis", "Negotiation evidence"],
  },
  {
    number: "04",
    slug: "pitch-narrative",
    title: "Pitch Narrative",
    tag: "Own the room",
    summary: "Turn the business logic into a clear investor story that is easy to understand and hard to ignore.",
    description: "A persuasive pitch narrative and deck structure that connects the market opportunity, traction, economics and ask into one coherent case.",
    timeframe: "2–4 weeks",
    outcomes: ["Investor narrative", "Pitch deck", "Evidence hierarchy", "Founder presentation notes"],
  },
  {
    number: "05",
    slug: "virtual-cfo",
    title: "Virtual CFO",
    tag: "Stay in control",
    summary: "Bring senior financial discipline into planning, cash visibility, reporting and board decisions.",
    description: "Ongoing senior finance support for growing businesses that need stronger decisions without full-time executive overhead.",
    timeframe: "Monthly engagement",
    outcomes: ["Cash visibility", "Management reporting", "Board-ready numbers", "Fundraising preparation"],
  },
] as const;

export const processSteps = [
  { number: "01", title: "Diagnose", text: "Pressure-test the business, market, evidence and numbers." },
  { number: "02", title: "Build", text: "Turn the diagnosis into connected commercial and financial outputs." },
  { number: "03", title: "Ready", text: "Sharpen the story, evidence and founder delivery for scrutiny." },
  { number: "04", title: "Scale", text: "Leave with priorities, momentum and a practical next-stage plan." },
] as const;

export const outcomeCards = [
  "Helped a Series A software founder defend a seven-figure valuation during due diligence.",
  "Rebuilt a founder’s commercial story into an investor narrative that aligned strategy, numbers and the raise.",
  "Turned an early-stage concept into a board-ready operating plan with milestones, cash needs and ownership.",
  "Supported a UAE founder with the financial visibility and governance needed for a high-stakes growth decision.",
] as const;

export const credentialItems = [
  "Nabeil Schaik · Fellow Chartered Accountant",
  "Moosa Raza · Chartered Accountant",
  "20+ years across Big Four, banking and corporate finance",
  "United Arab Emirates and Saudi Arabia · Confidential by default",
] as const;
