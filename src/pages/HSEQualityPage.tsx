import { Layout } from "@/components/layout";
import { Hero, CTABand } from "@/components/sections";
import { EditableText } from "@/components/content";
import { usePageContent } from "@/hooks/useSiteSettings";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { EnhancedImage } from "@/components/ui/enhanced-image";
import {
  Shield,
  FileCheck,
  HardHat,
  ClipboardCheck,
  CheckCircle,
  AlertTriangle,
  Target,
  Award,
  Landmark,
  Lock,
  HeartHandshake,
  ExternalLink,
  FileX2,
} from "lucide-react";
import { siteImageSelections } from "@/content/siteImageSelections";

const hseSteps = [
  { icon: FileCheck, title: "Level 1: Policy Manual", description: "Policy and Authority Statement Manual establishing company-wide HSE principles" },
  { icon: HardHat, title: "Level 2: HSE Procedures", description: "Quality Assurance and Safety (HSE) Procedures for all operations" },
  { icon: ClipboardCheck, title: "Level 3: Work Instructions", description: "Specific Work Instructions for each task and operation type" },
  { icon: Shield, title: "Level 4: Quality Records", description: "Quality and Safety Records for traceability and continuous improvement" },
];

const defaultHseCommitments = [
  "Zero tolerance for unsafe acts and conditions",
  "Full PTW (Permit to Work) system",
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


const permitsAndLicenses = [
  {
    title: "DPR / NUPRC Permit Bundle 2026",
    authority: "Nigerian Upstream Petroleum Regulatory Commission",
    description:
      "Current specialized category permits covering dredging, drilling and production services, offshore pipeline laying, and special transportation services.",
    href: "/downloads/compliance/dpr-nuprc-permits-2026-merged.pdf",
    cta: "View Permit Bundle",
    available: true,
  },
  {
    title: "PENCOM Compliance Certificate",
    authority: "National Pension Commission",
    description:
      "Requested in scope, but no standalone PENCOM file was present in the supplied ECLweb document set.",
    available: false,
  },
  {
    title: "NSITF Compliance Certificate",
    authority: "Nigeria Social Insurance Trust Fund",
    description:
      "Requested in scope, but no standalone NSITF file was present in the supplied ECLweb document set.",
    available: false,
  },
] as const;

const policyDocuments = [
  {
    icon: HeartHandshake,
    title: "Community Management Policy",
    description:
      "Document sourced from the current Community Relation Policy statement used for project stakeholder engagement.",
    href: "/downloads/compliance/community-management-policy.pdf",
  },
  {
    icon: Award,
    title: "Quality Policy",
    description:
      "Quality Policy Statement extracted from the current Quality Assurance and Quality Control policy manual.",
    href: "/downloads/compliance/quality-policy-statement.pdf",
    highlight:
      "Committed to providing products and services that satisfy client needs and specified quality requirements.",
  },
  {
    icon: Lock,
    title: "Security Policy",
    description:
      "Security Policy extracted from the current HSE policy documents for personnel, property, and operational risk protection.",
    href: "/downloads/compliance/security-policy.pdf",
  },
  {
    icon: Shield,
    title: "Safety Policy",
    description:
      "Occupational Health and Safety Policy extracted from the current HSE policy documents.",
    href: "/downloads/compliance/safety-policy.pdf",
  },
] as const;

export default function HSEQualityPage() {
  const { content } = usePageContent('hse');
  const heroContent = content.hero || {};
  const qmsContent = content.qms || {};
  const commitmentContent = content.commitment || {};
  const hseImages = siteImageSelections.hse;

  const hseCommitments = commitmentContent.items || defaultHseCommitments;

  return (
    <Layout>
      <Hero
        title={heroContent.title || "HSE & Quality Excellence"}
        subtitle={heroContent.subtitle || "Safety First. Quality Always. A firm commitment to zero incidents and high standards guides everything we do."}
        primaryCTA={{ label: heroContent.primaryBtnText || "Request HSE Documentation", href: heroContent.primaryBtnLink || "/contact" }}
        backgroundImage={heroContent.backgroundImage || hseImages.hero}
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
            <p className="enk-kicker justify-center">
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
                className="relative text-center enk-card enk-card--hover p-6 pt-7"
              >
                <span className="block font-mono text-[13px] font-medium tracking-[0.14em] mb-3" style={{ color: "var(--enk-bronze)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
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
              <p className="enk-kicker mb-3">
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
                  value={commitmentContent.description || "At Enikkom, HSE is more than a policy. It is a core value embedded in every aspect of our operations. We are committed to protecting our people, communities, and the environment."}
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
                    <CheckCircle className="h-5 w-5 flex-shrink-0" style={{ color: "var(--enk-safety)" }} />
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
                <EnhancedImage 
                src={hseImages.briefing}
                  alt="Enikkom field personnel working in full PPE" 
                  wrapperClassName="w-full h-[350px] md:h-[420px]"
                  className="w-full h-full"
                  tone="natural"
                  fallbackLabel="Field HSE compliance"
                />
              </div>
              <motion.div 
                className="absolute bottom-4 left-4 right-4 text-white p-4 rounded-xl"
                style={{ backgroundColor: "var(--enk-safety)" }}
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

      {/* Permits & Licenses */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="enk-kicker justify-center mb-3">Regulatory Compliance</p>
            <h2 className="mb-3">Permits and Licenses</h2>
            <p className="text-[14px] md:text-[15px] text-muted-foreground max-w-xl mx-auto">
              Compliance documents currently verified from the supplied corporate document pack.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {permitsAndLicenses.map((permit, i) => {
              const Icon = permit.available ? Landmark : FileX2;
              return (
                <motion.div
                  key={permit.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="enk-card enk-card--hover flex flex-col gap-4 p-6"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${permit.available ? "bg-primary/10" : "bg-muted"}`}>
                      <Icon className={`h-5 w-5 ${permit.available ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-semibold mb-1">{permit.title}</h4>
                      <p className="text-[12px] text-primary font-medium">{permit.authority}</p>
                    </div>
                  </div>

                  <p className="text-[13px] text-muted-foreground leading-relaxed flex-1">
                    {permit.description}
                  </p>

                  {permit.available ? (
                    <Button asChild variant="outline" className="h-10 w-fit gap-2">
                      <a href={permit.href} target="_blank" rel="noreferrer">
                        {permit.cta}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  ) : (
                    <span className="enk-chip w-fit">Source Not Supplied</span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Corporate Policies, exactly 4 approved policies */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="enk-kicker justify-center mb-3">Corporate Governance</p>
            <h2 className="mb-3">Our Policies</h2>
            <p className="text-[14px] md:text-[15px] text-muted-foreground max-w-xl mx-auto">
              Only the four approved policies below are displayed, with direct access to the current source documents.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {policyDocuments.map((policy, i) => {
              const Icon = policy.icon;
              return (
                <motion.div
                  key={policy.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="enk-card enk-card--hover flex flex-col gap-4 p-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="text-[15px] font-semibold">{policy.title}</h4>
                  </div>
                  {policy.highlight && (
                    <p className="text-[13px] font-medium leading-relaxed text-foreground">
                      {policy.highlight}
                    </p>
                  )}
                  <p className="text-[13px] text-muted-foreground leading-relaxed flex-1">
                    {policy.description}
                  </p>
                  <Button asChild variant="outline" className="h-10 w-fit gap-2">
                    <a href={policy.href} target="_blank" rel="noreferrer">
                      View Policy
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

    </Layout>
  );
}
