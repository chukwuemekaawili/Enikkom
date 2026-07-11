import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const items = [
  {
    title: "Safety & quality",
    body: "Zero lost-time injuries and 5M+ safe man-hours, certified to three ISO standards.",
    href: "/hse-quality",
  },
  {
    title: "Equipment & fleet",
    body: "The HDD rigs, marine plant and pipeline spreads behind every crossing we deliver.",
    href: "/equipment",
  },
  {
    title: "About Enikkom",
    body: "An indigenous EPC contractor operating nationwide from Lagos since 1995.",
    href: "/about",
  },
] as const;

/**
 * You may also be interested in — Shell's closing row: three quiet text
 * cards routing deeper into the site. Absorbs the old QHSE and field-ops
 * homepage sections (their detail lives on the destination pages).
 */
export function MoreAtEnikkom() {
  return (
    <section
      aria-labelledby="more-heading"
      className="enk-section"
      style={{ backgroundColor: "var(--enk-bg-muted)" }}
    >
      <div className="enk-container">
        <h2 id="more-heading" className="text-[var(--enk-ink)]">
          You may also be interested in
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="enk-card enk-card--hover group flex h-full flex-col p-6 focus-ring"
            >
              <h3 className="text-[18px] font-bold leading-snug text-[var(--enk-ink)]">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-[var(--enk-steel)]">{item.body}</p>
              <span className="enk-readmore mt-auto justify-end pt-6">
                Read more
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
