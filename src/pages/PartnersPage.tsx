import { Layout } from "@/components/layout";
import { Hero, CTABand, LogoMarquee } from "@/components/sections";
import { motion } from "framer-motion";
import { Handshake, Globe, Shield, Users, Wrench, MapPin, Award, Building2, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { EditableText, EditableImage } from "@/components/content";
import { usePageContent } from "@/hooks/useSiteSettings";
import { EnhancedImage } from "@/components/ui/enhanced-image";
import { siteImageSelections } from "@/content/siteImageSelections";
import { findBrandEntity } from "@/content/brandRegistry";

const defaultFeaturedPartners = [
  {
    name: "HDDThailand Co. Ltd",
    type: "Joint Venture Partner",
    since: "May 2020",
    description: "Thailand-based trenchless specialist with 15+ years international HDD experience across Asia, Africa and the Middle East. Provides advanced equipment, ISO 9001:2015 certified operations, and specialist engineer deployment to HDDTEC Ltd.",
    highlights: [
      "ISO 9001:2015 Certified Operations",
      "9 HDD Rigs In-Country (up to 500T pullback)",
      "Advanced Downhole Tool Technology",
      "International Engineer Exchange Programme",
    ],
    website: "https://hddthailand.com",
    logoSrc: findBrandEntity("hddthailand")?.logoSrc,
    logoWrapperClassName: "bg-white rounded-lg p-2",
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
    name: "HDDTEC Ltd (HDDThailand-Enikkom)",
    description: "Formed in May 2020 by ECL and The E-Place Limited. Operates Nigeria's largest in-country HDD fleet, executing mega-scale trenchless crossings for IOCs and operators across Nigeria.",
    icon: Globe,
    logoSrc: findBrandEntity("hddtec")?.logoSrc,
    logoWrapperClassName: "bg-transparent rounded-xl",
  },
  {
    name: "PIEJV (Pipeline Infrastructure Enikkom JV)",
    description: "Joint venture between Ocean Marine Solutions Ltd (OMS) and ECL for pipeline security, monitoring, and infrastructure protection services across the Niger Delta.",
    icon: Shield,
  },
];

const partnershipBenefits = [
  {
    title: "Technology Transfer",
    description: "Access to modern HDD rigs, GPS guidance systems, and downhole tools from international partners.",
    icon: Wrench,
  },
  {
    title: "Technical Expertise",
    description: "International engineers and training programs supporting consistent execution on every project.",
    icon: Users,
  },
  {
    title: "Equipment Fleet",
    description: "Nigeria's largest in-country HDD fleet, 9 maxi rigs from 50T to 500T pullback capacity, all based in-country.",
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
  const partnerImages = siteImageSelections.partners;
  
  const heroContent = content.hero || {};
  const featuredContent = content.featured_partners || {};
  const benefitsContent = content.benefits || {};

  return (
    <Layout>
      <Hero
        title={heroContent.title || "Partners & Strategic Alliances"}
        subtitle={heroContent.subtitle || "Building Nigeria's infrastructure through technical partnerships and collaborations."}
        backgroundImage={heroContent.backgroundImage || partnerImages.hero}
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
            <p className="enk-kicker justify-center">
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
                value={featuredContent.description || "We collaborate with established international and local companies to deliver infrastructure projects."}
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
                className="enk-card enk-card--hover p-8"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden ${
                      partner.logoSrc ? "border border-border/60 bg-white p-2 shadow-sm" : "bg-primary/10"
                    }`}
                  >
                    {partner.logoSrc ? (
                      <EnhancedImage
                        src={partner.logoSrc}
                        alt={partner.name}
                        wrapperClassName={`h-full w-full bg-transparent ${partner.logoWrapperClassName || ""}`}
                        className="h-full w-full"
                        fit="contain"
                        tone="logo"
                        shimmer={false}
                        sizes="64px"
                      />
                    ) : (
                      <Handshake className="h-8 w-8 text-primary" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{partner.name}</h3>
                    <p className="text-[12px] font-bold" style={{ color: "var(--enk-bronze)" }}>{partner.type}</p>
                    <p className="text-xs text-muted-foreground">Since {partner.since}</p>
                  </div>
                </div>

                <p className="text-muted-foreground text-[15px] leading-relaxed mb-6">
                  {partner.description}
                </p>

                <div className="space-y-3 mb-6">
                  {partner.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--enk-accent-on-dark)" }} />
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
            <p className="enk-kicker justify-center">Joint Ventures</p>
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
                className="enk-card enk-card--hover p-6 flex items-start gap-4"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden ${
                    jv.logoSrc ? "border border-border/60 bg-white p-2 shadow-sm" : "bg-primary/10"
                  }`}
                >
                  {jv.logoSrc ? (
                    <EnhancedImage
                      src={jv.logoSrc}
                      alt={jv.name}
                      wrapperClassName={`h-full w-full bg-transparent ${jv.logoWrapperClassName || ""}`}
                      className="h-full w-full"
                      fit="contain"
                      tone="logo"
                      shimmer={false}
                      sizes="48px"
                    />
                  ) : (
                    <jv.icon className="h-6 w-6 text-primary" />
                  )}
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
            <p className="enk-kicker enk-kicker--on-dark justify-center">
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
                <benefit.icon className="h-8 w-8 mb-4" style={{ color: "var(--enk-gold)" }} />
                <h4 className="font-semibold text-white mb-2">{benefit.title}</h4>
                <p className="text-white/60 text-[14px] leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Major Clients */}
      <section className="section-padding-sm bg-background">
        <div className="container-wide">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="enk-kicker justify-center">Trusted By</p>
            <h2 className="enk-display text-[clamp(1.6rem,3vw,2.2rem)] text-[var(--enk-ink)]">Our Major Clients</h2>
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
            <p className="enk-kicker justify-center">Compliance</p>
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
                className="enk-card enk-card--hover p-4 flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--enk-navy)" }} />
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
