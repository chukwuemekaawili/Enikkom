import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { proofRecords } from "@/content/home";
import { RecordEyebrow, ProjectRecordCard } from "@/components/records";

/**
 * Selected records from the archive — the homepage's project proof, moved
 * high on the page. Filed field records (ProjectRecordCard), not case-study
 * marketing cards. Links into the full /projects register.
 */
export function SelectedRecords() {
  return (
    <section
      id="projects"
      aria-labelledby="records-heading"
      className="enk-section"
      style={{ borderBottom: "1px solid var(--enk-rule)" }}
    >
      <div className="enk-container">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <RecordEyebrow refNo={`${proofRecords.length} OF REGISTER`}>Selected Records</RecordEyebrow>
            <h2 id="records-heading" className="enk-display mt-4 text-[clamp(1.5rem,2.8vw,2rem)] text-[var(--enk-ink)]">
              Selected records from the archive
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[var(--enk-steel)] md:text-[15px]">
              Benchmark HDD and pipeline crossings delivered for Nigeria's operators and EPC
              partners — each entry opens its documented project file.
            </p>
          </div>

          <Link
            to="/projects"
            className="enk-mono inline-flex shrink-0 items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-[var(--enk-accent-on-dark)] transition-colors hover:text-[var(--enk-accent-primary-on-dark)] focus-ring rounded-sm"
          >
            View full project register
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {proofRecords.map((record) => (
            <ProjectRecordCard
              key={record.title}
              title={record.title}
              href={record.href}
              location={record.location}
              metric={record.metric}
              metricLabel={record.metricLabel}
              year={record.year}
              thumbnail={record.thumbnail}
              tags={record.tags}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
