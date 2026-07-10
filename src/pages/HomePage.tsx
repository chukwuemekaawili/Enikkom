import { Helmet } from "react-helmet-async";
import { HomeHeader } from "@/components/home/HomeHeader";
import { HomeHero } from "@/components/home/HomeHero";
import { ProofLedger } from "@/components/home/ProofLedger";
import { SelectedRecords } from "@/components/home/SelectedRecords";
import { Capabilities } from "@/components/home/Capabilities";
import { Credentials } from "@/components/home/Credentials";
import { RecentOps } from "@/components/home/RecentOps";
import { Qhse } from "@/components/home/Qhse";
import { ProcurementCta } from "@/components/home/ProcurementCta";
import { HomeFooter } from "@/components/home/HomeFooter";
import { BackToTopButton } from "@/components/sections/BackToTopButton";

/**
 * Homepage — the front cover of the Industrial Field Records pack.
 * A single procurement-first narrative that leads with proof:
 *   Hero (cover sheet) -> Proof ledger (record metrics) ->
 *   Selected records (archive proof, moved high) -> Field disciplines ->
 *   Procurement & delivery history (stakeholders) -> Field operations log ->
 *   QHSE (document-led) -> Procurement handoff.
 * Self-contained (own header/footer) and scoped under `.enk`.
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
        <ProofLedger />
        <SelectedRecords />
        <Capabilities />
        <Credentials />
        <RecentOps />
        <Qhse />
        <ProcurementCta />
      </main>

      <HomeFooter />
      <BackToTopButton />
    </div>
  );
}
