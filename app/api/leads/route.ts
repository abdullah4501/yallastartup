import { sendLeadNotification } from "./email";

const allowedKinds = new Set(["sprint_application", "resource_download", "booking_request"]);

type D1Statement = {
  bind: (...values: unknown[]) => D1Statement;
  run: () => Promise<unknown>;
};

type D1DatabaseLike = {
  prepare: (query: string) => D1Statement;
  batch: (statements: D1Statement[]) => Promise<unknown>;
};

type LeadRecord = {
  id: string;
  kind: string;
  name: string;
  email: string;
  company: string | null;
  country: string | null;
  payload: Record<string, string>;
  createdAt: string;
};

function getD1Database(): D1DatabaseLike | null {
  return (globalThis as typeof globalThis & { __YALLA_DB?: D1DatabaseLike }).__YALLA_DB ?? null;
}

async function ensureLeadStorage(d1: D1DatabaseLike) {
  await d1.batch([
    d1.prepare(`CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      kind TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      country TEXT,
      payload TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    d1.prepare("CREATE INDEX IF NOT EXISTS leads_kind_created_idx ON leads (kind, created_at)"),
    d1.prepare("CREATE INDEX IF NOT EXISTS leads_email_idx ON leads (email)"),
  ]);
}

async function saveLeadLocally(lead: LeadRecord) {
  const moduleId = "node:fs/promises";
  const { appendFile, mkdir } = (await import(/* @vite-ignore */ moduleId)) as typeof import("node:fs/promises");
  await mkdir(".data", { recursive: true });
  await appendFile(".data/leads.ndjson", `${JSON.stringify(lead)}\n`, "utf8");
}

async function saveLead(lead: LeadRecord) {
  const d1 = getD1Database();

  if (!d1) {
    await saveLeadLocally(lead);
    return;
  }

  await ensureLeadStorage(d1);
  await d1.prepare(
    "INSERT INTO leads (id, kind, name, email, company, country, payload) VALUES (?, ?, ?, ?, ?, ?, ?)",
  ).bind(
    lead.id,
    lead.kind,
    lead.name,
    lead.email,
    lead.company,
    lead.country,
    JSON.stringify(lead.payload),
  ).run();
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const kind = String(payload.kind ?? "").trim();
    const name = String(payload.name ?? "").trim().slice(0, 160);
    const email = String(payload.email ?? "").trim().toLowerCase().slice(0, 254);
    const company = String(payload.company ?? "").trim().slice(0, 200);
    const country = String(payload.country ?? "").trim().slice(0, 100);
    const honeypot = String(payload.website ?? "").trim();
    const privacyAccepted = String(payload.privacyAccepted ?? "") === "yes";
    const termsAccepted = String(payload.termsAccepted ?? "") === "yes";

    if (honeypot) return Response.json({ ok: true }, { status: 202 });
    if (!allowedKinds.has(kind) || !name || !/^\S+@\S+\.\S+$/.test(email)) {
      return Response.json({ error: "Valid name, email and form type are required." }, { status: 400 });
    }
    if (!privacyAccepted || (kind === "sprint_application" && !termsAccepted)) {
      return Response.json({ error: "The required consent and programme terms must be accepted." }, { status: 400 });
    }

    const safePayload = Object.fromEntries(
      Object.entries(payload)
        .filter(([key]) => key !== "website")
        .map(([key, value]) => [key.slice(0, 80), String(value ?? "").slice(0, 4_000)]),
    );

    const lead: LeadRecord = {
      id: crypto.randomUUID(),
      kind,
      name,
      email,
      company: company || null,
      country: country || null,
      payload: safePayload,
      createdAt: new Date().toISOString(),
    };

    await saveLead(lead);
    let emailSent = false;
    try {
      emailSent = await sendLeadNotification(lead);
    } catch {
      // The saved lead remains the source of truth if email delivery is unavailable.
    }
    return Response.json({ ok: true, id: lead.id, emailSent }, { status: 201 });
  } catch {
    return Response.json({ error: "The submission could not be saved." }, { status: 500 });
  }
}
