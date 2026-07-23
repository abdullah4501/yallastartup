"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { services } from "../site-config";

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    window.requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const drawer = drawerRef.current;
    const focusable = drawer?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    focusable?.[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
        return;
      }
      if (event.key !== "Tab" || !focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 980) setMobileMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileMenuOpen, closeMobileMenu]);

  return (
    <>
      <div className="topline">
        <span>Yalla Startup · Venture Studio</span>
        <span>United Arab Emirates · Saudi Arabia</span>
      </div>
      <header className="nav shell">
        <a className="brand" href="/" aria-label="Yalla Startup Venture Studio home">
          <span className="brand-arabic">يلا</span>
          <span className="brand-name">YALLA Startup</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="/sprint">Yalla Sprint</a>
          <details className="nav-services">
            <summary>Advisory <ChevronDown aria-hidden="true" /></summary>
            <div className="nav-services-menu">
              {services.map((service) => <a href={`/services/${service.slug}`} key={service.slug}><span>{service.number}</span>{service.title}</a>)}
            </div>
          </details>
          <a href="/#outcomes">Outcomes</a>
          <a href="/#founders">Founders</a>
        </nav>
        <div className="nav-actions">
          <a className="button button-primary button-compact" href="/sprint#apply">
            Apply to Yalla Sprint <ArrowUpRight aria-hidden="true" />
          </a>
          <a className="button button-outline button-compact" href="/book">
            Book a call
          </a>
        </div>
        <button
          ref={menuButtonRef}
          className="mobile-menu-toggle"
          type="button"
          aria-label="Open navigation menu"
          aria-controls="mobile-navigation"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu aria-hidden="true" />
        </button>
      </header>

      <div className={`mobile-menu-layer${mobileMenuOpen ? " is-open" : ""}`} aria-hidden={!mobileMenuOpen}>
        <button className="mobile-menu-backdrop" type="button" aria-label="Close navigation menu" onClick={closeMobileMenu} />
        <aside
          ref={drawerRef}
          className="mobile-menu-drawer"
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="mobile-menu-head">
            <a className="brand" href="/" onClick={closeMobileMenu} aria-label="Yalla Startup Venture Studio home">
              <span className="brand-arabic">يلا</span>
              <span className="brand-name">YALLA Startup</span>
            </a>
            <button className="mobile-menu-close" type="button" aria-label="Close navigation menu" onClick={closeMobileMenu}>
              <X aria-hidden="true" />
            </button>
          </div>

          <nav className="mobile-menu-nav" aria-label="Mobile navigation">
            <a href="/" onClick={closeMobileMenu}><span>01</span>Home</a>
            <a href="/sprint" onClick={closeMobileMenu}><span>02</span>Yalla Sprint</a>
            <a href="/#outcomes" onClick={closeMobileMenu}><span>03</span>Outcomes</a>
            <a href="/#founders" onClick={closeMobileMenu}><span>04</span>Founders</a>
            <a href="/book" onClick={closeMobileMenu}><span>05</span>Book a call</a>
          </nav>

          <div className="mobile-service-menu">
            <p>Advisory services</p>
            {services.map((service) => (
              <a href={`/services/${service.slug}`} key={service.slug} onClick={closeMobileMenu}>
                <span>{service.number}</span>
                <strong>{service.title}</strong>
                <ArrowUpRight aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="mobile-menu-actions">
            <a className="button button-primary" href="/sprint#apply" onClick={closeMobileMenu}>
              Apply to Yalla Sprint <ArrowUpRight aria-hidden="true" />
            </a>
            <a className="button button-outline" href="/book" onClick={closeMobileMenu}>Book a call</a>
          </div>
        </aside>
      </div>
    </>
  );
}
