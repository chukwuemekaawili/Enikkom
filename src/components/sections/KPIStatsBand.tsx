import { experienceYears } from "@/content/home";
import { RecordMetric } from "@/components/records";

interface KPIStat {
  value: string;
  label: string;
  suffix?: string;
  /** Optional provenance line, e.g. "Register 1995–2025" */
  note?: string;
}

interface KPIStatsBandProps {
  stats?: KPIStat[];
  /** Legacy prop, accepted for compatibility. */
  variant?: "light" | "dark";
}

const defaultStats: KPIStat[] = [
  { value: "100", suffix: "+", label: "KM HDD Installed" },
  { value: "500", suffix: "+", label: "Workforce" },
  { value: experienceYears, label: "Years Experience" },
  { value: "3", label: "ISO Systems Certified" },
];

/** Recorded figures presented as ledger entries — no icons, no count-ups. */
export function KPIStatsBand({ stats = defaultStats }: KPIStatsBandProps) {
  return (
    <section
      className="enk-section--tight"
      style={{ backgroundColor: "var(--enk-bg-muted)", borderBottom: "1px solid var(--enk-rule)" }}
    >
      <div className="enk-container">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <RecordMetric
              key={stat.label}
              label={stat.label}
              value={`${stat.value}${stat.suffix ?? ""}`}
              note={stat.note}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
