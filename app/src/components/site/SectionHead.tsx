import type { Eyebrow } from '@/content';
import { cn } from '@/lib/utils';

/* Every section label hangs from a rule, the way Bengali letters hang from
   their headstroke (matra): the Bengali word first, its English name after. */
export function SectionLabel({ eyebrow, className }: { eyebrow: Eyebrow; className?: string }) {
  return (
    <p className={cn('matra text-leaf', className)}>
      <span lang="bn" className="bn text-[1.35rem] leading-none">
        {eyebrow.bn}
      </span>
      <span className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-leaf-ink">
        {eyebrow.en}
      </span>
    </p>
  );
}

export function SectionHead({
  eyebrow,
  heading,
  lede,
  id,
  className,
}: {
  eyebrow: Eyebrow;
  heading: string;
  lede?: string;
  id: string;
  className?: string;
}) {
  return (
    <header className={cn('max-w-2xl', className)} data-reveal>
      <SectionLabel eyebrow={eyebrow} className="max-w-[16rem]" />
      <h2
        id={`${id}-title`}
        className="mt-6 font-display text-[2.35rem] leading-[1.05] text-leaf-ink sm:text-5xl lg:text-[3.5rem]"
      >
        {heading}
      </h2>
      {lede && <p className="mt-5 max-w-xl text-lg leading-relaxed text-stone">{lede}</p>}
    </header>
  );
}
