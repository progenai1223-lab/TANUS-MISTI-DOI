import { MenuIcon, PhoneIcon } from 'lucide-react';
import { landing, site } from '@/content';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
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

/* `base` is '' on the landing page and '/' on the 404, so the same anchors
   resolve from both. */
export function Wordmark({ base = '' }: { base?: string }) {
  return (
    <a
      href={base || '#top'}
      className="group flex items-center gap-3 rounded-sm"
      aria-label={`${site.meta.name}, back to the top`}
    >
      <img
        src={site.meta.logo.src}
        alt=""
        width={44}
        height={44}
        className="size-11 rounded-full"
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.6rem] leading-none text-leaf-ink">
          {site.meta.name}
        </span>
        <span className="mt-1 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-stone">
          {site.meta.subtitle}
        </span>
      </span>
    </a>
  );
}

export function Header({ base = '' }: { base?: string }) {
  const nav = site.nav as { label: string; href: string }[];
  const extra = site.navExtra as { label: string; href: string }[];
  const href = (h: string) => (h.startsWith('#') ? `${base}${h}` : h);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-milk/90 backdrop-blur-md supports-[backdrop-filter]:bg-milk/80">
      <div className="mx-auto flex h-[4.5rem] max-w-[1320px] items-center justify-between gap-6 px-5 sm:px-8">
        <Wordmark base={base} />

        <NavigationMenu viewport={false} className="hidden lg:flex" aria-label="Sections">
          <NavigationMenuList className="gap-1">
            {nav.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  href={href(item.href)}
                  className="rounded-md px-3 py-2 text-[0.95rem] font-medium text-charcoal hover:bg-apricot-wash hover:text-leaf-ink focus:bg-apricot-wash"
                >
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <a
            href={site.contact.phoneHref}
            className="hidden items-center gap-2 rounded-md px-3 py-2 text-[0.95rem] font-medium text-leaf-ink hover:bg-apricot-wash xl:inline-flex"
          >
            <PhoneIcon aria-hidden="true" className="size-4" />
            {site.contact.phone}
          </a>
          <Button asChild className="hidden h-11 rounded-full px-6 text-[0.95rem] sm:inline-flex">
            <a href={href(site.cta.primary.href)}>{site.cta.primary.label}</a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-11 rounded-full border-line-strong bg-transparent lg:hidden"
                aria-label="Open the menu"
              >
                <MenuIcon aria-hidden="true" className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm bg-milk p-0">
              <SheetHeader className="border-b border-line px-6 py-5 text-left">
                <SheetTitle className="font-display text-2xl font-normal text-leaf-ink">
                  {site.meta.name}
                </SheetTitle>
                <SheetDescription lang="bn" className="bn text-lg text-leaf">
                  {landing.hero.thesis.bn}
                </SheetDescription>
              </SheetHeader>
              <nav aria-label="Sections" className="flex flex-col px-3 py-4">
                {[...nav, ...extra].map((item) => (
                  <SheetClose asChild key={item.label}>
                    <a
                      href={href(item.href)}
                      className="rounded-md px-3 py-3 font-display text-[1.5rem] leading-tight text-leaf-ink hover:bg-apricot-wash"
                    >
                      {item.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <Separator className="bg-line" />
              <div className="flex flex-col gap-3 px-6 py-6">
                <Button asChild className="h-12 rounded-full text-base">
                  <a href={href(site.cta.primary.href)}>{site.cta.primary.label}</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-full border-line-strong bg-transparent text-base text-leaf-ink"
                >
                  <a href={site.contact.phoneHref}>
                    <PhoneIcon aria-hidden="true" /> Call {site.contact.phone}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
