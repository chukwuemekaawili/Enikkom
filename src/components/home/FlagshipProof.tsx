import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { achievements } from "@/content/home";

/**
 * Record-benchmarks band — sits immediately after the hero.
 * Shows the three sourced superlatives (Africa's longest single drill,
 * Nigeria's longest CHDD, largest-diameter river crossing) as at-a-glance
 * proof. The flagship project itself is rendered ONCE, in the Case studies
 * section; this band deliberately does not repeat its name, copy or metrics.
 * Dark panel; gold accent on the metric values only. Not a SaaS KPI strip.
 */
export function FlagshipProof() {
  return (
    <section
      aria-labelledby="records-heading"
      className="enk-panel"
      style={{ borderTop: "1px solid var(--enk-line-dark)" }}
    >
      <div className="enk-container py-10 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_1fr] lg:items-center lg:gap-16">
          {/* Left: framing */}
          <div>
            <p className="enk-kicker enk-kicker--on-dark mb-4">
              Crossing records
            </p>
            <h2
              id="records-heading"
              className="text-[clamp(1.35rem,3vw,2rem)] font-extrabold leading-tight text-[var(--enk-on-dark)]"
            >
              Record crossings, tied to named project evidence.
            </h2>
            <p className="mt-4 text-[13px] leading-relaxed text-[var(--enk-on-dark-muted)]">
              Benchmarks below link to project records with diameter, length,
              client or stakeholder context, year, method, and delivery notes.
            </p>
            <Link to="/projects" className="enk-readmore mt-6 inline-flex">
              View project records
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Right: three sourced record benchmarks */}
          <dl className="grid gap-x-8 gap-y-8 sm:grid-cols-3">
            {achievements.map((a) => (
              <div
                key={a.label}
                className="border-l-2 pl-4"
                style={{ borderColor: "var(--enk-accent-on-dark)" }}
              >
                <dd
                  className="enk-display text-[clamp(1.75rem,4vw,2.6rem)] leading-none"
                  style={{ color: "var(--enk-accent-primary-on-dark)" }}
                >
                  {a.value}
                </dd>
                <dt className="mt-2 text-[13.5px] font-semibold leading-snug text-[var(--enk-on-dark)]">
                  {a.label}
                </dt>
                <p className="mt-1 text-[12px] leading-snug text-[var(--enk-on-dark-muted)]">
                  {a.context}
                </p>
                <Link
                  to={a.evidenceHref}
                  className="enk-readmore mt-3 text-[12px]"
                  aria-label={`Open project record for ${a.label}: ${a.evidenceLabel}`}
                >
                  Project record: {a.evidenceLabel}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
