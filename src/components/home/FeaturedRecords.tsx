import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { featuredProjects, homeStats } from "@/content/home";
import { EnhancedImage } from "@/components/ui/enhanced-image";

/**
 * Featured projects — Shell card anatomy: rounded image, a headline that
 * carries the fact, one sentence, "Read more →" pinned bottom-right.
 * A slim plain-text stat line replaces the old proof-ledger section.
 */
export function FeaturedRecords() {
  return (
    <section id="projects" aria-labelledby="records-heading" className="enk-section">
      <div className="enk-container">
        <h2 id="records-heading" className="text-[var(--enk-ink)]">
          Featured projects
        </h2>

        {/* Track record in one line — no stat cards */}
        <p className="mt-3 text-[14px] text-[var(--enk-steel)] md:text-[15px]">
          {homeStats.map((s, i) => (
            <span key={s.label}>
              {i > 0 && <span aria-hidden="true" className="mx-2.5 text-[var(--enk-meta)]">·</span>}
              <strong className="font-bold text-[var(--enk-ink)]">{s.value}</strong> {s.label}
            </span>
          ))}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <Link
              key={project.href}
              to={project.href}
              className="enk-card enk-card--hover group flex h-full flex-col p-2 focus-ring"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-[10px]">
                <EnhancedImage
                  src={project.thumbnail}
                  alt={project.title}
                  wrapperClassName="h-full w-full"
                  loading="lazy"
                  fallbackLabel={project.title}
                />
              </div>
              <div className="flex flex-1 flex-col px-4 pb-4 pt-5">
                <h3 className="text-[19px] font-bold leading-snug text-[var(--enk-ink)]">
                  {project.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-[var(--enk-steel)]">
                  {project.summary}
                </p>
                <span className="enk-readmore mt-auto justify-end pt-6">
                  Read more
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-7 text-right">
          <Link to="/projects" className="enk-readmore group focus-ring rounded-md">
            View all projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
