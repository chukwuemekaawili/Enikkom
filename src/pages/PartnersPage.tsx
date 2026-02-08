import { Layout } from "@/components/layout";
import { Hero, CTABand, LogoMarquee } from "@/components/sections";
import { motion } from "framer-motion";
import { Handshake, Globe, Shield, Users, Wrench, MapPin, Award, Building2, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { EditableText, EditableImage } from "@/components/admin";
import { usePageContent } from "@/hooks/useSiteSettings";

import heroHddRig from "@/assets/hero/hero-hdd-rig.jpg";

const defaultFeaturedPartners = [
  {
    name: "HDDThailand Co. Ltd",
    type: "Joint Venture Partner",
    since: "May 2020",
    description: "Thailand-based HDD specialist providing advanced directional drilling technology, equipment supply, and technical training programs.",
    highlights: [
      "ISO 9001:2015 Certified Operations",
      "10+ Maxi HDD Rigs (up to 500T)",
      "Advanced Downhole Tool Technology",
      "International Engineer Exchange Program",
    ],
    website: "https://hddthailand.com",
  },
  {
    name: "Ocean Marine Solutions (OMS)",
    type: "Strategic Partner",
    since: "2018",
    description: "Nigerian maritime security company providing real-time pipeline surveillance, leak detection, and vandalism prevention services.",
    highlights: [
      "24/7 Pipeline Monitoring",
      "Real-time Leak Detection Systems",
      "Anti-Vandalism Security Solutions",
      "Marine Asset Protection",
    ],
    website: "#",
  },
];

const jointVentures = [
  {
    name: "HDDThailand-Enikkom Ltd",
    description: "Formed in May 2020 to combine international HDD expertise with local knowledge for mega-scale trenchless crossings across West Africa.",
    icon: Globe,
  },
  {
    name: "Pipeline Infrastructure Enikkom JV",
    description: "Partnership with Ocean Marine Solutions for comprehensive pipeline security, monitoring, and infrastructure protection services.",
    icon: Shield,
  },
];

const partnershipBenefits = [
  {
    title: "Technology Transfer",
    description: "Access to cutting-edge HDD rigs, GPS guidance systems, and advanced downhole tools from international partners.",
    icon: Wrench,
  },
  {
    title: "Technical Expertise",
    description: "International engineers and training programs ensuring world-class execution on every project.",
    icon: Users,
  },
  {
    title: "Equipment Fleet",
    description: "West Africa's largest HDD fleet with 10+ maxi rigs offering 50T to 500T pullback capacity.",
    icon: Building2,
  },
  {
    title: "24/7 Monitoring",
    description: "Real-time pipeline surveillance capabilities through our security partnership network.",
    icon: MapPin,
  },
  {
    title: "92% Local Content",
    description: "Maintaining NCDMB compliance while delivering international-standard project execution.",
    icon: Award,
  },
];

const certifications = [
  "ISO 9001:2015 - Quality Management",
  "ISO 14001:2015 - Environmental Management",
  "ISO 45001:2018 - Occupational Health & Safety",
  "NIPEX Registration",
  "NCDMB Certification",
  "NPC License",
];

export default function PartnersPage() {
  const { content } = usePageContent('partners');
  
  const heroContent = content.hero || {};
  const featuredContent = content.featured_partners || {};
  const benefitsContent = content.benefits || {};

  return (
    <Layout>
      <Hero
        title={heroContent.title || "Partners & Strategic Alliances"}
        subtitle={heroContent.subtitle || "Building Nigeria's infrastructure through world-class partnerships and technical collaborations that deliver excellence."}
        backgroundImage={heroContent.backgroundImage || heroHddRig}
        size="default"
        pageSlug="partners"
        sectionKey="hero"
        imageField="backgroundImage"
      />

      {/* Featured Partners */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="section-eyebrow">
              <EditableText
                value={featuredContent.eyebrow || "Strategic Alliances"}
                pageSlug="partners"
                sectionKey="featured_partners"
                field="eyebrow"
              />
            </p>
            <h2 className="section-title">
              <EditableText
                value={featuredContent.title || "Our Featured Partners"}
                pageSlug="partners"
                sectionKey="featured_partners"
                field="title"
              />
            </h2>
            <p className="section-subtitle">
              <EditableText
                value={featuredContent.description || "We collaborate with leading international and local companies to deliver world-class infrastructure solutions."}
                pageSlug="partners"
                sectionKey="featured_partners"
                field="description"
              />
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {defaultFeaturedPartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-premium p-8"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Handshake className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{partner.name}</h3>
                    <p className="text-sm text-primary font-medium">{partner.type}</p>
                    <p className="text-xs text-muted-foreground">Since {partner.since}</p>
                  </div>
                </div>

                <p className="text-muted-foreground text-[15px] leading-relaxed mb-6">
                  {partner.description}
                </p>

                <div className="space-y-3 mb-6">
                  {partner.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-[14px]">{highlight}</span>
                    </div>
                  ))}
                </div>

                {partner.website !== "#" && (
                  <Button variant="outline" size="sm" className="gap-2" asChild>
                    <a href={partner.website} target="_blank" rel="noopener noreferrer">
                      <Link2 className="h-4 w-4" />
                      Visit Website
                    </a>
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Joint Venture Companies */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="section-eyebrow">Joint Ventures</p>
            <h2 className="section-title">Our JV Companies</h2>
            <p className="section-subtitle">
              Dedicated joint venture entities formed to deliver specialized services.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {jointVentures.map((jv, index) => (
              <motion.div
                key={jv.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card-premium p-6 flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <jv.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-[17px] mb-2">{jv.name}</h4>
                  <p className="text-[14px] text-muted-foreground leading-relaxed">{jv.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="section-padding bg-charcoal">
        <div className="container-wide">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="section-eyebrow text-primary">
              <EditableText
                value={benefitsContent.eyebrow || "Capabilities"}
                pageSlug="partners"
                sectionKey="benefits"
                field="eyebrow"
              />
            </p>
            <h2 className="section-title text-white">
              <EditableText
                value={benefitsContent.title || "Partnership Benefits"}
                pageSlug="partners"
                sectionKey="benefits"
                field="title"
              />
            </h2>
            <p className="text-white/60 text-[15px] max-w-2xl mx-auto">
              <EditableText
                value={benefitsContent.description || "Our strategic partnerships enable us to deliver exceptional value through technology, expertise, and resources."}
                pageSlug="partners"
                sectionKey="benefits"
                field="description"
              />
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnershipBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="p-6 rounded-xl border border-white/10 bg-white/5"
              >
                <benefit.icon className="h-8 w-8 text-primary mb-4" />
                <h4 className="font-semibold text-white mb-2">{benefit.title}</h4>
                <p className="text-white/60 text-[14px] leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Major Clients */}
      <section className="py-16 bg-background">
        <div className="container-wide">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="section-eyebrow">Trusted By</p>
            <h2 className="text-2xl font-bold">Our Major Clients</h2>
          </motion.div>
          
          <LogoMarquee showTitle={false} />
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="section-eyebrow">Compliance</p>
            <h2 className="section-title">Certifications Through Partnerships</h2>
            <p className="section-subtitle">
              Our partnerships enable us to maintain internationally recognized certifications.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="card-premium p-4 flex items-center gap-3"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0" />
                <p className="text-[13px] font-medium">{cert}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Partner With Us"
        subhead="Interested in strategic collaboration? Let's discuss how we can work together."
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
        secondaryCTA={{ label: "View Capabilities", href: "/capabilities" }}
      />
    </Layout>
  );
}