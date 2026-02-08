import { Layout } from "@/components/layout";
import { usePageContent } from "@/hooks/useSiteSettings";
import { EditableText } from "@/components/admin";

export default function TermsPage() {
  const { content } = usePageContent('terms');
  const pageContent = content.main || {};

  return (
    <Layout>
      <div className="section-padding">
        <div className="container-wide max-w-4xl">
          <h1 className="mb-8">
            <EditableText
              value={pageContent.title || "Terms of Service"}
              pageSlug="terms"
              sectionKey="main"
              field="title"
            />
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground text-lg mb-8">
              <EditableText
                value={pageContent.last_updated || "Last updated: January 2025"}
                pageSlug="terms"
                sectionKey="main"
                field="last_updated"
              />
            </p>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">
                <EditableText
                  value={pageContent.section1_title || "1. Acceptance of Terms"}
                  pageSlug="terms"
                  sectionKey="main"
                  field="section1_title"
                />
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                <EditableText
                  value={pageContent.section1_text || "By accessing and using the Enikkom Construction Limited website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website."}
                  pageSlug="terms"
                  sectionKey="main"
                  field="section1_text"
                  multiline
                />
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">
                <EditableText
                  value={pageContent.section2_title || "2. Use of Website"}
                  pageSlug="terms"
                  sectionKey="main"
                  field="section2_title"
                />
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <EditableText
                  value={pageContent.section2_intro || "You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of, or restrict the use and enjoyment of, this site by any third party. Prohibited behavior includes:"}
                  pageSlug="terms"
                  sectionKey="main"
                  field="section2_intro"
                  multiline
                />
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Transmitting any material that is unlawful, harmful, or offensive</li>
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Using the website to distribute malware or other harmful code</li>
                <li>Engaging in any activity that could damage or impair the website</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">
                <EditableText
                  value={pageContent.section3_title || "3. Intellectual Property"}
                  pageSlug="terms"
                  sectionKey="main"
                  field="section3_title"
                />
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                <EditableText
                  value={pageContent.section3_text || "All content on this website, including text, graphics, logos, images, and software, is the property of Enikkom Construction Limited or its content suppliers and is protected by Nigerian and international copyright laws. You may not reproduce, distribute, or create derivative works without our express written consent."}
                  pageSlug="terms"
                  sectionKey="main"
                  field="section3_text"
                  multiline
                />
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">
                <EditableText
                  value={pageContent.section4_title || "4. Request for Quotation (RFQ)"}
                  pageSlug="terms"
                  sectionKey="main"
                  field="section4_title"
                />
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                <EditableText
                  value={pageContent.section4_text || "Submission of an RFQ through our website does not constitute a binding contract. All quotations provided are subject to our standard terms and conditions and are valid for the period specified in the quotation document. Final contracts are subject to negotiation and formal agreement."}
                  pageSlug="terms"
                  sectionKey="main"
                  field="section4_text"
                  multiline
                />
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">
                <EditableText
                  value={pageContent.section5_title || "5. Disclaimer of Warranties"}
                  pageSlug="terms"
                  sectionKey="main"
                  field="section5_title"
                />
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                <EditableText
                  value={pageContent.section5_text || "This website is provided \"as is\" without any warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components. Information on this website is for general purposes only and should not be relied upon as professional engineering advice."}
                  pageSlug="terms"
                  sectionKey="main"
                  field="section5_text"
                  multiline
                />
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">
                <EditableText
                  value={pageContent.section6_title || "6. Limitation of Liability"}
                  pageSlug="terms"
                  sectionKey="main"
                  field="section6_title"
                />
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                <EditableText
                  value={pageContent.section6_text || "Enikkom Construction Limited shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of this website or our services. Our total liability shall not exceed the amount paid by you, if any, for accessing this website."}
                  pageSlug="terms"
                  sectionKey="main"
                  field="section6_text"
                  multiline
                />
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">
                <EditableText
                  value={pageContent.section7_title || "7. Third-Party Links"}
                  pageSlug="terms"
                  sectionKey="main"
                  field="section7_title"
                />
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                <EditableText
                  value={pageContent.section7_text || "This website may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of these websites and accept no responsibility for them or for any loss or damage that may arise from your use of them."}
                  pageSlug="terms"
                  sectionKey="main"
                  field="section7_text"
                  multiline
                />
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">
                <EditableText
                  value={pageContent.section8_title || "8. Governing Law"}
                  pageSlug="terms"
                  sectionKey="main"
                  field="section8_title"
                />
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                <EditableText
                  value={pageContent.section8_text || "These Terms of Service shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the Nigerian courts."}
                  pageSlug="terms"
                  sectionKey="main"
                  field="section8_text"
                  multiline
                />
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">
                <EditableText
                  value={pageContent.section9_title || "9. Changes to Terms"}
                  pageSlug="terms"
                  sectionKey="main"
                  field="section9_title"
                />
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                <EditableText
                  value={pageContent.section9_text || "We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after any changes constitutes acceptance of the new terms."}
                  pageSlug="terms"
                  sectionKey="main"
                  field="section9_text"
                  multiline
                />
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">
                <EditableText
                  value={pageContent.section10_title || "10. Contact Information"}
                  pageSlug="terms"
                  sectionKey="main"
                  field="section10_title"
                />
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions regarding these Terms of Service, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="font-medium">
                  <EditableText
                    value={pageContent.contact_company || "Enikkom Construction Limited"}
                    pageSlug="terms"
                    sectionKey="main"
                    field="contact_company"
                  />
                </p>
                <p className="text-muted-foreground">
                  Email: <EditableText
                    value={pageContent.contact_email || "info@enikkom.com"}
                    pageSlug="terms"
                    sectionKey="main"
                    field="contact_email"
                  />
                </p>
                <p className="text-muted-foreground">
                  Phone: <EditableText
                    value={pageContent.contact_phone || "+234 803 508 2614"}
                    pageSlug="terms"
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
