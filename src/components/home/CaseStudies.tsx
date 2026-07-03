import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { flagship, projects, type Project } from "@/content/home";
import { SectionHeading } from "./SectionHeading";
import { EnhancedImage } from "@/components/ui/enhanced-image";

function ProjectRecord({ project }: { project: Project }) {
  return (
    <Link
      to={project.href}
      className="enk-card enk-card--hover group flex flex-col overflow-hidden focus-ring"
    >
      <div className="relative aspect-[4/3] overflow-hidden enk-photo-wrap">
        <EnhancedImage
          src={project.image}
          alt={project.imageAlt}
          wrapperClassName="h-full w-full"
          loading="lazy"
          className="enk-photo--card"
          hoverZoom
          fallbackLabel={project.name}
        />
      </div>

      <div className="flex flex-1 flex-col p-5" style={{ backgroundColor: "var(--enk-surface-card)" }}>
        <span className="text-[11px] font-semibold text-[var(--enk-on-dark-muted)]">
          {project.location}
        </span>
        <h3 className="mt-1.5 text-[17px] font-bold leading-snug text-[var(--enk-on-dark)]">
          {project.name}
        </h3>

        {/* Key metric — the sourced result (e.g. '10" × 12 km') */}
        <p
          className="enk-display mt-3 text-[clamp(1.2rem,2.5vw,1.5rem)] leading-none"
          style={{ color: "var(--enk-accent-primary-on-dark)" }}
          aria-label={`Project metric: ${project.result}`}
        >
          {project.result}
        </p>

        <span className="enk-readmore mt-4">
          View project record
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

/**
 * Flagship project record — image-dominant with a navy scrim and a full
 * metrics table sourced from flagship.metrics. Heavier visual weight than
 * the supporting tiles; reads as the anchor delivery proof.
 */
function FlagshipRecord() {
  return (
    <Link
      to={flagship.href}
      className="enk-card enk-card--hover group relative flex min-h-[440px] flex-col justify-end overflow-hidden focus-ring lg:min-h-full"
    >
      <EnhancedImage
        src={flagship.image}
        alt={flagship.imageAlt}
        wrapperClassName="absolute inset-0 h-full w-full"
        loading="lazy"
        className="enk-photo--hero"
        hoverZoom
        fallbackLabel={flagship.name}
      />
      {/* Navy scrim, dense at the base for text legibility over any photo. */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(0deg, oklch(0.14 0.03 255 / 0.97) 0%, oklch(0.14 0.03 255 / 0.65) 40%, oklch(0.14 0.03 255 / 0.08) 78%)",
        }}
      />
      <div className="relative p-7 md:p-9">
        <span
          className="text-[11px] font-bold uppercase tracking-wider"
          style={{ color: "var(--enk-accent-primary-on-dark)" }}
        >
          Flagship project record
        </span>
        <span className="mt-2 block text-[11px] font-semibold text-[var(--enk-on-dark-muted)]">
          Lagos-Ogun, Nigeria · {flagship.client}
        </span>
        <h3 className="mt-1.5 text-[22px] font-bold leading-snug text-[var(--enk-on-dark)] md:text-[26px]">
          {flagship.name}
        </h3>
        <p className="mt-3 text-[13px] leading-relaxed text-[var(--enk-on-dark-muted)] max-w-sm">
          {flagship.challenge}
        </p>

        {/* Sourced metrics table */}
        <dl
          className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 border-t pt-5 sm:grid-cols-4"
          style={{ borderColor: "rgba(255,255,255,0.12)" }}
        >
          {flagship.metrics.map((m) => (
            <div key={m.label}>
              <dd
                className="enk-display text-[clamp(1.1rem,2vw,1.4rem)] leading-none"
                style={{ color: "var(--enk-accent-primary-on-dark)" }}
              >
                {m.value}
              </dd>
              <dt className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--enk-on-dark-muted)]">
                {m.label}
              </dt>
            </div>
          ))}
        </dl>

        <span className="enk-readmore mt-6">
          View project record
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

/**
 * Project records section — engineering evidence, not blog cards.
 * One flagship anchor with sourced metrics; four supporting project records
 * with diameter, length, method, and terrain where available.
 */
export function CaseStudies() {
  const featuredProjects = projects.slice(0, 2);

  return (
    <section
      id="projects"
      className="enk-section"
      style={{ borderTop: "1px solid var(--enk-line-dark)", borderBottom: "1px solid var(--enk-line-dark)" }}
    >
      <div className="enk-container">
        <SectionHeading
          kicker="Project records"
          title="Crossings delivered, measured outcomes"
          intro="Selected HDD and pipeline projects executed for Nigeria's major operators and EPC partners."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2 lg:items-stretch">
          <FlagshipRecord />
          <div className="grid gap-5 sm:grid-cols-2">
            {featuredProjects.map((p) => (
              <ProjectRecord key={p.name} project={p} />
            ))}
          </div>
        </div>

        <div className="mt-10">
          <Link to="/projects" className="enk-btn enk-btn--outline">
            Open project records
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
