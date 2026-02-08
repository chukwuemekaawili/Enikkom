import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Hero, CTABand, CaseStudyCard, CertificationsBlock } from "@/components/sections";
import { motion } from "framer-motion";
import { CheckCircle, Drill, PipetteIcon, Anchor, Building2, Waves, Settings, Shield, FileCheck, Search, Wrench, Truck, ShieldCheck } from "lucide-react";
import { usePageContent } from "@/hooks/useSiteSettings";
import { EditableText, EditableImage, EditableRepeater } from "@/components/admin";

// Import capability images
import hddDrilling from "@/assets/capabilities/hdd-drilling.jpg";
import pipelineConstruction from "@/assets/capabilities/pipeline-construction.jpg";
import dredgingMarine from "@/assets/capabilities/dredging-marine.jpg";
import jettyConstruction from "@/assets/capabilities/jetty-construction.jpg";
import shoreApproach from "@/assets/projects/shore-approach.jpg";
import heroHddRig from "@/assets/hero/hero-hdd-rig.jpg";
import geotechnicalSurvey from "@/assets/projects/drilling-site.png";
import capabilitiesHero from "@/assets/projects/partnership-hddthailand.jpg";
import hseHero from "@/assets/projects/hse-safety.jpg";
import equipmentHero from "@/assets/projects/hdd-equipment-fleet.jpg";

