import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { recentOps, type RecentOp } from "@/content/home";
import { SectionHeading } from "./SectionHeading";
import { EnhancedImage } from "@/components/ui/enhanced-image";

function OpCard({ op }: { op: RecentOp }) {
  return (
    <article className="enk-card enk-card--hover group overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden enk-photo-wrap">
        <EnhancedImage
          src={op.image}
          alt={op.imageAlt}
          wrapperClassName="h-full w-full"
          loading="lazy"
          className="enk-photo--card"
          hoverZoom
          fallbackLabel={op.category}
        />
      </div>
      <div className="flex flex-col p-5" style={{ backgroundColor: "var(--enk-surface-card)" }}>
        <span className="text-[12px] font-bold text-[var(--enk-accent-on-dark)]">
          {op.category}
        </span>
        <p className="mt-2 text-[14.5px] leading-snug text-[var(--enk-on-dark)]">{op.caption}</p>
      </div>
    </article>
  );
}

/**
 * Recent operations, a "live now" band that follows the proof section. Where
 * Case studies show delivered outcomes, this shows current activity on site,
 * reusing the same navy/gold card theme and cover-crop.
 */
export function RecentOps() {
  const visibleOps = recentOps.slice(0, 3);

  return (
    <section id="recent" className="enk-section">
      <div className="enk-container">
        <SectionHeading
          kicker="Latest field updates"
          title="Recent operations"
          intro="Current HDD, pipeline and crossing activity from active project fronts."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {visibleOps.map((op) => (
            <OpCard key={op.image} op={op} />
          ))}
        </div>

        <div className="mt-10">
          <Link to="/gallery" className="enk-btn enk-btn--outline">
            View the full gallery
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
