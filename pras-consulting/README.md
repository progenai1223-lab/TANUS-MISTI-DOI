# PRAS Consulting — landing page

Landing page for **PRAS Consulting Limited**: SAP Production Planning × AI. More than two decades inside SAP Production Planning, with cross-sector experience across varied geographies, paired with an AI product studio.

The hero is the **D · Silicon (dark)** direction from the *PRAS Landing Hero — Image Directions* design canvas: a black ground, the copper-gradient headline "Intelligence, engineered in." and the PRAS chip rising out of a copper glow. Below it, an Experience section sets out the two-decade claim, and a Contact section answers "Book a call".

This site is self-contained and separate from the other site in this repository. It uses the same stack and layout: Vite, React, TypeScript, Tailwind CSS v4 and [shadcn/ui](https://ui.shadcn.com), prerendered to plain static HTML so the page works without JavaScript.

## Layout

```
content/   site.json, landing.json, brand.json — every fact and every line of copy
assets/    the favicon
app/       the React app that renders content/ into the page
dist/      the built site — upload this folder to any static host
```

The copy lives in `content/`, not in the components. Edit the JSON and rebuild.

## Build

```bash
npm --prefix app install     # once
npm --prefix app run build   # type-check, build, prerender into dist/
npx serve dist               # preview
```

## Before launch

Some facts are **placeholders**: the domain, the contact email, and the pages the global nav points at (SAP Services, AI Studio, Mission 11+, Insights) which are not built yet. Each is listed in `_placeholders` in `content/site.json`.
