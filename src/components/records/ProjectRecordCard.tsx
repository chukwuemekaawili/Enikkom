import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { EnhancedImage } from "@/components/ui/enhanced-image";
import { RecordStatusStamp } from "./RecordStatusStamp";
import { cn } from "@/lib/utils";

interface ProjectRecordCardProps {
  title: string;
  /** Detail-page route. Omit when no detail file is published — the card
      then renders as a non-interactive summary with a neutral status line. */
  href?: string;
  location?: string;
  /** Key figure, e.g. `16" × 3.1km` — shown as a DIMENSIONS ledger row when it contains digits */
  metric?: string;
  /** Technical descriptor, e.g. "Africa's Longest Single Drill" */
  metricLabel?: string;
  client?: string;
  year?: string;
  thumbnail?: string;
  tags?: string[];
  className?: string;
}

/** Benchmark-holding entries get an amber RECORD stamp; detection is
    driven by the existing descriptor text, never invented. */
const RECORD_RE = /longest|largest|deepest|first|record/i;

function LedgerRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-[var(--enk-rule)] py-2">
      <dt className="enk-overline shrink-0 !text-[10.5px]">{label}</dt>
      <dd className="enk-mono text-right text-[12px] leading-snug text-[var(--enk-ink)]">{value}</dd>
    </div>
  );
}

/**
 * A completed project presented as a filed field record: typed header
 * row, documentary photo plate, ledger metadata, mono action. Squared,
 * ruled, no lift/glow — the archive counterpart of CaseStudyCard.
 */
export function ProjectRecordCard({
  title,
  href,
  location,
  metric,
  metricLabel,
  client,
  year,
  thumbnail,
  tags = [],
  className,
}: ProjectRecordCardProps) {
  const isRecordHolder = Boolean(metricLabel && RECORD_RE.test(metricLabel));
  // Non-dimensional figures ("First", "Dual") read wrong as a DIMENSIONS
  // row — fold them into the summary line instead.
  const showDimensions = Boolean(metric && /\d/.test(metric));
  const summary = showDimensions ? metricLabel : [metric, metricLabel].filter(Boolean).join(" ");
  const hasDetail = Boolean(href);

  const body = (
    <>
      {/* Typed header row */}
      <div className="flex min-h-[38px] items-center justify-between gap-3 border-b border-[var(--enk-rule)] px-4 py-1.5">
        <p className="enk-overline !text-[10px]">Project Record</p>
        <div className="flex items-center gap-2.5">
          {isRecordHolder && <RecordStatusStamp tone="record">Record</RecordStatusStamp>}
          {year && <span className="enk-mono text-[11px] font-medium text-[var(--enk-blueprint)]">{year}</span>}
        </div>
      </div>

      {/* Documentation photo */}
      {thumbnail && (
        <div className="relative aspect-[16/9] overflow-hidden border-b border-[var(--enk-rule)]">
          <EnhancedImage
            src={thumbnail}
            alt={title}
            tone="documentary"
            wrapperClassName="h-full w-full"
            loading="lazy"
            fallbackLabel={title}
          />
        </div>
      )}

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3.5">
        <h3 className="font-heading text-[16px] font-semibold leading-snug text-[var(--enk-ink)]">
          {title}
        </h3>
        {summary && (
          <p className="mt-1.5 text-[12.5px] leading-[1.5] text-[var(--enk-steel)]">{summary}</p>
        )}

        <dl className="mt-3.5">
          {client && <LedgerRow label="Client" value={client} />}
          {location && <LedgerRow label="Location" value={location} />}
          {showDimensions && metric && <LedgerRow label="Dimensions" value={metric} />}
          {tags.length > 0 && <LedgerRow label="Scope" value={tags.join(" · ")} />}
        </dl>

        {hasDetail ? (
          <span className="enk-mono mt-auto flex items-center gap-1.5 border-t border-[var(--enk-rule)] pt-3.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--enk-accent-on-dark)] transition-colors group-hover:text-[var(--enk-accent-primary-on-dark)]">
            View record
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        ) : (
          // No published detail file — neutral, non-interactive status line.
          <span className="enk-mono mt-auto border-t border-[var(--enk-rule)] pt-3.5 text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--enk-blueprint)]">
            Detail file not published
          </span>
        )}
      </div>
    </>
  );

  if (!hasDetail) {
    return (
      <div className={cn("enk-doc-card flex h-full flex-col overflow-hidden", className)}>
        {body}
      </div>
    );
  }

  return (
    <Link
      to={href!}
      className={cn("enk-doc-card enk-doc-card--interactive group flex h-full flex-col overflow-hidden focus-ring", className)}
    >
      {body}
    </Link>
  );
}
