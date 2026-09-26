import * as React from 'react';
import { InfoIcon } from 'lucide-react';
import { hueVar, type Flavour, type Section } from '@/content';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { SectionHead } from './SectionHead';
import { GiftTag } from './GiftTag';

/* The four flavours as one stage: pick a pot and the whole band takes on
   its colour. Every panel is in the prerendered HTML (forceMount), so the
   descriptions are readable by search engines and without JavaScript's help
   beyond the switch itself. */
export function Flavours({ s }: { s: Section }) {
  const items = s.items as Flavour[];
  const [active, setActive] = React.useState(items[0].slug);
  const current = items.find((i) => i.slug === active) ?? items[0];

  return (
    <section
      id={s.id}
      aria-labelledby={`${s.id}-title`}
      className="flavour-stage border-y border-line/70 py-20 lg:py-28"
      style={{ ['--hue' as string]: hueVar(current.hue) }}
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <SectionHead id={s.id} eyebrow={s.eyebrow} heading={s.heading} lede={s.lede} />

        <Tabs value={active} onValueChange={setActive} className="mt-12 gap-0">
          <TabsList
            aria-label="Choose a flavour"
            className="grid h-auto w-full grid-cols-2 gap-2 rounded-none bg-transparent p-0 group-data-[orientation=horizontal]/tabs:h-auto sm:gap-3 md:grid-cols-4 md:gap-4"
          >
            {items.map((f) => (
              <TabsTrigger
                key={f.slug}
                value={f.slug}
                style={{ ['--hue' as string]: hueVar(f.hue) }}
                className="group/f h-auto justify-start gap-2.5 rounded-full border border-line bg-white/70 p-1.5 pr-4 text-left text-charcoal shadow-none hover:border-[var(--hue)] data-[state=active]:border-[var(--hue)] data-[state=active]:bg-white data-[state=active]:shadow-[0_0_0_1px_var(--hue)]"
              >
                <img
                  src={f.image.src}
                  alt=""
                  width={48}
                  height={48}
                  className="size-10 shrink-0 rounded-full object-cover sm:size-12"
                />
                <span className="flex min-w-0 flex-col whitespace-normal">
                  <span className="font-display text-[1rem] leading-tight text-leaf-ink sm:text-lg">
                    {f.name}
                  </span>
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[var(--hue)] sm:text-[0.78rem] sm:tracking-[0.12em]">
                    {f.kind}
                  </span>
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {items.map((f) => (
            <TabsContent
              key={f.slug}
              value={f.slug}
              forceMount
              style={{ ['--hue' as string]: hueVar(f.hue) }}
              className="mt-10 data-[state=inactive]:hidden data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:duration-500"
            >
              <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                <div className="relative lg:col-span-6">
                  <img
                    src={f.image.src}
                    alt={f.image.alt}
                    width={800}
                    height={800}
                    loading="lazy"
                    className="aspect-square w-full rounded-full object-cover shadow-[0_30px_60px_-30px_rgba(42,40,35,0.45)]"
                  />
                  <GiftTag
                    value={f.price}
                    label={s.priceLabel}
                    tone="white"
                    className="absolute bottom-[8%] right-[2%] rotate-[5deg]"
                  />
                </div>

                <div className="lg:col-span-6">
                  <p className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-[var(--hue)]">
                    {f.kind}
                  </p>
                  <h3 className="mt-3 font-display text-5xl leading-[1] text-[var(--hue)] sm:text-6xl lg:text-7xl">
                    {f.name}
                  </h3>

                  <figure className="mt-8 border-l-2 border-[var(--hue)] pl-6">
                    <blockquote className="font-serif text-xl leading-relaxed text-charcoal sm:text-[1.4rem]">
                      {f.body}
                    </blockquote>
                    <figcaption className="mt-3 text-sm text-stone">{s.wordsLabel}</figcaption>
                  </figure>

                  <dl className="mt-8 grid gap-5 border-t border-line pt-6 sm:grid-cols-2">
                    <div>
                      <dt className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-stone">
                        {s.fitLabels.yes}
                      </dt>
                      <dd className="mt-1.5 text-charcoal">{f.good}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-stone">
                        {s.fitLabels.no}
                      </dt>
                      <dd className="mt-1.5 text-charcoal">{f.notFor}</dd>
                    </div>
                  </dl>

                  {f.allergen && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge
                          asChild
                          variant="outline"
                          className="mt-6 h-8 gap-1.5 rounded-full border-[var(--hue)] bg-white px-3 text-sm text-[var(--hue)]"
                        >
                          <button type="button" aria-describedby={`${f.slug}-allergen`}>
                            <InfoIcon aria-hidden="true" />
                            {f.allergen.label}
                          </button>
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs bg-leaf-ink text-sm text-white">
                        {f.allergen.detail}
                      </TooltipContent>
                    </Tooltip>
                  )}
                  {f.allergen && (
                    <p id={`${f.slug}-allergen`} className="sr-only">
                      {f.allergen.detail}
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
