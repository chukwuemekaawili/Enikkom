import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Hero, CTABand, CaseStudyCard, CertificationsBlock } from "@/components/sections";
import { motion } from "framer-motion";
import { CheckCircle, Drill, PipetteIcon, Anchor, Factory, Truck, ShieldCheck, Briefcase } from "lucide-react";
import { getProjectImage } from "@/content/projectImageSelections";
import { siteImageSelections } from "@/content/siteImageSelections";
import { usePageContent } from "@/hooks/useSiteSettings";
import { EditableText } from "@/components/content";
import { SectionHeading } from "@/components/home/SectionHeading";

// Slug to page_slug mapping
const slugToPageSlug: Record<string, string> = {
  'hdd': 'cap-hdd',
  'pipelines-flowlines': 'cap-pipelines',
  'dredging-piling': 'cap-dredging',
  'facilities': 'cap-facilities',
  'project-management': 'cap-project-management',
  'pipeline-security': 'cap-security',
  'logistics': 'cap-logistics',
};

interface CapabilityData {
  title: string;
  description: string;
  icon: React.ElementType;
  heroImage: string;
  processSteps: { title: string; description: string }[];
  standards: string[];
  equipment: { name: string; specs: string }[];
  relatedProjects: { title: string; location: string; metric: string; metricLabel: string; tags: string[]; href: string; thumbnail?: string }[];
}

