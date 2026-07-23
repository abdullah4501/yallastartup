"use client";

import { useState } from "react";
import type { FormEvent, MouseEvent } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  BadgeDollarSign,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  FileCheck2,
  Gauge,
  Globe2,
  Link2,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Target,
  User,
} from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

async function submitLead(kind: string, form: HTMLFormElement) {
  const data = Object.fromEntries(new FormData(form).entries());
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ kind, ...data }),
  });
  if (!response.ok) throw new Error("Unable to submit");
}

function FormHeader({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) {
  return (
    <div className="form-intro">
      <span className="form-intro-icon"><Icon aria-hidden="true" /></span>
      <div><h3>{title}</h3><p>{description}</p></div>
    </div>
  );
}

function StatusMessage({ state, success }: { state: FormState; success: string }) {
  if (state === "success") return <p className="form-status success"><CheckCircle2 aria-hidden="true" /> {success}</p>;
  if (state === "error") return <p className="form-status error">Something went wrong. Please try again or use the Book a call path.</p>;
  return null;
}

export function SprintApplicationForm() {
  const [state, setState] = useState<FormState>("idle");
  const [step, setStep] = useState<1 | 2>(1);

  function handleNext(event: MouseEvent<HTMLButtonElement>) {
    const form = event.currentTarget.form;
    if (!form) return;

    const controls = form.querySelectorAll<HTMLInputElement | HTMLSelectElement>(
      '[data-sprint-step="1"] input, [data-sprint-step="1"] select',
    );
    for (const control of controls) {
      if (!control.checkValidity()) {
        control.reportValidity();
        return;
      }
    }

    setState("idle");
    setStep(2);
    window.requestAnimationFrame(() => form.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  function handleBack(event: MouseEvent<HTMLButtonElement>) {
    const form = event.currentTarget.form;
    setState("idle");
    setStep(1);
    window.requestAnimationFrame(() => form?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState("submitting");
    try {
      await submitLead("sprint_application", form);
      form.reset();
      setState("success");
    } catch {
      setState("error");
    }
  }

  return (
    <form className="conversion-form application-form" onSubmit={handleSubmit}>
      <FormHeader icon={ClipboardCheck} title="Apply to Yalla Sprint" description="Tell us where the business is today, what is blocking momentum and what must change." />
      <div className="application-progress" aria-label={`Application step ${step} of 2`}>
        <div className={step === 1 ? "is-current" : "is-complete"}><span>01</span><strong>Founder & company</strong></div>
        <i aria-hidden="true"><b className={step === 2 ? "is-complete" : ""} /></i>
        <div className={step === 2 ? "is-current" : ""}><span>02</span><strong>Goals & agreement</strong></div>
      </div>

      <div className="form-step" data-sprint-step="1" hidden={step !== 1}>
        <div className="form-grid">
          <label><span className="form-label">Founder name</span><span className="form-control"><User aria-hidden="true" /><input name="name" autoComplete="name" placeholder="Your full name" required /></span></label>
          <label><span className="form-label">Work email</span><span className="form-control"><Mail aria-hidden="true" /><input name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></span></label>
          <label><span className="form-label">Phone number</span><span className="form-control"><Phone aria-hidden="true" /><input name="phone" type="tel" autoComplete="tel" placeholder="+971" required /></span></label>
          <label><span className="form-label">Company name</span><span className="form-control"><Building2 aria-hidden="true" /><input name="company" autoComplete="organization" placeholder="Company or venture" required /></span></label>
          <label><span className="form-label">Website or product link</span><span className="form-control"><Link2 aria-hidden="true" /><input name="companyWebsite" type="url" placeholder="https://" /></span></label>
          <label><span className="form-label">Primary market</span><span className="form-control form-select"><MapPin aria-hidden="true" /><select name="country" required defaultValue=""><option value="" disabled>Select market</option><option>United Arab Emirates</option><option>Saudi Arabia</option><option>Other GCC</option><option>Global</option></select><ChevronDown className="select-chevron" aria-hidden="true" /></span></label>
          <label><span className="form-label">Business stage</span><span className="form-control form-select"><Gauge aria-hidden="true" /><select name="stage" required defaultValue=""><option value="" disabled>Select stage</option><option>Idea / pre-revenue</option><option>Early revenue</option><option>Seed</option><option>Series A readiness</option><option>Established growth business</option></select><ChevronDown className="select-chevron" aria-hidden="true" /></span></label>
          <label><span className="form-label">Current monthly revenue</span><span className="form-control"><BadgeDollarSign aria-hidden="true" /><input name="revenue" placeholder="Optional" /></span></label>
        </div>
        <button type="button" className="button button-primary form-submit form-next" onClick={handleNext}>Continue to step 2 <ArrowRight aria-hidden="true" /></button>
      </div>

      <div className="form-step" data-sprint-step="2" hidden={step !== 2}>
        <label><span className="form-label">What does the business do?</span><span className="form-control form-control-textarea"><Globe2 aria-hidden="true" /><textarea name="business" rows={4} placeholder="Describe the problem, customer and product clearly." required /></span></label>
        <label><span className="form-label">What must be different by the end of the Sprint?</span><span className="form-control form-control-textarea"><Target aria-hidden="true" /><textarea name="goal" rows={4} placeholder="The decision, milestone or outcome you need." required /></span></label>
        <label><span className="form-label">What is the biggest blocker right now?</span><span className="form-control form-control-textarea"><MessageSquareText aria-hidden="true" /><textarea name="blocker" rows={3} placeholder="Be direct—clarity helps us assess fit." required /></span></label>
        <label className="honeypot" aria-hidden="true">Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
        <div className="form-consents">
          <label className="checkbox-label"><input type="checkbox" name="termsAccepted" value="yes" required /> <span>I have read and accept the published programme fee, success-fee calculation, payment timing, exclusions and no-equity terms above.</span></label>
          <label className="checkbox-label"><input type="checkbox" name="privacyAccepted" value="yes" required /> <span>I consent to Yalla Startup reviewing this information under confidentiality and contacting me about the application.</span></label>
        </div>
        <div className="form-navigation">
          <button type="button" className="button form-back" onClick={handleBack}><ArrowLeft aria-hidden="true" /> Back</button>
          <button className="button button-primary form-submit" disabled={state === "submitting"}>{state === "submitting" ? "Submitting…" : "Submit application"}<ArrowRight aria-hidden="true" /></button>
        </div>
        <StatusMessage state={state} success="Application received. We will review it and contact shortlisted founders for a screening call." />
      </div>
    </form>
  );
}

export function ResourceGateForm() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    try {
      await submitLead("resource_download", event.currentTarget);
      setState("success");
    } catch {
      setState("error");
    }
  }

  return (
    <form className="conversion-form resource-form" onSubmit={handleSubmit}>
      <FormHeader icon={FileCheck2} title="Get the Founder Readiness Checklist" description="A practical guide to evaluate strategy, numbers, narrative and diligence readiness." />
      <label><span className="form-label">Name</span><span className="form-control"><User aria-hidden="true" /><input name="name" autoComplete="name" placeholder="Your full name" required /></span></label>
      <label><span className="form-label">Email</span><span className="form-control"><Mail aria-hidden="true" /><input name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></span></label>
      <label><span className="form-label">Market</span><span className="form-control form-select"><Building2 aria-hidden="true" /><select name="country" required defaultValue=""><option value="" disabled>Select market</option><option>United Arab Emirates</option><option>Saudi Arabia</option><option>Other GCC</option><option>Other</option></select><ChevronDown className="select-chevron" aria-hidden="true" /></span></label>
      <label className="honeypot" aria-hidden="true">Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <div className="form-consents"><label className="checkbox-label"><input type="checkbox" name="privacyAccepted" value="yes" required /> <span>I consent to Yalla Startup storing my details to provide this resource and relevant founder updates.</span></label></div>
      {state === "success" ? <a className="button button-primary form-submit" href="/founder-readiness-checklist.html" download>Download the checklist <ArrowDownToLine aria-hidden="true" /></a> : <button className="button button-primary form-submit" disabled={state === "submitting"}>{state === "submitting" ? "Unlocking…" : "Get the checklist"}<ArrowRight aria-hidden="true" /></button>}
      <StatusMessage state={state} success="Your checklist is ready to download." />
    </form>
  );
}

export function BookingRequestForm({ bookingUrl }: { bookingUrl?: string }) {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState("submitting");
    try {
      await submitLead("booking_request", form);
    } catch {
      setState("error");
      return;
    }

    form.reset();
    setState("success");
    if (bookingUrl) {
      window.location.assign(bookingUrl);
    }
  }

  return (
    <form className="conversion-form booking-request" onSubmit={handleSubmit}>
      <FormHeader icon={CalendarDays} title="Request a focused call" description="Share a preferred date and the decision or blocker you would like to discuss." />
      <div className="form-grid">
        <label><span className="form-label">Name</span><span className="form-control"><User aria-hidden="true" /><input name="name" autoComplete="name" placeholder="Your full name" required /></span></label>
        <label><span className="form-label">Email</span><span className="form-control"><Mail aria-hidden="true" /><input name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></span></label>
        <label><span className="form-label">Company</span><span className="form-control"><Building2 aria-hidden="true" /><input name="company" autoComplete="organization" placeholder="Company or venture" required /></span></label>
        <label><span className="form-label">Preferred date</span><span className="form-control"><CalendarDays aria-hidden="true" /><input name="preferredDate" type="date" required /></span></label>
      </div>
      <label><span className="form-label">What would you like to discuss?</span><span className="form-control form-control-textarea"><MessageSquareText aria-hidden="true" /><textarea name="goal" rows={4} placeholder="Give us enough context to make the call useful." required /></span></label>
      <label className="honeypot" aria-hidden="true">Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <div className="form-consents"><label className="checkbox-label"><input type="checkbox" name="privacyAccepted" value="yes" required /> <span>I consent to Yalla Startup storing these details and contacting me about this request.</span></label></div>
      <button className="button button-primary form-submit" disabled={state === "submitting"}>{state === "submitting" ? "Sending…" : "Request a call"}<ArrowRight aria-hidden="true" /></button>
      <StatusMessage state={state} success="Request received. We will confirm a suitable time by email." />
    </form>
  );
}
