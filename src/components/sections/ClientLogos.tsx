import { motion } from "framer-motion";

// Accurate client logos as SVG components
const logos = {
  Shell: () => (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <g transform="translate(10, 10)">
        <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0z" fill="#FBCE07"/>
        <path d="M50 5c-24.8 0-45 20.2-45 45s20.2 45 45 45 45-20.2 45-45S74.8 5 50 5zm0 82c-4.4-8.3-7.3-14.2-11.5-23.5L50 45l11.5 18.5C57.3 72.8 54.4 78.7 50 87zm-15-30L50 25l15 32H35z" fill="#DD1D21"/>
      </g>
    </svg>
  ),
  Chevron: () => (
    <svg viewBox="0 0 120 60" className="w-full h-full">
      <rect x="0" y="0" width="120" height="60" fill="transparent"/>
      <path d="M30 5L5 30L30 55L55 30L30 5z" fill="#0066B2"/>
      <path d="M55 5L30 30L55 55L80 30L55 5z" fill="#ED1C24"/>
      <text x="95" y="38" fontSize="14" fill="#0066B2" fontWeight="bold">CHEVRON</text>
    </svg>
  ),
  TotalEnergies: () => (
    <svg viewBox="0 0 140 60" className="w-full h-full">
      <rect x="5" y="10" width="130" height="40" rx="3" fill="#E31E24"/>
      <text x="70" y="38" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="Arial, sans-serif">TotalEnergies</text>
    </svg>
  ),
  NLNG: () => (
    <svg viewBox="0 0 120 60" className="w-full h-full">
      <rect x="5" y="10" width="110" height="40" rx="3" fill="#003366"/>
      <text x="60" y="36" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial, sans-serif">Nigeria LNG</text>
      <text x="60" y="46" textAnchor="middle" fill="#7CB9E8" fontSize="8" fontFamily="Arial, sans-serif">LIMITED</text>
    </svg>
  ),
  ExxonMobil: () => (
    <svg viewBox="0 0 140 50" className="w-full h-full">
      <text x="5" y="30" fontSize="16" fill="#D7342A" fontWeight="bold" fontFamily="Arial, sans-serif">Exxon</text>
      <text x="55" y="30" fontSize="16" fill="#0066B2" fontWeight="bold" fontFamily="Arial, sans-serif">Mobil</text>
    </svg>
  ),
  NNPC: () => (
    <svg viewBox="0 0 100 80" className="w-full h-full">
      <circle cx="50" cy="35" r="28" fill="#008751"/>
      <path d="M35 25L50 15L65 25L65 45L50 55L35 45Z" fill="#FFFFFF"/>
      <text x="50" y="75" textAnchor="middle" fill="#008751" fontSize="10" fontWeight="bold" fontFamily="Arial, sans-serif">NNPC Ltd</text>
    </svg>
  ),
  Seplat: () => (
    <svg viewBox="0 0 120 50" className="w-full h-full">
      <rect x="5" y="10" width="110" height="30" rx="3" fill="#1B5E20"/>
      <text x="60" y="32" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial, sans-serif">SEPLAT ENERGY</text>
    </svg>
  ),
  Oando: () => (
    <svg viewBox="0 0 100 50" className="w-full h-full">
      <circle cx="25" cy="25" r="20" fill="#E31837"/>
      <text x="25" y="30" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">O</text>
      <text x="65" y="32" fontSize="14" fill="#E31837" fontWeight="bold" fontFamily="Arial, sans-serif">Oando</text>
    </svg>
  ),
  SPDC: () => (
    <svg viewBox="0 0 120 50" className="w-full h-full">
      <rect x="5" y="10" width="110" height="30" rx="3" fill="#FBCE07"/>
      <text x="60" y="32" textAnchor="middle" fill="#DD1D21" fontSize="14" fontWeight="bold" fontFamily="Arial, sans-serif">SPDC</text>
    </svg>
  ),
  NAPIMS: () => (
    <svg viewBox="0 0 120 50" className="w-full h-full">
      <rect x="5" y="10" width="110" height="30" rx="3" fill="#003366"/>
      <text x="60" y="32" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="Arial, sans-serif">NAPIMS</text>
    </svg>
  ),
};

interface Client {
  name: keyof typeof logos;
  fullName: string;
}

const clients: Client[] = [
  { name: "Shell", fullName: "Shell Petroleum" },
  { name: "SPDC", fullName: "SPDC" },
  { name: "Chevron", fullName: "Chevron Nigeria" },
  { name: "TotalEnergies", fullName: "TotalEnergies" },
  { name: "NLNG", fullName: "Nigeria LNG" },
  { name: "ExxonMobil", fullName: "ExxonMobil" },
  { name: "NNPC", fullName: "NNPC Limited" },
  { name: "Seplat", fullName: "Seplat Energy" },
  { name: "Oando", fullName: "Oando PLC" },
  { name: "NAPIMS", fullName: "NAPIMS" },
];

interface Partner {
  name: string;
  logo: string;
}

const partners: Partner[] = [
  { name: "HDDThailand", logo: "HDD" },
  { name: "EISNL", logo: "EIS" },
];

interface ClientLogosProps {
  variant?: "light" | "dark";
  showTitle?: boolean;
}

export function ClientLogos({ variant = "light", showTitle = true }: ClientLogosProps) {
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
              The contractor of choice for Nigeria's leading operators.
            </p>
          </motion.div>
        )}

        {/* Clients Grid */}
        <div className="mb-10">
          <p className={`text-[11px] font-semibold uppercase tracking-[0.15em] mb-5 text-center ${mutedClass}`}>
            Clients
          </p>
          <div className="grid grid-cols-5 lg:grid-cols-10 gap-2 md:gap-3">
            {clients.map((client, index) => {
              const LogoComponent = logos[client.name];
              return (
                <motion.div
                  key={client.name}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className={`flex flex-col items-center justify-center p-3 md:p-4 rounded-xl border ${borderClass} ${cardBg} hover:shadow-md transition-all duration-200 group cursor-default`}
                >
                  <div className="w-9 h-9 md:w-10 md:h-10 mb-2 opacity-75 group-hover:opacity-100 transition-opacity">
                    <LogoComponent />
                  </div>
                  <span className={`text-[9px] md:text-[10px] font-medium text-center leading-tight ${mutedClass}`}>
                    {client.fullName}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Partners */}
        <div className="flex flex-wrap justify-center gap-3">
          <p className={`w-full text-[11px] font-semibold uppercase tracking-[0.15em] mb-3 text-center ${mutedClass}`}>
            Strategic Partners
          </p>
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl border ${borderClass} ${cardBg}`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                isDark ? "bg-primary/20" : "bg-primary/10"
              }`}>
                <span className="text-primary font-bold text-xs">{partner.logo}</span>
              </div>
              <span className={`text-[14px] font-semibold ${textClass}`}>{partner.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
