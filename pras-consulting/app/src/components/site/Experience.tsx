import { landing } from '@/content';

/* The claim the hero makes, set out: two decades, the sectors and
   geographies, both SAP generations, and the planning domains underneath. */
export function Experience() {
  const e = landing.experience;
  const stats = e.stats as { value: string; label: string }[];
  return (
    <section
      id={e.id}
      aria-labelledby={`${e.id}-title`}
      className="relative border-t border-line bg-surface px-6 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1200px]">
        <header className="max-w-3xl" data-reveal>
          <p className="text-xs font-medium uppercase leading-4 tracking-[0.12em] text-muted-ink">
            {e.eyebrow}
          </p>
          <h2
            id={`${e.id}-title`}
            className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[56px] lg:leading-[60px]"
          >
            {e.heading}
          </h2>
          <p className="mt-5 max-w-2xl text-[17px] leading-[26px] text-muted-ink lg:text-[21px] lg:leading-[30px]">
            {e.lede}
          </p>
        </header>

        <dl
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:mt-16 lg:grid-cols-4"
          data-reveal
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse gap-1 bg-surface-2 p-5 lg:p-6">
              <dt className="text-xs font-medium leading-4 tracking-[0.04em] text-muted-ink">{s.label}</dt>
              <dd className="font-display text-2xl font-semibold leading-8 tracking-[-0.02em] text-ink lg:text-[28px] lg:leading-9">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12" data-reveal>
          <div className="lg:col-span-4">
            <h3 className="text-xs font-medium uppercase leading-4 tracking-[0.12em] text-muted-ink">
              {e.craftHeading}
            </h3>
            <p className="copper-text mt-3 font-display text-[28px] font-semibold leading-9 tracking-[-0.02em]">
              {e.craft}
            </p>
          </div>
          <div className="lg:col-span-8">
            <h3 className="text-xs font-medium uppercase leading-4 tracking-[0.12em] text-muted-ink">
              {e.domainsHeading}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {(e.domains as string[]).map((d) => (
                <li
                  key={d}
                  className="rounded-full border border-line-strong/50 px-4 py-2 text-sm leading-5 text-ink"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
