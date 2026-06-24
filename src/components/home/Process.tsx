import { SectionHeading } from "./SectionHeading";

const steps = [
  {
    no: "01",
    title: "Feasibility & route survey",
    body: "Route walkover, geotechnical and bathymetric survey to fix the corridor, entry and exit points and the viable crossing method.",
  },
  {
    no: "02",
    title: "Engineering & bore design",
    body: "Bore profile, drilling-fluid programme and rig spread selected and engineered in-house to the pipe spec and ground model.",
  },
  {
    no: "03",
    title: "HDD spread execution",
    body: "Rig mobilised for pilot bore, reaming and swabbing passes, with drilling parameters and the as-drilled profile tracked throughout.",
  },
  {
    no: "04",
    title: "Pullback, tie-in & commissioning",
    body: "Pre-fabricated string pulled back, tied in and hydrotested, then handed over with complete as-built records.",
  },
];

/**
 * Delivery model, how a scope moves from feasibility to handover under one
 * accountable team. Distinct from Capabilities (what we do) and QHSE (assurance);
 * this section owns the "engineered, executed and documented in-house" message.
 */
export function Process() {
  return (
    <section id="process" className="enk-section">
      <div className="enk-container">
        <SectionHeading
          kicker="How we deliver"
          title="One accountable team, from feasibility to handover"
          intro="Every scope runs through the same disciplined sequence, engineered, executed and documented in-house, with a single point of accountability."
        />

        <ol className="mt-12 grid gap-px overflow-hidden rounded-[10px] border border-[var(--enk-line)] bg-[var(--enk-line)] md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li
              key={s.no}
              className="flex flex-col gap-3 p-7 lg:p-8"
              style={{ backgroundColor: "var(--enk-bg)" }}
            >
              <span className="font-mono text-[13px] font-medium tracking-[0.14em] text-[var(--enk-gold)]">
                {s.no}
              </span>
              <h3 className="text-[18px] font-semibold text-[var(--enk-ink)]">{s.title}</h3>
              <p className="text-[14.5px] leading-relaxed text-[var(--enk-steel)]">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
