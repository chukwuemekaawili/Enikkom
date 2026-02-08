import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What services does Enikkom provide?",
    answer: "Enikkom Construction Limited offers comprehensive infrastructure services including Horizontal Directional Drilling (HDD), Pipeline & Flowline Construction, Dredging & Piling, Jetty & Quay Wall Construction, Shore Approach works, Production Facilities Construction, Pipeline Security & Monitoring, Geotechnical Surveys, and Logistics Support. We provide end-to-end solutions from design through commissioning.",
  },
  {
    question: "What is Horizontal Directional Drilling (HDD) and why is it important?",
    answer: "Horizontal Directional Drilling (HDD) is a trenchless technology for installing pipelines underground without disturbing the surface. It's ideal for crossing rivers, roads, railways, and environmentally sensitive areas. HDD minimizes environmental impact, reduces construction time, and is often more cost-effective than traditional open-cut methods. Enikkom pioneered HDD in Nigeria with the historic River Niger crossing in 2003.",
  },
  {
    question: "What is Enikkom's track record with HDD projects in Nigeria?",
    answer: "Enikkom has installed over 100km of HDD pipelines in Nigeria since 2003. Our record-breaking projects include Africa's longest single drill at Atlas Cove-Mosimi (3.1km, 16\" pipeline) and Nigeria's longest Continuous HDD at OML34 (12km, 10\" pipeline). We've completed projects for Shell, NNPC, Dangote, Chevron, Total, and other major operators.",
  },
  {
    question: "Do you own your equipment or rely on subcontractors?",
    answer: "Enikkom owns West Africa's largest HDD fleet with 10+ maxi rigs (up to 500 tons pullback capacity), supported by our strategic partnership with HDDThailand. We also own excavators, pipelayers, dredgers, crane barges, and support vessels. This ownership model ensures reliability, cost control, and immediate equipment availability for our clients' projects.",
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
          <p className="text-[11px] md:text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Common Questions
          </p>
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
                className="bg-card border rounded-xl px-5 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left text-[15px] font-medium py-4 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[14px] text-muted-foreground leading-relaxed pb-4">
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
