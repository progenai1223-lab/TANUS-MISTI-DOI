/* Restrained scroll reveal. Runs after hydration, only when motion is
   allowed, and only marks elements that are still below the fold — so
   nothing that has already been painted ever disappears. */
export function initReveal() {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  const fold = window.innerHeight;
  const pending = els.filter((el) => el.getBoundingClientRect().top > fold);
  pending.forEach((el) => el.classList.add('reveal-pending'));

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        el.classList.add('reveal-in');
        el.classList.remove('reveal-pending');
        io.unobserve(el);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  pending.forEach((el) => io.observe(el));
}
