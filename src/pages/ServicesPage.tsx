import { Layout } from "@/components/layout";
import { Hero, CTABand, CapabilityCard, CertificationsBlock } from "@/components/sections";
import { Drill, PipetteIcon, Anchor, Factory, Shield, Briefcase } from "lucide-react";
import { usePageContent } from "@/hooks/useSiteSettings";
import { EditableText, EditableImage } from "@/components/content";
import { siteImageSelections } from "@/content/siteImageSelections";
import SEO from "@/components/ui/SEO";

const serviceImages = siteImageSelections.services;

// Service categories, sourced from approved Index Page and About Structure documents
const services = [
  {
    title: "Horizontal Directional Drilling (HDD)",
    description: "Our HDD and Direct Pipe services provide safe, trenchless solutions to accurately and efficiently install underground pipelines and utilities across roads, railways, rivers, and other obstacles. We deliver safe, economical, and environmentally friendly projects across Nigeria.",
    href: "/services",
    icon: Drill,
    image: serviceImages.hdd,
    metric: "3.1km span",
    features: [
      "Horizontal Directional Drilling (HDD)",
      "Guided Boring (Thrust Boring)",
      "Micro-Tunneling (Slurry Spoil Removal)",
      "Direct Pipe Technology",
      "Horizontal Boring (Hole Hog)",
      "Pipe Ramming (Casing Installation)",
      "HDD Rescue Operations",
    ],
  },
  {
    title: "Pipeline Works",
    description: "We provide pipeline and flowline construction, fabrication, replacement, repair, and maintenance for pipeline owners throughout Nigeria, across land, swamp, and offshore terrain.",
    href: "/services",
    icon: PipetteIcon,
    image: serviceImages.pipelines,
    metric: "Land, Swamp & Offshore",
    features: [
      "Land pipeline construction",
      "Swamp flowline installation",
      "Offshore pipeline works",
      "Fabrication & welding",
      "Hydrostatic testing",
      "Field joint coating (FJC)",
    ],
  },
  {
    title: "Dredging",
    description: "We operate some of the most modern and versatile dredging fleets in the industry, in every size and segment, providing flexible solutions for sand filling, reclamation works, and piling. We specialise in the difficult swamps of Nigeria.",
    href: "/services",
    icon: Anchor,
    image: serviceImages.dredging,
    metric: "Sand filling, Reclamation & Piling",
    features: [
      "Sand filling & land reclamation",
      "Slot & access sweeping",
      "Capital & maintenance dredging",
      "Pile driving & extraction",
      "Cofferdam installation",
      "Shore protection piling",
    ],
  },
  {
    title: "Fabrication",
    description: "We provide integrated production systems for maximising recovery, accelerating production, managing risk, and improving project economics. Our services are designed to international standards using proven process technologies.",
    href: "/services",
    icon: Factory,
    image: serviceImages.facilities,
    metric: "Flow stations, Wellheads & Structural",
    features: [
      "Flow station construction",
      "Wellhead upgrade & maintenance",
      "Manifold inspection & maintenance",
      "Plant turnaround maintenance",
      "Structural construction",
      "Pipeline pigging operations",
    ],
  },
  {
    title: "Project Management & Support",
    description: "Integrated planning, execution support, field coordination, and project controls for complex HDD, pipeline, dredging, and facilities packages from mobilisation through close-out.",
    href: "/services",
    icon: Briefcase,
    image: serviceImages.projectManagement,
    metric: "Planning, Controls & Field Support",
    features: [
      "Project planning & scheduling",
      "Field coordination & reporting",
      "Vendor and subcontractor interface",
      "QA/QC and HSE documentation support",
      "Mobilisation and close-out support",
    ],
  },
  {
    title: "Pipeline Security & Monitoring",
    description: "Research-driven systems built to combat pipeline vandalism. We monitor and detect tampering on pipelines in real time, protecting critical energy infrastructure.",
    href: "/services",
    icon: Shield,
    image: serviceImages.security,
    metric: "Real-time detection & monitoring",
    features: [
      "Real-time pipeline monitoring",
      "Anti-vandalism systems",
      "Tampering detection",
      "Security operations coordination",
      "Pipeline integrity management",
    ],
  },

];

