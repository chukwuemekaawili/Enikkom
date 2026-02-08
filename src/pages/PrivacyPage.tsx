import { Layout } from "@/components/layout";
import { usePageContent } from "@/hooks/useSiteSettings";
import { EditableText } from "@/components/admin";

export default function PrivacyPage() {
  const { content } = usePageContent('privacy');
  const pageContent = content.main || {};

  return (
    <Layout>
      <div className="section-padding">
        <div className="container-wide max-w-4xl">
          <h1 className="mb-8">
            <EditableText
              value={pageContent.title || "Privacy Policy"}
              pageSlug="privacy"
              sectionKey="main"
              field="title"
            />
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground text-lg mb-8">
              <EditableText
                value={pageContent.last_updated || "Last updated: January 2025"}
                pageSlug="privacy"
                sectionKey="main"
                field="last_updated"
              />
            </p>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">
                <EditableText
                  value={pageContent.section1_title || "1. Introduction"}
                  pageSlug="privacy"
                  sectionKey="main"
                  field="section1_title"
                />
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                <EditableText
                  value={pageContent.section1_text || "Enikkom Construction Limited (\"we\", \"our\", or \"us\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage with our services."}
                  pageSlug="privacy"
                  sectionKey="main"
                  field="section1_text"
                  multiline
                />
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">
                <EditableText
                  value={pageContent.section2_title || "2. Information We Collect"}
                  pageSlug="privacy"
                  sectionKey="main"
                  field="section2_title"
                />
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <EditableText
                  value={pageContent.section2_intro || "We may collect personal information that you voluntarily provide to us when you:"}
                  pageSlug="privacy"
                  sectionKey="main"
                  field="section2_intro"
                />
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Submit a Request for Quotation (RFQ)</li>
                <li>Contact us through our website forms</li>
                <li>Apply for employment</li>
                <li>Subscribe to our newsletter</li>
                <li>Engage in business communications with us</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <EditableText
                  value={pageContent.section2_outro || "This information may include your name, email address, phone number, company name, project details, and any other information you choose to provide."}
                  pageSlug="privacy"
                  sectionKey="main"
                  field="section2_outro"
                  multiline
                />
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">
                <EditableText
                  value={pageContent.section3_title || "3. How We Use Your Information"}
                  pageSlug="privacy"
                  sectionKey="main"
                  field="section3_title"
                />
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Respond to your inquiries and provide quotations</li>
                <li>Process and fulfill service requests</li>
                <li>Communicate about projects and services</li>
                <li>Send administrative information and updates</li>
                <li>Process employment applications</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">
                <EditableText
                  value={pageContent.section4_title || "4. Information Sharing"}
                  pageSlug="privacy"
                  sectionKey="main"
                  field="section4_title"
                />
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                <EditableText
                  value={pageContent.section4_text || "We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, provided they agree to keep this information confidential."}
                  pageSlug="privacy"
                  sectionKey="main"
                  field="section4_text"
                  multiline
                />
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">
                <EditableText
                  value={pageContent.section5_title || "5. Data Security"}
                  pageSlug="privacy"
                  sectionKey="main"
                  field="section5_title"
                />
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                <EditableText
                  value={pageContent.section5_text || "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure."}
                  pageSlug="privacy"
                  sectionKey="main"
                  field="section5_text"
                  multiline
                />
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">
                <EditableText
                  value={pageContent.section6_title || "6. Your Rights"}
                  pageSlug="privacy"
                  sectionKey="main"
                  field="section6_title"
                />
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Withdraw consent for marketing communications</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">
                <EditableText
                  value={pageContent.section7_title || "7. Contact Us"}
                  pageSlug="privacy"
                  sectionKey="main"
                  field="section7_title"
                />
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="font-medium">
                  <EditableText
                    value={pageContent.contact_company || "Enikkom Construction Limited"}
                    pageSlug="privacy"
                    sectionKey="main"
                    field="contact_company"
                  />
                </p>
                <p className="text-muted-foreground">
                  Email: <EditableText
                    value={pageContent.contact_email || "info@enikkom.com"}
                    pageSlug="privacy"
                    sectionKey="main"
                    field="contact_email"
                  />
                </p>
                <p className="text-muted-foreground">
                  Phone: <EditableText
                    value={pageContent.contact_phone || "+234 803 508 2614"}
                    pageSlug="privacy"
                    sectionKey="main"
                    field="contact_phone"
                  />
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
