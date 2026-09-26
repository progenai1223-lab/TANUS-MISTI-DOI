# Tanu's — baked misti doi

Landing page for **Tanu's**, baked Bengali misti doi made by hand in London. *বাংলা মানেই মিষ্টি* — "Bengal means sweetness."

Built with Vite, React, TypeScript, Tailwind CSS v4 and [shadcn/ui](https://ui.shadcn.com), and prerendered to plain static HTML, so the page works without JavaScript and can be hosted anywhere.

## Layout

```
content/   site.json, landing.json, brand.json — every fact and every line of copy
assets/    images (with images.json recording where each came from) and the favicon
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

Some facts on the page are **placeholders** — prices, pot size, delivery area and fees, hours, ingredients and allergens, registration details and the email address. Every one is listed in `_placeholders` in `content/site.json` and must be confirmed by Tanu before the site goes live. The order form is not connected to anything yet; on submit it says so and gives the phone number.

Generated images (`box-*`, `band-*`) are still lifes of empty or sealed clay pots, not photographs of the product; the flavour and hero photographs are Tanu's own.
