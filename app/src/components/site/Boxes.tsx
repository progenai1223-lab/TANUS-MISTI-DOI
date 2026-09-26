import { CheckIcon } from 'lucide-react';
import type { Img, Link, Section } from '@/content';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SectionHead } from './SectionHead';

type Box = {
  name: string;
  meta: string;
  image: Img;
  body: string;
  rates: { label: string; value: string }[];
  includes: string[];
  link: Link;
};

export function Boxes({ s }: { s: Section }) {
  const items = s.items as Box[];
  return (
    <section id={s.id} aria-labelledby={`${s.id}-title`} className="py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <SectionHead id={s.id} eyebrow={s.eyebrow} heading={s.heading} lede={s.lede} />

        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-10">
          {items.map((b, i) => (
            <Card
              key={b.name}
              data-reveal
              className="gap-0 overflow-hidden rounded-xl border-line bg-white py-0 shadow-none"
            >
              <img
                src={b.image.src}
                alt={b.image.alt}
                width={1200}
                height={896}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
              <CardHeader className="gap-2 px-6 pt-8 sm:px-9">
                <CardTitle className="font-display text-[2rem] font-normal leading-tight text-leaf-ink">
                  <h3>{b.name}</h3>
                </CardTitle>
                <CardDescription className="text-[0.95rem] text-stone">{b.meta}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col px-6 pt-5 sm:px-9">
                <p className="leading-relaxed text-charcoal">{b.body}</p>

                {/* A price list set like a deli board: label, leader, price. */}
                <dl className="mt-7 border-t border-line">
                  {b.rates.map((r) => (
                    <div
                      key={r.label}
                      className="flex items-baseline gap-3 border-b border-line py-3.5"
                    >
                      <dt className="text-charcoal">{r.label}</dt>
                      <span
                        aria-hidden="true"
                        className="flex-1 translate-y-[-0.25em] border-b border-dotted border-line-strong"
                      />
                      <dd className={i === 0 ? 'font-display text-2xl text-leaf-ink' : 'font-display text-xl text-leaf-ink'}>
                        {r.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <ul className="mt-7 space-y-2.5">
                  {b.includes.map((inc) => (
                    <li key={inc} className="flex gap-3 text-[0.97rem] text-charcoal">
                      <CheckIcon aria-hidden="true" className="mt-1 size-4 shrink-0 text-leaf" />
                      {inc}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="px-6 pb-9 pt-8 sm:px-9">
                <Button
                  asChild
                  variant={i === 0 ? 'default' : 'outline'}
                  className={
                    i === 0
                      ? 'h-12 rounded-full px-7 text-base'
                      : 'h-12 rounded-full border-leaf bg-transparent px-7 text-base text-leaf-ink hover:bg-apricot-wash'
                  }
                >
                  <a href={b.link.href}>{b.link.label}</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {s.note && (
          <p className="mt-8 max-w-3xl text-[0.95rem] text-stone" data-reveal>
            {s.note}
          </p>
        )}
      </div>
    </section>
  );
}
