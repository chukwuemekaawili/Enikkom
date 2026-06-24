import { Helmet } from "react-helmet-async";
import { HomeHeader } from "@/components/home/HomeHeader";
import { HomeHero } from "@/components/home/HomeHero";
import { TrustSnapshot } from "@/components/home/TrustSnapshot";
import { Capabilities } from "@/components/home/Capabilities";
import { CaseStudies } from "@/components/home/CaseStudies";
import { Process } from "@/components/home/Process";
import { Qhse } from "@/components/home/Qhse";
import { FinalCta } from "@/components/home/FinalCta";
import { HomeFooter } from "@/components/home/HomeFooter";
import { BackToTopButton } from "@/components/sections/BackToTopButton";

/**
 * Redesigned homepage, a procurement conversion system.
 * Self-contained (own header/footer/sections) and scoped under `.enk` so the
 * rest of the site is unaffected during the phased redesign.
 *
 * Each idea has one home, in a single deliberate narrative:
 *   Hero (value proposition) -> Trust snapshot (stats + logos) ->
 *   Capabilities (what we do) -> Case studies (the proof section:
 *   benchmarks + flagship + projects) -> Process (how we deliver) ->
 *   QHSE (safety & quality assurance) -> single Conversion (CTA).
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
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[var(--enk-blue)] focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <HomeHeader />

      <main id="main">
        <HomeHero />
        <TrustSnapshot />
        <Capabilities />
        <Process />
        <CaseStudies />
        <Qhse />
        <FinalCta />
      </main>

      <HomeFooter />
      <BackToTopButton />
    </div>
  );
}
