import { CircleDashed } from "lucide-react";
import { cn } from "@/lib/utils";

/** True when a content value is an unsupplied [[PLACEHOLDER: …]] token. */
export function isPlaceholder(v: unknown): v is string {
  return typeof v === "string" && /^\[\[PLACEHOLDER:/.test(v.trim());
}

/** Extract the human label from a [[PLACEHOLDER: label]] token. */
export function phLabel(v: string): string {
  return v.replace(/^\s*\[\[PLACEHOLDER:\s*/, "").replace(/\]\]\s*$/, "");
}

/**
 * Contained "to be supplied" token. Muted, dashed, fixed max-width and
 * truncating so it can never overflow or collide with neighbouring content.
 */
export function PlaceholderTag({
  value,
  onDark = false,
  className,
}: {
  value: string;
  onDark?: boolean;
  className?: string;
}) {
  const label = phLabel(value);
  return (
    <span
      title={`To be supplied: ${label}`}
      className={cn(
        "inline-flex max-w-full items-center gap-1.5 truncate rounded-md border border-dashed px-2 py-1 align-middle font-mono text-[11px] font-medium uppercase tracking-[0.06em]",
        className,
      )}
      style={{
        borderColor: onDark ? "var(--enk-line-dark)" : "var(--enk-line-strong)",
        color: onDark ? "var(--enk-on-dark-muted)" : "var(--enk-steel)",
        backgroundColor: onDark ? "transparent" : "var(--enk-bg)",
      }}
    >
      <CircleDashed className="h-3 w-3 shrink-0 opacity-70" aria-hidden="true" />
      <span className="truncate">{label}</span>
    </span>
  );
}

/** Larger contained placeholder for narrative/body blocks. Wraps, never overflows. */
export function PlaceholderBlock({ value, onDark = false }: { value: string; onDark?: boolean }) {
  const label = phLabel(value);
  return (
    <p
      className="mt-2 rounded-md border border-dashed px-3.5 py-3 font-mono text-[12px] leading-relaxed tracking-[0.02em]"
      style={{
        borderColor: onDark ? "var(--enk-line-dark)" : "var(--enk-line-strong)",
        color: onDark ? "var(--enk-on-dark-muted)" : "var(--enk-steel)",
        backgroundColor: onDark ? "transparent" : "var(--enk-bg-muted)",
      }}
    >
      To be supplied, {label}
    </p>
  );
}

/**
 * Renders a stat number, or, when not yet supplied, a clean, compact "TBD"
 * chip. The metric's descriptive label already sits beside it, so the chip
 * stays concise and reads as intentional pending data (not a blank value).
 */
export function StatValue({
  value,
  onDark = false,
  numberClassName,
}: {
  value: string;
  onDark?: boolean;
  numberClassName?: string;
}) {
  if (isPlaceholder(value)) {
    return (
      <span
        title={`To be supplied: ${phLabel(value)}`}
        className="inline-flex items-center gap-1.5 rounded-md border border-dashed px-2.5 py-1 align-middle font-mono text-[11px] font-semibold uppercase tracking-[0.1em]"
        style={{
          borderColor: onDark ? "var(--enk-line-dark)" : "var(--enk-line-strong)",
          color: onDark ? "var(--enk-on-dark-muted)" : "var(--enk-steel)",
        }}
      >
        <CircleDashed className="h-3 w-3 shrink-0 opacity-70" aria-hidden="true" />
        TBD
      </span>
    );
  }
  return <span className={cn("enk-stat", numberClassName)}>{value}</span>;
}
