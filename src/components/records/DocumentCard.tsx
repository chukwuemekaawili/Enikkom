import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { RecordStatusStamp, type StampTone } from "./RecordStatusStamp";

interface DocMeta {
  label: string;
  value: ReactNode;
}

interface DocumentCardProps {
  /** Document class overline, e.g. "CERTIFICATE", "POLICY", "CAPABILITY STATEMENT" */
  docType?: string;
  title: string;
  description?: string;
  /** Short provenance fields, e.g. Issuer / Ref no. / Valid until */
  meta?: DocMeta[];
  /** Optional status stamp in the header row, e.g. { label: "CURRENT", tone: "complete" } */
  stamp?: { label: string; tone?: StampTone };
  /** Document URL — the whole card becomes a link (opens in a new tab, never force-download) */
  href?: string;
  /** Footer action text; defaults to "View document" when href is set */
  actionLabel?: string;
  className?: string;
}

/**
 * Certificate / policy / download presented as a filed document:
 * squared sheet, amber title rule, typed doc-type header, provenance
 * fields, and a mono action row. Hover sharpens the frame — no lift.
 */
export function DocumentCard({
  docType,
  title,
  description,
  meta,
  stamp,
  href,
  actionLabel,
  className,
}: DocumentCardProps) {
  const body = (
    <>
      {(docType || stamp) && (
        <div className="flex items-center justify-between gap-3">
          {docType ? <p className="enk-overline">{docType}</p> : <span />}
          {stamp && <RecordStatusStamp tone={stamp.tone}>{stamp.label}</RecordStatusStamp>}
        </div>
      )}

      <h3 className="mt-3 font-heading text-[17px] font-semibold leading-snug text-[var(--enk-ink)]">
        {title}
      </h3>

      {description && (
        <p className="mt-2 text-[13px] leading-[1.55] text-[var(--enk-steel)]">{description}</p>
      )}

      {meta && meta.length > 0 && (
        <dl className="mt-4 space-y-1.5">
          {meta.map((item) => (
            <div key={item.label} className="flex items-baseline justify-between gap-4 text-[12px]">
              <dt className="enk-overline shrink-0">{item.label}</dt>
              <dd className="enk-mono text-right text-[12px] text-[var(--enk-ink)]">{item.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {href && (
        <p className="enk-mono mt-auto flex items-center gap-1.5 pt-5 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-[var(--enk-accent-on-dark)]">
          {actionLabel ?? "View document"}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </p>
      )}
    </>
  );

  const classes = cn("enk-doc-card p-5", className);

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {body}
      </a>
    );
  }
  return <div className={classes}>{body}</div>;
}
