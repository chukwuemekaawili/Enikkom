import { Layout } from "@/components/layout";
import { Hero, CTABand, CertificationsBlock } from "@/components/sections";
import { EditableText } from "@/components/admin";
import { usePageContent } from "@/hooks/useSiteSettings";
import { motion } from "framer-motion";
import { Shield, FileCheck, HardHat, ClipboardCheck, CheckCircle, AlertTriangle, Target, Award } from "lucide-react";

import hseSafety from "@/assets/projects/hse-safety.jpg";

const hseSteps = [
  { icon: FileCheck, title: "Level 1: Policy Manual", description: "Policy and Authority Statement Manual establishing company-wide HSE principles" },
  { icon: HardHat, title: "Level 2: HSE Procedures", description: "Quality Assurance and Safety (HSE) Procedures for all operations" },
  { icon: ClipboardCheck, title: "Level 3: Work Instructions", description: "Specific Work Instructions for each task and operation type" },
  { icon: Shield, title: "Level 4: Quality Records", description: "Quality and Safety Records for traceability and continuous improvement" },
];

const defaultHseCommitments = [
  "Zero tolerance for unsafe acts and conditions",
  "Comprehensive PTW (Permit to Work) system",
  "International Safety Management (ISM) code compliance",
  "Job Hazard Analysis before every task",
  "Environmental protection and sustainable development",
  "Community engagement and social responsibility",
  "Personal Protective Equipment (PPE) protocols",
  "Regular third-party safety audits",
];

const hseStats = [
  { value: "0", label: "Lost Time Incidents", icon: AlertTriangle },
  { value: "5M+", label: "Safe Man-Hours", icon: Target },
  { value: "100%", label: "PTW Compliance", icon: CheckCircle },
  { value: "ISO", label: "Certified Systems", icon: Award },
];

export default function HSEQualityPage() {
  const { content } = usePageContent('hse');
  const heroContent = content.hero || {};
  const qmsContent = content.qms || {};
  const commitmentContent = content.commitment || {};

  const hseCommitments = commitmentContent.items || defaultHseCommitments;

  return (
    <Layout>
      <Hero
        title={heroContent.title || "HSE & Quality Excellence"}
        subtitle={heroContent.subtitle || "Safety First. Quality Always. Our unwavering commitment to zero incidents and world-class standards drives everything we do."}
        primaryCTA={{ label: heroContent.primaryBtnText || "Request HSE Documentation", href: heroContent.primaryBtnLink || "/contact" }}
        backgroundImage={heroContent.backgroundImage || hseSafety}
        size="default"
        pageSlug="hse"
        sectionKey="hero"
        imageField="backgroundImage"
      />

      {/* HSE Stats */}
      <section className="bg-charcoal py-14">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {hseStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center p-6 bg-white/5 rounded-xl border border-white/10"
              >
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="stat-value stat-value-white">{stat.value}</div>
                <div className="stat-label text-white/50">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CertificationsBlock />

      {/* HSE Process */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="section-eyebrow">
              <EditableText
                value={qmsContent.subtitle || "Quality System"}
                pageSlug="hse"
                sectionKey="qms"
                field="subtitle"
              />
            </p>
            <h2 className="section-title">
              <EditableText
                value={qmsContent.title || "4-Level Quality Management System"}
                pageSlug="hse"
                sectionKey="qms"
                field="title"
              />
            </h2>
            <p className="section-subtitle">
              <EditableText
                value={qmsContent.description || "Our ISO-certified QMS follows a structured four-level model ensuring consistent quality across all operations."}
                pageSlug="hse"
                sectionKey="qms"
                field="description"
              />
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {hseSteps.map((step, i) => (
              <motion.div 
                key={step.title} 
                initial={{ opacity: 0, y: 24 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.4, delay: i * 0.1 }} 
                className="relative text-center card-premium p-6 pt-8"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-primary text-white text-[12px] font-bold flex items-center justify-center shadow-md">
                  {i + 1}
                </div>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">{step.title}</h4>
                <p className="text-[14px] text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="section-eyebrow mb-3">
                <EditableText
                  value={commitmentContent.subtitle || "Commitment"}
                  pageSlug="hse"
                  sectionKey="commitment"
                  field="subtitle"
                />
              </p>
              <h2 className="mb-6">
                <EditableText
                  value={commitmentContent.title || "Our HSE Commitment"}
                  pageSlug="hse"
                  sectionKey="commitment"
                  field="title"
                />
              </h2>
              <p className="text-muted-foreground text-[15px] mb-8 leading-relaxed">
                <EditableText
                  value={commitmentContent.description || "At Enikkom, HSE is not just a policy—it's a core value embedded in every aspect of our operations. We are committed to protecting our people, communities, and the environment."}
                  pageSlug="hse"
                  sectionKey="commitment"
                  field="description"
                  multiline
                />
              </p>
              
              <div className="space-y-3">
                {hseCommitments.map((commitment: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white border border-border/50"
                  >
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-[14px] font-medium">{commitment}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="image-premium">
                <img 
                  src={hseSafety} 
                  alt="HSE Safety Meeting" 
                  className="w-full h-[350px] md:h-[420px] object-cover"
                />
              </div>
              <motion.div 
                className="absolute bottom-4 left-4 right-4 bg-green-600 text-white p-4 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div className="flex items-center gap-3">
                  <Shield className="h-8 w-8 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-lg">
                      <EditableText
                        value={commitmentContent.badgeTitle || "Zero LTI Record"}
                        pageSlug="hse"
                        sectionKey="commitment"
                        field="badgeTitle"
                      />
                    </div>
                    <div className="text-[13px] text-white/80">
                      <EditableText
                        value={commitmentContent.badgeSubtitle || "Maintained across all major projects"}
                        pageSlug="hse"
                        sectionKey="commitment"
                        field="badgeSubtitle"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <CTABand 
        headline={content.cta?.headline || "Need HSE Documentation?"}
        primaryCTA={{ label: content.cta?.primaryBtnText || "Request HSE Pack", href: content.cta?.primaryBtnLink || "/contact" }} 
      />
    </Layout>
  );
}
