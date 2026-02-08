import { motion, useReducedMotion } from "framer-motion";
import { Quote, Plus, X, GripVertical } from "lucide-react";
import { useRef, useState } from "react";
import { EditableText, EditableImage } from "@/components/admin";
import { usePageContent } from "@/hooks/useSiteSettings";
import { useEditMode } from "@/contexts/EditModeContext";
import { Button } from "@/components/ui/button";

// Default client logos as data with image URLs (can be replaced)
const defaultClients = [
  { id: "shell", name: "Shell", imageUrl: "/logos/shell.svg" },
  { id: "dangote", name: "Dangote", imageUrl: "/logos/dangote.svg" },
  { id: "nnpc", name: "NNPC", imageUrl: "/logos/nnpc.svg" },
  { id: "saipem", name: "Saipem", imageUrl: "/logos/saipem.svg" },
  { id: "chevron", name: "Chevron", imageUrl: "/logos/chevron.svg" },
  { id: "total", name: "TotalEnergies", imageUrl: "/logos/total.svg" },
  { id: "nlng", name: "NLNG", imageUrl: "/logos/nlng.svg" },
  { id: "oando", name: "Oando", imageUrl: "/logos/oando.svg" },
  { id: "eni", name: "Eni", imageUrl: "/logos/eni.svg" },
  { id: "npdc", name: "NPDC", imageUrl: "/logos/npdc.svg" },
  { id: "daewoo", name: "Daewoo", imageUrl: "/logos/daewoo.svg" },
];

// Client logos as SVG components - used when image not available
const LogoSVG: Record<string, React.FC<{ className?: string }>> = {
  Shell: ({ className }) => (
    <svg viewBox="0 0 100 100" className={className}>
      <path d="M50 5C25.1 5 5 25.1 5 50s20.1 45 45 45 45-20.1 45-45S74.9 5 50 5z" fill="#FBCE07"/>
      <path d="M50 10c-22.1 0-40 17.9-40 40s17.9 40 40 40 40-17.9 40-40S72.1 10 50 10zm0 73c-3.9-7.4-6.5-12.6-10.2-20.9L50 45.5l10.2 16.6c-3.7 8.3-6.3 13.5-10.2 20.9zm-13.3-26.7L50 30l13.3 26.3H36.7z" fill="#DD1D21"/>
    </svg>
  ),
  NNPC: ({ className }) => (
    <svg viewBox="0 0 100 40" className={className}>
      <circle cx="20" cy="20" r="16" fill="#008751"/>
      <path d="M12 14L20 8L28 14L28 26L20 32L12 26Z" fill="white"/>
      <text x="62" y="24" textAnchor="middle" fill="#008751" fontSize="10" fontWeight="bold" fontFamily="Arial">NNPC Ltd</text>
    </svg>
  ),
  NPDC: ({ className }) => (
    <svg viewBox="0 0 100 40" className={className}>
      <rect x="5" y="8" width="90" height="24" rx="4" fill="#006633"/>
      <text x="50" y="25" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial">NPDC</text>
    </svg>
  ),
  Dangote: ({ className }) => (
    <svg viewBox="0 0 120 40" className={className}>
      <rect x="5" y="8" width="110" height="24" rx="4" fill="#003366"/>
      <text x="60" y="25" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial">DANGOTE</text>
    </svg>
  ),
  Saipem: ({ className }) => (
    <svg viewBox="0 0 120 40" className={className}>
      <rect x="5" y="8" width="110" height="24" rx="4" fill="#0066B2"/>
      <text x="60" y="25" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="Arial">SAIPEM</text>
    </svg>
  ),
  Chevron: ({ className }) => (
    <svg viewBox="0 0 120 40" className={className}>
      <path d="M15 5L5 20L15 35L25 20L15 5z" fill="#0066B2"/>
      <path d="M25 5L15 20L25 35L35 20L25 5z" fill="#ED1C24"/>
      <text x="75" y="26" textAnchor="middle" fill="#0066B2" fontSize="12" fontWeight="bold" fontFamily="Arial">Chevron</text>
    </svg>
  ),
  TotalEnergies: ({ className }) => (
    <svg viewBox="0 0 140 40" className={className}>
      <rect x="5" y="5" width="130" height="30" rx="4" fill="#E31E24"/>
      <text x="70" y="26" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="Arial">TotalEnergies</text>
    </svg>
  ),
  NLNG: ({ className }) => (
    <svg viewBox="0 0 120 40" className={className}>
      <rect x="5" y="5" width="110" height="30" rx="4" fill="#003366"/>
      <text x="60" y="22" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">Nigeria LNG</text>
      <text x="60" y="32" textAnchor="middle" fill="#7CB9E8" fontSize="7" fontFamily="Arial">LIMITED</text>
    </svg>
  ),
  Oando: ({ className }) => (
    <svg viewBox="0 0 100 40" className={className}>
      <circle cx="20" cy="20" r="14" fill="#FF6600"/>
      <circle cx="20" cy="20" r="6" fill="white"/>
      <text x="62" y="26" textAnchor="middle" fill="#FF6600" fontSize="14" fontWeight="bold" fontFamily="Arial">Oando</text>
    </svg>
  ),
  Eni: ({ className }) => (
    <svg viewBox="0 0 80 60" className={className}>
      <rect x="10" y="10" width="60" height="40" rx="4" fill="#FCCD00"/>
      <text x="40" y="38" textAnchor="middle" fill="#000" fontSize="16" fontWeight="bold" fontFamily="Arial">eni</text>
    </svg>
  ),
  Daewoo: ({ className }) => (
    <svg viewBox="0 0 140 40" className={className}>
      <path d="M15 20L25 10L30 20L25 30L15 20Z" fill="#003F87"/>
      <text x="85" y="27" textAnchor="middle" fill="#003F87" fontSize="11" fontWeight="bold" fontFamily="Arial">DAEWOO NIGERIA</text>
    </svg>
  ),
};