const capabilityData: Record<string, CapabilityData> = {
  hdd: {
    title: "Horizontal Directional Drilling (HDD)",
    description: "Trenchless technology for river, road, railway, and environmental crossings, with minimal surface disruption and high efficiency.",
    icon: Drill,
    heroImage: siteImageSelections.capabilities.hdd,
    processSteps: [
      { title: "Site Survey & Design", description: "Geotechnical investigation and crossing design" },
      { title: "Pilot Bore", description: "Initial drilling of pilot hole along planned trajectory" },
      { title: "Reaming Operations", description: "Progressive enlargement to required diameter" },
      { title: "Pipe Installation", description: "Pullback of pre-fabricated pipeline string" },
      { title: "Testing & Commissioning", description: "Hydrostatic testing and final handover" },
    ],
    standards: ["API 1160", "ASTM F1962", "DCA Technical Guidelines", "ISO 14001"],
    equipment: [
      { name: "HDD Rig", specs: "Up to 500T pullback capacity" },
      { name: "Mud System", specs: "High-volume mixing & recycling" },
      { name: "Tracking System", specs: "Walkover & Gyro guidance" },
    ],
    relatedProjects: [
      {
        title: "OML34 Continuous HDD, 10\" × 12km",
        location: "Utorogun, Delta State",
        metric: "12km",
        metricLabel: "Nigeria's Longest CHDD",
        tags: ["HDD", "CHDD"],
        href: "/projects/oml34-chdd",
        thumbnail: getProjectImage("oml34-chdd", "related"),
      },
      {
        title: "Atlas Cove-Mosimi, 16\" × 3.1km",
        location: "Arepo / Imagbon, Ogun State",
        metric: "3.1km",
        metricLabel: "Africa's Longest Single Drill",
        tags: ["HDD"],
        href: "/projects/atlas-cove-mosimi",
      },
    ],
  },
  "pipelines-flowlines": {
    title: "Pipelines & Flowlines Construction",
    description: "Complete pipeline construction services from fabrication to installation and testing for oil, gas, and water transmission systems.",
    icon: PipetteIcon,
    heroImage: siteImageSelections.capabilities.pipelines,
    processSteps: [
      { title: "Material Procurement", description: "Sourcing and inspection of pipe materials and fittings" },
      { title: "Fabrication & Coating", description: "Welding, NDT, and protective coating application" },
      { title: "Installation", description: "Open-cut, HDD, or directional drilling installation" },
      { title: "Welding & NDT", description: "Field welding with 100% radiographic inspection" },
      { title: "Hydrotesting", description: "Pressure testing and leak detection" },
    ],
    standards: ["API 5L", "ASME B31.4/B31.8", "NACE MR0175", "AWS D1.1"],
    equipment: [
      { name: "Pipe Layers", specs: "12+ sideboom pipelayers" },
      { name: "Welding Equipment", specs: "Automatic/manual welding systems" },
      { name: "NDT Equipment", specs: "Radiographic, UT, MT, PT" },
    ],
    relatedProjects: [
      {
        title: "Calabar Gas Transmission, 24\" × 21.5km",
        location: "Cross River State",
        metric: "21.5km",
        metricLabel: "Gas Transmission Pipeline",
        tags: ["Pipeline"],
        href: "/projects/calabar-gas-transmission",
      },
      {
        title: "NIPCO Gas Distribution, 50km Network",
        location: "Multiple Locations, Nigeria",
        metric: "50km",
        metricLabel: "4\"/8\"/12\" Network",
        tags: ["Pipeline"],
        href: "/projects/nipco-gas-distribution",
        thumbnail: getProjectImage("nipco-gas-distribution", "related"),
      },
    ],
  },
  "dredging-piling": {
    title: "Dredging & Piling",
    description: "Marine dredging for channel deepening, reclamation, and maintenance. Foundation piling for offshore platforms, bridges, and terminal structures.",
    icon: Anchor,
    heroImage: siteImageSelections.capabilities.dredging,
    processSteps: [
      { title: "Bathymetric Survey", description: "Detailed seabed mapping and volume calculation" },
      { title: "Dredging Operations", description: "Cutter suction or trailing suction hopper dredging" },
      { title: "Material Disposal", description: "Controlled disposal or beneficial reuse" },
      { title: "Pile Driving", description: "Impact or vibratory pile installation" },
      { title: "Load Testing", description: "Static and dynamic pile load testing" },
    ],
    standards: ["PIANC Guidelines", "API RP 2A", "ASTM D1143", "EN 12699"],
    equipment: [
      { name: "Dredger", specs: "3+ cutter suction dredgers" },
      { name: "Pile Driver", specs: "Heavy duty impact hammers" },
      { name: "Survey Equipment", specs: "Multi-beam echosounder, RTK GPS" },
    ],
    relatedProjects: [],
  },
  "facilities": {
    title: "Production Facilities Construction",
    description: "Integrated production systems covering flow station construction, wellhead upgrades, manifold inspection, plant turnaround maintenance, and pigging operations.",
    icon: Factory,
    heroImage: siteImageSelections.capabilities.facilities,
    processSteps: [
      { title: "Scope Definition", description: "Detailed work scope and engineering review" },
      { title: "Mobilization", description: "Equipment and personnel deployment" },
      { title: "Construction Works", description: "Civil, mechanical, and E&I installation" },
      { title: "Pre-commissioning", description: "Systems testing and loop checks" },
      { title: "Commissioning", description: "Final startup and handover" },
    ],
    standards: ["API Standards", "ASME Codes", "IEC Guidelines", "Client Specifications"],
    equipment: [
      { name: "Cranes", specs: "Mobile and crawler cranes" },
      { name: "Welding Systems", specs: "Certified welding equipment" },
      { name: "Testing Equipment", specs: "Hydro test and NDT gear" },
    ],
    relatedProjects: [],
  },
  "project-management": {
    title: "Project Management & Support",
    description: "Integrated planning, execution support, field coordination, and project controls for complex HDD, pipeline, dredging, and facilities packages from mobilisation through close-out.",
    icon: Briefcase,
    heroImage: siteImageSelections.capabilities.projectManagement,
    processSteps: [
      { title: "Project Planning", description: "Integrated scope, schedule, cost, and resource planning aligned to client priorities" },
      { title: "Mobilization Readiness", description: "Field logistics, permits, procurement tracking, and site readiness coordination" },
      { title: "Execution Control", description: "Daily coordination, progress tracking, risk management, and issue resolution across work fronts" },
      { title: "Quality & HSE Assurance", description: "Documentation control, inspection planning, and compliance support throughout execution" },
      { title: "Close-out & Handover", description: "Punch listing, as-built documentation, final reporting, and turnover support" },
    ],
    standards: ["ISO 9001", "Client QA/QC Requirements", "Project HSE Plans", "PMI-Aligned Controls"],
    equipment: [
      { name: "Planning Systems", specs: "Integrated scheduling, resource loading, and progress measurement tools" },
      { name: "Field Coordination", specs: "Site reporting workflows, permit tracking, and subcontractor interface management" },
      { name: "Project Controls", specs: "Cost monitoring, risk registers, change management, and close-out documentation" },
    ],
    relatedProjects: [],
  },
  "pipeline-security": {
    title: "Pipeline Security & Monitoring",
    description: "Real-time pipeline surveillance, leak detection, and vandalism prevention in partnership with Ocean Marine Solutions.",
    icon: ShieldCheck,
    heroImage: siteImageSelections.capabilities.security,
    processSteps: [
      { title: "Risk Assessment", description: "Threat identification and vulnerability analysis" },
      { title: "System Design", description: "Surveillance and monitoring infrastructure" },
      { title: "Installation", description: "Sensors, cameras, and communication systems" },
      { title: "24/7 Monitoring", description: "Control room operations and response" },
      { title: "Incident Response", description: "Rapid deployment and intervention" },
    ],
    standards: ["API 1164", "ISPS Code", "NIST Cybersecurity", "Client Requirements"],
    equipment: [
      { name: "Surveillance", specs: "CCTV, drones, and patrol vessels" },
      { name: "Sensors", specs: "Leak detection and intrusion systems" },
      { name: "Communications", specs: "VSAT and radio networks" },
    ],
    relatedProjects: [],
  },
  "logistics": {
    title: "Logistics Support",
    description: "Land and swamp logistics with low bed trailers, flatbed barges, crew boats, and supply vessels for project mobilization.",
    icon: Truck,
    heroImage: siteImageSelections.equipment.hero,
    processSteps: [
      { title: "Planning", description: "Route survey and transport planning" },
      { title: "Permits", description: "Regulatory approvals and escorts" },
      { title: "Mobilization", description: "Equipment and material transport" },
      { title: "Site Support", description: "Ongoing logistics and resupply" },
      { title: "Demobilization", description: "Equipment recovery and return" },
    ],
    standards: ["IMDG Code", "ADR Regulations", "Local Transport Laws", "Client HSE"],
    equipment: [
      { name: "Trailers", specs: "Low bed and flatbed trailers" },
      { name: "Barges", specs: "Deck cargo and flat top barges" },
      { name: "Vessels", specs: "Crew boats and supply vessels" },
    ],
    relatedProjects: [],
  },
};

