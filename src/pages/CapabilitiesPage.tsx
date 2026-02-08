import { Layout } from "@/components/layout";
import { Hero, CTABand, CapabilityCard, CertificationsBlock } from "@/components/sections";
import { EditableText, EditableImage } from "@/components/admin";
import { usePageContent } from "@/hooks/useSiteSettings";
import { Drill, PipetteIcon, Anchor, Building2, Waves, Wrench, Shield, Truck, Search } from "lucide-react";

// Import UNIQUE images for Capabilities page
import heroCapabilities from "@/assets/projects/partnership-hddthailand.jpg";
import capHdd from "@/assets/projects/hdd-drill-string.jpg";
import capPipeline from "@/assets/projects/welding-crew.jpg";
import capDredging from "@/assets/projects/otumara-escravos-2.jpg";
import capJetty from "@/assets/projects/jetty-construction.jpg";
import capShore from "@/assets/projects/drilling-ops-5.jpg";
import capFacilities from "@/assets/projects/nipco-ibafo-2.jpg";
import capSecurity from "@/assets/projects/team-safety.jpg";
import capLogistics from "@/assets/projects/nipco-ibafo-3.jpg";
import capGeotechnical from "@/assets/projects/drilling-site.png";

const defaultCapabilities = [
  {
    title: "Horizontal Directional Drilling (HDD)",
    description: "State-of-the-art trenchless technology for river, road, railway, and environmental crossings. Minimal surface disruption with maximum efficiency.",
    href: "/capabilities/hdd",
    icon: Drill,
    image: capHdd,
    metric: "Up to 48\" diameter, 3km span",
  },
  {
    title: "Pipelines & Flowlines",
    description: "Complete pipeline construction services including fabrication, installation, welding, coating, and hydrostatic testing for oil, gas, and water transmission.",
    href: "/capabilities/pipelines-flowlines",
    icon: PipetteIcon,
    image: capPipeline,
    metric: "Up to 48\" diameter capacity",
  },
  {
    title: "Dredging & Piling",
    description: "Marine dredging for channel deepening, reclamation, and maintenance. Foundation piling for offshore platforms, bridges, and terminal structures.",
    href: "/capabilities/dredging-piling",
    icon: Anchor,
    image: capDredging,
    metric: "Multiple dredgers available",
  },
  {
    title: "Jetty & Quay Walls",
    description: "Design, engineering, and construction of jetties, quay walls, wharves, and marine terminal structures to international standards.",
    href: "/capabilities/jetty-quay-walls",
    icon: Building2,
    image: capJetty,
    metric: "Heavy-duty marine structures",
  },
  {
    title: "Shore Approach",
    description: "Pipeline shore approach construction including beach crossings, nearshore installations, and tie-in works for onshore-offshore infrastructure.",
    href: "/capabilities/shore-approach",
    icon: Waves,
    image: capShore,
    metric: "Beach to platform connections",
  },
  {
    title: "Facilities Construction",
    description: "Flow station operations, wellhead platform upgrades, manifold inspection, and plant turnaround maintenance for oil & gas production facilities.",
    href: "/capabilities/facilities",
    icon: Wrench,
    image: capFacilities,
    metric: "Brownfield & Greenfield",
  },
  {
    title: "Pipeline Security & Monitoring",
    description: "Real-time pipeline surveillance, leak detection, and vandalism prevention in partnership with Ocean Marine Solutions.",
    href: "/capabilities/pipeline-security",
    icon: Shield,
    image: capSecurity,
    metric: "24/7 Monitoring",
  },
  {
    title: "Logistics Support",
    description: "Land and swamp logistics with low bed trailers, flatbed barges, crew boats, and supply vessels for project mobilization.",
    href: "/capabilities/logistics",
    icon: Truck,
    image: capLogistics,
    metric: "Full Fleet Support",
  },
  {
    title: "Geotechnical Survey",
    description: "Comprehensive soil investigation, site characterization, and geotechnical analysis for pipeline routing, foundation design, and HDD planning.",
    href: "/capabilities/geotechnical-survey",
    icon: Search,
    image: capGeotechnical,
    metric: "Complete Site Analysis",
  },
];

export default function CapabilitiesPage() {
  const { content } = usePageContent('capabilities');
  const heroContent = content.hero || {};
  const introContent = content.introduction || {};

  return (
    <Layout>
      <Hero
        title={heroContent.title || "Our Capabilities"}
        subtitle={heroContent.subtitle || "Comprehensive engineering solutions for Nigeria's most demanding infrastructure projects. From trenchless crossings to marine civil works."}
        primaryCTA={{ label: heroContent.primaryBtnText || "Get Your Free Quote", href: heroContent.primaryBtnLink || "/contact" }}
        backgroundImage={heroContent.backgroundImage || heroCapabilities}
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
            {defaultCapabilities.map((cap, index) => (
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
