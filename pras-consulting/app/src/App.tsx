import { site } from '@/content';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/site/Header';
import { Hero } from '@/components/site/Hero';
import { Experience } from '@/components/site/Experience';
import { Contact, Footer } from '@/components/site/Chrome';

export function App() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export function NotFound() {
  const n = site.notFound;
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header base="/" />
      <main id="main" tabIndex={-1} className="outline-none">
        <section className="mx-auto flex max-w-3xl flex-col items-center px-6 py-28 text-center lg:py-36">
          <p className="copper-text text-[21px] font-semibold leading-[25px]">404</p>
          <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-ink sm:text-6xl">
            {n.h1}
          </h1>
          <p className="mt-6 max-w-md text-[17px] leading-[26px] text-muted-ink">{n.lede}</p>
          <Button asChild className="mt-9 h-11 rounded-full px-[22px] text-[17px] font-medium hover:bg-copper-hover">
            <a href="/">{n.homeLabel}</a>
          </Button>
        </section>
      </main>
      <Footer base="/" />
    </>
  );
}
