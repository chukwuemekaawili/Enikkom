import {
  DocumentCard,
  FieldFigure,
  RecordEyebrow,
  RecordMetaRow,
  RecordMetric,
  RecordSpecTable,
  RecordStatusStamp,
} from "@/components/records";
import { selectedGeneralImage } from "@/content/siteImageSelections";

/**
 * DEV-ONLY styleguide for the Industrial Field Records kit.
 * Routed at /dev/records in development builds only (see App.tsx).
 * Not part of the public site; safe to delete once pages adopt the kit.
 */
export default function RecordsKitDemo() {
  return (
    <div className="enk min-h-screen">
      <main className="enk-container space-y-14 py-14">
        <header className="space-y-3">
          <RecordEyebrow refNo="ENK-DS-01">Field Records Kit</RecordEyebrow>
          <h1 className="enk-display text-[clamp(1.8rem,3vw,2.4rem)] text-[var(--enk-ink)]">
            Component styleguide
          </h1>
        </header>

        <section className="space-y-4">
          <p className="enk-overline">RecordEyebrow</p>
          <div className="flex flex-col items-start gap-3">
            <RecordEyebrow>Project Record</RecordEyebrow>
            <RecordEyebrow refNo="SEC 04">QHSE Performance</RecordEyebrow>
          </div>
        </section>

        <section className="space-y-4">
          <p className="enk-overline">RecordStatusStamp</p>
          <div className="flex flex-wrap gap-3">
            <RecordStatusStamp tone="complete">Completed</RecordStatusStamp>
            <RecordStatusStamp tone="qhse">Zero LTI</RecordStatusStamp>
            <RecordStatusStamp tone="record">Project Record</RecordStatusStamp>
            <RecordStatusStamp tone="neutral">On File</RecordStatusStamp>
            <RecordStatusStamp tone="alert">Restricted</RecordStatusStamp>
          </div>
        </section>

        <section className="space-y-4">
          <p className="enk-overline">RecordMetric</p>
          <div className="grid gap-8 sm:grid-cols-3">
            <RecordMetric
              label="Longest single HDD crossing"
              value="1,850"
              unit="m"
              note="OML 58, Obite–Ubeta pipeline"
            />
            <RecordMetric label="Crossings completed" value="120+" note="1999–2026, Niger Delta" />
            <RecordMetric
              label="Lost-time incidents"
              value="0"
              note="4.2M man-hours, rolling record"
            />
          </div>
        </section>

        <section className="space-y-4">
          <p className="enk-overline">RecordMetaRow</p>
          <RecordMetaRow
            items={[
              { label: "Client", value: "TotalEnergies / NNPC" },
              { label: "Location", value: "OML 58, Rivers State" },
              { label: "Year", value: "2021–2022" },
              { label: "Scope", value: '48" HDD crossing, 1,850 m' },
              { label: "Status", value: <RecordStatusStamp tone="complete">Completed</RecordStatusStamp> },
            ]}
          />
        </section>

        <section className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="enk-overline">RecordSpecTable</p>
            <RecordSpecTable
              caption="Rig specifications"
              rows={[
                { label: "Rig class", value: "250 t maxi-rig" },
                { label: "Max pullback", value: "2,500 kN" },
                { label: "Torque", value: "100,000 Nm" },
                { label: "Pipe diameter", value: 'up to 56"' },
                { label: "Mud system", value: "1,200 GPM recycling" },
              ]}
            />
          </div>
          <div className="space-y-4">
            <p className="enk-overline">FieldFigure</p>
            <FieldFigure
              src={selectedGeneralImage("pl-02.jpg")}
              alt="HDD rig at crossing exit point"
              figNo="FIG 04"
              caption="Rig-up at exit point, 48-inch river crossing."
              location="Bonny Island, Rivers State"
              date="MAR 2022"
            />
          </div>
        </section>

        <section className="space-y-4">
          <p className="enk-overline">DocumentCard</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <DocumentCard
              docType="Certificate"
              title="ISO 9001:2015 Quality Management"
              description="Certified quality management system covering trenchless, pipeline and marine civil works."
              meta={[
                { label: "Issuer", value: "DNV GL" },
                { label: "Ref", value: "ENK-QMS-2015-114" },
                { label: "Valid to", value: "2027-03" },
              ]}
              stamp={{ label: "Current", tone: "complete" }}
              href="#"
            />
            <DocumentCard
              docType="Policy"
              title="HSE Policy Statement"
              description="Corporate health, safety and environment policy signed by the Managing Director."
              meta={[{ label: "Revision", value: "REV 06 / 2026" }]}
              stamp={{ label: "QHSE", tone: "qhse" }}
              href="#"
              actionLabel="View policy"
            />
            <DocumentCard
              docType="Capability Statement"
              title="Enikkom Corporate Profile 2026"
              description="Full contractor credential pack: equipment schedule, project record, HSE statistics."
              stamp={{ label: "Project Record", tone: "record" }}
              href="#"
              actionLabel="Download PDF"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
