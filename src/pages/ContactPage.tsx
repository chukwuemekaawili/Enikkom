import { Layout } from "@/components/layout";
import { Hero } from "@/components/sections";
import { RFQForm } from "@/components/forms/RFQForm";
import { EditableText } from "@/components/admin";
import { usePageContent } from "@/hooks/useSiteSettings";
import { MapPin, Phone, Mail, Clock, Building2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

import contactOffice from "@/assets/projects/contact-office.jpg";

// Verified office locations from Enikkom documents
const defaultOffices = [
  { 
    name: "Abuja Head Office", 
    address: "11, 65 Road Abuja Model City, Gwarinpa, FCT, Nigeria",
    type: "Head Office"
  },
  { 
    name: "Lagos Corporate Office", 
    address: "5b Theophilus Orji Street, Lekki Phase 1, Lagos, Nigeria",
    type: "Corporate"
  },
  { 
    name: "Port Harcourt Fabrication Facility", 
    address: "Obasi Brothers Industrial Park, Area C, East/West Road, Eleme, Port Harcourt, Rivers State, Nigeria",
    type: "Fabrication"
  },
  { 
    name: "Arepo Operations Base", 
    address: "7 Joseph Ogunjobi Street, Praise Hill Estate, Arepo, Ogun State, Nigeria",
    type: "Operations"
  },
  { 
    name: "Warri Operations Base", 
    address: "Km7-DCS Road, Warri, Delta State, Nigeria",
    type: "Operations"
  },
];

export default function ContactPage() {
  const { content } = usePageContent('contact');
  const heroContent = content.hero || {};
  const contactDetails = content.contact_details || {};

  // Use offices from content or defaults
  const offices = content.offices?.list || defaultOffices;

  return (
    <Layout>
      <Hero 
        title={heroContent.title || "Contact Enikkom"} 
        subtitle={heroContent.subtitle || "Get in touch to discuss your infrastructure project requirements."} 
        backgroundImage={heroContent.backgroundImage || contactOffice} 
        size="small"
        pageSlug="contact"
        sectionKey="hero"
        imageField="backgroundImage"
      />

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
                <p className="section-eyebrow mb-4">Locations</p>
                <h3 className="text-[20px] font-semibold mb-5">
                  <EditableText
                    value={contactDetails.locationsTitle || "Office Locations"}
                    pageSlug="contact"
                    sectionKey="contact_details"
                    field="locationsTitle"
                  />
                </h3>
                <div className="space-y-4">
                  {offices.map((office: any, i: number) => (
                    <motion.div 
                      key={office.name}
                      className="flex gap-3 p-4 rounded-xl bg-muted/50 border border-border/50"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-[14px]">{office.name}</p>
                        <span className="text-[11px] text-primary font-medium">{office.type}</span>
                        <p className="text-[13px] text-muted-foreground mt-1">{office.address}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <h3 className="text-[18px] font-semibold mb-4">
                  <EditableText
                    value={contactDetails.detailsTitle || "Contact Details"}
                    pageSlug="contact"
                    sectionKey="contact_details"
                    field="detailsTitle"
                  />
                </h3>
                <div className="space-y-3">
                  <a 
                    href={`tel:${contactDetails.phone || '+2348065738555'}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-[15px] group-hover:text-primary transition-colors">
                      <EditableText
                        value={contactDetails.phone || "+234 806 573 8555"}
                        pageSlug="contact"
                        sectionKey="contact_details"
                        field="phone"
                      />
                    </span>
                  </a>
                  <a 
                    href={`mailto:${contactDetails.email || 'info@enikkom.com'}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-[15px] group-hover:text-primary transition-colors">
                      <EditableText
                        value={contactDetails.email || "info@enikkom.com"}
                        pageSlug="contact"
                        sectionKey="contact_details"
                        field="email"
                      />
                    </span>
                  </a>
                </div>
              </div>

              <div className="p-5 bg-primary/5 border border-primary/15 rounded-xl">
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
              <div className="card-premium p-6 md:p-8">
                <p className="section-eyebrow mb-2">Get Started</p>
                <h2 className="text-[24px] md:text-[28px] font-bold mb-2">
                  <EditableText
                    value={content.form?.title || "Request a Quote"}
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
    </Layout>
  );
}
