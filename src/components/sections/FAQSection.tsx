import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// FAQ content — all answers verified against approved ECLweb source documents
const faqs = [
  {
    question: "What services does Enikkom provide?",
    answer: "Enikkom Group provides end-to-end EPCI services including: Trenchless Installations (HDD, Guided Boring, Microtunneling, Direct Pipe, Pipe Ramming, HDD Rescue); Pipeline & Flowline Construction on land, swamp, and offshore; Dredging & Piling Works including sand filling and reclamation; Production Facilities Construction including flow stations and wellhead works; Pipeline Security & Monitoring; and Logistics Support for land and swamp operations.",
  },
  {
    question: "What is Horizontal Directional Drilling (HDD) and why is it used?",
    answer: "Horizontal Directional Drilling (HDD) is a trenchless technology that installs pipelines underground without disturbing the surface. It is used to safely cross rivers, roads, railways, swamps, and environmentally sensitive areas. HDD eliminates the need for disruptive open-cut trenching, reduces environmental impact, and is often faster and more cost-effective for complex crossings. Enikkom pioneered HDD in Nigeria with the first crossing of the River Niger in 2003.",
  },
  {
    question: "What records has Enikkom set in HDD and trenchless works?",
    answer: "Enikkom holds multiple Africa-first and Nigeria-first records: Africa's longest single drill — 3.1km × 16\" (Atlas Cove-Mosimi, April 2016); Africa's deepest HDD crossing — 36\" × 1.2km at over 80m depth (Ekiadolor, February 2016); Africa's longest bundled crossing — 12\"+3\" × 2.78km (Otumara–Escravos, for Saipem/SPDC); Nigeria's longest CHDD — 10\" × 12km (OML34, Utorogun, Delta State); and Nigeria's largest pipe-size crossing at time of completion — 40\" × 760m (Daewoo/SPDC, January 2010).",
  },
  {
    question: "Does Enikkom own its equipment or rely on subcontractors?",
    answer: "Enikkom owns Nigeria's largest HDD fleet — 9 HDD rigs with pullback capacities ranging from 50 to 500 tons — plus 6 Thrust Boring Machines (24\" to 72\"), 4 Micro-tunneling and Pipe Jacking units, dredgers, crane barges, excavators, pipelayers, and full support equipment. All equipment is held in-country in Nigeria. Our strategic partnership with HDDThailand further strengthens our technical capacity.",
  },
  {
    question: "What certifications and compliance standards does Enikkom hold?",
    answer: "The current published compliance pack on the site includes ISO 9001:2015 quality management certification, the active DPR / NUPRC permit bundle, and four core policy statements covering community management, quality, security, and safety. Additional registrations may be available in internal corporate files, but only the supplied document-backed items are displayed publicly.",
  },
  {
    question: "Who are Enikkom's major clients?",
    answer: "Enikkom has delivered projects for major operators and contractors including Shell Petroleum Development Company (SPDC), NPDC/ND Western, NNPC, Saipem Contracting Nigeria Limited, Dangote Fertilizer, NIPCO Plc, Niger Delta Power Holding Company (NDPHC), Oilserv Limited, Kaztec Engineering, Green Gas Plc, Zakhem Construction, PPMC, Oando Plc, and others across Nigeria.",
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