interface TrustBlockProps {
  variant?: "light" | "dark";
}

export function TrustBlock({ variant = "light" }: TrustBlockProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const isDark = variant === "dark";
  const { isEditMode, addChange } = useEditMode();
  
  const { content } = usePageContent('home');
  const trustContent = content.trust_block || {};
  
  // Default testimonial data
  const defaultTestimonial = {
    quote: "The 40\" x 760m Yenagoa crossing at 100ft depth was executed flawlessly. This was the largest pipeline crossing in Nigeria and Enikkom delivered on time with zero safety incidents.",
    author: "Project Coordinator",
    company: "Shell Petroleum Development Company (SPDC)",
    project: "Yenagoa 40\" HDD Crossing"
  };
  
  const testimonial = {
    quote: trustContent.quote || defaultTestimonial.quote,
    author: trustContent.author || defaultTestimonial.author,
    company: trustContent.company || defaultTestimonial.company,
    project: trustContent.project || defaultTestimonial.project,
  };

  // Get logos from CMS or use defaults
  const cmsLogos = trustContent.client_logos || [];
  const clients = cmsLogos.length > 0 ? cmsLogos : defaultClients;

  // Duplicate logos for seamless loop
  const duplicatedClients = [...clients, ...clients];

  // Handle logo management in edit mode
  const handleAddLogo = () => {
    const newLogos = [...clients, { 
      id: `logo-${Date.now()}`, 
      name: "New Client", 
      imageUrl: "" 
    }];
    addChange({
      pageSlug: "home",
      sectionKey: "trust_block",
      field: "client_logos",
      value: newLogos,
      type: "json",
    });
  };

  const handleRemoveLogo = (index: number) => {
    const newLogos = clients.filter((_: any, i: number) => i !== index);
    addChange({
      pageSlug: "home",
      sectionKey: "trust_block",
      field: "client_logos",
      value: newLogos,
      type: "json",
    });
  };

  const handleUpdateLogo = (index: number, field: string, value: string) => {
    const newLogos = clients.map((logo: any, i: number) => 
      i === index ? { ...logo, [field]: value } : logo
    );
    addChange({
      pageSlug: "home",
      sectionKey: "trust_block",
      field: "client_logos",
      value: newLogos,
      type: "json",
    });
  };

  return (
    <section className={`py-12 md:py-16 overflow-hidden ${isDark ? 'bg-charcoal' : 'bg-muted/30'}`}>
      {/* Testimonial Section */}
      <div className="container-wide mb-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className={`relative px-6 py-8 rounded-xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-background border border-border'}`}>
            <Quote className={`absolute -top-3 left-6 h-8 w-8 ${isDark ? 'text-primary/60' : 'text-primary/40'}`} />
            <blockquote className={`text-[15px] md:text-[17px] leading-relaxed italic mb-4 ${isDark ? 'text-white/80' : 'text-foreground'}`}>
              "<EditableText
                value={testimonial.quote}
                pageSlug="home"
                sectionKey="trust_block"
                field="quote"
                multiline
              />"
            </blockquote>
            <div className={`text-[13px] ${isDark ? 'text-white/50' : 'text-muted-foreground'}`}>
              <span className={`font-semibold ${isDark ? 'text-white/70' : 'text-foreground'}`}>
                <EditableText
                  value={testimonial.author}
                  pageSlug="home"
                  sectionKey="trust_block"
                  field="author"
                />
              </span>
              <span className="mx-1.5">•</span>
              <span className="text-primary font-medium">
                <EditableText
                  value={testimonial.company}
                  pageSlug="home"
                  sectionKey="trust_block"
                  field="company"
                />
              </span>
              <span className="mx-1.5">•</span>
              <span>
                <EditableText
                  value={testimonial.project}
                  pageSlug="home"
                  sectionKey="trust_block"
                  field="project"
                />
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Trusted By Label */}
      <motion.p
        className={`text-center text-[11px] font-semibold uppercase tracking-[0.15em] mb-6 ${isDark ? 'text-white/40' : 'text-muted-foreground'}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <EditableText
          value={trustContent.label || "Trusted by Industry Leaders"}
          pageSlug="home"
          sectionKey="trust_block"
          field="label"
        />
      </motion.p>

      {/* Edit Mode: Logo Management */}
      {isEditMode && (
        <div className="container-wide mb-6">
          <div className="bg-background/80 backdrop-blur-sm border border-dashed border-primary/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-foreground">Client Logos (Editable)</h4>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleAddLogo}
                className="h-8 text-xs"
              >
                <Plus className="h-3 w-3 mr-1" /> Add Logo
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {clients.map((client: any, index: number) => (
                <div 
                  key={client.id || index} 
                  className="relative bg-muted/50 rounded-lg p-3 border border-border group"
                >
                  <button
                    onClick={() => handleRemoveLogo(index)}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={client.name}
                      onChange={(e) => handleUpdateLogo(index, 'name', e.target.value)}
                      className="text-xs text-center bg-transparent border-b border-dashed border-muted-foreground/30 focus:border-primary outline-none px-1 py-0.5"
                      placeholder="Client name"
                    />
                    {client.imageUrl ? (
                      <div className="relative">
                        <EditableImage
                          src={client.imageUrl}
                          alt={client.name}
                          pageSlug="home"
                          sectionKey="trust_block"
                          field={`client_logos.${index}.imageUrl`}
                          className="h-8 w-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="h-8 flex items-center justify-center">
                        {LogoSVG[client.name] ? (
                          (() => {
                            const LogoComponent = LogoSVG[client.name];
                            return <LogoComponent className="w-full h-full" />;
                          })()
                        ) : (
                          <span className="text-[10px] text-muted-foreground">No logo</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Logo Marquee */}
      <div 
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setTimeout(() => setIsPaused(false), 2000)}
      >
        {/* Gradient Fade Edges */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-16 md:w-24 z-10 pointer-events-none"
          style={{
            background: isDark 
              ? "linear-gradient(to right, hsl(220 50% 9% / 1) 0%, hsl(220 50% 9% / 0) 100%)"
              : "linear-gradient(to right, hsl(220 30% 96% / 1) 0%, hsl(220 30% 96% / 0) 100%)"
          }}
        />
        <div 
          className="absolute right-0 top-0 bottom-0 w-16 md:w-24 z-10 pointer-events-none"
          style={{
            background: isDark 
              ? "linear-gradient(to left, hsl(220 50% 9% / 1) 0%, hsl(220 50% 9% / 0) 100%)"
              : "linear-gradient(to left, hsl(220 30% 96% / 1) 0%, hsl(220 30% 96% / 0) 100%)"
          }}
        />

        {/* Scrolling Track */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6 md:gap-8 items-center"
            animate={prefersReducedMotion || isPaused || isEditMode ? { x: 0 } : { x: [0, -100 * clients.length] }}
            transition={
              prefersReducedMotion || isPaused || isEditMode
                ? { duration: 0 }
                : {
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 30,
                      ease: "linear",
                    },
                  }
            }
          >
            {duplicatedClients.map((client: any, index: number) => {
              const LogoComponent = LogoSVG[client.name];
              return (
                <motion.div
                  key={`${client.id}-${index}`}
                  className={`flex-shrink-0 flex items-center justify-center p-3 md:p-4 rounded-xl transition-all duration-300 ${
                    isDark 
                      ? "bg-white/5 hover:bg-white/10 border border-white/8" 
                      : "bg-white hover:shadow-md border border-border/50"
                  }`}
                  style={{ 
                    width: "100px", 
                    height: "60px",
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-16 h-8 md:w-20 md:h-10 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300">
                    {client.imageUrl ? (
                      <img 
                        src={client.imageUrl} 
                        alt={client.name} 
                        className="w-full h-full object-contain"
                      />
                    ) : LogoComponent ? (
                      <LogoComponent className="w-full h-full" />
                    ) : (
                      <span className="text-xs text-muted-foreground">{client.name}</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