export default function ServicesPage() {
  const { content } = usePageContent('services');
  const heroContent = content.hero || {};
  const introContent = content.intro || {};
  const whyUsContent = content.why_us || {};

  return (
    <Layout>
      <SEO title="Our Services" description="Engineering and construction services for Nigeria's most demanding infrastructure projects." />
      <Hero
        title={heroContent.title || "Our Services"}
        subtitle={heroContent.subtitle || "Engineering and construction services for Nigeria's most demanding infrastructure projects, from trenchless crossings to marine civil works."}
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
        secondaryCTA={{ label: "View Projects", href: "/projects" }}
        backgroundImage={heroContent.backgroundImage || serviceImages.hero}
        size="default"
        pageSlug="services"
        sectionKey="hero"
        imageField="backgroundImage"
      />

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center mb-10 md:mb-14">
            <p className="enk-kicker justify-center mb-3">
              <EditableText
                value={introContent.subtitle || "What We Do"}
                pageSlug="services"
                sectionKey="intro"
                field="subtitle"
              />
            </p>
            <h2 className="mb-3">
              <EditableText
                value={introContent.title || "Complete Infrastructure Solutions"}
                pageSlug="services"
                sectionKey="intro"
                field="title"
              />
            </h2>
            <p className="text-[14px] md:text-[15px] text-muted-foreground max-w-xl mx-auto">
              <EditableText
                value={introContent.description || "From conceptual engineering through construction and commissioning, we cover the full project cycle, backed by experienced teams and a large equipment fleet."}
                pageSlug="services"
                sectionKey="intro"
                field="description"
                multiline
              />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, index) => (
              <CapabilityCard
                key={service.title}
                {...service}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-10">
            <p className="enk-kicker enk-kicker--on-dark justify-center mb-3">
              <EditableText
                value={whyUsContent.subtitle || "Why Us"}
                pageSlug="services"
                sectionKey="why_us"
                field="subtitle"
              />
            </p>
            <h2 className="text-white mb-3">
              <EditableText
                value={whyUsContent.title || "Why Choose Enikkom"}
                pageSlug="services"
                sectionKey="why_us"
                field="title"
              />
            </h2>
            <p className="text-white/60 text-[14px] md:text-[15px] max-w-lg mx-auto">
              <EditableText
                value={whyUsContent.description || "Proven expertise, a strong equipment fleet, and a firm commitment to safety and quality."}
                pageSlug="services"
                sectionKey="why_us"
                field="description"
              />
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "34", label: whyUsContent.stat1_label || "Years in Operation" },
              { value: whyUsContent.stat2_value || "100+", label: whyUsContent.stat2_label || "KM HDD Installed" },
              { value: whyUsContent.stat3_value || "500+", label: whyUsContent.stat3_label || "Strong Workforce" },
              { value: whyUsContent.stat4_value || "Zero", label: whyUsContent.stat4_label || "LTI Record" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-200"
              >
                <div className="text-2xl md:text-3xl font-bold mb-1" style={{ color: "var(--enk-accent-on-dark)" }}>
                  <EditableText
                    value={stat.value}
                    pageSlug="services"
                    sectionKey="why_us"
                    field={`stat${index + 1}_value`}
                  />
                </div>
                <div className="text-xs text-white/60">
                  <EditableText
                    value={stat.label}
                    pageSlug="services"
                    sectionKey="why_us"
                    field={`stat${index + 1}_label`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scope of Work Differentiation Table */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center mb-10">
            <p className="enk-kicker justify-center mb-3">Project Experience</p>
            <h2 className="mb-3">Scope of Work at a Glance</h2>
            <p className="text-[14px] md:text-[15px] text-muted-foreground max-w-xl mx-auto">
              A summary of the major work categories Enikkom Group has executed across Nigeria.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/60 border-b border-border">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Service Category</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Scope / Sub-types</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Example Projects</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  {
                    category: "Horizontal Directional Drilling (HDD)",
                    scope: "HDD, Guided Boring, Microtunneling, Direct Pipe, Pipe Ramming, HDD Rescue",
                    examples: "OML34 CHDD (10\"×12km), River Niger OB3 (48\"×2km), Atlas Cove-Mosimi (16\"×3.1km)",
                  },
                  {
                    category: "Pipeline Works",
                    scope: "Land, Swamp & Offshore flowlines; Fabrication; Welding; Hydrotesting; FJC",
                    examples: "NIPCO 8km×18\", Zakhem Projects, CMEs Pipeline Calabar (NDPHC)",
                  },
                  {
                    category: "Dredging",
                    scope: "Sand filling, Reclamation, Capital dredging, Pile driving, Cofferdam installation",
                    examples: "OML34 Cofferdam Works, OB3 Sheet Piling, Conoil Reclamation",
                  },
                  {
                    category: "Fabrication",
                    scope: "Flow station works, Wellhead upgrades, Manifold maintenance, Plant turnaround",
                    examples: "Flow station & wellhead operations, Pigging operations",
                  },
                  {
                    category: "Project Management & Support",
                    scope: "Project planning, controls, site coordination, QA/QC & HSE reporting, mobilisation support, close-out",
                    examples: "Integrated delivery support across HDD, pipeline, dredging, and facilities packages",
                  },
                  {
                    category: "Pipeline Security & Monitoring",
                    scope: "Real-time tampering detection, Monitoring systems, Integrity management",
                    examples: "PIEJV pipeline security operations across Niger Delta",
                  },

                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                    <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{row.category}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.scope}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.examples}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <CertificationsBlock />

      {/* CTA */}
      <CTABand
        headline="Ready to discuss your next infrastructure project?"
        subhead="Send us your scope, drawings or RFP and our team will assess feasibility, approach and mobilisation timeline — with no obligation."
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
      />
    </Layout>
  );
}
