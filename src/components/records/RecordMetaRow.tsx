import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface MetaItem {
  label: string;
  value: ReactNode;
}

interface RecordMetaRowProps {
  /** Ordered fields, e.g. Client / Location / Year / Scope / Status */
  items: MetaItem[];
  className?: string;
}

/**
 * Drawing-title-block metadata strip: horizontal run of labelled
 * fields divided by vertical hairlines, bounded by rules above and
 * below. Use directly under a page or record heading.
 */
export function RecordMetaRow({ items, className }: RecordMetaRowProps) {
  if (items.length === 0) return null;
  return (
    <dl className={cn("enk-meta-strip", className)}>
      {items.map((item) => (
        <div key={item.label} className="enk-meta-strip__item">
          <dt className="enk-overline">{item.label}</dt>
          <dd className="enk-meta-strip__value">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
