import { Layout } from "@/components/layout";
import SEO from "@/components/ui/SEO";
import { Hero, CTABand } from "@/components/sections";
import { EditableText } from "@/components/content";
import { SectionHeading } from "@/components/home/SectionHeading";
import { usePageContent } from "@/hooks/useSiteSettings";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FieldFigure, RecordMetric } from "@/components/records";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  equipmentSourceNote,
  hddRigSpecs,
  thrustBoringSpecs,
  microTunnelingSpecs,
  marineFleetSpecs,
  supportFleetSpecs,
  hddSupportSystems,
} from "@/content/equipmentSpecs";
import { siteImageSelections } from "@/content/siteImageSelections";

/** Squared, ruled register frame shared by every fleet table on this page. */
function RegisterFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="overflow-x-auto rounded-[var(--enk-radius-record)] border"
      style={{ borderColor: "var(--enk-rule-strong)", backgroundColor: "var(--enk-record-surface)" }}
    >
      {children}
    </div>
  );
}

const headCls = "enk-overline !text-[10.5px] whitespace-nowrap";
const cellCls = "text-[13px]";
const monoCls = "enk-mono text-[12.5px] whitespace-nowrap";

export default function EquipmentPage() {
  const { content } = usePageContent('equipment');
  const heroContent = content.hero || {};
  const hddContent = content.hdd_fleet || {};
  const thrustContent = content.thrust_boring || {};
  const equipmentImages = siteImageSelections.equipment;

  return (
    <Layout>
      <SEO
        title="Equipment – Fleet Specs & Capacity – Enikkom"
        description="Document-backed technical capacity: West Africa's largest HDD fleet, thrust boring, microtunneling, marine, and support equipment with model-level ratings."
        canonical="/equipment"
      />
      <Hero
        title={heroContent.title || "Technical Capacity & Equipment Fleet"}
        subtitle={heroContent.subtitle || "Document-backed technical capacity across Enikkom's HDD, thrust boring, microtunneling, marine, and support fleets, with model-specific engineering ratings for every major asset class."}
        badge={heroContent.badge || "Equipment Register"}
        primaryCTA={{ label: heroContent.primaryBtnText || "View HDD fleet", href: heroContent.primaryBtnLink || "#hdd" }}
        backgroundImage={heroContent.backgroundImage || equipmentImages.hero}
        size="default"
      />

      {/* Fleet capacity figures */}
      <section className="enk-section--tight" style={{ borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
            <RecordMetric label="Top HDD Pullback Class" value="500" unit="T" />
            <RecordMetric label="DD-1100 Max Thrust" value="4,893" unit="kN" />
            <RecordMetric label="Largest Thrust Boring Rating" value="1.2M" unit="lb" />
            <RecordMetric label="Owned Cutter Suction Dredgers" value="2" unit="CSDs" />
          </div>
        </div>
      </section>

      {/* HDD Rig Fleet */}
      <section id="hdd" className="enk-section scroll-mt-24" style={{ borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <SectionHeading
            kicker="Core Fleet"
            title={
              <EditableText
                value={hddContent.title || "HDD Rig Fleet"}
                pageSlug="equipment"
                sectionKey="hdd_fleet"
                field="title"
              />
            }
            intro={
              <EditableText
                value={hddContent.description || "Model-by-model HDD ratings from our technical capacity schedule. The DD-1100 and DD-1100 RS are listed as separate 500-ton rigs, with rated thrust (and kN conversions), rotary torque, power, and fluid-flow figures for each unit."}
                pageSlug="equipment"
                sectionKey="hdd_fleet"
                field="description"
              />
            }
          />

          <div className="mt-8">
            <RegisterFrame>
              <Table>
                <TableHeader>
                  <TableRow style={{ backgroundColor: "var(--enk-record-inset)" }}>
                    <TableHead className={headCls}>Model</TableHead>
                    <TableHead className={headCls}>Inventory Label</TableHead>
                    <TableHead className={headCls}>Pullback Class</TableHead>
                    <TableHead className={headCls}>Rated Thrust / kN</TableHead>
                    <TableHead className={headCls}>Rotary Torque</TableHead>
                    <TableHead className={headCls}>Power / Flow</TableHead>
                    <TableHead className={headCls}>Qty</TableHead>
                    <TableHead className={headCls}>Year</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hddRigSpecs.map((item, i) => (
                    <TableRow key={i} className="hover:bg-[var(--enk-ledger-row-hover)] transition-colors">
                      <TableCell className={`${cellCls} font-medium`}>
                        {item.model}
                        {(item.model === "American Augers DD-1100" || item.model === "American Augers DD-1100 RS") && (
                          <span className="enk-chip ml-2">500T</span>
                        )}
                      </TableCell>
                      <TableCell className={`${monoCls} text-[var(--enk-blueprint)]`}>{item.inventoryLabel}</TableCell>
                      <TableCell className={`${monoCls} font-semibold text-[var(--enk-ink)]`}>{item.pullbackClass}</TableCell>
                      <TableCell className={`${cellCls} min-w-[190px] text-[var(--enk-steel)]`}>{item.thrustRating}</TableCell>
                      <TableCell className={`${cellCls} min-w-[170px] text-[var(--enk-steel)]`}>{item.rotaryTorque}</TableCell>
                      <TableCell className={`${cellCls} min-w-[210px] text-[var(--enk-steel)]`}>
                        <div>{item.power}</div>
                        <div className="mt-1 text-[11px]">{item.fluidFlow}</div>
                      </TableCell>
                      <TableCell className={monoCls}>{item.quantity}</TableCell>
                      <TableCell className={monoCls}>{item.year}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </RegisterFrame>
            <p className="enk-mono mt-3 text-[11px] leading-[1.6] text-[var(--enk-blueprint)]">
              {equipmentSourceNote}
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {hddRigSpecs.filter((item) =>
                [
                  "American Augers DD-580",
                  "American Augers DD-1100",
                  "American Augers DD-1100 RS",
                  "American Augers DD-625",
                ].includes(item.model)
              ).map((item) => (
                <div key={item.model} className="enk-doc-card p-4">
                  <p className="enk-overline !text-[10px]">Unit Note</p>
                  <p className="mt-2 text-[12.5px] font-semibold text-[var(--enk-ink)]">{item.model}</p>
                  <p className="mt-1 text-[12.5px] leading-6 text-[var(--enk-steel)]">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HDD Support Systems & Downhole Equipment */}
      <section className="enk-section" style={{ borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <SectionHeading kicker="Support Systems" title={<>HDD Support Systems &amp; Downhole Equipment</>} />
          <div className="mt-8">
            <RegisterFrame>
              <Table>
                <TableHeader>
                  <TableRow style={{ backgroundColor: "var(--enk-record-inset)" }}>
                    <TableHead className={headCls}>System</TableHead>
                    <TableHead className={headCls}>Documented Detail</TableHead>
                    <TableHead className={headCls}>Qty</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hddSupportSystems.map((item, i) => (
                    <TableRow key={i} className="hover:bg-[var(--enk-ledger-row-hover)] transition-colors">
                      <TableCell className={`${cellCls} font-medium`}>{item.system}</TableCell>
                      <TableCell className={`${cellCls} text-[var(--enk-steel)]`}>{item.detail}</TableCell>
                      <TableCell className={monoCls}>{item.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </RegisterFrame>
          </div>
        </div>
      </section>

      {/* Thrust Boring & Micro Tunnelling */}
      <section className="enk-section" style={{ backgroundColor: "var(--enk-bg-muted)", borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <SectionHeading
            kicker="Trenchless Technology"
            title={
              <EditableText
                value={thrustContent.title || "Thrust Boring & Micro Tunnelling"}
                pageSlug="equipment"
                sectionKey="thrust_boring"
                field="title"
              />
            }
            intro={
              <EditableText
                value={thrustContent.description || "Rated push-capacity schedules for the American Augers thrust boring fleet and the dedicated microtunneling / pipe pusher spreads in the equipment register."}
                pageSlug="equipment"
                sectionKey="thrust_boring"
                field="description"
              />
            }
          />

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <p className="enk-overline mb-3">Thrust Boring Machines</p>
              <RegisterFrame>
                <Table>
                  <TableHeader>
                    <TableRow style={{ backgroundColor: "var(--enk-record-inset)" }}>
                      <TableHead className={headCls}>Equipment</TableHead>
                      <TableHead className={headCls}>Make</TableHead>
                      <TableHead className={headCls}>Rated Capacity</TableHead>
                      <TableHead className={headCls}>Year</TableHead>
                      <TableHead className={headCls}>Qty</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {thrustBoringSpecs.map((item, i) => (
                      <TableRow key={i} className="hover:bg-[var(--enk-ledger-row-hover)] transition-colors">
                        <TableCell className={`${cellCls} font-medium`}>{item.equipment}</TableCell>
                        <TableCell className={cellCls}>{item.make}</TableCell>
                        <TableCell className={`${cellCls} text-[var(--enk-steel)]`}>{item.rating}</TableCell>
                        <TableCell className={monoCls}>{item.year}</TableCell>
                        <TableCell className={monoCls}>{item.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </RegisterFrame>
            </div>

            <div>
              <p className="enk-overline mb-3">Micro Tunnelling Equipment</p>
              <RegisterFrame>
                <Table>
                  <TableHeader>
                    <TableRow style={{ backgroundColor: "var(--enk-record-inset)" }}>
                      <TableHead className={headCls}>Equipment</TableHead>
                      <TableHead className={headCls}>Make</TableHead>
                      <TableHead className={headCls}>Rated Capacity</TableHead>
                      <TableHead className={headCls}>Year</TableHead>
                      <TableHead className={headCls}>Qty</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {microTunnelingSpecs.map((item, i) => (
                      <TableRow key={i} className="hover:bg-[var(--enk-ledger-row-hover)] transition-colors">
                        <TableCell className={`${cellCls} font-medium`}>{item.equipment}</TableCell>
                        <TableCell className={cellCls}>{item.make}</TableCell>
                        <TableCell className={`${cellCls} text-[var(--enk-steel)]`}>{item.rating}</TableCell>
                        <TableCell className={monoCls}>{item.year}</TableCell>
                        <TableCell className={monoCls}>{item.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </RegisterFrame>
            </div>
          </div>
        </div>
      </section>

      {/* Marine & Support Equipment */}
      <section className="enk-section" style={{ borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <SectionHeading
            kicker="Marine & Support"
            title={<>Marine &amp; Support Equipment</>}
            intro="Detailed marine, civil, and logistics fleet groupings from the owned-equipment schedule, including dredgers, excavators, sidebooms, cranes, transport, generators, and field vehicles."
          />

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <p className="enk-overline mb-3">Marine Equipment</p>
              <RegisterFrame>
                <Table>
                  <TableHeader>
                    <TableRow style={{ backgroundColor: "var(--enk-record-inset)" }}>
                      <TableHead className={headCls}>Asset Category</TableHead>
                      <TableHead className={headCls}>Documented Detail</TableHead>
                      <TableHead className={headCls}>Qty</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {marineFleetSpecs.map((item, i) => (
                      <TableRow key={i} className="hover:bg-[var(--enk-ledger-row-hover)] transition-colors">
                        <TableCell className={`${cellCls} font-medium`}>{item.category}</TableCell>
                        <TableCell className={`${cellCls} text-[var(--enk-steel)]`}>{item.detail}</TableCell>
                        <TableCell className={monoCls}>{item.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </RegisterFrame>
            </div>

            <div>
              <p className="enk-overline mb-3">Support Equipment</p>
              <FieldFigure
                src={equipmentImages.support}
                alt="Heavy transport and support fleet assets mobilized for field operations"
                caption="Heavy transport and support fleet mobilized to keep project sites supplied and running"
                ratio="16/10"
                className="mb-4"
              />
              <RegisterFrame>
                <Table>
                  <TableHeader>
                    <TableRow style={{ backgroundColor: "var(--enk-record-inset)" }}>
                      <TableHead className={headCls}>Fleet Category</TableHead>
                      <TableHead className={headCls}>Documented Detail</TableHead>
                      <TableHead className={headCls}>Qty</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {supportFleetSpecs.map((item, i) => (
                      <TableRow key={i} className="hover:bg-[var(--enk-ledger-row-hover)] transition-colors">
                        <TableCell className={`${cellCls} font-medium`}>{item.category}</TableCell>
                        <TableCell className={`${cellCls} text-[var(--enk-steel)]`}>{item.detail}</TableCell>
                        <TableCell className={monoCls}>{item.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </RegisterFrame>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Note */}
      <section className="enk-section--tight" style={{ backgroundColor: "var(--enk-bg-muted)", borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <div className="enk-doc-card flex flex-col items-start justify-between gap-6 p-6 md:flex-row md:items-center md:p-7">
            <div>
              <p className="enk-overline">Technical Partnership</p>
              <h3 className="mt-2 text-[17px] font-semibold text-[var(--enk-ink)]">
                <EditableText
                  value={content.partnership?.title || "Technical Partnership with HDDThailand Co. Ltd"}
                  pageSlug="equipment"
                  sectionKey="partnership"
                  field="title"
                />
              </h3>
              <p className="mt-2 max-w-2xl text-[13.5px] leading-6 text-[var(--enk-steel)]">
                <EditableText
                  value={content.partnership?.description || "HDDThailand Co. Ltd is an international trenchless specialist with over 15 years of experience. HDDThailand provides engineering services, project management services, and quality assurance procedures consistent with ISO-9001 certification for all directional drilling projects. This collaboration brings proven trenchless technology to the oil and gas industry."}
                  pageSlug="equipment"
                  sectionKey="partnership"
                  field="description"
                />
              </p>
            </div>
            <Link to="/contact" className="enk-btn enk-btn--gold shrink-0">
              Contact us
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CTABand
        headline={content.cta?.headline || "Need Equipment for Your Project?"}
        subhead={content.cta?.subhead || "Access West Africa's largest HDD fleet. Get availability and specifications within 24 hours."}
        primaryCTA={{ label: "Contact us", href: "/contact" }}
        secondaryCTA={{ label: "View HDD capabilities", href: "/capabilities/hdd" }}
      />
    </Layout>
  );
}
