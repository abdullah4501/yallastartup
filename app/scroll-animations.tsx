"use client";

import { useEffect } from "react";

const revealSelector = [
  "h1",
  "h2",
  ".eyebrow",
  ".hero-intro",
  ".hero-actions",
  ".hero-foot > *",
  ".section-heading > p",
  ".service-card",
  ".addon-card",
  ".step",
  ".founder-lead > p",
  ".founder-card",
  ".contact-content > p",
  ".contact-actions",
].join(",");

const staggerGroups = [
  ".service-card",
  ".addon-card",
  ".step",
  ".founder-card",
];

export default function ScrollAnimations() {
  useEffect(() => {
    const root = document.documentElement;
    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>(revealSelector),
    );
    const stage = document.querySelector<HTMLElement>(".hero-stage");
    const footer = document.querySelector<HTMLElement>(".footer");
    const stageCoreRotator = document.querySelector<HTMLElement>(".stage-core-rotator");
    const timers: number[] = [];
    let scrollFrame: number | null = null;

    const updateCoreRotation = () => {
      stageCoreRotator?.style.setProperty(
        "--stage-scroll-rotation",
        `${window.scrollY * 0.18}deg`,
      );
      scrollFrame = null;
    };

    const handleScroll = () => {
      if (scrollFrame !== null) return;
      scrollFrame = window.requestAnimationFrame(updateCoreRotation);
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (stageCoreRotator && !reducedMotion.matches) {
      updateCoreRotation();
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    const cleanupScrollRotation = () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollFrame !== null) window.cancelAnimationFrame(scrollFrame);
    };

    staggerGroups.forEach((selector) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((item, index) => {
        item.style.setProperty("--reveal-delay", `${(index % 4) * 90}ms`);
      });
    });

    revealItems.forEach((item) => item.classList.add("reveal-on-scroll"));
    stage?.classList.add("stage-reveal");
    footer?.classList.add("footer-reveal");
    root.classList.add("motion-ready");

    const reveal = (item: HTMLElement) => {
      item.classList.add("is-visible");
      const timer = window.setTimeout(() => {
        item.classList.remove("reveal-on-scroll", "is-visible");
        item.style.removeProperty("--reveal-delay");
      }, 1200);
      timers.push(timer);
    };

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach(reveal);
      stage?.classList.add("is-visible");
      footer?.classList.add("is-visible");
      return () => {
        cleanupScrollRotation();
        timers.forEach((timer) => window.clearTimeout(timer));
        root.classList.remove("motion-ready");
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const item = entry.target as HTMLElement;
          if (item === stage || item === footer) {
            item.classList.add("is-visible");
          } else {
            reveal(item);
          }
          observer.unobserve(item);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -7% 0px" },
    );

    revealItems.forEach((item) => observer.observe(item));
    if (stage) observer.observe(stage);
    if (footer) observer.observe(footer);

    return () => {
      observer.disconnect();
      cleanupScrollRotation();
      timers.forEach((timer) => window.clearTimeout(timer));
      root.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
