import { motion } from "framer-motion";
import { EnhancedImage } from "@/components/ui/enhanced-image";
import { approvedClientBrands, approvedStrategicPartners } from "@/content/brandRegistry";

interface ClientLogosProps {
  variant?: "light" | "dark";
  showTitle?: boolean;
}

export function ClientLogos({ variant = "light", showTitle = true }: ClientLogosProps) {
  const clients = approvedClientBrands.slice(0, 11);
  const isDark = variant === "dark";
  const bgClass = isDark ? "bg-charcoal" : "bg-muted/30";
  const textClass = isDark ? "text-white" : "text-foreground";
  const mutedClass = isDark ? "text-white/50" : "text-muted-foreground";
  const cardBg = isDark ? "bg-white/5" : "bg-white";
  const borderClass = isDark ? "border-white/8" : "border-border/50";

  return (
    <section className={`py-14 md:py-20 ${bgClass}`}>
      <div className="container-wide">
        {showTitle && (
          <motion.div
            className="text-center mb-10 md:mb-12"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="section-eyebrow">Partners</p>
            <h2 className={`text-[22px] md:text-[26px] lg:text-[28px] font-bold mb-3 ${textClass}`}>
              Trusted By Industry Leaders
            </h2>
            <p className={`text-[14px] md:text-[15px] max-w-lg mx-auto ${mutedClass}`}>
              The contractor of choice for Nigeria&apos;s leading operators.
            </p>
          </motion.div>
        )}

        <div className="mb-10">
          <p className={`text-[11px] font-semibold uppercase tracking-[0.15em] mb-5 text-center ${mutedClass}`}>
            Clients
          </p>
          <div className="grid grid-cols-5 lg:grid-cols-10 gap-2 md:gap-3">
            {clients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className={`flex flex-col items-center justify-center p-3 md:p-4 rounded-xl border ${borderClass} ${cardBg} hover:shadow-md transition-all duration-200 group cursor-default`}
              >
                <div className="w-9 h-9 md:w-10 md:h-10 mb-2 opacity-75 group-hover:opacity-100 transition-opacity">
                  {client.logoSrc ? (
                    <EnhancedImage
                      src={client.logoSrc}
                      alt={client.name}
                      wrapperClassName={`h-full w-full bg-transparent ${client.imageWrapperClassName || ""}`}
                      className={`h-full w-full ${client.imageClassName || ""}`}
                      fit="contain"
                      tone="logo"
                      shimmer={false}
                      sizes="64px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-md bg-primary/10 text-[11px] font-bold text-primary">
                      {client.badge || client.name}
                    </div>
                  )}
                </div>
                <span className={`text-[9px] md:text-[10px] font-medium text-center leading-tight ${mutedClass}`}>
                  {client.fullName}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <p className={`w-full text-[11px] font-semibold uppercase tracking-[0.15em] mb-3 text-center ${mutedClass}`}>
            Strategic Partners
          </p>
          {approvedStrategicPartners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl border ${borderClass} ${cardBg}`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center overflow-hidden ${
                  partner.logoSrc ? "bg-white px-1" : isDark ? "bg-primary/20" : "bg-primary/10"
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
                  <span className="text-primary font-bold text-xs">{partner.badge}</span>
                )}
              </div>
              <span className={`text-[14px] font-semibold ${textClass}`}>{partner.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
