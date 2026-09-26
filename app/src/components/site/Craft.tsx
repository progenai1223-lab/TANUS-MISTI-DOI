import type { Section } from '@/content';
import { SectionLabel } from './SectionHead';

/* The argument for the product: why baked is different from set. Set as a
   magazine spread — photograph across the measure, heading and standfirst
   on the left, the text in a single readable column on the right. */
export function Craft({ s }: { s: Section }) {
  return (
    <section id={s.id} aria-labelledby={`${s.id}-title`} className="bg-apricot-wash/60 py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <figure data-reveal>
          <img
            src={s.image.src}
            alt={s.image.alt}
            width={1600}
            height={679}
            loading="lazy"
            className="aspect-[16/9] w-full rounded-xl object-cover sm:aspect-[21/9]"
          />
        </figure>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <header className="lg:col-span-5" data-reveal>
            <SectionLabel eyebrow={s.eyebrow} className="max-w-[16rem]" />
            <h2
              id={`${s.id}-title`}
              className="mt-6 font-display text-[2.6rem] leading-[1.02] text-leaf-ink sm:text-6xl lg:text-[4.5rem]"
            >
              {s.heading}
            </h2>
            <p className="mt-6 max-w-md font-serif text-xl italic leading-relaxed text-stone">
              {s.lede}
            </p>
            <aside
              aria-labelledby={`${s.id}-callout`}
              className="mt-10 max-w-md rounded-lg border border-apricot bg-white p-6 sm:p-7"
            >
              <h3 id={`${s.id}-callout`} className="font-display text-2xl text-leaf-ink">
                {s.callout.title}
              </h3>
              <p className="mt-2 leading-relaxed text-charcoal">{s.callout.body}</p>
            </aside>
          </header>

          <div className="lg:col-span-6 lg:col-start-7" data-reveal>
            <div className="space-y-5 text-[1.075rem] leading-[1.75] text-charcoal">
              {(s.body as string[]).map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? 'first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[4.2rem] first-letter:leading-[0.8] first-letter:text-gur'
                      : undefined
                  }
                >
                  {p}
                </p>
              ))}
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}
