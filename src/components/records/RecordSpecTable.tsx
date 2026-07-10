import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SpecRow {
  label: string;
  value: ReactNode;
}

interface RecordSpecTableProps {
  rows: SpecRow[];
  /** Optional table title rendered as an overline above, e.g. "Rig specifications" */
  caption?: string;
  /** Tighter row padding for sidebars / dense layouts */
  dense?: boolean;
  className?: string;
}

/**
 * Technical key/value ledger: title-block top rule, hairline dividers,
 * alternating registers, mono values. Semantic table — one row per spec.
 */
export function RecordSpecTable({ rows, caption, dense, className }: RecordSpecTableProps) {
  if (rows.length === 0) return null;
  return (
    <div className={className}>
      {caption && <p className="enk-overline mb-2.5">{caption}</p>}
      <table className={cn("enk-spec", dense && "enk-spec--dense")}>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
