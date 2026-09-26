import { landing, site } from '@/content';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Wordmark } from './Header';

/* The closing band returns to the thesis: the tagline, once more, on the
   apricot the brand has always used — light, not a dark slab. */
export function Closing({ base = '' }: { base?: string }) {
  const c = landing.closing;
  const href = (h: string) => (h.startsWith('#') ? `${base}${h}` : h);
  return (
    <section aria-labelledby="closing-title" className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-2xl bg-apricot px-6 py-20 text-center sm:px-10 lg:py-28">
        <img
          src={site.meta.logo.src}
          alt=""
          width={96}
          height={96}
          loading="lazy"
          className="mx-auto size-20 rounded-full sm:size-24"
        />
        <h2
          id="closing-title"
          lang="bn"
          className="bn mt-8 text-[clamp(3rem,9vw,7rem)] leading-[1.05] text-leaf"
        >
          {c.heading}
        </h2>
        <p className="mt-3 font-serif text-lg italic text-leaf-ink">{c.translit}</p>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-leaf-ink">{c.body}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button asChild className="h-12 rounded-full px-7 text-base">
            <a href={href(c.primary.href)}>{c.primary.label}</a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-12 rounded-full border-leaf-ink/40 bg-transparent px-7 text-base text-leaf-ink hover:bg-apricot-wash"
          >
            <a href={site.contact.phoneHref}>Call {site.contact.phone}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function Footer({ base = '' }: { base?: string }) {
  const href = (h: string) => (h.startsWith('#') ? `${base}${h}` : h);
  const cols = site.footerColumns as {
    heading: string;
    links: { label: string; href: string }[];
  }[];
  const year = 2026;
  return (
    <footer className="bg-milk">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Wordmark base={base} />
          <p className="mt-6 max-w-sm leading-relaxed text-stone">{site.meta.description}</p>
        </div>
        {cols.map((col) => (
          <nav key={col.heading} aria-label={col.heading} className="lg:col-span-2">
            <h2 className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-stone">
              {col.heading}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={href(l.href)}
                    className="text-charcoal underline-offset-4 hover:text-leaf hover:underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div className="lg:col-span-3">
          <h2 className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-stone">
            {site.footerContactHeading}
          </h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a
                href={site.contact.phoneHref}
                className="font-display text-2xl text-leaf-ink hover:text-leaf"
              >
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="text-charcoal underline-offset-4 hover:text-leaf hover:underline"
              >
                {site.contact.email}
              </a>
            </li>
            <li className="text-stone">{site.contact.locationLabel}</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <Separator className="bg-line" />
        <div className="flex flex-col gap-2 py-7 text-[0.88rem] text-stone sm:flex-row sm:justify-between">
          <p>
            © {year} {site.meta.legalName}. {site.footerNote}
          </p>
          <p lang="bn" className="bn text-base text-leaf">
            {landing.hero.thesis.bn}
          </p>
        </div>
      </div>
    </footer>
  );
}