export default function CapabilityDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const capability = slug ? capabilityData[slug] : null;
  
  // Get CMS content for this capability page
  const pageSlug = slug ? slugToPageSlug[slug] : '';
  const { content } = usePageContent(pageSlug);

  if (!capability) {
    return (
      <Layout>
        <div className="section-padding container-wide text-center">
          <h1 className="enk-display text-[clamp(1.8rem,4vw,2.6rem)] mb-4">Capability Not Found</h1>
          <p className="text-muted-foreground">The requested capability page does not exist.</p>
        </div>
      </Layout>
    );
  }

  const Icon = capability.icon;
  
  // Merge CMS content with defaults
  const heroContent = content.hero || {};
  const descriptionContent = content.description || {};
  const stepsContent = content.process_steps || {};
  const standardsContent = content.standards || {};
  const equipmentContent = content.equipment || {};
  
  const title = heroContent.title || capability.title;
  const subtitle = heroContent.subtitle || capability.description;
  const heroImage = heroContent.backgroundImage || capability.heroImage;
  const processSteps = stepsContent.steps?.length > 0 ? stepsContent.steps : capability.processSteps;
  const standards = standardsContent.standards?.length > 0 ? standardsContent.standards : capability.standards;
  const equipment = equipmentContent.equipment?.length > 0 ? equipmentContent.equipment : capability.equipment;

  return (
    <Layout>
      <Hero
        title={title}
        subtitle={subtitle}
        badge="Capability"
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
        backgroundImage={heroImage}
        size="default"
        pageSlug={pageSlug}
        sectionKey="hero"
        imageField="backgroundImage"
      />

      {/* Process & Method */}
      <section className="enk-section">
        <div className="enk-container">
          <SectionHeading
            kicker="Method"
            title={
              <EditableText
                value={stepsContent.section_title || "Process & Method"}
                pageSlug={pageSlug}
                sectionKey="process_steps"
                field="section_title"
              />
            }
            onDark
          />

          <ol className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-[var(--enk-line-dark)] bg-[var(--enk-line-dark)] md:grid-cols-5">
            {processSteps.map((step: { title: string; description: string }, index: number) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col gap-3 p-6"
                style={{ backgroundColor: "var(--enk-surface-card)" }}
              >
                <span className="text-[14px] font-bold tabular-nums text-[var(--enk-accent-on-dark)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4 className="text-[16px] font-bold text-[var(--enk-on-dark)]">
                  <EditableText
                    value={step.title}
                    pageSlug={pageSlug}
                    sectionKey="process_steps"
                    field={`step_${index}_title`}
                  />
                </h4>
                <p className="text-[14px] leading-relaxed text-[var(--enk-on-dark-muted)]">
                  <EditableText
                    value={step.description}
                    pageSlug={pageSlug}
                    sectionKey="process_steps"
                    field={`step_${index}_description`}
                  />
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Standards & Compliance */}
      <section className="enk-section" style={{ borderTop: "1px solid var(--enk-line-dark)" }}>
        <div className="enk-container">
          <SectionHeading
            kicker="Compliance"
            title={
              <EditableText
                value={standardsContent.section_title || "Applicable Standards"}
                pageSlug={pageSlug}
                sectionKey="standards"
                field="section_title"
              />
            }
            onDark
          />

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {standards.map((standard: string, index: number) => (
              <div key={index} className="flex items-center gap-3 enk-card enk-card--hover p-4">
                <CheckCircle className="h-5 w-5 flex-shrink-0" style={{ color: "var(--enk-accent-on-dark)" }} />
                <span className="text-sm font-medium text-[var(--enk-on-dark)]">
                  <EditableText
                    value={standard}
                    pageSlug={pageSlug}
                    sectionKey="standards"
                    field={`standard_${index}`}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Readiness */}
      <section className="enk-section" style={{ borderTop: "1px solid var(--enk-line-dark)" }}>
        <div className="enk-container">
          <SectionHeading
            kicker="Readiness"
            title={
              <EditableText
                value={equipmentContent.section_title || "Equipment Readiness"}
                pageSlug={pageSlug}
                sectionKey="equipment"
                field="section_title"
              />
            }
            onDark
          />

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {equipment.map((item: { name: string; specs: string }, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="enk-card enk-card--hover p-6"
              >
                <Icon className="h-8 w-8 mb-3" style={{ color: "var(--enk-accent-on-dark)" }} />
                <h4 className="font-semibold mb-1 text-[var(--enk-on-dark)]">
                  <EditableText
                    value={item.name}
                    pageSlug={pageSlug}
                    sectionKey="equipment"
                    field={`equipment_${index}_name`}
                  />
                </h4>
                <p className="text-sm text-[var(--enk-on-dark-muted)]">
                  <EditableText
                    value={item.specs}
                    pageSlug={pageSlug}
                    sectionKey="equipment"
                    field={`equipment_${index}_specs`}
                  />
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {capability.relatedProjects.length > 0 && (
        <section className="enk-section" style={{ borderTop: "1px solid var(--enk-line-dark)" }}>
          <div className="enk-container">
            <SectionHeading kicker="Proof" title="Related projects" onDark />
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {capability.relatedProjects.map((project, index) => (
                <CaseStudyCard
                  key={project.title}
                  {...project}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications */}
      <CertificationsBlock />

      {/* CTA */}
      <CTABand
        headline={`Ready to discuss your ${capability.title.split(" (")[0]} requirements?`}
        subhead="Send your alignment, drawings or RFP and our technical team will assess feasibility, risk and approach, with no obligation."
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
      />
    </Layout>
  );
}
