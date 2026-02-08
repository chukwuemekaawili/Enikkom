import { Layout } from "@/components/layout";
import { Hero, CTABand } from "@/components/sections";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Shield, Heart, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditableText, EditableImage } from "@/components/admin";
import { usePageContent } from "@/hooks/useSiteSettings";

// Import unique images for Careers page
import heroCareers from "@/assets/projects/careers-team.jpg";
import cultureTeam from "@/assets/projects/hdd-team-1.jpg";

const defaultBenefits = [
  { icon: GraduationCap, title: "Training & Development", description: "HSE certifications, technical training, and career development programs" },
  { icon: Shield, title: "Safety Culture", description: "Industry-leading safety standards with zero LTI record across all projects" },
  { icon: Heart, title: "Health Coverage", description: "Comprehensive health insurance for employees and dependents" },
  { icon: Briefcase, title: "Career Growth", description: "Opportunities across HDD, pipeline, marine, and corporate functions" },
];

const defaultOpenings = [
  { title: "Senior HDD Engineer", location: "Port Harcourt", type: "Full-time" },
  { title: "Pipeline Project Manager", location: "Lagos", type: "Full-time" },
  { title: "HSE Coordinator", location: "Port Harcourt", type: "Full-time" },
  { title: "Welding Supervisor", location: "Various Sites", type: "Full-time" },
];

export default function CareersPage() {
  const { content } = usePageContent('careers');
  
  const heroContent = content.hero || {};
  const benefitsContent = content.benefits || {};
  const openingsContent = content.openings || {};
  const cultureContent = content.culture || {};

  return (
    <Layout>
      <Hero 
        title={heroContent.title || "Build Your Career at Enikkom"} 
        subtitle={heroContent.subtitle || "Join West Africa's leading infrastructure contractor. Be part of a team of 500+ professionals delivering world-class projects across Nigeria."} 
        backgroundImage={heroContent.backgroundImage || heroCareers} 
        size="default"
        primaryCTA={{ label: "View Openings", href: "#openings" }}
        pageSlug="careers"
        sectionKey="hero"
        imageField="backgroundImage"
      />

      {/* Benefits Section */}
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
                value={benefitsContent.eyebrow || "Benefits"}
                pageSlug="careers"
                sectionKey="benefits"
                field="eyebrow"
              />
            </p>
            <h2 className="section-title">
              <EditableText
                value={benefitsContent.title || "Why Work With Us"}
                pageSlug="careers"
                sectionKey="benefits"
                field="title"
              />
            </h2>
            <p className="section-subtitle">
              <EditableText
                value={benefitsContent.description || "Join the team that pioneered HDD technology in Nigeria and continues to lead the industry."}
                pageSlug="careers"
                sectionKey="benefits"
                field="description"
              />
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {defaultBenefits.map((b, i) => (
              <motion.div 
                key={b.title} 
                initial={{ opacity: 0, y: 24 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.4, delay: i * 0.1 }} 
                className="card-premium text-center p-6"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <b.icon className="h-7 w-7 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">{b.title}</h4>
                <p className="text-[14px] text-muted-foreground leading-relaxed">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section id="openings" className="section-padding bg-muted/30">
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
                value={openingsContent.eyebrow || "Opportunities"}
                pageSlug="careers"
                sectionKey="openings"
                field="eyebrow"
              />
            </p>
            <h2 className="section-title">
              <EditableText
                value={openingsContent.title || "Current Openings"}
                pageSlug="careers"
                sectionKey="openings"
                field="title"
              />
            </h2>
            <p className="section-subtitle">
              <EditableText
                value={openingsContent.description || "We're always looking for talented engineers, project managers, and HSE professionals."}
                pageSlug="careers"
                sectionKey="openings"
                field="description"
              />
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {defaultOpenings.map((job, i) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="card-interactive p-6 group"
              >
                <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors">{job.title}</h3>
                <div className="flex flex-wrap gap-4 text-[14px] text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{job.type}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <a 
                    href="mailto:careers@enikkom.com" 
                    className="inline-flex items-center gap-2 text-[13px] font-semibold text-primary hover:underline"
                  >
                    Apply Now
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <p className="text-muted-foreground mb-4">
              Don't see the right role? Send your CV to:
            </p>
            <a 
              href="mailto:careers@enikkom.com" 
              className="text-xl font-bold text-primary hover:underline"
            >
              careers@enikkom.com
            </a>
          </motion.div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="section-padding bg-charcoal">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="section-eyebrow">
                <EditableText
                  value={cultureContent.eyebrow || "Culture"}
                  pageSlug="careers"
                  sectionKey="culture"
                  field="eyebrow"
                />
              </p>
              <h2 className="text-white mb-6">
                <EditableText
                  value={cultureContent.title || "Our Culture"}
                  pageSlug="careers"
                  sectionKey="culture"
                  field="title"
                />
              </h2>
              <p className="text-white/60 text-[15px] mb-4 leading-relaxed">
                <EditableText
                  value={cultureContent.description1 || "At Enikkom, we believe our people are our greatest asset. We foster a culture of continuous learning, innovation, and safety excellence that empowers every team member."}
                  pageSlug="careers"
                  sectionKey="culture"
                  field="description1"
                  multiline
                />
              </p>
              <p className="text-white/60 text-[15px] mb-8 leading-relaxed">
                <EditableText
                  value={cultureContent.description2 || "Our diverse workforce of over 500 professionals brings together expertise from across Nigeria and beyond, united by a shared commitment to delivering world-class infrastructure."}
                  pageSlug="careers"
                  sectionKey="culture"
                  field="description2"
                  multiline
                />
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                  <div className="stat-value stat-value-white">
                    <EditableText
                      value={cultureContent.stat1_value || "500+"}
                      pageSlug="careers"
                      sectionKey="culture"
                      field="stat1_value"
                    />
                  </div>
                  <div className="stat-label text-white/50">
                    <EditableText
                      value={cultureContent.stat1_label || "Team Members"}
                      pageSlug="careers"
                      sectionKey="culture"
                      field="stat1_label"
                    />
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                  <div className="stat-value stat-value-white">
                    <EditableText
                      value={cultureContent.stat2_value || "29+"}
                      pageSlug="careers"
                      sectionKey="culture"
                      field="stat2_value"
                    />
                  </div>
                  <div className="stat-label text-white/50">
                    <EditableText
                      value={cultureContent.stat2_label || "Years Experience"}
                      pageSlug="careers"
                      sectionKey="culture"
                      field="stat2_label"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative image-premium"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <EditableImage
                src={cultureContent.image || cultureTeam}
                alt="Enikkom Team"
                className="w-full h-[350px] md:h-[400px] object-cover rounded-xl"
                pageSlug="careers"
                sectionKey="culture"
                field="image"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <CTABand headline="Ready to Join Us?" primaryCTA={{ label: "Apply Now", href: "mailto:careers@enikkom.com" }} />
    </Layout>
  );
}