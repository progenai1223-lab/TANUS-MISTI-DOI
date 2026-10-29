import { landing, withBase } from '@/content';
import { Button } from '@/components/ui/button';

/* The PRAS chip, drawn in CSS so it stays sharp at any size: a graphite
   package with copper pins on all four sides and a navy die at its centre. */
function Chip({ mark, label, alt }: { mark: string; label: string; alt: string }) {
  return (
    <div
      role="img"
      aria-label={alt}
      className="chip relative size-[280px] shrink-0 rounded-[34px] [--grid:12px] [--pin:5px] [--pitch:12px] lg:size-[400px] lg:rounded-[44px] lg:[--grid:16px] lg:[--pin:7px] lg:[--pitch:16px]"
    >
      <div className="chip-pins-x absolute inset-x-[46px] top-[15px] h-1.5 lg:inset-x-16 lg:top-[22px] lg:h-2" />
      <div className="chip-pins-x absolute inset-x-[46px] bottom-[15px] h-1.5 lg:inset-x-16 lg:bottom-[22px] lg:h-2" />
      <div className="chip-pins-y absolute inset-y-[46px] left-[15px] w-1.5 lg:inset-y-16 lg:left-[22px] lg:w-2" />
      <div className="chip-pins-y absolute inset-y-[46px] right-[15px] w-1.5 lg:inset-y-16 lg:right-[22px] lg:w-2" />
      <div className="chip-die absolute inset-10 flex flex-col items-center justify-center gap-2 rounded-[20px] lg:inset-14 lg:gap-2.5 lg:rounded-[26px]">
        <span
          aria-hidden="true"
          className="copper-text font-display text-[46px] font-bold leading-none tracking-[-0.04em] lg:text-[64px]"
        >
          {mark}
        </span>
        <span
          aria-hidden="true"
          className="text-[11px] font-semibold leading-[14px] tracking-[0.32em] text-steel lg:text-[13px] lg:leading-4"
        >
          {label}
        </span>
      </div>
    </div>
  );
}

export function Hero({ base = '' }: { base?: string }) {
  const h = landing.hero;
  const href = withBase(base);
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex flex-col items-center overflow-hidden px-6 pt-14 text-center lg:pt-[72px]"
    >
      <p className="copper-text text-[17px] font-semibold leading-[21px] tracking-[-0.01em] lg:text-[21px] lg:leading-[25px]">
        {h.kicker}
      </p>
      <h1
        id="hero-title"
        className="mt-2.5 font-display text-5xl font-semibold leading-[50px] tracking-[-0.03em] text-ink sm:text-7xl sm:leading-[76px] lg:mt-3 lg:text-8xl lg:leading-[98px] lg:tracking-[-0.035em]"
      >
        {h.h1[0]}
        <br />
        <span className="copper-text">{h.h1[1]}</span>
      </h1>
      <p className="mt-[18px] max-w-[640px] text-[17px] leading-[25px] tracking-[-0.01em] text-muted-ink lg:mt-7 lg:text-[21px] lg:leading-[30px] lg:tracking-[0.004em]">
        {h.intro}
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-5 lg:mt-9 lg:gap-7">
        <Button asChild className="h-11 rounded-full px-5 text-[15px] font-medium hover:bg-copper-hover lg:px-[22px] lg:text-[17px]">
          <a href={href(h.primary.href)}>{h.primary.label}</a>
        </Button>
        <a
          href={href(h.secondary.href)}
          className="text-[15px] leading-[21px] text-copper hover:text-copper-hover hover:underline lg:text-[17px] lg:leading-[25px]"
        >
          <span className="lg:hidden">{h.secondary.short}</span>
          <span className="hidden lg:inline">{h.secondary.label}</span> ›
        </a>
      </div>

      {/* The chip rises out of a copper glow; on wide screens the section
          cuts it off below, as in the design. */}
      <div className="relative mt-12 mb-9 flex justify-center lg:mt-10 lg:-mb-[92px]">
        <div
          aria-hidden="true"
          className="glow absolute left-1/2 top-8 h-[300px] w-[480px] -translate-x-1/2 rounded-full lg:-top-14 lg:h-[420px] lg:w-[900px]"
        />
        <Chip {...h.chip} />
      </div>
    </section>
  );
}
