import { motion } from "framer-motion";
import { EnhancedImage } from "@/components/ui/enhanced-image";
import { approvedClientBrands, approvedStrategicPartners } from "@/content/brandRegistry";

interface PartnersClientsProps {
  variant?: "light" | "dark";
  showTitle?: boolean;
}

export function PartnersClients({ variant = "light", showTitle = true }: PartnersClientsProps) {
  const clients = approvedClientBrands;
  const partnersList = approvedStrategicPartners;

  const bgClass = variant === "dark" ? "bg-charcoal" : "bg-muted/30";
  const textClass = variant === "dark" ? "text-white" : "text-foreground";
  const mutedClass = variant === "dark" ? "text-white/60" : "text-muted-foreground";
  const cardClass =
    variant === "dark"
      ? "bg-white/5 border-white/10 hover:bg-white/10"
      : "bg-card border hover:shadow-md";

  return (
    <section className={`section-padding ${bgClass}`}>
      <div className="container-wide">
        {showTitle && (
          <div className="text-center mb-12">
            <h2 className={`mb-4 ${textClass}`}>Trusted By Industry Leaders</h2>
            <p className={`max-w-2xl mx-auto ${mutedClass}`}>
              We are the contractor of choice for Nigeria&apos;s leading oil & gas operators and infrastructure developers.
            </p>
          </div>
        )}

        <div className="mb-12">
          <h3 className={`text-sm font-semibold uppercase tracking-wider mb-6 text-center ${mutedClass}`}>
            Our Clients
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {clients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex items-center justify-center p-4 rounded-lg border transition-all ${cardClass}`}
              >
                <div className="text-center">
                  <div className="w-14 h-14 rounded-xl mx-auto mb-2 flex items-center justify-center overflow-hidden bg-white p-2">
                    <EnhancedImage
                      src={client.logoSrc}
                      alt={client.name}
                      wrapperClassName={`h-full w-full bg-transparent ${client.imageWrapperClassName || ""}`}
                      className={`h-full w-full ${client.imageClassName || ""}`}
                      fit="contain"
                      tone="logo"
                      shimmer={false}
                      sizes="72px"
                    />
                  </div>
                  <span className={`text-xs font-medium ${textClass}`}>{client.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className={`text-sm font-semibold uppercase tracking-wider mb-6 text-center ${mutedClass}`}>
            Strategic Partners
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {partnersList.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`flex items-center gap-3 px-6 py-4 rounded-lg border transition-all ${cardClass}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden ${
                    partner.logoSrc ? "bg-white px-1" : variant === "dark" ? "bg-accent/20" : "bg-accent/10"
                  }`}
                >
                  {partner.logoSrc ? (
                    <EnhancedImage
                      src={partner.logoSrc}
                      alt={partner.name}
                      wrapperClassName={`h-full w-full bg-transparent ${partner.imageWrapperClassName || ""}`}
                      className={`h-full w-full ${partner.imageClassName || ""}`}
                      fit="contain"
                      tone="logo"
                      shimmer={false}
                      sizes="64px"
                    />
                  ) : (
                    <span className="text-accent font-bold">{partner.badge}</span>
                  )}
                </div>
                <span className={`font-medium ${textClass}`}>{partner.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