// Slug to page_slug mapping
const slugToPageSlug: Record<string, string> = {
  'hdd': 'cap-hdd',
  'pipelines-flowlines': 'cap-pipelines',
  'dredging-piling': 'cap-dredging',
  'jetty-quay-walls': 'cap-jetty',
  'shore-approach': 'cap-shore',
  'geotechnical-survey': 'cap-geotechnical',
  'facilities': 'cap-facilities',
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
    description: "State-of-the-art trenchless technology for river, road, railway, and environmental crossings with minimal surface disruption and maximum efficiency.",
    icon: Drill,
    heroImage: hddDrilling,
    processSteps: [
      { title: "Site Survey & Design", description: "Comprehensive geotechnical investigation and crossing design" },
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
      { title: "Niger Delta River Crossing", location: "Rivers State", metric: "2.5km", metricLabel: "length", tags: ["HDD"], href: "/projects/niger-delta-crossing", thumbnail: hddDrilling },
    ],
  },
  "pipelines-flowlines": {
    title: "Pipelines & Flowlines Construction",
    description: "Complete pipeline construction services from fabrication to installation and testing for oil, gas, and water transmission systems.",
    icon: PipetteIcon,
    heroImage: pipelineConstruction,
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
      { title: "Flowline Installation Project", location: "Delta State", metric: "15km", metricLabel: "pipeline", tags: ["Pipeline"], href: "/projects/flowline-installation", thumbnail: pipelineConstruction },
    ],
  },
  "dredging-piling": {
    title: "Dredging & Piling",
    description: "Marine dredging for channel deepening, reclamation, and maintenance. Foundation piling for offshore platforms, bridges, and terminal structures.",
    icon: Anchor,
    heroImage: dredgingMarine,
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
    relatedProjects: [
      { title: "Terminal Dredging Project", location: "Lagos", metric: "500,000m³", metricLabel: "dredged", tags: ["Dredging"], href: "/projects/terminal-dredging", thumbnail: dredgingMarine },
    ],
  },
  "jetty-quay-walls": {
    title: "Jetty & Quay Wall Construction",
    description: "Design and construction of jetties, quay walls, wharves, and marine terminal structures to international standards.",
    icon: Building2,
    heroImage: jettyConstruction,
    processSteps: [
      { title: "Foundation Works", description: "Piling and seabed preparation" },
      { title: "Sheet Pile Installation", description: "Steel sheet pile driving and anchoring" },
      { title: "Concrete Works", description: "Capping beam and deck slab construction" },
      { title: "Fender Installation", description: "Marine fender and bollard installation" },
      { title: "Paving & Services", description: "Surface finishing and utility installation" },
    ],
    standards: ["BS 6349", "PIANC Reports", "EAU Guidelines", "OCIMF Guidelines"],
    equipment: [
      { name: "Crane Barge", specs: "4+ various lift capacities" },
      { name: "Sheet Pile Vibro", specs: "Heavy duty vibratory hammers" },
      { name: "Concrete Batching", specs: "Mobile batching plant" },
    ],
    relatedProjects: [
      { title: "Lagos Port Quay Wall", location: "Lagos", metric: "300m", metricLabel: "quay wall", tags: ["Jetty"], href: "/projects/lagos-port-quay", thumbnail: jettyConstruction },
    ],
  },
  "shore-approach": {
    title: "Shore Approach Construction",
    description: "Pipeline shore approach construction including beach crossings, nearshore installations, and tie-in works for onshore-offshore infrastructure.",
    icon: Waves,
    heroImage: shoreApproach,
    processSteps: [
      { title: "Beach Survey", description: "Topographic and bathymetric survey" },
      { title: "Trenching", description: "Open-cut or HDD shore approach excavation" },
      { title: "Pipe Pull", description: "Shore pull or float-and-sink installation" },
      { title: "Backfill & Protection", description: "Trench backfill and rock dumping" },
      { title: "Tie-in Works", description: "Connection to onshore facilities" },
    ],
    standards: ["DNV-OS-F101", "API RP 1111", "ASME B31.4", "Client Specifications"],
    equipment: [
      { name: "Winches", specs: "High capacity shore pull winches" },
      { name: "Excavators", specs: "Long-reach and amphibious" },
      { name: "Support Vessels", specs: "Tugs and anchor handlers" },
    ],
    relatedProjects: [
      { title: "Escravos Shore Approach", location: "Delta State", metric: "1.8km", metricLabel: "shore crossing", tags: ["Shore Approach"], href: "/projects/escravos-shore-approach", thumbnail: shoreApproach },
    ],
  },
  "geotechnical-survey": {
    title: "Geotechnical Survey",
    description: "Comprehensive soil investigation, site characterization, and geotechnical analysis for pipeline routing, foundation design, and HDD planning.",
    icon: Search,
    heroImage: geotechnicalSurvey,
    processSteps: [
      { title: "Desktop Study", description: "Review of existing geological data and site history" },
      { title: "Field Investigation", description: "Borehole drilling, CPT, and in-situ testing" },
      { title: "Laboratory Testing", description: "Soil classification, strength, and permeability tests" },
      { title: "Data Analysis", description: "Interpretation and geotechnical modeling" },
      { title: "Reporting", description: "Engineering recommendations and design parameters" },
    ],
    standards: ["ASTM D1586", "BS 5930", "EUROCODE 7", "API RP 2GEO"],
    equipment: [
      { name: "Drilling Rigs", specs: "Rotary and percussion boring equipment" },
      { name: "CPT Equipment", specs: "Cone penetration testing systems" },
      { name: "Lab Equipment", specs: "Full soil testing laboratory" },
    ],
    relatedProjects: [
      { title: "Niger Delta Site Investigation", location: "Delta State", metric: "50+", metricLabel: "boreholes", tags: ["Geotechnical"], href: "/projects", thumbnail: geotechnicalSurvey },
    ],
  },
  "facilities": {
    title: "Facilities Construction",
    description: "Flow station operations, wellhead platform upgrades, manifold inspection, and plant turnaround maintenance for oil & gas production facilities.",
    icon: Wrench,
    heroImage: capabilitiesHero,
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
  "pipeline-security": {
    title: "Pipeline Security & Monitoring",
    description: "Real-time pipeline surveillance, leak detection, and vandalism prevention in partnership with Ocean Marine Solutions.",
    icon: ShieldCheck,
    heroImage: hseHero,
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
    heroImage: equipmentHero,
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
  const { content, isLoading } = usePageContent(pageSlug);

  if (!capability) {
    return (
      <Layout>
        <div className="section-padding container-wide text-center">
          <h1>Capability Not Found</h1>
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
        primaryCTA={{ label: "Request a Quote", href: "/contact" }}
        secondaryCTA={{ label: "View Projects", href: "/projects" }}
        backgroundImage={heroImage}
        size="default"
        pageSlug={pageSlug}
        sectionKey="hero"
        imageField="backgroundImage"
      />

      {/* Editable Hero Overlay for Admin */}
      <section className="py-8 bg-muted/30">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold mb-4">
              <EditableText
                value={title}
                pageSlug={pageSlug}
                sectionKey="hero"
                field="title"
              />
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              <EditableText
                value={subtitle}
                pageSlug={pageSlug}
                sectionKey="hero"
                field="subtitle"
                multiline
              />
            </p>
          </div>
        </div>
      </section>

      {/* Process & Method */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-8">
            <Settings className="h-6 w-6 text-primary" />
            <h2>
              <EditableText
                value={stepsContent.section_title || "Process & Method"}
                pageSlug={pageSlug}
                sectionKey="process_steps"
                field="section_title"
              />
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {processSteps.map((step: { title: string; description: string }, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative bg-card p-5 rounded-lg border"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm mb-3">
                  {index + 1}
                </div>
                <h4 className="font-semibold mb-2 text-sm">
                  <EditableText
                    value={step.title}
                    pageSlug={pageSlug}
                    sectionKey="process_steps"
                    field={`step_${index}_title`}
                  />
                </h4>
                <p className="text-sm text-muted-foreground">
                  <EditableText
                    value={step.description}
                    pageSlug={pageSlug}
                    sectionKey="process_steps"
                    field={`step_${index}_description`}
                  />
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards & Compliance */}
      <section className="section-padding-sm bg-muted/30">
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="h-6 w-6 text-primary" />
            <h2>
              <EditableText
                value={standardsContent.section_title || "Applicable Standards"}
                pageSlug={pageSlug}
                sectionKey="standards"
                field="section_title"
              />
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {standards.map((standard: string, index: number) => (
              <div key={index} className="flex items-center gap-3 bg-card p-4 rounded-lg border">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium">
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
      <section className="section-padding-sm">
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-8">
            <FileCheck className="h-6 w-6 text-primary" />
            <h2>
              <EditableText
                value={equipmentContent.section_title || "Equipment Readiness"}
                pageSlug={pageSlug}
                sectionKey="equipment"
                field="section_title"
              />
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {equipment.map((item: { name: string; specs: string }, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card p-6 rounded-lg border"
              >
                <Icon className="h-8 w-8 text-primary mb-3" />
                <h4 className="font-semibold mb-1">
                  <EditableText
                    value={item.name}
                    pageSlug={pageSlug}
                    sectionKey="equipment"
                    field={`equipment_${index}_name`}
                  />
                </h4>
                <p className="text-sm text-muted-foreground">
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
        <section className="section-padding bg-muted/30">
          <div className="container-wide">
            <h2 className="mb-8">Related Projects</h2>
            <div className="grid md:grid-cols-3 gap-6">
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
      <CTABand />
    </Layout>
  );
}
