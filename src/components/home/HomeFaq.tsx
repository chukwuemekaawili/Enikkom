import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/content/home";
import { SectionHeading } from "./SectionHeading";

/** Buyer-objection FAQ. */
export function HomeFaq() {
  return (
    <section id="faq" className="enk-section">
      <div className="enk-container">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            kicker="Before you brief us"
            title="The questions procurement teams ask first"
            intro="Straight answers on scope, regions, safety and how to get a fast technical response."
          />

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-[var(--enk-line)]">
                <AccordionTrigger className="py-5 text-left text-[16px] font-semibold text-[var(--enk-ink)] hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[15px] leading-relaxed text-[var(--enk-steel)]">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
