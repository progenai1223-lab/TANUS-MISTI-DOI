import { ArrowDownIcon } from 'lucide-react';
import { landing, site } from '@/content';
import { Button } from '@/components/ui/button';
import { GiftTag } from './GiftTag';

export function Hero() {
  const h = landing.hero;
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Apricot field behind the photograph: the tanus.uk ground, as a block. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 hidden w-[38%] bg-apricot-wash lg:block"
      />
      <div className="relative mx-auto grid max-w-[1320px] gap-12 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-14">
        <div className="lg:col-span-7 lg:pr-6">
          <p className="text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-stone">
            {h.kicker}
          </p>

          {/* The thesis. Set in Bengali, at the size of a shop sign. */}
          <p
            lang="bn"
            className="bn mt-8 text-[clamp(3.6rem,10.5vw,8.6rem)] leading-[1.02] tracking-[-0.01em] text-leaf"
          >
            {h.thesis.bn.split(' ').slice(0, 2).join(' ')}
            <br />
            <span className="text-gur">{h.thesis.bn.split(' ').slice(2).join(' ')}</span>
          </p>
          <p className="mt-4 flex flex-wrap items-baseline gap-x-3 font-serif text-lg text-stone">
            <span className="italic">{h.thesis.translit}</span>
            <span aria-hidden="true" className="h-px w-8 translate-y-[-0.3em] bg-kraft" />
            <span>{h.thesis.gloss}</span>
          </p>

          <h1
            id="hero-title"
            className="mt-10 max-w-[15ch] font-display text-[2.6rem] leading-[1.02] text-leaf-ink sm:text-6xl lg:text-[4.25rem]"
          >
            {h.h1}
          </h1>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-charcoal">{h.intro}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild className="h-12 rounded-full px-7 text-base">
              <a href={site.cta.primary.href}>{site.cta.primary.label}</a>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="h-12 rounded-full px-5 text-base text-leaf-ink hover:bg-apricot-wash"
            >
              <a href={h.secondary.href}>
                {h.secondary.label}
                <ArrowDownIcon aria-hidden="true" />
              </a>
            </Button>
          </div>

          <ul className="mt-12 grid max-w-2xl gap-x-8 gap-y-3 border-t border-line pt-6 text-[0.95rem] text-stone sm:grid-cols-3">
            {(h.notes as string[]).map((n) => (
              <li key={n} className="leading-snug">
                {n}
              </li>
            ))}
          </ul>
        </div>

        <figure className="relative lg:col-span-5 lg:pl-4">
          <div className="relative">
            <div className="overflow-hidden rounded-t-[999px] rounded-b-md bg-apricot">
              <img
                src={h.image.src}
                alt={h.image.alt}
                width={h.image.width}
                height={h.image.height}
                fetchPriority="high"
                className="aspect-[3/4] w-full object-cover object-[35%_80%]"
              />
            </div>
            <GiftTag
              value={h.tag.value}
              label={h.tag.label}
              className="absolute -left-2 bottom-10 rotate-[-5deg] sm:-left-10"
            />
          </div>
          <figcaption className="mt-4 font-serif text-[0.95rem] italic text-stone">
            {h.figureCaption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
