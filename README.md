# Yalla Startup

A premium UAE-focused advisory website built with React, Next.js-compatible routing, Vinext and Vite.

## Included

- Go-to-market strategy and revamp
- Business plan
- Business valuation
- Pitch deck and narrative
- Fundraising support
- Virtual CFO services
- Founder profiles for Nabeil Schaik and Moosa Raza
- Responsive desktop, tablet and mobile layouts
- Custom social sharing artwork and metadata

## Run locally on Windows

Prerequisite: Node.js 22.13 or newer (Node.js 24 is recommended).

Open PowerShell in this folder and run:

```powershell
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

To stop the local server, press `Ctrl+C` in PowerShell.

## Validation

```powershell
npm run build
npm test
```

## Static Hostinger deployment

Create a static build for Hostinger's `public_html` file hosting:

```powershell
npm run build:hostinger
```

Upload the contents of `hostinger-dist` directly into `public_html`. This is a
separate build path; the existing Vinext development and production commands
remain unchanged.

The main site files are:

- `app/page.tsx` — page content and structure
- `app/globals.css` — visual design and responsive behavior
- `app/layout.tsx` — page title, description and social sharing metadata
"# yallastartup" 
