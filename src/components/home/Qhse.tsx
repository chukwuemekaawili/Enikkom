import { Link } from "react-router-dom";
import { FileText, Eye, Mail } from "lucide-react";
import { qhse, certifications, kpis, contact } from "@/content/home";
import { SectionHeading } from "./SectionHeading";

/** Safety record figures live here only (the single safety & quality section). */
const safetyStats = kpis.slice(3);

const CREDENTIALS_MAILTO =
  `mailto:${contact.email}` +
  `?subject=QHSE%20Credentials%20Request` +
  `&body=Organisation%3A%0AProject%20context%3A%0ADocuments%20required%3A`;

/**
 * QHSE / compliance — procurement-ready and auditable.
 * Leads with the safety record, then certified management systems, then
 * real downloadable policy documents. A credentials request CTA covers
 * any documents not available for direct download.
 */
export function Qhse() {
  return (
    <section id="qhse" className="enk-section enk-panel">
      <div className="enk-container">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <SectionHeading
              kicker="QHSE & compliance"
              title="Safety and quality you can audit, not just claim"
              intro="Every project runs on a documented quality and HSE management system, certified to three ISO standards. Safety records, policies, and certification documents are available for prequalification review."
            />

            {/* Safety record — stated once, here only */}
            <dl className="mt-8 grid grid-cols-2 gap-6">
              {safetyStats.map((s) => (
                <div key={s.label} className="border-l-2 pl-4" style={{ borderColor: "var(--enk-accent-on-dark)" }}>
                  <dd className="enk-display text-[clamp(1.5rem,4vw,2.2rem)] text-[var(--enk-ink)]">{s.value}</dd>
                  <dt className="mt-1.5 text-[12.5px] leading-snug text-[var(--enk-steel)]">{s.label}</dt>
                </div>
              ))}
            </dl>

            {/* ISO / regulatory certifications held.
                Chips with a document on file are clickable to view. */}
            <div className="mt-8">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[var(--enk-steel)]">
                Certified management systems
              </p>
              <div className="flex flex-wrap gap-2.5">
                {certifications.map((c) =>
                  c.file ? (
                    <a
                      key={c.code}
                      href={c.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`${c.name} — view document`}
                      aria-label={`${c.code} ${c.name}, view document`}
                      className="enk-chip transition-colors hover:border-[var(--enk-accent-primary-on-dark)] hover:text-[var(--enk-accent-primary-on-dark)] focus-ring"
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

            {/* Request credentials CTA — routes to the contact form (works on
                machines without a mail client); direct email kept as fallback. */}
            <div className="mt-8">
              <Link
                to="/contact"
                className="enk-readmore"
                aria-label="Request QHSE credentials via the contact page"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Request QHSE credentials
              </Link>
              <p className="mt-1.5 text-[12px] text-[var(--enk-steel)]">
                Full prequalification pack available on request, or{" "}
                <a href={CREDENTIALS_MAILTO} className="underline underline-offset-2 hover:text-[var(--enk-accent-primary-on-dark)] focus-ring">
                  email us directly
                </a>
                .
              </p>
            </div>
          </div>

          {/* Policy downloads — real files only */}
          <div className="enk-card p-6 md:p-8">
            <h3 className="flex items-center gap-2.5 text-[16px] font-bold text-[var(--enk-ink)]">
              <FileText className="h-6 w-6 text-[var(--enk-bronze)]" fill="currentColor" aria-hidden="true" />
              Policies &amp; compliance statements
            </h3>
            <p className="mt-3 text-[13px] leading-relaxed text-[var(--enk-steel)]">
              QHSE documentation issued under the certified management system.
              Documents open as PDF.
            </p>
            <ul className="mt-5 divide-y divide-[var(--enk-line)]">
              {qhse.policies.map((p) => (
                <li key={p.label}>
                  <a
                    href={p.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.label} — open PDF`}
                    className="flex items-center justify-between gap-4 py-4 transition-colors hover:text-[var(--enk-accent-primary-on-dark)] focus-ring"
                  >
                    <span className="text-[15px] font-medium text-[var(--enk-ink)]">{p.label}</span>
                    <span className="flex shrink-0 items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--enk-steel)]">
                      PDF
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    </span>
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
