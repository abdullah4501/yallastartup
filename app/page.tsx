const services = [
  {
    number: "01",
    title: "Go-to-market strategy & revamp",
    text: "A sharper market position, priority segments, commercial model and practical route to revenue—built for the UAE and beyond.",
    tag: "Find your edge",
  },
  {
    number: "02",
    title: "Business plan",
    text: "A credible operating blueprint that connects your ambition to milestones, economics, resources and an executable growth plan.",
    tag: "Build the roadmap",
  },
  {
    number: "03",
    title: "Business valuation",
    text: "An evidence-led view of value, assumptions and scenarios—so you can negotiate your next move with confidence.",
    tag: "Know your value",
  },
  {
    number: "04",
    title: "Pitch deck & narrative",
    text: "A persuasive investor story with the logic, language and visual rhythm to make your opportunity easy to understand—and hard to ignore.",
    tag: "Own the room",
  },
];

const steps = [
  ["01", "Diagnose", "We pressure-test the business, market and numbers."],
  ["02", "Build", "We turn insight into clear, connected deliverables."],
  ["03", "Ready", "We sharpen the story for investors and stakeholders."],
  ["04", "Scale", "We stay close with finance and fundraising support."],
];

export default function Home() {
  return (
    <main>
      <div className="topline">
        <span>Built in the UAE</span>
        <span>Strategy · Finance · Capital</span>
      </div>

      <header className="nav shell">
        <a className="brand" href="#top" aria-label="Yalla Startup home">
          <span className="brand-arabic">يلا</span>
          <span className="brand-name">YALLA</span>
          <span className="brand-sub">startup</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#services">What we build</a>
          <a href="#approach">How it works</a>
          <a href="#founders">Founders</a>
        </nav>
        <a className="nav-cta" href="#contact">
          Let&apos;s talk <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> For ambitious founders</p>
          <h1>
            <span className="hero-title-line">From big ideas</span>
            <span className="hero-title-line">to <em>investable.</em></span>
          </h1>
          <p className="hero-intro">
            Strategy that moves. Numbers that hold up. A story investors remember.
            We help startups turn potential into a business ready for market, capital and scale.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#services">Explore the deliverables <span>↓</span></a>
            <a className="text-link" href="#founders">Meet your advisors <span>↗</span></a>
          </div>
        </div>

        <div className="hero-stage" aria-label="Startup growth from idea to capital">
          <div className="stage-orbit orbit-one" />
          <div className="stage-orbit orbit-two" />
          <div className="stage-core">
            <span className="stage-kicker">YALLA / UAE</span>
            <strong>Idea</strong>
            <span className="stage-arrow">↘</span>
            <strong>Scale</strong>
          </div>
          <div className="stage-chip chip-one"><span>01</span> Strategy</div>
          <div className="stage-chip chip-two"><span>02</span> Finance</div>
          <div className="stage-chip chip-three"><span>03</span> Narrative</div>
          <div className="stage-chip chip-four"><span>04</span> Capital</div>
          <div className="stage-stamp">MOVE<br />FORWARD<br /><b>يلا</b></div>
        </div>

        <div className="hero-foot">
          <p>UAE insight.<br />Global ambition.</p>
          <p>Founder thinking.<br />CFO discipline.</p>
          <div className="scroll-cue"><span>Scroll to discover</span><i>↓</i></div>
        </div>
      </section>

      <section className="signal-strip" aria-label="Yalla Startup capabilities">
        <div>
          <span>Go-to-market</span><b>✦</b>
          <span>Business planning</span><b>✦</b>
          <span>Valuation</span><b>✦</b>
          <span>Pitch narrative</span><b>✦</b>
          <span>Fundraising</span><b>✦</b>
          <span>Virtual CFO</span>
        </div>
      </section>

      <section className="services-section shell" id="services">
        <div className="section-heading">
          <div>
            <p className="eyebrow dark"><span /> The core four</p>
            <h2>Four outputs.<br />One coherent <em>growth story.</em></h2>
          </div>
          <p>
            Each deliverable works harder because it is built as part of the same commercial and financial logic—not as a standalone document.
          </p>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="card-top">
                <span className="service-number">{service.number}</span>
                <span className="service-arrow">↗</span>
              </div>
              <p className="service-tag">{service.tag}</p>
              <h3>{service.title}</h3>
              <p className="service-text">{service.text}</p>
              <div className="service-line" />
            </article>
          ))}
        </div>
      </section>

      <section className="addons shell" aria-labelledby="addons-title">
        <div className="addon-intro">
          <p className="eyebrow"><span /> Stay in motion</p>
          <h2 id="addons-title">When the deck is done,<br /><em>the real work begins.</em></h2>
        </div>
        <div className="addon-card lime-card">
          <span className="addon-index">A / 01</span>
          <h3>Fundraising support</h3>
          <p>Investor targeting, outreach preparation, data-room readiness and support through the conversations that count.</p>
          <span className="addon-mark">↗</span>
        </div>
        <div className="addon-card sand-card">
          <span className="addon-index">A / 02</span>
          <h3>Virtual CFO</h3>
          <p>Senior financial thinking without the full-time overhead—planning, reporting, cash visibility and better board-level decisions.</p>
          <span className="addon-mark">↗</span>
        </div>
      </section>

      <section className="approach-section" id="approach">
        <div className="shell">
          <div className="section-heading light">
            <div>
              <p className="eyebrow"><span /> How we work</p>
              <h2>Clarity first.<br /><em>Momentum always.</em></h2>
            </div>
            <p>No theatre. No fifty-slide strategy that sits in a folder. We work closely, challenge constructively and build what your next stage actually needs.</p>
          </div>
          <div className="steps">
            {steps.map(([number, title, text]) => (
              <article className="step" key={number}>
                <span>{number}</span>
                <div className="step-dot" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="founders-section shell" id="founders">
        <div className="founder-lead">
          <p className="eyebrow dark"><span /> Meet the founders</p>
          <h2>Operator instinct.<br /><em>Financial rigour.</em></h2>
          <p>Two complementary perspectives, brought to one table—so your strategy is exciting enough to win belief and disciplined enough to survive scrutiny.</p>
        </div>

        <div className="founder-cards">
          <article className="founder-card founder-nabeil">
            <div className="founder-monogram">NS</div>
            <div className="founder-body">
              <p className="founder-role">Founder · Venture & strategy</p>
              <h3>Nabeil Schaik</h3>
              <p>Fellow Chartered Accountant and entrepreneur with 18+ years across investment banking, corporate finance, digital transformation and startup acceleration.</p>
              <a href="https://www.linkedin.com/in/nabeilschaik/" target="_blank" rel="noreferrer">LinkedIn profile <span>↗</span></a>
            </div>
          </article>

          <article className="founder-card founder-moosa">
            <div className="founder-monogram">MR</div>
            <div className="founder-body">
              <p className="founder-role">Founder · Finance & capital</p>
              <h3>Moosa Raza</h3>
              <p>Chartered Accountant with deep UAE banking experience spanning treasury risk, capital management, regulatory reporting and financial governance.</p>
              <a href="https://www.linkedin.com/in/moosa-raza-aca-110m/" target="_blank" rel="noreferrer">LinkedIn profile <span>↗</span></a>
            </div>
          </article>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-bg-word" aria-hidden="true">YALLA</div>
        <div className="shell contact-content">
          <p className="eyebrow"><span /> Your next move</p>
          <h2>Ready to make the<br />business <em>make sense?</em></h2>
          <p>Tell us where you are, where you want to go and what is getting in the way. We will help you find the clearest route forward.</p>
          <div className="contact-actions">
            <a className="button button-light" href="https://www.linkedin.com/in/nabeilschaik/" target="_blank" rel="noreferrer">Start a conversation <span>↗</span></a>
            <span>Based in the United Arab Emirates<br />Working with founders globally</span>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="shell footer-inner">
          <a className="brand footer-brand" href="#top">
            <span className="brand-arabic">يلا</span>
            <span className="brand-name">YALLA</span>
            <span className="brand-sub">startup</span>
          </a>
          <p>Strategy to story. Numbers to narrative.<br />Built for what comes next.</p>
          <div className="footer-links">
            <a href="#services">Services</a>
            <a href="#founders">Founders</a>
            <a href="#contact">Contact</a>
          </div>
          <p className="copyright">© {new Date().getFullYear()} Yalla Startup<br />United Arab Emirates</p>
        </div>
      </footer>
    </main>
  );
}
