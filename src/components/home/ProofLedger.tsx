import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { proofMetrics, type ProofMetric } from "@/content/home";
import { RecordEyebrow, RecordMetric } from "@/components/records";

/**
 * Record & delivery ledger — the homepage proof metrics as filed evidence.
 * Each figure is a RecordMetric (hairline top rule, mono value, provenance
 * note), and benchmark figures tied to a named archive entry link straight
 * to that project record. No animated counters, no marketing KPI band.
 */
function LedgerEntry({ metric }: { metric: ProofMetric }) {
  const body = (
    <RecordMetric label={metric.label} value={metric.value} unit={metric.unit} note={metric.note} />
  );

  if (!metric.href) return body;

  return (
    <Link
      to={metric.href}
      className="group block focus-ring"
      aria-label={`${metric.label}: ${metric.value}${metric.unit ?? ""} — open project record`}
    >
      {body}
      <span className="enk-mono mt-2 inline-flex items-center gap-1 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[var(--enk-accent-on-dark)] transition-colors group-hover:text-[var(--enk-accent-primary-on-dark)]">
        View record
        <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}

export function ProofLedger() {
  return (
    <section
      aria-labelledby="ledger-heading"
      className="enk-section"
      style={{ backgroundColor: "var(--enk-bg-muted)", borderBottom: "1px solid var(--enk-rule)" }}
    >
      <div className="enk-container">
        <div className="max-w-2xl">
          <RecordEyebrow refNo="REF 01">Record &amp; Delivery Ledger</RecordEyebrow>
          <h2 id="ledger-heading" className="enk-display mt-4 text-[clamp(1.5rem,2.8vw,2rem)] text-[var(--enk-ink)]">
            Proof on file, tied to named project records
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[var(--enk-steel)] md:text-[15px]">
            Every figure below is drawn from the delivered-works register — benchmark
            records link straight to the source project file.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-9 md:grid-cols-3">
          {proofMetrics.map((metric) => (
            <LedgerEntry key={metric.label} metric={metric} />
          ))}
        </div>
      </div>
    </section>
  );
}
