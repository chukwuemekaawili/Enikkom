import { cn } from "@/lib/utils";

interface RecordMetricProps {
  /** Field label, e.g. "Longest single HDD crossing" */
  label: string;
  /** The recorded figure, e.g. "1,850" — rendered in tabular mono */
  value: string | number;
  /** Unit rendered after the value at reduced size, e.g. "m", "km", "LTI-free hrs" */
  unit?: string;
  /** Provenance or context line, e.g. "OML 58 Obite–Ubeta, 2021" */
  note?: string;
  className?: string;
}

/**
 * A single recorded figure presented as a ledger entry: hairline top
 * rule, typed field label, tabular-mono value, optional source note.
 * Replaces marketing-style animated KPI counters.
 */
export function RecordMetric({ label, value, unit, note, className }: RecordMetricProps) {
  return (
    <div className={cn("border-t border-[var(--enk-rule-strong)] pt-3", className)}>
      <p className="enk-overline">{label}</p>
      <p className="enk-mono mt-2 text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold leading-none text-[var(--enk-ink)]">
        {value}
        {unit && (
          <span className="ml-1.5 text-[0.55em] font-medium text-[var(--enk-meta)]">{unit}</span>
        )}
      </p>
      {note && (
        <p className="enk-mono mt-2 text-[11px] leading-[1.5] text-[var(--enk-blueprint)]">{note}</p>
      )}
    </div>
  );
}
