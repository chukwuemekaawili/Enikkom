import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { qhse, certifications, contact } from "@/content/home";
import { RecordEyebrow, RecordMetric, RecordStatusStamp, DocumentCard } from "@/components/records";

/**
 * QHSE & compliance — procurement-ready and document-led. Safety record as
 * ledger metrics, certified systems as official stamps (clickable where a
 * document is on file), and real policy PDFs as filed DocumentCards. Two
 * procurement CTAs. Nothing here is invented — figures and files are sourced.
 */
export function Qhse() {
  return (
    <section
      id="qhse"
      aria-labelledby="qhse-heading"
      className="enk-section"
      style={{ backgroundColor: "var(--enk-bg-muted)", borderBottom: "1px solid var(--enk-rule)" }}
    >
      <div className="enk-container">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* Narrative + proof */}
          <div>
            <RecordEyebrow refNo="REF 03">QHSE &amp; Compliance</RecordEyebrow>
            <h2 id="qhse-heading" className="enk-display mt-4 text-[clamp(1.5rem,2.8vw,2rem)] text-[var(--enk-ink)]">
              Safety and quality you can audit, not just claim
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[var(--enk-steel)] md:text-[15px]">
              Every project runs on a documented quality and HSE management system, certified to
              three ISO standards. Records, policies and certificates are available for
              prequalification review.
            </p>

            {/* Safety record — ledger metrics, stated once, here only */}
            <div className="mt-8 grid grid-cols-3 gap-x-6 gap-y-6">
              {qhse.metrics.map((m) => (
                <RecordMetric key={m.label} label={m.label} value={m.value} />
              ))}
            </div>

            {/* Certified management systems — official stamps, clickable when on file */}
            <div className="mt-8">
              <p className="enk-overline">Certified Management Systems</p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {certifications.map((c) =>
                  c.file ? (
                    <a
                      key={c.code}
                      href={c.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`${c.name} — view document`}
                      aria-label={`${c.code} ${c.name}, view document`}
                      className="focus-ring rounded-[2px] transition-opacity hover:opacity-80"
                    >
                      <RecordStatusStamp tone="qhse">{c.code}</RecordStatusStamp>
                    </a>
                  ) : (
                    <RecordStatusStamp key={c.code} tone="neutral">
                      {c.code}
                    </RecordStatusStamp>
                  ),
                )}
              </div>
            </div>

            {/* Procurement CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={contact.capabilityStatement}
                target="_blank"
                rel="noopener noreferrer"
                className="enk-btn enk-btn--gold"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                Request Capability Statement
              </a>
            </div>
            <p className="mt-3 text-[12.5px] text-[var(--enk-steel)]">
              Full prequalification pack available on request, or{" "}
              <Link to="/contact" className="underline underline-offset-2 hover:text-[var(--enk-accent-primary-on-dark)] focus-ring">
                contact the project team
              </Link>
              .
            </p>
          </div>

          {/* Filed documents — real PDFs only */}
          <div>
            <p className="enk-overline">Filed QHSE Documents</p>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {qhse.policies.map((p) => (
                <DocumentCard
                  key={p.label}
                  docType="Policy"
                  title={p.label}
                  href={p.file}
                  actionLabel="Open PDF"
                  stamp={{ label: "On File", tone: "neutral" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
