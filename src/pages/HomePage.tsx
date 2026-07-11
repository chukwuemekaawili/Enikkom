import { Helmet } from "react-helmet-async";
import { HomeHeader } from "@/components/home/HomeHeader";
import { HomeHero } from "@/components/home/HomeHero";
import { FeaturedRecords } from "@/components/home/FeaturedRecords";
import { Capabilities } from "@/components/home/Capabilities";
import { QuickActions } from "@/components/home/QuickActions";
import { MoreAtEnikkom } from "@/components/home/MoreAtEnikkom";
import { Credentials } from "@/components/home/Credentials";
import { HomeFooter } from "@/components/home/HomeFooter";
import { BackToTopButton } from "@/components/sections/BackToTopButton";

/**
 * Homepage — Shell-style router page, five light sections:
 *   Hero (rounded video tile) -> Featured projects (3 cards + stat line) ->
 *   What we do (capability tiles) -> How can we help? (amber quick-link band) ->
 *   You may also be interested in (3 link cards) -> client logo strip.
 * Detail lives one click deeper. Self-contained, scoped under `.enk`.
 */
export default function HomePage() {
  return (
    <div className="enk">
      <Helmet>
        <title>Enikkom Construction, HDD, Pipelines, Dredging &amp; Marine Civils | Nigeria</title>
        <meta
          name="description"
          content="Nigerian EPC contractor for trenchless HDD crossings, pipeline construction, dredging and marine civils. Procurement-ready capability, QHSE proof, and a fast technical response."
        />
        <link rel="canonical" href="https://enikkom.com/" />
        <meta property="og:title" content="Enikkom Construction, Trenchless &amp; Pipeline Contractor, Nigeria" />
        <meta
          property="og:description"
          content="Critical crossings delivered where conventional methods cannot reach. HDD, pipelines, dredging and marine civils for oil & gas operators and EPC partners."
        />
      </Helmet>

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[var(--enk-accent-primary)] focus:px-4 focus:py-2 focus:text-[var(--enk-navy)]"
      >
        Skip to content
      </a>

      <HomeHeader />

      <main id="main">
        <HomeHero />
        <FeaturedRecords />
        <Capabilities />
        <QuickActions />
        <MoreAtEnikkom />
        <Credentials />
      </main>

      <HomeFooter />
      <BackToTopButton />
    </div>
  );
}
