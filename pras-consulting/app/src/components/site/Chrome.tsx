import { landing, site, withBase, type Link } from '@/content';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

/* Contact: the page's one call to action, answered. */
export function Contact() {
  const c = landing.contact;
  return (
    <section
      id={c.id}
      aria-labelledby={`${c.id}-title`}
      className="relative overflow-hidden border-t border-line px-6 py-24 text-center lg:py-32"
    >
      <div
        aria-hidden="true"
        className="glow absolute left-1/2 top-full h-[320px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      />
      <div className="relative mx-auto max-w-3xl" data-reveal>
        <p className="copper-text text-[17px] font-semibold leading-[21px] lg:text-[21px] lg:leading-[25px]">
          {c.eyebrow}
        </p>
        <h2
          id={`${c.id}-title`}
          className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[56px] lg:leading-[60px]"
        >
          {c.heading}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[17px] leading-[26px] text-muted-ink lg:text-[21px] lg:leading-[30px]">
          {c.body}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-7">
          <Button asChild className="h-11 rounded-full px-[22px] text-[17px] font-medium hover:bg-copper-hover">
            <a href={`mailto:${site.contact.email}`}>{c.primary.label}</a>
          </Button>
          <a
            href={`mailto:${site.contact.email}`}
            className="text-[17px] text-copper hover:text-copper-hover hover:underline"
          >
            {site.contact.email}
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer({ base = '' }: { base?: string }) {
  const href = withBase(base);
  const nav = site.nav as Link[];
  const year = 2026;
  return (
    <footer className="bg-surface">
      <div className="mx-auto max-w-[1200px] px-6">
        <Separator className="bg-line" />
        <div className="flex flex-col gap-6 py-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="font-display text-[21px] font-semibold leading-[25px] tracking-[-0.01em] text-ink">
              {site.meta.name}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-5 text-muted-ink">{site.meta.description}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {nav.map((l) => (
                <li key={l.label}>
                  <a href={href(l.href)} className="text-xs text-muted-ink hover:text-ink hover:underline">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <Separator className="bg-line" />
        <div className="flex flex-col gap-2 py-6 text-xs leading-4 text-muted-ink sm:flex-row sm:justify-between">
          <p>
            © {year} {site.meta.legalName}. {site.contact.locationLabel}.
          </p>
          <p className="copper-text font-semibold">{site.footerNote}</p>
        </div>
      </div>
    </footer>
  );
}
