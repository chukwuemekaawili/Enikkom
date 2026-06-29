import { FileText, Eye } from "lucide-react";
import { qhse, certifications, kpis } from "@/content/home";
import { SectionHeading } from "./SectionHeading";

/** Safety record figures live here only (the single safety & quality section). */
const safetyStats = kpis.slice(3);

/**
 * QHSE / compliance, the single safety & quality section. Focused on the
 * auditable system (certifications + downloadable policies). The headline
 * safety figures (zero LTI, safe man-hours) are stated once, in the Trust
 * snapshot, and are no longer repeated here.
 */
export function Qhse() {
  return (
    <section id="qhse" className="enk-section" style={{ backgroundColor: "var(--enk-bg-muted)" }}>
      <div className="enk-container">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <SectionHeading
              kicker="QHSE & compliance"
              title="Safety and quality you can audit, not just claim"
              intro="Every project runs on a documented quality and HSE system, certified to three ISO standards, with policies available for prequalification."
            />

            {/* Safety record, stated once, here */}
            <dl className="mt-8 grid grid-cols-2 gap-6">
              {safetyStats.map((s) => (
                <div key={s.label} className="border-l-2 border-[var(--enk-blue)] pl-4">
                  <dd className="enk-display text-[clamp(1.5rem,4vw,2.2rem)] text-[var(--enk-ink)]">{s.value}</dd>
                  <dt className="mt-1.5 text-[12.5px] leading-snug text-[var(--enk-steel)]">{s.label}</dt>
                </div>
              ))}
            </dl>

            {/* Certifications held (ISO achieved 2015; DPR/NUPRC permits on file).
                Chips with a document on file are clickable to view it in a new tab. */}
            <div className="mt-10 flex flex-wrap gap-2.5">
              {certifications.map((c) =>
                c.file ? (
                  <a
                    key={c.code}
                    href={c.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${c.name}, view document`}
                    className="enk-chip transition-colors hover:border-[var(--enk-blue)] hover:text-[var(--enk-blue)] focus-ring"
                  >
                    {c.code}
                    <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  <span key={c.code} className="enk-chip" title={c.name}>{c.code}</span>
                ),
              )}
            </div>
          </div>

          {/* Policy downloads */}
          <div className="enk-card p-6 md:p-8">
            <h3 className="flex items-center gap-2.5 text-[16px] font-bold text-[var(--enk-ink)]">
              <FileText className="h-6 w-6 text-[var(--enk-bronze)]" fill="currentColor" aria-hidden="true" />
              Policies &amp; statements
            </h3>
            <ul className="mt-5 divide-y divide-[var(--enk-line)]">
              {qhse.policies.map((p) => (
                <li key={p.label}>
                  <a
                    href={p.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-4 py-4 transition-colors hover:text-[var(--enk-blue)] focus-ring"
                  >
                    <span className="text-[15px] font-medium text-[var(--enk-ink)]">{p.label}</span>
                    <Eye className="h-5 w-5 shrink-0 text-[var(--enk-steel)]" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
