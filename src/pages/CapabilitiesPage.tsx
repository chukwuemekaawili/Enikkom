import { Layout } from "@/components/layout";
import { Hero, CTABand, CapabilityCard, CertificationsBlock } from "@/components/sections";
import { EditableText } from "@/components/admin";
import { usePageContent, useCollection } from "@/hooks/useSiteSettings";
import { Drill, PipetteIcon, Anchor, Factory, Shield, Briefcase } from "lucide-react";
import { siteImageSelections } from "@/content/siteImageSelections";

const capabilityImages = siteImageSelections.capabilities;

const defaultCapabilities = [
  {
    title: "Horizontal Directional Drilling (HDD)",
    description: "State-of-the-art trenchless technology for river, road, railway, and environmentally sensitive crossings with minimal disruption and maximum installation accuracy.",
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
    description: "Fit-for-purpose integrated production systems with flow station construction, wellhead upgrades, manifold inspection, plant turnaround maintenance, and pigging operations.",
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


export default function CapabilitiesPage() {
  const { content } = usePageContent('capabilities');
  const { data: dbCapabilities } = useCollection('capabilities_list');

  const heroContent = content.hero || {};
  const introContent = content.introduction || {};

  const capabilities = dbCapabilities.length > 0 ? dbCapabilities : defaultCapabilities;

  return (
    <Layout>
      <Hero
        title={heroContent.title || "Our Capabilities"}
        subtitle={heroContent.subtitle || "Comprehensive engineering solutions for Nigeria's most demanding infrastructure projects. From trenchless crossings to marine civil works."}
        primaryCTA={{ label: heroContent.primaryBtnText || "Get Your Free Quote", href: heroContent.primaryBtnLink || "/contact" }}
        backgroundImage={heroContent.backgroundImage || capabilityImages.hero}
        size="default"
        pageSlug="capabilities"
        sectionKey="hero"
        imageField="backgroundImage"
      />

      {/* Capabilities Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-10">
            <p className="text-[11px] md:text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              <EditableText
                value={introContent.subtitle || "What We Do"}
                pageSlug="capabilities"
                sectionKey="introduction"
                field="subtitle"
              />
            </p>
            <h2 className="mb-3">
              <EditableText
                value={introContent.title || "Full-Service Engineering Solutions"}
                pageSlug="capabilities"
                sectionKey="introduction"
                field="title"
              />
            </h2>
            <p className="text-[14px] md:text-[15px] text-muted-foreground max-w-xl mx-auto">
              <EditableText
                value={introContent.description || "End-to-end capabilities for oil & gas infrastructure, marine construction, and specialized engineering projects."}
                pageSlug="capabilities"
                sectionKey="introduction"
                field="description"
              />
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap, index) => (
              <CapabilityCard
                key={cap.title}
                {...cap}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="section-padding-sm bg-muted/30">
        <div className="container-wide">
          <div className="text-center mb-10">
            <h2 className="mb-4">
              <EditableText
                value={content.standards?.title || "Standards & Compliance"}
                pageSlug="capabilities"
                sectionKey="standards"
                field="title"
              />
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              <EditableText
                value={content.standards?.description || "All our operations comply with international industry standards and best practices."}
                pageSlug="capabilities"
                sectionKey="standards"
                field="description"
              />
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "API Standards",
              "ASME Codes",
              "DIN Standards",
              "ISO Certifications",
              "NACE Requirements",
              "AWS Welding",
              "DNV Guidelines",
              "Client Specifications",
            ].map((standard) => (
              <div key={standard} className="bg-card p-4 rounded-lg border text-center">
                <span className="text-sm font-medium">{standard}</span>
              </div>
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
        secondaryCTA={{ label: "See Our Track Record", href: "/projects" }}
      />
    </Layout>
  );
}
