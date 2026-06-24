import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { siteImageSelections } from "@/content/siteImageSelections";

const heroImage = siteImageSelections.home.heroSlides[0];

/**
 * Hero: dark industrial visual + left scrim for guaranteed subtext contrast,
 * one-color enterprise H1 (accent lives in the kicker/CTA, never in the headline),
 * left-aligned, with the primary/secondary CTA pair.
 */
export function HomeHero() {
  return (
    <section
      className="relative isolate overflow-hidden"
      style={{ backgroundColor: "var(--enk-navy)" }}
      aria-labelledby="hero-heading"
    >
      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="enk-scrim" aria-hidden="true" />

      <div className="enk-container relative">
        <div className="max-w-2xl py-20 md:py-28 lg:py-36">
          <p className="enk-kicker enk-kicker--on-dark mb-6">Trenchless &amp; Pipeline Contractor · Nigeria</p>

          <h1
            id="hero-heading"
            className="enk-display text-[var(--enk-on-dark)] text-[clamp(2.25rem,6vw,4.25rem)]"
          >
            Trenchless and pipeline construction for critical energy infrastructure.
          </h1>

          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[var(--enk-on-dark-muted)] md:text-[18px]">
            Enikkom engineers and constructs horizontal directional drilling, pipeline, dredging and
            marine civil works for oil &amp; gas operators and EPC partners across Nigeria,
            delivered to specification since 2003.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link to="/projects" className="enk-btn enk-btn--gold">
              View Projects
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
