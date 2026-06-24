import { Layout } from "@/components/layout";
import { Hero } from "@/components/sections";
import { RFQForm } from "@/components/forms/RFQForm";
import { EditableText } from "@/components/content";
import { usePageContent } from "@/hooks/useSiteSettings";
import { MapPin, Phone, Mail, Clock, Building2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { siteImageSelections } from "@/content/siteImageSelections";
import { contact } from "@/content/home";
import SEO from "@/components/ui/SEO";

// Verified office locations from Enikkom documents
const defaultOffices = [
  {
    name: "Abuja Head Office",
    address: "11, 65 Road, Abuja Model City, Gwarinpa, FCT, Nigeria",
    type: "Head Office",
  },
  {
    name: "Lagos Corporate Office",
    address: "No 5b Theophilus Orji Street, Lekki Phase 1, Lagos, Nigeria",
    type: "Corporate",
  },
  {
    name: "Base 1, Arepo",
    address: "7 Joseph Ogunjobi Street, Praise Hill Estate, Arepo, Ogun State, Nigeria",
    type: "Operations Base",
  },
  {
    name: "Base 2, Warri",
    address: "Km7-DCS Road, Warri, Delta State, Nigeria",
    type: "Operations Base",
  },
  {
    name: "Base 3, Warri",
    address: "Opposite Ejovi Jetty, Opete Road, Warri, Delta State, Nigeria",
    type: "Operations Base",
  },
  {
    name: "Base 4, Warri",
    address: "Old NNPC Filling Station, DCS Road, Warri, Delta State, Nigeria",
    type: "Operations Base",
  },
];

export default function ContactPage() {
  const { content } = usePageContent('contact');
  const heroContent = content.hero || {};
  const contactDetails = content.contact_details || {};
  const contactImages = siteImageSelections.contact;

  // Use offices from content or defaults
  const offices = content.offices?.list || defaultOffices;

  return (
    <Layout>
      <SEO title="Contact Us" description="Get in touch to discuss your infrastructure project requirements with Enikkom." />
      <Hero 
        title={heroContent.title || "Contact Enikkom"} 
        subtitle={heroContent.subtitle || "Get in touch to discuss your infrastructure project requirements."} 
        backgroundImage={heroContent.backgroundImage || contactImages.hero} 
        size="small"
        pageSlug="contact"
        sectionKey="hero"
        imageField="backgroundImage"
      />

      {/* Main Contact Form & Details Section */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-12">
            {/* Contact Info */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <p className="enk-kicker mb-2">Connect With Us</p>
                <h3 className="text-[20px] font-semibold mb-5">
                  <EditableText
                    value={contactDetails.detailsTitle || "Contact Details"}
                    pageSlug="contact"
                    sectionKey="contact_details"
                    field="detailsTitle"
                  />
                </h3>
                <div className="space-y-3">
                  <a
                    href={contactDetails.phone ? `tel:${contactDetails.phone}` : contact.phoneHref}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-[15px] group-hover:text-primary transition-colors">
                      <EditableText
                        value={contactDetails.phone || contact.phone}
                        pageSlug="contact"
                        sectionKey="contact_details"
                        field="phone"
                      />
                    </span>
                  </a>
                  <a 
                    href={`mailto:${contactDetails.email || contact.email}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-[15px] group-hover:text-primary transition-colors">
                      <EditableText
                        value={contactDetails.email || contact.email}
                        pageSlug="contact"
                        sectionKey="contact_details"
                        field="email"
                      />
                    </span>
                  </a>
                </div>
              </div>

              <div className="enk-card p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-[15px]">Response Time</span>
                </div>
                <p className="text-[14px] text-muted-foreground leading-relaxed">
                  <EditableText
                    value={contactDetails.responseTime || "We respond to all inquiries within 24-48 business hours."}
                    pageSlug="contact"
                    sectionKey="contact_details"
                    field="responseTime"
                  />
                </p>
              </div>

              <div className="p-5 bg-muted/40 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Building2 className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-[15px]">Business Hours</span>
                </div>
                <div className="space-y-1 text-[14px] text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <EditableText
                      value={contactDetails.weekdayHours || "Monday - Friday: 8:00 AM - 6:00 PM"}
                      pageSlug="contact"
                      sectionKey="contact_details"
                      field="weekdayHours"
                    />
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <EditableText
                      value={contactDetails.saturdayHours || "Saturday: 9:00 AM - 2:00 PM"}
                      pageSlug="contact"
                      sectionKey="contact_details"
                      field="saturdayHours"
                    />
                  </p>
                </div>
              </div>

              {/* Website */}
              <div className="p-4 bg-muted/30 rounded-xl">
                <p className="text-[13px] text-muted-foreground">
                  <span className="font-semibold text-foreground">Website:</span>{' '}
                  <EditableText
                    value={contactDetails.website || "www.enikkom.com"}
                    pageSlug="contact"
                    sectionKey="contact_details"
                    field="website"
                  />
                </p>
              </div>
            </motion.div>

            {/* RFQ Form */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="enk-card p-6 md:p-8 h-full">
                <p className="enk-kicker mb-2">Get Started</p>
                <h2 className="enk-display text-[clamp(1.4rem,2.4vw,1.75rem)] text-[var(--enk-ink)] mb-2">
                  <EditableText
                    value={content.form?.title || "Contact Us"}
                    pageSlug="contact"
                    sectionKey="form"
                    field="title"
                  />
                </h2>
                <p className="text-muted-foreground text-[15px] mb-6">
                  <EditableText
                    value={content.form?.description || "Fill out the form below and our engineering team will get back to you with a detailed proposal."}
                    pageSlug="contact"
                    sectionKey="form"
                    field="description"
                  />
                </p>
                <RFQForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="section-padding bg-muted/30 border-t border-border">
        <div className="container-wide">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="enk-kicker mb-3">Our Presence</p>
            <h2 className="enk-display text-[clamp(1.6rem,3vw,2.2rem)] text-[var(--enk-ink)]">
              <EditableText
                value={contactDetails.locationsTitle || "Office Locations"}
                pageSlug="contact"
                sectionKey="contact_details"
                field="locationsTitle"
              />
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              We operate from our head office in Abuja, corporate office in Lagos, and multiple operational bases in the Niger Delta.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offices.map((office: any, i: number) => (
              <motion.div 
                key={office.name}
                className="flex flex-col p-6 rounded-2xl bg-card border border-border/60 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-[17px] mb-1">{office.name}</h3>
                <span className="enk-chip mb-3">{office.type}</span>
                <p className="text-[14px] text-muted-foreground leading-relaxed flex-1">{office.address}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
