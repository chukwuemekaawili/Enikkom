import { SectionHeading } from "./SectionHeading";

const steps = [
  {
    no: "01",
    title: "Feasibility & site survey",
    body: "Route walkover, geotechnical and bathymetric survey to fix the corridor, entry and exit points and the viable installation method.",
  },
  {
    no: "02",
    title: "Engineering & method design",
    body: "Crossing or pipeline method, spread and installation sequence engineered in-house to the pipe spec, ground model and marine conditions.",
  },
  {
    no: "03",
    title: "Mobilisation & execution",
    body: "Spread mobilised and the works executed — drilling, welding, dredging or piling — with parameters and as-built progress tracked throughout.",
  },
  {
    no: "04",
    title: "Tie-in, test & handover",
    body: "The line is tied in, hydrotested and commissioned, then handed over with complete as-built records.",
  },
];

/**
 * Delivery model, how a scope moves from feasibility to handover under one
 * accountable team. Distinct from Capabilities (what we do) and QHSE (assurance);
 * this section owns the "engineered, executed and documented in-house" message.
 */
export function Process() {
  return (
    <section id="process" className="enk-section" style={{ borderTop: "1px solid var(--enk-line-dark)" }}>
      <div className="enk-container">
        <SectionHeading
          kicker="How we deliver"
          title="One accountable team, from feasibility to handover"
          intro="Every scope runs through the same disciplined sequence, engineered, executed and documented in-house, with a single point of accountability."
        />

        <ol className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-[var(--enk-line-dark)] bg-[var(--enk-line-dark)] md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li
              key={s.no}
              className="flex flex-col gap-3 p-7 lg:p-8"
              style={{ backgroundColor: "var(--enk-surface-card)" }}
            >
              <span className="text-[14px] font-bold tabular-nums text-[var(--enk-accent-on-dark)]">
                {s.no}
              </span>
              <h3 className="text-[18px] font-bold text-[var(--enk-on-dark)]">{s.title}</h3>
              <p className="text-[14px] leading-relaxed text-[var(--enk-on-dark-muted)]">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
