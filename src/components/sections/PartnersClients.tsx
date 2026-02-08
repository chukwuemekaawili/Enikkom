import { motion } from "framer-motion";

interface Partner {
  name: string;
  logo?: string;
  type: "client" | "partner";
}

const partners: Partner[] = [
  // Major Clients
  { name: "Shell", type: "client" },
  { name: "Chevron", type: "client" },
  { name: "TotalEnergies", type: "client" },
  { name: "NLNG", type: "client" },
  { name: "ExxonMobil", type: "client" },
  { name: "NNPC", type: "client" },
  { name: "Dangote", type: "client" },
  { name: "Seplat", type: "client" },
  // Partners
  { name: "HDDThailand", type: "partner" },
  { name: "EISNL", type: "partner" },
];

interface PartnersClientsProps {
  variant?: "light" | "dark";
  showTitle?: boolean;
}

export function PartnersClients({ variant = "light", showTitle = true }: PartnersClientsProps) {
  const clients = partners.filter(p => p.type === "client");
  const partnersList = partners.filter(p => p.type === "partner");

  const bgClass = variant === "dark" ? "bg-charcoal" : "bg-muted/30";
  const textClass = variant === "dark" ? "text-white" : "text-foreground";
  const mutedClass = variant === "dark" ? "text-white/60" : "text-muted-foreground";
  const cardClass = variant === "dark" 
    ? "bg-white/5 border-white/10 hover:bg-white/10" 
    : "bg-card border hover:shadow-md";

  return (
    <section className={`section-padding ${bgClass}`}>
      <div className="container-wide">
        {showTitle && (
          <div className="text-center mb-12">
            <h2 className={`mb-4 ${textClass}`}>Trusted By Industry Leaders</h2>
            <p className={`max-w-2xl mx-auto ${mutedClass}`}>
              We are the contractor of choice for Nigeria's leading oil & gas operators and infrastructure developers.
            </p>
          </div>
        )}

        {/* Clients */}
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
                  <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                    variant === "dark" ? "bg-primary/20" : "bg-primary/10"
                  }`}>
                    <span className="text-primary font-bold text-lg">
                      {client.name.charAt(0)}
                    </span>
                  </div>
                  <span className={`text-xs font-medium ${textClass}`}>{client.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partners */}
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
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  variant === "dark" ? "bg-accent/20" : "bg-accent/10"
                }`}>
                  <span className="text-accent font-bold">
                    {partner.name.charAt(0)}
                  </span>
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
