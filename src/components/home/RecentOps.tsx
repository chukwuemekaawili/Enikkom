import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { recentOps } from "@/content/home";
import { RecordEyebrow, FieldFigure } from "@/components/records";

/**
 * Field operations log — current activity from active project fronts, framed
 * as documentation plates (FieldFigure) rather than blog cards. The discipline
 * tag rides the plate number; captions describe visible activity only, so no
 * unverified location or date is asserted. Shared by home + /projects.
 */
export function RecentOps() {
  const visibleOps = recentOps.slice(0, 3);

  return (
    <section id="recent" aria-labelledby="recent-heading" className="enk-section">
      <div className="enk-container">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <RecordEyebrow refNo="LIVE">Field Operations Log</RecordEyebrow>
            <h2 id="recent-heading" className="enk-display mt-4 text-[clamp(1.5rem,2.8vw,2rem)] text-[var(--enk-ink)]">
              Current works on active fronts
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[var(--enk-steel)] md:text-[15px]">
              HDD, pipeline and crossing activity documented on site across ongoing operations.
            </p>
          </div>

          <Link
            to="/projects#gallery"
            className="enk-mono inline-flex shrink-0 items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-[var(--enk-accent-on-dark)] transition-colors hover:text-[var(--enk-accent-primary-on-dark)] focus-ring rounded-sm"
          >
            View field documentation
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {visibleOps.map((op) => (
            <FieldFigure
              key={op.image}
              src={op.image}
              alt={op.imageAlt}
              figNo={op.category}
              caption={op.caption}
              ratio="4/3"
              sizes="(min-width: 768px) 30vw, 100vw"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
