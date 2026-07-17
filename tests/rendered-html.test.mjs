import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const fetchSite = typeof worker === "function" ? worker : worker.fetch.bind(worker);

  return fetchSite(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the complete Yalla Startup site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Yalla Startup \| Strategy, Finance &amp; Fundraising for Startups<\/title>/i);
  assert.match(html, /From big idea/);
  assert.match(html, /Go-to-market strategy &amp; revamp/);
  assert.match(html, /Business valuation/);
  assert.match(html, /Pitch deck &amp; narrative/);
  assert.match(html, /Virtual CFO/);
  assert.match(html, /Nabeil Schaik/);
  assert.match(html, /Moosa Raza/);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview|react-loading-skeleton/i);
});
