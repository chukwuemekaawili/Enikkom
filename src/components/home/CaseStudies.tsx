import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { flagship, projects, type Project } from "@/content/home";
import { SectionHeading } from "./SectionHeading";
import { isPlaceholder, PlaceholderTag } from "./Placeholder";

function Tile({ project }: { project: Project }) {
  return (
    <Link
      to={project.href}
      className="enk-card enk-card--hover group flex flex-col overflow-hidden focus-ring"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6" style={{ backgroundColor: "var(--enk-navy)" }}>
        {isPlaceholder(project.location) ? (
          <PlaceholderTag value={project.location} onDark />
        ) : (
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--enk-on-dark-muted)]">
            {project.location}
          </span>
        )}
        {isPlaceholder(project.name) ? (
          <PlaceholderTag value={project.name} onDark />
        ) : (
          <h3 className="mt-2 text-[18px] font-semibold leading-snug text-[var(--enk-on-dark)]">{project.name}</h3>
        )}
        <dl className="mt-2 flex flex-1 flex-wrap items-baseline gap-2">
          <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--enk-gold)]">Result</dt>
          <dd className="text-[13.5px] font-medium text-[var(--enk-on-dark)]">
            {isPlaceholder(project.result) ? <PlaceholderTag value={project.result} onDark /> : project.result}
          </dd>
        </dl>
        <span
          className="mt-5 inline-flex items-center gap-2 text-[13.5px] font-semibold"
          style={{ color: "var(--enk-gold)" }}
        >
          Read case study
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}

/**
 * Lead case study, the credibility anchor. Image-dominant feature card with a
 * navy scrim and an enlarged headline metric, visually heavier than the
 * supporting tiles so the record drill reads as the flagship, not just another
 * project. Same navy/gold theme and cover-crop as the small tiles.
 */
function FlagshipTile({ project }: { project: Project }) {
  return (
    <Link
      to={project.href}
      className="enk-card enk-card--hover group relative flex min-h-[440px] flex-col justify-end overflow-hidden focus-ring lg:min-h-full"
    >
      <img
        src={project.image}
        alt={project.name}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
      />
      {/* Navy scrim, dense at the base for text legibility over any photo. */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(0deg, oklch(0.14 0.03 255 / 0.95) 0%, oklch(0.14 0.03 255 / 0.62) 38%, oklch(0.14 0.03 255 / 0.05) 78%)",
        }}
      />
      <div className="relative p-7 md:p-9">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--enk-gold)]">
          Flagship project
        </span>
        <span className="mt-3 block font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--enk-on-dark-muted)]">
          {project.location}
        </span>
        <h3 className="mt-1.5 text-[22px] font-semibold leading-snug text-[var(--enk-on-dark)] md:text-[27px]">
          {project.name}
        </h3>
        <p className="mt-4 enk-display text-[clamp(1.35rem,2.4vw,1.9rem)] leading-tight text-[var(--enk-on-dark)]">
          {project.result}
        </p>
        <span
          className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold"
          style={{ color: "var(--enk-gold)" }}
        >
          Read case study
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}

/**
 * Case studies, the single, strongest proof section. One flagship feature card
 * anchors the section, with the remaining projects as equal supporting tiles
 * beside it (lg) or below it (smaller screens), so project proof lives here only.
 */
const flagshipTile: Project = {
  name: "Atlas Cove-Mosimi HDD",
  location: "Lagos-Ogun, Nigeria",
  challenge: "",
  result: "16\" × 3.1 km, Africa's longest single HDD",
  image: flagship.image,
  href: flagship.href,
};

export function CaseStudies() {
  return (
    <section id="projects" className="enk-section" style={{ backgroundColor: "var(--enk-bg-muted)" }}>
      <div className="enk-container">
        <SectionHeading
          kicker="Proof"
          title="Record crossings, measured outcomes"
          intro="Selected crossings and pipeline projects delivered for Nigeria's major operators and EPC partners, each with a measurable outcome."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2 lg:items-stretch">
          <FlagshipTile project={flagshipTile} />
          <div className="grid gap-5 sm:grid-cols-2">
            {projects.map((p) => (
              <Tile key={p.name} project={p} />
            ))}
          </div>
        </div>

        <div className="mt-10">
          <Link to="/projects" className="enk-btn enk-btn--outline">
            View all projects
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
