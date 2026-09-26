/* The page's only source of copy and facts: sites/tanus/content/*.json.
   Components read from here; nothing business-specific is typed into JSX. */
import siteJson from '@content/site.json';
import landingJson from '@content/landing.json';
import brandJson from '@content/brand.json';

export type Link = { label: string; href: string };
export type Img = { src: string; alt: string; width?: number; height?: number };
export type Eyebrow = { bn: string; en: string };

export type Flavour = {
  slug: string;
  name: string;
  kind: string;
  price: string;
  hue: string;
  allergen?: { label: string; detail: string };
  image: Img;
  body: string;
  good: string;
  notFor: string;
};

export type Section = { type: string; id: string; eyebrow: Eyebrow; heading: string; lede?: string } & Record<
  string,
  any
>;

export const site = siteJson as any;
export const landing = landingJson as any;
export const brand = brandJson as any;
export const sections = landing.sections as Section[];

export const section = <T extends Section = Section>(type: string) =>
  sections.find((s) => s.type === type) as T;

/* Bengali digits, for the one real sequence on the page. */
const BN = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
export const bnNumeral = (n: number) =>
  String(n)
    .split('')
    .map((d) => BN[Number(d)])
    .join('');

export const hueVar = (hue: string) => `var(--${hue})`;
