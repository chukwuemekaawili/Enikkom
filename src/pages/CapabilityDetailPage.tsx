import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout";
import SEO from "@/components/ui/SEO";
import { Hero, CTABand, CaseStudyCard, CertificationsBlock } from "@/components/sections";
import { RecordStatusStamp } from "@/components/records";
import { Drill, PipetteIcon, Anchor, Factory, ShieldCheck, Briefcase } from "lucide-react";
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
};

interface CapabilityData {
  title: string;
  description: string;
  overview: string[];
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
    overview: [
      "Enikkom pioneered Horizontal Directional Drilling in Nigeria, completing the country's first HDD crossing of the River Niger in 2003. Since then we have installed more than 100 km of HDD crossings, including Africa's longest single drill, the 16\" × 3.1 km Atlas Cove–Mosimi line completed in 2016.",
      "Our maxi-rig fleet, with pullback capacity up to 500 tons, crosses rivers, swamps, roads, railways and environmentally sensitive corridors with minimal surface disruption. Delivered diameters reach 42\", and our continuous-HDD record includes the 10\" × 12 km OML34 drive for NPDC, the longest functional CHDD in Nigeria.",
    ],
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
      {
        title: "Nun River Dual HDD, 16\" & 6\"",
        location: "Niger Delta",
        metric: "2024",
        metricLabel: "Recent dual HDD crossing",
        tags: ["HDD"],
        href: "/projects/nun-river-dual-hdd",
        thumbnail: getProjectImage("nun-river-dual-hdd", "related"),
      },
    ],
  },
  "pipelines-flowlines": {
    title: "Pipelines & Flowlines Construction",
    description: "Complete pipeline construction services from fabrication to installation and testing for oil, gas, and water transmission systems.",
    overview: [
      "We deliver complete onshore and offshore pipeline and flowline construction, from procurement and fabrication through welding, coating, installation, testing and commissioning, across land, swamp and shore-approach terrain. Our delivered record includes gas transmission and distribution networks such as the 24\" × 21.5 km Calabar line and the multi-diameter NIPCO distribution network.",
      "Work is executed to API and ASME codes with 100% radiographic weld inspection. As an EPCI contractor we integrate pipeline scopes with our own HDD, dredging and facilities capability, reducing interface risk on complex corridors.",
    ],
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
      { name: "Pipe Layers", specs: "Heavy sideboom pipelayer fleet" },
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
    overview: [
      "Our marine division delivers channel and capital dredging, land reclamation, slot sweeping and maintenance, alongside foundation, shore-protection and cofferdam piling for river and swamp crossings. Owned cutter-suction dredgers and heavy piling spreads have supported major crossings including the OB3 River Niger works and the OML34 programme.",
      "On OB3 and OML34, in-house dredging and cofferdam installation enabled trenchless and pipeline construction in difficult riverine ground. Self-performing this marine scope removes reliance on third-party dredging contractors on our own projects and keeps schedule risk under our control.",
    ],
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
      { name: "Dredger", specs: "Owned Ellicott cutter suction dredgers" },
      { name: "Pile Driver", specs: "Heavy duty impact hammers" },
      { name: "Survey Equipment", specs: "Multi-beam echosounder, RTK GPS" },
    ],
    relatedProjects: [
      {
        title: "OB3 River Niger Crossing",
        location: "River Niger",
        metric: "48\"",
        metricLabel: "Sheet piling & cofferdam",
        tags: ["Piling", "Dredging"],
        href: "/projects/ob3-river-niger",
        thumbnail: getProjectImage("ob3-river-niger", "related"),
      },
      {
        title: "OML34 Dredging & Cofferdam",
        location: "Delta State",
        metric: "12 km",
        metricLabel: "CHDD corridor works",
        tags: ["Dredging", "Cofferdam"],
        href: "/projects/oml34-chdd",
        thumbnail: getProjectImage("oml34-chdd", "related"),
      },
    ],
  },
  "facilities": {
    title: "Production Facilities Construction",
    description: "Integrated production systems covering flow station construction, wellhead upgrades, manifold inspection, plant turnaround maintenance, and pigging operations.",
    overview: [
      "Enikkom constructs and maintains production facilities (flow stations, wellhead installations, manifolds and associated structures) and delivers plant turnaround maintenance, well upgrades, valve servicing and pigging operations. Recent facilities scopes include the NIPCO Ibafo depot phases and the Gbaran Phase 3b UZU CPF upgrade for SPDC.",
      "Facilities work is executed to API and ASME codes, with integrated pre-commissioning and commissioning support so systems are handed over ready to operate.",
    ],
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
    relatedProjects: [
      {
        title: "NIPCO Ibafo Depot",
        location: "Ogun State",
        metric: "3 phases",
        metricLabel: "Depot & tank-farm works",
        tags: ["Facilities"],
        href: "/projects#record",
      },
      {
        title: "Gbaran Phase 3b UZU CPF Upgrade",
        location: "Bayelsa State",
        metric: "16\"",
        metricLabel: "Facility upgrade for SPDC",
        tags: ["Facilities", "EPC"],
        href: "/projects/gbaran-phase-3b",
        thumbnail: getProjectImage("gbaran-phase-3b", "related"),
      },
    ],
  },
  "project-management": {
    title: "Project Management & Support",
    description: "Integrated planning, execution support, field coordination, and project controls for complex HDD, pipeline, dredging, and facilities packages from mobilisation through close-out.",
    overview: [
      "Every Enikkom scope is delivered under integrated project controls: planning, procurement tracking, field coordination, QA/QC and HSE assurance, from mobilisation through close-out. As a single-point EPCI partner we have managed record-setting HDD, pipeline and marine programmes for operators including Shell, NNPC, NPDC, Saipem and Dangote.",
      "Our controls emphasise early feasibility, risk management and disciplined documentation, coordinating multiple work fronts under the realities of Nigerian terrain and schedule pressure. Early engagement lets us de-risk crossing design, access and schedule before commitments are locked in.",
    ],
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
    relatedProjects: [
      {
        title: "Atlas Cove-Mosimi, 16\" × 3.1km",
        location: "Ogun State",
        metric: "3.1 km",
        metricLabel: "Africa's longest single drill",
        tags: ["EPCI", "HDD"],
        href: "/projects/atlas-cove-mosimi",
        thumbnail: getProjectImage("atlas-cove-mosimi", "related"),
      },
      {
        title: "OML34 Continuous HDD",
        location: "Delta State",
        metric: "12 km",
        metricLabel: "Nigeria's longest CHDD",
        tags: ["EPCI", "HDD"],
        href: "/projects/oml34-chdd",
        thumbnail: getProjectImage("oml34-chdd", "related"),
      },
      {
        title: "Otumara-Escravos Bundled HDD",
        location: "Delta State",
        metric: "2.78 km",
        metricLabel: "Bundled crossing",
        tags: ["EPCI", "HDD"],
        href: "/projects/otumara-escravos",
        thumbnail: getProjectImage("otumara-escravos", "related"),
      },
    ],
  },
  "pipeline-security": {
    title: "Pipeline Security & Monitoring",
    description: "Real-time pipeline surveillance, leak detection, and vandalism prevention in partnership with Ocean Marine Solutions.",
    overview: [
      "Through our PIEJV joint venture with Ocean Marine Solutions, Enikkom provides real-time pipeline surveillance, leak detection and anti-vandalism monitoring across active corridors in the Niger Delta. The service combines control-room operations, field sensors and rapid response to protect critical energy infrastructure and keep pipelines operational.",
      "It complements our construction capability with life-of-asset integrity support, extending the value we deliver from installation into ongoing operation and protection.",
    ],
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
        <div className="enk-section enk-container text-center">
          <h1 className="enk-display text-[clamp(1.8rem,4vw,2.6rem)] mb-4">Capability Not Found</h1>
          <p className="text-muted-foreground">The requested capability page does not exist.</p>
        </div>
      </Layout>
    );
  }

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
      <SEO
        title={`${capability.title} – Enikkom Nigeria`}
        description={capability.description}
        canonical={`/capabilities/${slug}`}
      />
      <Hero
        title={title}
        subtitle={subtitle}
        badge="Capability Statement"
        backgroundImage={heroImage}
        size="default"
      />

      {/* Overview */}
      <section className="enk-section">
        <div className="enk-container">
          <div className="mx-auto max-w-3xl">
            <p className="enk-kicker enk-kicker--on-dark mb-4">Overview</p>
            {capability.overview.map((para, i) => (
              <p
                key={i}
                className={`text-[15px] leading-8 text-[var(--enk-on-dark-muted)] md:text-[16px] ${i > 0 ? "mt-5" : ""}`}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Process & Method */}
      <section className="enk-section" style={{ borderTop: "1px solid var(--enk-rule)" }}>
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

          <ol className="mt-10 grid gap-px overflow-hidden rounded-[var(--enk-radius-record)] border border-[var(--enk-rule-strong)] bg-[var(--enk-rule)] md:grid-cols-5">
            {processSteps.map((step: { title: string; description: string }, index: number) => (
              <li
                key={index}
                className="flex flex-col gap-2.5 p-5"
                style={{ backgroundColor: "var(--enk-record-surface)" }}
              >
                <h3 className="text-[15px] font-semibold text-[var(--enk-ink)]">
                  <EditableText
                    value={step.title}
                    pageSlug={pageSlug}
                    sectionKey="process_steps"
                    field={`step_${index}_title`}
                  />
                </h3>
                <p className="text-[13px] leading-6 text-[var(--enk-steel)]">
                  <EditableText
                    value={step.description}
                    pageSlug={pageSlug}
                    sectionKey="process_steps"
                    field={`step_${index}_description`}
                  />
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Standards & Compliance */}
      <section className="enk-section" style={{ borderTop: "1px solid var(--enk-rule)" }}>
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

          <div className="mt-8 flex flex-wrap gap-2.5">
            {standards.map((standard: string, index: number) => (
              <RecordStatusStamp key={index} tone="neutral">
                <EditableText
                  value={standard}
                  pageSlug={pageSlug}
                  sectionKey="standards"
                  field={`standard_${index}`}
                />
              </RecordStatusStamp>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Readiness */}
      <section className="enk-section" style={{ borderTop: "1px solid var(--enk-rule)" }}>
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

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {equipment.map((item: { name: string; specs: string }, index: number) => (
              <div key={index} className="enk-doc-card p-5">
                <p className="enk-overline">Equipment</p>
                <h3 className="mt-3 text-[15px] font-semibold text-[var(--enk-ink)]">
                  <EditableText
                    value={item.name}
                    pageSlug={pageSlug}
                    sectionKey="equipment"
                    field={`equipment_${index}_name`}
                  />
                </h3>
                <p className="enk-mono mt-1.5 text-[12px] leading-6 text-[var(--enk-blueprint)]">
                  <EditableText
                    value={item.specs}
                    pageSlug={pageSlug}
                    sectionKey="equipment"
                    field={`equipment_${index}_specs`}
                  />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {capability.relatedProjects.length > 0 && (
        <section className="enk-section" style={{ borderTop: "1px solid var(--enk-rule)" }}>
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
        secondaryCTA={{ label: "View projects", href: "/projects" }}
      />
    </Layout>
  );
}
