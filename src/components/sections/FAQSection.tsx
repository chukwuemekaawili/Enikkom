import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// FAQ content, all answers verified against approved ECLweb source documents
const faqs = [
  {
    question: "What types of HDD and pipeline projects do you support?",
    answer: "We support a wide range of critical projects including river crossings, road and rail crossings, shore approaches, and swamp pipeline installations. Our capabilities cover continuous HDD, microtunneling, guided boring, and full EPCI for pipelines, flowlines, and associated infrastructure.",
  },
  {
    question: "Can you support EPC contractors and energy-sector clients?",
    answer: "Yes. We operate both as a primary contractor for major operators (like SPDC and NNPC) and as a specialist subcontractor for EPC companies. Our team integrates into larger project frameworks, delivering specialised trenchless and marine civil scopes on schedule.",
  },
  {
    question: "Do you provide project documentation and technical reports?",
    answer: "Yes. We provide full project documentation, including pre-drill engineering profiles, execution plans, as-built drawings, and final handover technical reports, supporting accountability and compliance with international standards.",
  },
  {
    question: "How do you manage QHSE on project sites?",
    answer: "QHSE is embedded into our operating model. We adhere to ISO-aligned systems, conduct rigorous pre-mobilisation checks, and enforce strict site safety protocols across every project site.",
  },
  {
    question: "How can we request a project assessment?",
    answer: "You can request an assessment by sharing your project scope via our contact form or directly reaching out to our engineering team on WhatsApp. We typically review the terrain, pipe specifications, and crossing length to provide an initial feasibility overview and discuss the next steps.",
  },
];

interface FAQSectionProps {
  className?: string;
}

export function FAQSection({ className }: FAQSectionProps) {
  return (
    <section className={`section-padding bg-muted/40 ${className || ""}`}>
      <div className="container-wide">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="enk-kicker justify-center mb-3">Common Questions</p>
          <h2 className="mb-3">Frequently Asked Questions</h2>
          <p className="text-[14px] md:text-[15px] text-muted-foreground max-w-xl mx-auto">
            Get answers to the most common questions about our services and capabilities.
          </p>
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border/60 rounded-2xl px-6 data-[state=open]:shadow-[0_8px_30px_rgb(0,0,0,0.04)] data-[state=open]:border-primary/20 transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-[15px] md:text-[16px] font-bold py-5 hover:no-underline text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[14px] md:text-[15px] text-muted-foreground leading-relaxed pb-6 pr-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
