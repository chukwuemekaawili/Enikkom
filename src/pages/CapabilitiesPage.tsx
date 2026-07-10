import { Layout } from "@/components/layout";
import SEO from "@/components/ui/SEO";
import { Hero, CTABand, CapabilityCard, CertificationsBlock } from "@/components/sections";
import { RecordStatusStamp } from "@/components/records";
import { usePageContent, useCollection } from "@/hooks/useSiteSettings";
import { Drill, PipetteIcon, Anchor, Factory, Shield, Briefcase } from "lucide-react";
import { siteImageSelections } from "@/content/siteImageSelections";

const capabilityImages = siteImageSelections.capabilities;

const defaultCapabilities = [
  {
    title: "Horizontal Directional Drilling (HDD)",
    description: "Trenchless technology for river, road, railway, and environmentally sensitive crossings, with minimal surface disruption and high installation accuracy.",
    href: "/capabilities/hdd",
    icon: Drill,
    image: capabilityImages.hdd,
    metric: "Long-distance trenchless crossings",
  },
  {
    title: "Pipelines & Flowlines Construction",
    description: "Complete pipeline construction services from fabrication and welding through installation, testing, and commissioning for oil, gas, and water transmission systems.",
    href: "/capabilities/pipelines-flowlines",
    icon: PipetteIcon,
    image: capabilityImages.pipelines,
    metric: "Land, swamp & offshore delivery",
  },
  {
    title: "Dredging & Piling",
    description: "Marine dredging for channel deepening, reclamation, and maintenance, plus foundation piling for offshore platforms, bridges, and terminal structures.",
    href: "/capabilities/dredging-piling",
    icon: Anchor,
    image: capabilityImages.dredging,
    metric: "Dredging, reclamation & piling",
  },
  {
    title: "Fabrication",
    description: "Integrated production systems covering flow station construction, wellhead upgrades, manifold inspection, plant turnaround maintenance, and pigging operations.",
    href: "/capabilities/facilities",
    icon: Factory,
    image: capabilityImages.facilities,
    metric: "Flow stations, wellheads & structural",
  },
  {
    title: "Project Management & Support",
    description: "Integrated planning, execution support, field coordination, and project controls for complex HDD, pipeline, dredging, and facilities packages from mobilisation through close-out.",
    href: "/capabilities/project-management",
    icon: Briefcase,
    image: capabilityImages.projectManagement,
    metric: "Planning, controls & field support",
  },
  {
    title: "Pipeline Security & Monitoring",
    description: "Real-time pipeline monitoring and tampering detection systems designed to combat vandalism and protect critical energy infrastructure across the Niger Delta.",
    href: "/capabilities/pipeline-security",
    icon: Shield,
    image: capabilityImages.security,
    metric: "Real-time detection & monitoring",
  },
];

const standards = [
  "API Standards",
  "ASME Codes",
  "DIN Standards",
  "ISO Certifications",
  "NACE Requirements",
  "AWS Welding",
  "DNV Guidelines",
  "Client Specifications",
];

export default function CapabilitiesPage() {
  const { content } = usePageContent('capabilities');
  const { data: dbCapabilities } = useCollection('capabilities_list');

  const heroContent = content.hero || {};
  const introContent = content.introduction || {};

  const capabilities = dbCapabilities.length > 0 ? dbCapabilities : defaultCapabilities;

  return (
    <Layout>
      <SEO
        title="Capabilities – HDD, Pipelines, Dredging & Marine – Enikkom"
        description="Engineering capabilities across horizontal directional drilling, pipeline and flowline construction, dredging and piling, production facilities, and pipeline security."
        canonical="/capabilities"
      />
      <Hero
        title={heroContent.title || "Our Capabilities"}
        subtitle={heroContent.subtitle || "Engineering services for Nigeria's most demanding infrastructure projects, from trenchless crossings to marine civil works."}
        badge="Capability Statements"
        primaryCTA={{ label: heroContent.primaryBtnText || "Discuss Project Scope", href: heroContent.primaryBtnLink || "/contact" }}
        backgroundImage={heroContent.backgroundImage || capabilityImages.hero}
        size="default"
      />

      {/* Capabilities Grid */}
      <section className="enk-section" style={{ borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <div className="mb-10 max-w-2xl">
            <p className="enk-kicker">{introContent.subtitle || "What We Do"}</p>
            <h2 className="enk-display mt-4 text-[clamp(1.5rem,2.8vw,2.05rem)] text-[var(--enk-ink)]">
              {introContent.title || "Full-Service Engineering Solutions"}
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[var(--enk-steel)] md:text-[15px]">
              {introContent.description || "Full capabilities for oil & gas infrastructure, marine construction, and specialised engineering projects."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap, index) => (
              <CapabilityCard key={cap.title} {...cap} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="enk-section" style={{ backgroundColor: "var(--enk-bg-muted)", borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <div className="mb-8 max-w-2xl">
            <p className="enk-kicker">Standards</p>
            <h2 className="enk-display mt-4 text-[clamp(1.5rem,2.8vw,2.05rem)] text-[var(--enk-ink)]">
              {content.standards?.title || "Standards & Compliance"}
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[var(--enk-steel)] md:text-[15px]">
              {content.standards?.description || "All our operations comply with international industry standards and best practices."}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {standards.map((standard) => (
              <RecordStatusStamp key={standard} tone="neutral">
                {standard}
              </RecordStatusStamp>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <CertificationsBlock />

      {/* CTA */}
      <CTABand
        headline={content.cta?.headline || "Ready to Discuss Your Requirements?"}
        subhead={content.cta?.subhead || "Our engineering team can scope your project and provide a detailed proposal within 48 hours."}
        primaryCTA={{ label: "Send RFQ / Tender", href: "/contact" }}
        secondaryCTA={{ label: "View Project Records", href: "/projects" }}
      />
    </Layout>
  );
}
