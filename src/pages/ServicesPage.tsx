import { Layout } from "@/components/layout";
import { Hero, CTABand, CapabilityCard, CertificationsBlock } from "@/components/sections";
import { Drill, PipetteIcon, Anchor, Building2, Waves, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { usePageContent } from "@/hooks/useSiteSettings";
import { EditableText, EditableImage } from "@/components/admin";

// Import UNIQUE images for Services page (different from other pages)
import heroServices from "@/assets/projects/hdd-team-1.jpg";
import svcHdd from "@/assets/projects/hdd-operations-2.jpg";
import svcPipeline from "@/assets/projects/pipeline-crew.jpg";
import svcDredging from "@/assets/projects/dredging-hero.jpg";
import svcJetty from "@/assets/projects/crane-operations.jpg";
import svcShore from "@/assets/projects/shore-approach.jpg";
import svcFacilities from "@/assets/projects/safety-signage.jpg";

const services = [
  {
    title: "Trenchless Crossings (HDD)",
    description: "Pioneers of Horizontal Directional Drilling in Nigeria with the largest fleet of HDD rigs (up to 500T pullback) for river, road, railway and environmental crossings.",
    href: "/capabilities/hdd",
    icon: Drill,
    image: svcHdd,
    metric: "Up to 48\" diameter, 3km span",
    features: [
      "HDD river & creek crossings",
      "Road & railway crossings",
      "Thrust boring & pipe ramming",
      "Micro tunneling"
    ],
  },
  {
    title: "Pipeline Construction",
    description: "Complete EPC services for oil, gas and water pipelines including fabrication, welding, coating, installation and hydrotesting in land, swamp and offshore environments.",
    href: "/capabilities/pipelines-flowlines",
    icon: PipetteIcon,
    image: svcPipeline,
    metric: "Up to 48\" diameter capacity",
    features: [
      "Land, swamp & offshore pipelines",
      "Flowline construction",
      "Field joint coating",
      "Hydrostatic testing"
    ],
  },
  {
    title: "Dredging & Piling",
    description: "Marine dredging for channel deepening, reclamation and maintenance. Foundation piling including bored, driven and sheet piles for marine and civil structures.",
    href: "/capabilities/dredging-piling",
    icon: Anchor,
    image: svcDredging,
    metric: "Multiple dredgers available",
    features: [
      "Capital & maintenance dredging",
      "Land reclamation",
      "Driven & bored piling",
      "Sheet pile walls"
    ],
  },
  {
    title: "Jetty & Quay Walls",
    description: "Design and construction of jetties, quay walls, wharves and marine terminal structures to international standards for ports and industrial facilities.",
    href: "/capabilities/jetty-quay-walls",
    icon: Building2,
    image: svcJetty,
    metric: "Heavy-duty marine structures",
    features: [
      "Jetty construction",
      "Quay wall installation",
      "Berthing facilities",
      "Marine terminal structures"
    ],
  },
  {
    title: "Shore Approach",
    description: "Pipeline shore approach construction including beach crossings, nearshore installations and tie-in works for onshore-offshore infrastructure connections.",
    href: "/capabilities/shore-approach",
    icon: Waves,
    image: svcShore,
    metric: "Beach to platform connections",
    features: [
      "Beach crossings",
      "Nearshore installation",
      "Shore pull operations",
      "Tie-in works"
    ],
  },
  {
    title: "Facilities Construction",
    description: "Wellhead upgrades, manifold maintenance, structural fabrication and installation for oil & gas production facilities and flow stations.",
    href: "/capabilities/facilities",
    icon: Wrench,
    image: svcFacilities,
    metric: "Brownfield & greenfield",
    features: [
      "Wellhead platform upgrades",
      "Manifold maintenance",
      "Structural fabrication",
      "Piping installation"
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
      <Hero
        title={heroContent.title || "Our Services"}
        subtitle={heroContent.subtitle || "Comprehensive engineering and construction solutions for Nigeria's most demanding infrastructure projects. From trenchless crossings to marine civil works."}
        primaryCTA={{ label: "Request a Quote", href: "/contact" }}
        secondaryCTA={{ label: "View Projects", href: "/projects" }}
        backgroundImage={heroContent.backgroundImage || heroServices}
        size="default"
        pageSlug="services"
        sectionKey="hero"
        imageField="backgroundImage"
      />

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <motion.div 
            className="text-center mb-10 md:mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[11px] md:text-xs font-semibold uppercase tracking-widest text-primary mb-3">
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
                value={introContent.description || "From conceptual engineering through construction and commissioning, we provide end-to-end solutions backed by Nigeria's most experienced teams and equipment fleet."}
                pageSlug="services"
                sectionKey="intro"
                field="description"
                multiline
              />
            </p>
          </motion.div>

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
      <section className="section-padding bg-charcoal">
        <div className="container-wide">
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[11px] md:text-xs font-semibold uppercase tracking-widest text-primary mb-3">
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
                value={whyUsContent.description || "Proven expertise, unmatched equipment, and unwavering commitment to safety and quality."}
                pageSlug="services"
                sectionKey="why_us"
                field="description"
              />
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: whyUsContent.stat1_value || "29+", label: whyUsContent.stat1_label || "Years Experience" },
              { value: whyUsContent.stat2_value || "100+", label: whyUsContent.stat2_label || "KM HDD Installed" },
              { value: whyUsContent.stat3_value || "500+", label: whyUsContent.stat3_label || "Strong Workforce" },
              { value: whyUsContent.stat4_value || "Zero", label: whyUsContent.stat4_label || "LTI Record" },
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center p-5 bg-white/5 rounded-[14px] border border-white/10 hover:bg-white/8 transition-colors duration-200"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <CertificationsBlock />

      {/* CTA */}
      <CTABand />
    </Layout>
  );
}
