import { site, withBase, type Link } from '@/content';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

/* Two bars, as in the design: a thin global bar with the PRAS mark and the
   site's sections, then a sticky local bar for this page with the call to
   action. Below lg they fold into one bar and a sheet. */
export function Header({ base = '' }: { base?: string }) {
  const nav = site.nav as Link[];
  const local = site.localNav as Link[];
  const href = withBase(base);

  return (
    <>
      <nav
        aria-label="Global"
        className="relative z-40 hidden h-11 items-center justify-center gap-9 bg-[rgb(22_22_23/0.8)] backdrop-blur-xl backdrop-saturate-[1.8] lg:flex"
      >
        <a
          href={base || '#top'}
          className="font-display text-[15px] font-bold tracking-[-0.02em] text-ink"
          aria-label={`${site.meta.name}, back to the top`}
        >
          {site.meta.short}
        </a>
        {nav.map((item) => (
          <a
            key={item.label}
            href={href(item.href)}
            className="text-xs leading-4 text-subtle hover:text-ink hover:underline"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <header className="sticky top-0 z-40 border-b border-line bg-[rgb(0_0_0/0.72)] backdrop-blur-xl backdrop-saturate-[1.8]">
        {/* Desktop: the local bar. */}
        <div className="mx-auto hidden h-[52px] max-w-[1440px] items-center justify-between px-[120px] lg:flex">
          <a href={base || '#top'} className="text-[21px] font-semibold leading-[25px] tracking-[-0.01em] text-ink">
            {site.meta.name}
          </a>
          <nav aria-label="On this page" className="flex items-center gap-7">
            {local.map((item) => (
              <a
                key={item.label}
                href={href(item.href)}
                className="text-xs text-muted-ink hover:text-ink hover:underline"
              >
                {item.label}
              </a>
            ))}
            <Button asChild size="xs" className="h-[26px] rounded-full px-3.5 text-xs">
              <a href={href(site.cta.primary.href)}>{site.cta.primary.label}</a>
            </Button>
          </nav>
        </div>

        {/* Phone and tablet: one bar, the menu in a sheet. */}
        <div className="flex h-12 items-center justify-between pl-5 pr-4 lg:hidden">
          <a
            href={base || '#top'}
            className="font-display text-[17px] font-bold tracking-[-0.02em] text-ink"
            aria-label={`${site.meta.name}, back to the top`}
          >
            {site.meta.short}
          </a>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-11 rounded-full text-ink hover:bg-surface-2"
                aria-label="Open menu"
              >
                <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true">
                  <path
                    d="M1 2h16M1 10h16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm border-line bg-surface p-0">
              <SheetHeader className="border-b border-line px-6 py-5 text-left">
                <SheetTitle className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink">
                  {site.meta.name}
                </SheetTitle>
                <SheetDescription className="copper-text text-[15px] font-semibold">
                  {site.footerNote}
                </SheetDescription>
              </SheetHeader>
              <nav aria-label="Global" className="flex flex-col px-3 py-4">
                {[...local.filter((l) => l.href !== '#top'), ...nav.filter((n) => !n.href.startsWith('#'))].map(
                  (item) => (
                    <SheetClose asChild key={item.label}>
                      <a
                        href={href(item.href)}
                        className="rounded-md px-3 py-3 font-display text-2xl font-semibold leading-tight tracking-[-0.02em] text-ink hover:bg-surface-2"
                      >
                        {item.label}
                      </a>
                    </SheetClose>
                  ),
                )}
              </nav>
              <Separator className="bg-line" />
              <div className="px-6 py-6">
                <SheetClose asChild>
                  <Button asChild className="h-11 w-full rounded-full text-[15px]">
                    <a href={href(site.cta.primary.href)}>{site.cta.primary.label}</a>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
