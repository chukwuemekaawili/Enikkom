import { Award } from "lucide-react";
import { motion } from "framer-motion";

interface Certification {
  name: string;
  description?: string;
}

interface CertificationsBlockProps {
  certifications?: Certification[];
  title?: string;
  variant?: "grid" | "inline";
}

const defaultCertifications: Certification[] = [
  { name: "ISO 9001:2015", description: "Quality Management System" },
  { name: "ISO 14001:2015", description: "Environmental Management" },
  { name: "ISO 45001:2018", description: "Occupational Health & Safety" },
];

export function CertificationsBlock({
  certifications = defaultCertifications,
  title = "Certified Excellence",
  variant = "grid",
}: CertificationsBlockProps) {
  if (variant === "inline") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            className="flex items-center gap-2.5 px-4 py-2.5 bg-primary/10 rounded-xl border border-primary/10"
          >
            <Award className="h-4 w-4 text-primary" />
            <span className="text-[13px] font-semibold text-foreground">{cert.name}</span>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-wide">
        <motion.div 
          className="text-center mb-10 md:mb-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="section-eyebrow">Certifications</p>
          <h2 className="text-[24px] md:text-[28px] lg:text-[32px] font-bold mb-3">{title}</h2>
          <p className="text-[14px] md:text-[15px] text-muted-foreground max-w-2xl mx-auto">
            Our operations are certified to international standards, ensuring quality, safety, and environmental responsibility.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center p-6 md:p-8 bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Award className="h-7 w-7 md:h-8 md:w-8 text-primary" />
              </div>
              <h4 className="text-[17px] md:text-[18px] font-bold mb-2">{cert.name}</h4>
              {cert.description && (
                <p className="text-[13px] md:text-[14px] text-muted-foreground">{cert.description}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
