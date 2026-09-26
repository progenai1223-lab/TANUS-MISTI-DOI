import { site, type Section } from '@/content';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SectionHead } from './SectionHead';

export function Faq({ s }: { s: Section }) {
  const faqs = s.faqs as { q: string; a: string }[];
  return (
    <section id={s.id} aria-labelledby={`${s.id}-title`} className="border-t border-line py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHead id={s.id} eyebrow={s.eyebrow} heading={s.heading} lede={s.lede} />
            <a
              href={site.contact.phoneHref}
              className="mt-6 inline-block font-display text-2xl text-leaf underline decoration-apricot decoration-2 underline-offset-[6px] hover:decoration-leaf"
            >
              {site.contact.phone}
            </a>
          </div>
        </div>

        <Accordion type="single" collapsible className="lg:col-span-7 lg:col-start-6" data-reveal>
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`q${i}`} className="border-line">
              <AccordionTrigger className="py-6 font-display text-[1.35rem] font-normal leading-snug text-leaf-ink hover:no-underline sm:text-[1.55rem] [&>svg]:size-5 [&>svg]:text-leaf">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="max-w-[62ch] pb-7 text-[1.05rem] leading-relaxed text-charcoal">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
