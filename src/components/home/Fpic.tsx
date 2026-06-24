import { Landmark, Users, ShieldCheck, type LucideIcon } from "lucide-react";
import { fpic } from "@/content/home";
import { SectionHeading } from "./SectionHeading";

const icons: LucideIcon[] = [Landmark, Users, ShieldCheck];

/** Indigenous capacity / FPIC framed as a commercial, risk-reducing advantage. */
export function Fpic() {
  return (
    <section className="enk-section" style={{ backgroundColor: "var(--enk-navy)" }}>
      <div className="enk-container">
        <SectionHeading
          kicker="Indigenous advantage"
          title="Local capacity that lowers your project risk"
          intro="Indigenous standing and FPIC-in-practice engagement are not a compliance checkbox here. They keep corridors open, approvals on track, and schedules protected."
          onDark
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-[10px] border border-[var(--enk-line-dark)] bg-[var(--enk-line-dark)] md:grid-cols-3">
          {fpic.points.map((p, i) => {
            const Icon = icons[i] ?? ShieldCheck;
            return (
              <div key={p.title} className="flex flex-col gap-4 p-8" style={{ backgroundColor: "var(--enk-navy-2)" }}>
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md"
                  style={{ backgroundColor: "oklch(0.81 0.13 85 / 0.14)", color: "var(--enk-gold)" }}
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-[18px] font-semibold text-[var(--enk-on-dark)]">{p.title}</h3>
                <p className="text-[14.5px] leading-relaxed text-[var(--enk-on-dark-muted)]">{p.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
