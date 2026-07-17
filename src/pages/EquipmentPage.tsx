import { Layout } from "@/components/layout";
import SEO from "@/components/ui/SEO";
import { Hero, CTABand } from "@/components/sections";
import { EditableText } from "@/components/content";
import { SectionHeading } from "@/components/home/SectionHeading";
import { usePageContent } from "@/hooks/useSiteSettings";
import { FieldFigure } from "@/components/records";
import {
  hddFleetSummary,
  hddSupportSummary,
  trenchlessSummary,
  marineSupportSummary,
} from "@/content/equipmentSpecs";
import { siteImageSelections } from "@/content/siteImageSelections";

function FleetGroupCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="enk-doc-card p-5">
      <h3 className="text-[15px] font-semibold text-[var(--enk-ink)]">{title}</h3>
      <p className="mt-2 text-[13.5px] leading-6 text-[var(--enk-steel)]">{description}</p>
    </div>
  );
}

export default function EquipmentPage() {
  const { content } = usePageContent('equipment');
  const heroContent = content.hero || {};
  const hddContent = content.hdd_fleet || {};
  const thrustContent = content.thrust_boring || {};
  const equipmentImages = siteImageSelections.equipment;

  return (
    <Layout>
      <SEO
        title="Equipment – Fleet Overview – Enikkom"
        description="Nigeria's largest in-country HDD fleet plus thrust boring, microtunneling, marine, and support equipment, owned and operated from our Nigerian bases."
        canonical="/equipment"
      />
      <Hero
        title={heroContent.title || "Equipment Fleet"}
        subtitle={heroContent.subtitle || "An owned fleet of HDD rigs, thrust boring and microtunneling spreads, marine assets, and support equipment, mobilized from our bases across Nigeria."}
        badge={heroContent.badge || "Equipment"}
        primaryCTA={{ label: heroContent.primaryBtnText || "View HDD fleet", href: heroContent.primaryBtnLink || "#hdd" }}
        backgroundImage={heroContent.backgroundImage || equipmentImages.hero}
        size="default"
      />

      {/* HDD Rig Fleet */}
      <section id="hdd" className="enk-section scroll-mt-24" style={{ borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <SectionHeading
            kicker="Core fleet"
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
                value={hddContent.description || "Nigeria's largest in-country HDD fleet: American Augers rigs spanning compact units to 500-ton class maxi rigs, operated and maintained by our own crews."}
                pageSlug="equipment"
                sectionKey="hdd_fleet"
                field="description"
              />
            }
          />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {hddFleetSummary.map((group) => (
              <FleetGroupCard key={group.title} title={group.title} description={group.description} />
            ))}
          </div>

          <div className="enk-doc-card mt-4 p-5">
            <p className="enk-overline">Support systems</p>
            <p className="mt-2 max-w-3xl text-[13.5px] leading-6 text-[var(--enk-steel)]">{hddSupportSummary}</p>
          </div>
        </div>
      </section>

      {/* Thrust Boring & Micro Tunnelling */}
      <section className="enk-section" style={{ backgroundColor: "var(--enk-bg-muted)", borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <SectionHeading
            kicker="Trenchless technology"
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
                value={thrustContent.description || "Thrust boring and microtunneling spreads that complement the HDD fleet where a crossing calls for casing or close line-and-grade control."}
                pageSlug="equipment"
                sectionKey="thrust_boring"
                field="description"
              />
            }
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {trenchlessSummary.map((group) => (
              <FleetGroupCard key={group.title} title={group.title} description={group.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Marine & Support Equipment */}
      <section className="enk-section" style={{ borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <SectionHeading
            kicker="Marine & support"
            title={<>Marine &amp; Support Equipment</>}
            intro="Owned marine, civil, and logistics equipment that keeps crossing crews working in river, swamp, and remote terrain."
          />

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <FieldFigure
              src={equipmentImages.support}
              alt="Heavy transport and support fleet assets mobilized for field operations"
              caption="Heavy transport and support fleet mobilized to keep project sites supplied and running"
              ratio="16/10"
            />
            <div className="grid gap-4 content-start">
              {marineSupportSummary.map((group) => (
                <FleetGroupCard key={group.title} title={group.title} description={group.description} />
              ))}
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
          </div>
        </div>
      </section>

      <CTABand
        headline={content.cta?.headline || "Need Equipment for Your Project?"}
        subhead={content.cta?.subhead || "Access Nigeria's largest in-country HDD fleet. Get availability and specifications within 24 hours."}
        primaryCTA={{ label: "Contact us", href: "/contact" }}
        secondaryCTA={{ label: "View HDD capabilities", href: "/capabilities/hdd" }}
      />
    </Layout>
  );
}
