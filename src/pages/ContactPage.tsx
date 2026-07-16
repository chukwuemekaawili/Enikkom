import { Layout } from "@/components/layout";
import { Hero } from "@/components/sections";
import { RFQForm } from "@/components/forms/RFQForm";
import { EditableText } from "@/components/content";
import { usePageContent } from "@/hooks/useSiteSettings";
import { RecordSpecTable } from "@/components/records";
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
    address: "DCS Road, Warri, Delta State, Nigeria",
    type: "Operations Base",
  },
  {
    name: "Base 3, Warri",
    address: "Opposite Ejovi Jetty, Opete Road, Warri, Delta State, Nigeria",
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
      <SEO
        title="Contact Enikkom – Request a Quote"
        description="Get in touch to discuss your HDD, pipeline, dredging, or marine civil project. Request a quote or send drawings to Enikkom's technical team."
        canonical="/contact"
      />
      <Hero
        title={heroContent.title || "Contact Enikkom"}
        subtitle={heroContent.subtitle || "Get in touch to discuss your infrastructure project requirements."}
        badge="RFQ / Tender Desk"
        backgroundImage={heroContent.backgroundImage || contactImages.hero}
        size="small"
      />

      {/* Main Contact Form & Details Section */}
      <section className="enk-section" style={{ borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
            {/* Contact ledger */}
            <div className="space-y-8">
              <div>
                <p className="enk-kicker mb-4">Direct Contact</p>
                <RecordSpecTable
                  rows={[
                    {
                      label: "Phone",
                      value: (
                        <a
                          href={contactDetails.phone ? `tel:${contactDetails.phone}` : contact.phoneHref}
                          className="transition-colors hover:text-[var(--enk-accent-on-dark)] focus-ring rounded-sm"
                        >
                          <EditableText
                            value={contactDetails.phone || contact.phone}
                            pageSlug="contact"
                            sectionKey="contact_details"
                            field="phone"
                          />
                        </a>
                      ),
                    },
                    {
                      label: "Email",
                      value: (
                        <a
                          href={`mailto:${contactDetails.email || contact.email}`}
                          className="transition-colors hover:text-[var(--enk-accent-on-dark)] focus-ring rounded-sm"
                        >
                          <EditableText
                            value={contactDetails.email || contact.email}
                            pageSlug="contact"
                            sectionKey="contact_details"
                            field="email"
                          />
                        </a>
                      ),
                    },
                    {
                      label: "Website",
                      value: (
                        <EditableText
                          value={contactDetails.website || "www.enikkom.com"}
                          pageSlug="contact"
                          sectionKey="contact_details"
                          field="website"
                        />
                      ),
                    },
                  ]}
                />
              </div>

              <RecordSpecTable
                caption="Response & Hours"
                rows={[
                  {
                    label: "Response",
                    value: (
                      <EditableText
                        value={contactDetails.responseTime || "Within 24-48 business hours"}
                        pageSlug="contact"
                        sectionKey="contact_details"
                        field="responseTime"
                      />
                    ),
                  },
                  {
                    label: "Mon–Fri",
                    value: (
                      <EditableText
                        value={contactDetails.weekdayHours || "8:00 AM - 6:00 PM"}
                        pageSlug="contact"
                        sectionKey="contact_details"
                        field="weekdayHours"
                      />
                    ),
                  },
                  {
                    label: "Saturday",
                    value: (
                      <EditableText
                        value={contactDetails.saturdayHours || "9:00 AM - 2:00 PM"}
                        pageSlug="contact"
                        sectionKey="contact_details"
                        field="saturdayHours"
                      />
                    ),
                  },
                ]}
              />
            </div>

            {/* RFQ Form */}
            <div className="lg:col-span-2">
              <div className="enk-doc-card h-full p-6 md:p-8">
                <p className="enk-kicker mb-3">Request for Quotation</p>
                <h2 className="enk-display text-[clamp(1.3rem,2.2vw,1.6rem)] text-[var(--enk-ink)]">
                  <EditableText
                    value={content.form?.title || "Send an RFQ or tender enquiry"}
                    pageSlug="contact"
                    sectionKey="form"
                    field="title"
                  />
                </h2>
                <p className="mb-6 mt-2 text-[14px] leading-6 text-[var(--enk-steel)]">
                  <EditableText
                    value={content.form?.description || "Fill out the form to compose your enquiry email. The engineering team reviews every RFQ and responds within 24-48 business hours."}
                    pageSlug="contact"
                    sectionKey="form"
                    field="description"
                  />
                </p>
                <RFQForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="enk-section" style={{ backgroundColor: "var(--enk-bg-muted)" }}>
        <div className="enk-container">
          <div className="max-w-2xl">
            <p className="enk-kicker mb-4">Registered Locations</p>
            <h2 className="enk-display text-[clamp(1.5rem,2.8vw,2.05rem)] text-[var(--enk-ink)]">
              <EditableText
                value={contactDetails.locationsTitle || "Office Locations"}
                pageSlug="contact"
                sectionKey="contact_details"
                field="locationsTitle"
              />
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[var(--enk-steel)] md:text-[15px]">
              We operate from our head office in Abuja, corporate office in Lagos, and multiple operational bases in the Niger Delta.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offices.map((office: { name: string; address: string; type: string }) => (
              <div key={office.name} className="enk-doc-card flex flex-col p-5">
                <p className="enk-overline">{office.type}</p>
                <h3 className="mt-2.5 text-[15px] font-semibold text-[var(--enk-ink)]">{office.name}</h3>
                <p className="enk-mono mt-2 flex-1 text-[12px] leading-6 text-[var(--enk-blueprint)]">
                  {office.address}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
