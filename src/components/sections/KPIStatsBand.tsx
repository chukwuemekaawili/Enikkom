import { LucideIcon, Shield, Clock, Award, Users } from "lucide-react";

interface KPIStat {
  value: string;
  label: string;
  icon?: LucideIcon;
  suffix?: string;
}

interface KPIStatsBandProps {
  stats?: KPIStat[];
  variant?: "light" | "dark";
}

const defaultStats: KPIStat[] = [
  { value: "100", label: "KM HDD Installed", icon: Shield, suffix: "+" },
  { value: "500", label: "Workforce", icon: Users, suffix: "+" },
  { value: "34", label: "Years Experience", icon: Clock },
  { value: "0", label: "LTI Record", icon: Award },
];

/** KPI stat band, in the `.enk` design language. */
export function KPIStatsBand({ stats = defaultStats, variant = "dark" }: KPIStatsBandProps) {
  const dark = variant === "dark";

  return (
    <section
      className="enk-section"
      style={{ backgroundColor: dark ? "var(--enk-navy)" : "var(--enk-bg-muted)" }}
    >
      <div className="enk-container">
        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                {Icon && (
                  <div
                    className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-md"
                    style={{
                      backgroundColor: dark ? "oklch(1 0 0 / 0.08)" : "oklch(0.81 0.13 85 / 0.14)",
                      color: dark ? "var(--enk-on-dark)" : "var(--enk-bronze)",
                    }}
                    aria-hidden="true"
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                )}
                <dd
                  className={`enk-display text-[clamp(2rem,5vw,3rem)] leading-none ${
                    dark ? "text-[var(--enk-on-dark)]" : "text-[var(--enk-ink)]"
                  }`}
                >
                  {stat.value}
                  {stat.suffix}
                </dd>
                <dt
                  className={`mt-2 text-[12px] font-semibold uppercase tracking-[0.1em] ${
                    dark ? "text-[var(--enk-on-dark-muted)]" : "text-[var(--enk-steel)]"
                  }`}
                >
                  {stat.label}
                </dt>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
