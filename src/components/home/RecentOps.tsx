import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { recentOps, type RecentOp } from "@/content/home";
import { SectionHeading } from "./SectionHeading";

function OpCard({ op }: { op: RecentOp }) {
  return (
    <article className="enk-card enk-card--hover group overflow-hidden">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={op.image}
          alt={op.caption}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col p-5" style={{ backgroundColor: "var(--enk-navy)" }}>
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
  return (
    <section id="recent" className="enk-section">
      <div className="enk-container">
        <SectionHeading
          kicker="On site now"
          title="Recent operations"
          intro="A look at current works, directional drilling, pipeline construction and crossing operations underway on active project fronts in 2026."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recentOps.map((op) => (
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
