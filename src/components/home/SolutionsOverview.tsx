import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const solutionCards = [
  {
    label: "Crossings without open-cut disruption",
    body: "HDD and trenchless methods for rivers, roads, rail, swamp corridors and shore approaches.",
    href: "/capabilities/hdd",
  },
  {
    label: "Pipeline and flowline delivery",
    body: "Construction, welding, coating, testing and tie-in support across land and swamp terrain.",
    href: "/capabilities/pipelines-flowlines",
  },
  {
    label: "Marine access and shore works",
    body: "Dredging, cofferdams, piling and marine civil support for difficult access corridors.",
    href: "/capabilities/dredging-piling",
  },
  {
    label: "Delivered project records",
    body: "Named crossings and pipeline works with locations, dimensions, methods and delivery notes.",
    href: "/projects",
  },
];

/**
 * Solutions overview grid — sits directly after the hero as the top-level
 * "what we do" router. Concept inspired by SLB's solutions overview, rendered
 * in Enikkom's dark system. Outcome-framed on purpose: the Capabilities
 * section further down covers the same scopes discipline-by-discipline.
 */
export function SolutionsOverview() {
  return (
    <section
      className="enk-section relative overflow-hidden border-y"
      style={{ backgroundColor: "var(--enk-navy)", borderColor: "var(--enk-line-dark)" }}
      aria-label="Infrastructure solutions"
    >
      <div className="enk-container">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="max-w-3xl">
            <p className="enk-kicker enk-kicker--on-dark mb-4">
              Infrastructure solutions
            </p>
            <h2 className="text-[clamp(1.75rem,3.6vw,2.75rem)] font-bold leading-tight text-[var(--enk-on-dark)]">
              Built around trenchless crossings, pipelines and marine access.
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--enk-on-dark-muted)] md:text-[16px]">
              Core work areas across HDD crossings, pipeline and flowline construction, dredging, piling and shore approach support.
            </p>
          </div>

          <Link
            to="/capabilities"
            className="inline-flex items-center gap-3 text-[14px] font-semibold transition-colors hover:text-[var(--enk-on-dark)] focus-ring"
            style={{ color: "var(--enk-accent-primary-on-dark)" }}
          >
            View all capabilities
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {solutionCards.map(({ label, body, href }) => (
            <Link
              key={label}
              to={href}
              className="enk-card enk-card--hover group flex min-h-[210px] flex-col justify-between p-5 focus-ring"
            >
              <div>
                <h3 className="text-[18px] font-bold leading-snug text-[var(--enk-on-dark)]">
                  {label}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-[var(--enk-on-dark-muted)]">{body}</p>
              </div>

              <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold" style={{ color: "var(--enk-accent-primary-on-dark)" }}>
                Explore
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
