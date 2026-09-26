import type { ComponentType } from 'react';
import { landing, sections, site, type Section } from '@/content';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/site/Header';
import { Hero } from '@/components/site/Hero';
import { Flavours } from '@/components/site/Flavours';
import { Boxes } from '@/components/site/Boxes';
import { Craft } from '@/components/site/Craft';
import { Cook } from '@/components/site/Cook';
import { Faq } from '@/components/site/Faq';
import { Order } from '@/components/site/Order';
import { Details } from '@/components/site/Details';
import { Closing, Footer } from '@/components/site/Chrome';

/* Section `type` names the layout, as in the repo's content model; the
   order of landing.json's sections[] is the order of the page. */
const RENDERERS: Record<string, ComponentType<{ s: Section }>> = {
  cards: Flavours,
  packages: Boxes,
  reassurance: Craft,
  people: Cook,
  faq: Faq,
  enquiry: Order,
  visit: Details,
};

export function App() {
  return (
    <TooltipProvider delayDuration={150}>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        {sections.map((s) => {
          const R = RENDERERS[s.type];
          return R ? <R key={s.id} s={s} /> : null;
        })}
        <Closing />
      </main>
      <Footer />
    </TooltipProvider>
  );
}

export function NotFound() {
  const n = site.notFound;
  const img = sections.find((s) => s.type === 'visit')?.image;
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header base="/" />
      <main id="main" tabIndex={-1} className="outline-none">
        <section className="mx-auto grid max-w-[1320px] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-6">
            <p lang="bn" className="bn text-3xl text-leaf">
              {landing.hero.thesis.bn}
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[1.02] text-leaf-ink sm:text-6xl">
              {n.h1}
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-charcoal">{n.lede}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="h-12 rounded-full px-7 text-base">
                <a href="/">{n.homeLabel}</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-full border-leaf bg-transparent px-7 text-base text-leaf-ink hover:bg-apricot-wash"
              >
                <a href={`/${site.cta.primary.href}`}>{site.cta.primary.label}</a>
              </Button>
            </div>
          </div>
          {img && (
            <img
              src={img.src}
              alt={img.alt}
              width={1600}
              height={679}
              className="aspect-[4/3] w-full rounded-xl object-cover lg:col-span-6"
            />
          )}
        </section>
      </main>
      <Footer base="/" />
    </>
  );
}
