import { site, type Section } from '@/content';
import { Separator } from '@/components/ui/separator';
import { SectionHead } from './SectionHead';

type Transport = { name: string; line: string; walk: string };
type Hours = { days: string; label: string };
type Point = { label: string; value: string };

/* The reference block: logistics and labelling, set as three plain columns
   a reader can scan. Quiet on purpose — it's the small print done well. */
export function Details({ s }: { s: Section }) {
  const c = site.contact;
  const h = s.headings;
  return (
    <section id={s.id} aria-labelledby={`${s.id}-title`} className="border-t border-line py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <SectionHead id={s.id} eyebrow={s.eyebrow} heading={s.heading} lede={site.access.intro} />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4" data-reveal>
            <h3 className="font-display text-2xl text-leaf-ink">{h.transport}</h3>
            <dl className="mt-5">
              {(c.transport as Transport[]).map((t) => (
                <div key={t.name} className="border-t border-line py-4">
                  <dt className="flex items-baseline justify-between gap-4">
                    <span className="font-semibold text-leaf-ink">{t.name}</span>
                    <span className="text-right text-sm text-gur">{t.walk}</span>
                  </dt>
                  <dd className="mt-1 text-[0.97rem] leading-relaxed text-charcoal">{t.line}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-2 border-t border-line pt-4 text-[0.95rem] leading-relaxed text-stone">
              {c.parking}
            </p>

            <h3 className="mt-12 font-display text-2xl text-leaf-ink">{h.hours}</h3>
            <dl className="mt-5">
              {(c.hours as Hours[]).map((o) => (
                <div key={o.days} className="flex justify-between gap-4 border-t border-line py-3">
                  <dt className="text-charcoal">{o.days}</dt>
                  <dd className="text-right font-medium text-leaf-ink">{o.label}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-2 border-t border-line pt-4 text-[0.95rem] leading-relaxed text-stone">
              {c.hoursNote}
            </p>
          </div>

          <Separator orientation="vertical" className="hidden bg-line lg:col-span-1 lg:mx-auto lg:block" />

          <div className="lg:col-span-7" data-reveal>
            <h3 className="font-display text-2xl text-leaf-ink">{h.access}</h3>
            <dl className="mt-5 grid gap-x-10 sm:grid-cols-2">
              {(site.access.points as Point[]).map((p) => (
                <div key={p.label} className="border-t border-line py-5">
                  <dt className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-gur">
                    {p.label}
                  </dt>
                  <dd className="mt-2 text-[0.97rem] leading-relaxed text-charcoal">{p.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
