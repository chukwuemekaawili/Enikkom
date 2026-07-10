import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RecordEyebrowProps {
  children: ReactNode;
  /** Optional document/section reference shown dim after the label, e.g. "REF 04" or "ENK-QHSE-01" */
  refNo?: string;
  /** Center the eyebrow (for centered section headers) */
  align?: "start" | "center";
  className?: string;
}

/**
 * Section label styled as a typed document field: short amber rule,
 * mono uppercase label, optional blueprint-toned reference number.
 * Field-records counterpart of `.enk-kicker`.
 */
export function RecordEyebrow({ children, refNo, align = "start", className }: RecordEyebrowProps) {
  return (
    <p className={cn("enk-record-eyebrow", align === "center" && "justify-center", className)}>
      <span>{children}</span>
      {refNo && (
        <span className="enk-record-eyebrow__ref" aria-label={`Reference ${refNo}`}>
          / {refNo}
        </span>
      )}
    </p>
  );
}
