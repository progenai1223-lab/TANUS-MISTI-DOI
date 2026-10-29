/* The page's only source of copy and facts: pras-consulting/content/*.json.
   Components read from here; nothing business-specific is typed into JSX. */
import siteJson from '@content/site.json';
import landingJson from '@content/landing.json';
import brandJson from '@content/brand.json';

export type Link = { label: string; href: string };

export const site = siteJson as any;
export const landing = landingJson as any;
export const brand = brandJson as any;

/* `base` is '' on the landing page and '/' on the 404, so the same anchors
   resolve from both. */
export const withBase = (base: string) => (h: string) => (h.startsWith('#') ? `${base}${h}` : h);
