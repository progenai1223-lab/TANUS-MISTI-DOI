import { cn } from '@/lib/utils';

/* A price written on a small luggage tag, tied on with string — the way a
   gifted pot of doi actually arrives. Decorative string, real text. */
export function GiftTag({
  value,
  label,
  className,
  tone = 'apricot',
}: {
  value: string;
  label: string;
  className?: string;
  tone?: 'apricot' | 'white';
}) {
  return (
    <div className={cn('relative inline-flex items-center', className)}>
      <svg
        aria-hidden="true"
        viewBox="0 0 64 40"
        className="absolute -left-12 top-1/2 h-10 w-16 -translate-y-1/2 text-kraft"
        fill="none"
      >
        <path
          d="M2 6c14 2 20 22 34 22 10 0 16-6 26-8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <div
        className={cn(
          'gift-tag relative py-3 pl-9 pr-5 shadow-[0_1px_0_rgba(42,40,35,0.08)]',
          tone === 'apricot' ? 'bg-apricot' : 'bg-white',
        )}
      >
        <span
          aria-hidden="true"
          className="absolute left-[1.35rem] top-1/2 size-2.5 -translate-y-1/2 rounded-full border border-kraft bg-milk"
        />
        <span className="block font-display text-2xl leading-none text-leaf-ink">{value}</span>
        <span className="mt-1 block text-[0.8rem] leading-snug text-leaf-ink">{label}</span>
      </div>
    </div>
  );
}
