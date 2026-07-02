import { Layout } from "@/components/layout";
import { Hero, CTABand } from "@/components/sections";
import { motion } from "framer-motion";
import { ExternalLink, CircleDashed } from "lucide-react";
import { PH } from "@/content/home";
import { phLabel } from "@/components/home/Placeholder";
import { siteImageSelections } from "@/content/siteImageSelections";
import { SectionHeading } from "@/components/home/SectionHeading";

const featured = [
  {
    title: "NIPITECS 2019: New Technology to Displace Pipeline Vandals",
    description: "Enikkom's presentation at the Nigerian International Petroleum Technology Conference (NIPITECS) 2019 in Abuja, presenting HDD technology as a solution to pipeline vandalism and theft.",
    category: "Industry Event",
    date: "2019",
    thumbnail: "https://img.youtube.com/vi/PrMQDDb6ELA/hqdefault.jpg",
    href: "https://www.youtube.com/watch?v=PrMQDDb6ELA",
  },
  {
    title: "OML34 Continuous HDD, 10\" x 12km Project Review",
    description: "Documentary of Nigeria's longest functional Continuous HDD, 12km of 10-inch pipeline installation delivered for NPDC.",
    category: "Project Spotlight",
    date: "2021",
    thumbnail: "https://img.youtube.com/vi/uv_ozmjIo-E/hqdefault.jpg",
    href: "https://www.youtube.com/watch?v=uv_ozmjIo-E",
  },
];

const upcoming = [
  PH("Company news entry"),
  PH("Industry insight entry"),
  PH("Project milestone entry"),
];

export default function NewsInsightsPage() {
  const heroImage = siteImageSelections.newsInsights.hero;

  return (
    <Layout>
      <Hero
        title="News & Insights"
        subtitle="Updates on Enikkom and HDDTEC's projects, technology, and industry engagement across Nigeria's oil & gas sector."
        backgroundImage={heroImage}
        size="default"
        primaryCTA={{ label: "View All Videos", href: "https://www.youtube.com/@enikkomconstruction" }}
      />

      {/* Featured, verified entries sourced from existing project and conference records */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading
              kicker="Featured"
              title={<>Latest from Enikkom</>}
              intro="Project reviews and industry presentations from our work across Nigeria."
              onDark
            />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {featured.map((item, i) => (
              <motion.a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="enk-card enk-card--hover overflow-hidden group flex flex-col"
              >
                <div className="aspect-video overflow-hidden relative bg-muted">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    aria-hidden="true"
                    style={{ background: "linear-gradient(0deg, oklch(0.13 0.03 255 / 0.5), transparent 55%)" }}
                  />
                  <span className="enk-chip enk-chip--on-dark absolute left-4 top-4">{item.category}</span>
                </div>
                <div className="flex flex-1 flex-col p-6" style={{ backgroundColor: "var(--enk-surface-card)" }}>
                  <div className="flex items-center gap-2 mb-3 text-[12px] font-semibold text-[var(--enk-on-dark-muted)]">
                    <span>{item.date}</span>
                  </div>
                  <h4 className="text-[20px] font-bold mb-2 underline underline-offset-4 text-[var(--enk-on-dark)] group-hover:text-[var(--enk-gold)] transition-colors">{item.title}</h4>
                  <p className="text-[13.5px] text-[var(--enk-on-dark-muted)] leading-relaxed flex-1">{item.description}</p>
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-[13px] font-semibold" style={{ color: "var(--enk-gold)" }}>
                    Watch on YouTube
                    <ExternalLink className="h-3.5 w-3.5" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* More updates, transparently unsupplied content, not invented */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading
              kicker="Coming Soon"
              title={<>More Updates</>}
              intro="Additional news and insights entries are in preparation and will appear here once published."
              onDark
              align="center"
            />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {upcoming.map((entry) => (
              <div
                key={entry}
                className="enk-card p-6 flex flex-col items-start gap-3"
              >
                <CircleDashed className="h-6 w-6 opacity-70" style={{ color: "var(--enk-steel)" }} aria-hidden="true" />
                <p className="text-[12px] font-semibold" style={{ color: "var(--enk-steel)" }}>
                  To be supplied, {phLabel(entry)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Follow Our Work"
        primaryCTA={{ label: "Subscribe on YouTube", href: "https://www.youtube.com/@enikkomconstruction" }}
        secondaryCTA={{ label: "Contact Us", href: "/contact" }}
      />
    </Layout>
  );
}
