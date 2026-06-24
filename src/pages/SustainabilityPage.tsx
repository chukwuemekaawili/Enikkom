import { Layout } from "@/components/layout";
import { Hero, CTABand } from "@/components/sections";
import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Users, GraduationCap, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { qhse, fpic, kpis } from "@/content/home";
import { siteImageSelections } from "@/content/siteImageSelections";

const pillars = [
  {
    icon: Leaf,
    title: "Environmental Management",
    description: "Operations across the Niger Delta's swamp, riverine and offshore terrain run under an environmental management system certified to ISO 14001:2015, with monitoring built into each crossing and pipeline scope.",
  },
  {
    icon: ShieldCheck,
    title: "Safety & Workforce Wellbeing",
    description: "A documented HSE system, certified to ISO 45001:2018, has delivered a zero lost-time-injury record across 5M+ safe man-hours on site.",
  },
  {
    icon: Users,
    title: "Community & Local Content",
    description: "Host-community engagement, run under our Community Management Policy, keeps corridors open and access protected for the life of a project.",
  },
  {
    icon: GraduationCap,
    title: "Indigenous Capacity Development",
    description: "Indigenous technical capacity aligned with NOGICD and NCDMB local-content requirements, built through our partnership with HDDTEC.",
  },
];

const sustainabilityStats = kpis.filter((k) =>
  ["Lost-time-injury record", "Safe man-hours"].includes(k.label),
);

export default function SustainabilityPage() {
  const heroImage = siteImageSelections.sustainability.hero;

  return (
    <Layout>
      <Hero
        title="Sustainability"
        subtitle="Operating responsibly across Nigeria's most sensitive terrain, environmental management, workforce safety, and host-community engagement built into every project."
        badge="ISO 14001:2015 Certified"
        backgroundImage={heroImage}
        size="default"
        primaryCTA={{ label: "Our QHSE System", href: "/hse-quality" }}
      />

      {/* Verified record, stated once */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="enk-kicker">Our Approach</p>
            <h2 className="section-title">Four Pillars of Responsible Operations</h2>
            <p className="section-subtitle">
              Sustainability at Enikkom is built on auditable systems, not statements, certified management systems, a documented safety record, and host-community policy.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="enk-card enk-card--hover p-6"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <p.icon className="h-7 w-7 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">{p.title}</h4>
                <p className="text-[14px] text-muted-foreground leading-relaxed">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Local content / community, real verified points from the company FPIC framework */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="enk-kicker">Community & Local Content</p>
            <h2 className="section-title">Why Local Content Matters on Our Sites</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {fpic.points.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="enk-card enk-card--hover p-6"
              >
                <h4 className="font-semibold text-[16px] mb-2">{point.title}</h4>
                <p className="text-[14px] text-muted-foreground leading-relaxed">{point.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Button variant="outline" className="h-11 gap-2" asChild>
              <a href={qhse.policies.find((p) => p.label === "Community Management Policy")?.file} target="_blank" rel="noopener noreferrer">
                View Community Management Policy
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Safety record, stated once with the same figures used sitewide */}
      <section className="section-padding bg-charcoal">
        <div className="container-wide">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="enk-kicker enk-kicker--on-dark">Track Record</p>
            <h2 className="text-white mb-3">The Record We Operate To</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[...sustainabilityStats, { value: "3", label: "ISO management systems certified" }].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white/5 border border-white/10 rounded-xl p-5 text-center"
              >
                <div className="stat-value stat-value-white">{s.value}</div>
                <div className="stat-label text-white/50">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Questions About Our Sustainability Practices?"
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
        secondaryCTA={{ label: "View QHSE & Quality", href: "/hse-quality" }}
      />
    </Layout>
  );
}
