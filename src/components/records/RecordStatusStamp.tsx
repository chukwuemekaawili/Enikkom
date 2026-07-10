import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type StampTone = "complete" | "qhse" | "record" | "neutral" | "alert";

interface RecordStatusStampProps {
  children: ReactNode;
  /**
   * complete/qhse → safety green (COMPLETED, ZERO LTI)
   * record → amber (PROJECT RECORD, CREDENTIAL)
   * neutral → steel (ON FILE, ARCHIVED)
   * alert → red (RESTRICTED, ATTENTION)
   */
  tone?: StampTone;
  className?: string;
}

const toneClass: Record<StampTone, string> = {
  complete: "enk-stamp--complete",
  qhse: "enk-stamp--complete",
  record: "enk-stamp--record",
  neutral: "enk-stamp--neutral",
  alert: "enk-stamp--alert",
};

/**
 * Compact official record-state stamp: bordered, squared, mono
 * uppercase with a leading tone square. e.g. ZERO LTI, COMPLETED,
 * PROJECT RECORD, ISO 9001:2015.
 */
export function RecordStatusStamp({ children, tone = "neutral", className }: RecordStatusStampProps) {
  return <span className={cn("enk-stamp", toneClass[tone], className)}>{children}</span>;
}
