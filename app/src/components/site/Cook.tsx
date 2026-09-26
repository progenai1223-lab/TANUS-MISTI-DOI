import { site, type Section } from '@/content';
import { Badge } from '@/components/ui/badge';
import { SectionHead } from './SectionHead';

type Person = {
  name: string;
  role: string;
  initials: string;
  meta: string;
  bio: string;
  focus: string[];
  portraitAlt: string;
};

/* No photograph of Tanu exists for the site, and a generated face attached
   to a real name would be a lie. Her name, in her script, stands in. */
export function Cook({ s }: { s: Section }) {
  const p = (site.team as Person[])[0];
  return (
    <section id={s.id} aria-labelledby={`${s.id}-title`} className="py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <SectionHead id={s.id} eyebrow={s.eyebrow} heading={s.heading} lede={s.lede} />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <figure className="lg:col-span-5" data-reveal>
            <div
              role="img"
              aria-label={p.portraitAlt}
              className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-t-[999px] rounded-b-md bg-apricot"
            >
              <span
                aria-hidden="true"
                lang="bn"
                className="bn translate-y-[0.06em] text-[clamp(7rem,17vw,13rem)] leading-none text-leaf"
              >
                {p.initials}
              </span>
            </div>
            <figcaption className="mt-4 font-serif text-[0.95rem] italic text-stone">
              <span lang="bn" className="bn not-italic">
                {s.portraitCaption.split(' · ')[0]}
              </span>
              {' · '}
              {s.portraitCaption.split(' · ')[1]}
            </figcaption>
          </figure>

          <div className="lg:col-span-7" data-reveal>
            <figure>
              <blockquote className="font-serif text-2xl leading-[1.55] text-leaf-ink sm:text-[1.9rem]">
                <p>{p.bio}</p>
              </blockquote>
              <figcaption className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-display text-3xl text-leaf-ink">{p.name}</span>
                <span className="text-stone">{p.role}</span>
              </figcaption>
            </figure>
            <p className="mt-3 text-[0.95rem] text-stone">{p.meta}</p>
            <ul className="mt-7 flex flex-wrap gap-2" aria-label="About the kitchen">
              {p.focus.map((f) => (
                <li key={f}>
                  <Badge
                    variant="secondary"
                    className="h-8 rounded-full border border-apricot bg-apricot-wash px-3.5 text-sm font-medium text-leaf-ink"
                  >
                    {f}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
