import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { contactDetails, services } from "../site-config";

export default function SiteFooter() {
  const footerLinks = [
    { href: "/sprint", label: "Yalla Sprint" },
    ...services.map((service) => ({ href: `/services/${service.slug}`, label: service.title })),
    { href: "/book", label: "Book a call" },
  ];
  const columnBreak = Math.ceil(footerLinks.length / 2);
  const linkColumns = [footerLinks.slice(0, columnBreak), footerLinks.slice(columnBreak)];

  return (
    <footer className="footer">
      <div className="shell footer-cta-row">
        <div>
          <p className="eyebrow"><span /> Choose your next move</p>
          <h2>Build with the studio.<br /><em>Or bring us into the business.</em></h2>
        </div>
        <div className="cta-pair">
          <a className="button button-primary" href="/sprint#apply">Apply to Yalla Sprint <ArrowUpRight aria-hidden="true" /></a>
          <a className="button button-outline" href="/book">Book a call</a>
        </div>
      </div>
      <div className="shell footer-inner">
        <a className="brand footer-brand" href="/">
          <span className="brand-arabic">يلا</span>
          <span className="brand-name">YALLA Startup</span>
        </a>
        <div className="footer-contact">
          <p>Venture studio, founder programme and disciplined advisory for ambitious businesses.</p>
          <address>
            <span><MapPin aria-hidden="true" /> {contactDetails.address}</span>
            {contactDetails.phones.map((phone) => (
              <a href={phone.href} key={phone.href}><Phone aria-hidden="true" /> {phone.label}</a>
            ))}
          </address>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          {linkColumns.map((column, columnIndex) => (
            <div className="footer-link-column" key={columnIndex}>
              {column.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
            </div>
          ))}
        </nav>
        <p className="copyright">© {new Date().getFullYear()} Yalla Startup<br />United Arab Emirates · Saudi Arabia</p>
      </div>
    </footer>
  );
}
