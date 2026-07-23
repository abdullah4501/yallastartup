import type { Metadata } from "next";
import { MapPin, Phone } from "lucide-react";
import { BookingRequestForm } from "../components/lead-forms";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";
import ScrollAnimations from "../scroll-animations";
import { contactDetails } from "../site-config";

export const metadata: Metadata = {
  title: { absolute: "Book a Call | Yalla Startup Venture Studio" },
  description: "Book a focused call with Yalla Startup about the Sprint, strategy, finance, valuation, pitch narrative or virtual CFO support.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

  return (
    <main className="inner-page book-page">
      <ScrollAnimations />
      <SiteHeader />
      <section className="simple-hero shell">
        <p className="eyebrow"><span /> Book a call</p>
        <h1>Thirty useful minutes.<br /><em>No sales theatre.</em></h1>
        <p className="hero-intro">Tell us where the business is stuck. We will use the call to decide whether Yalla Sprint, an advisory engagement or neither is the right next move.</p>
      </section>
      <section className="booking-section shell content-section">
        <div className="booking-panel">
          <BookingRequestForm bookingUrl={bookingUrl} />
        </div>
        <aside className="booking-aside">
          <h3>What to bring</h3>
          <ul><li>Your current stage and traction</li><li>The decision or blocker</li><li>Any deadline driving urgency</li><li>The outcome you need</li></ul>
          <p>All conversations are treated as confidential.</p>
          <address className="booking-contact">
            <span><MapPin aria-hidden="true" /> {contactDetails.address}</span>
            {contactDetails.phones.map((phone) => <a href={phone.href} key={phone.href}><Phone aria-hidden="true" /> {phone.label}</a>)}
          </address>
        </aside>
      </section>
      <SiteFooter />
    </main>
  );
}
