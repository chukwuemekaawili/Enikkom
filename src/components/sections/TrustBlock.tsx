import { motion, useReducedMotion } from "framer-motion";
import { Quote, Plus, X } from "lucide-react";
import { useState } from "react";
import { EditableText, EditableImage } from "@/components/admin";
import { usePageContent } from "@/hooks/useSiteSettings";
import { useEditMode } from "@/contexts/EditModeContext";
import { Button } from "@/components/ui/button";
import { EnhancedImage } from "@/components/ui/enhanced-image";
import { approvedClientBrands, resolveBrandDisplay } from "@/content/brandRegistry";

const defaultClients = approvedClientBrands.map((client) => ({
  id: client.id,
  name: client.name,
  imageUrl: client.logoSrc || "",
}));

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

  // Default testimonial — sourced from approved 1.2 TESTIMONIALS document
  const defaultTestimonial = {
    quote: "We are delighted with our experience of working with ENIKKOM over the duration of our project. We have found all staff from senior management down to the site delivery team to be friendly, cooperative, helpful and very professional. It was a pleasure working with the team and we definitely will look forward to our next project together.",
    author: "Project Management Team",
    company: "Saipem Contracting Nigeria Limited",
    project: "SPDC Otumara–Escravos Pipeline Project",
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
              {clients.map((client: any, index: number) => {
                const brandDisplay = resolveBrandDisplay(client);
                return (
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
                    {brandDisplay.logoSrc ? (
                      <div className={`relative flex h-8 w-full items-center justify-center ${brandDisplay.containerClassName || ""}`}>
                        <EditableImage
                          src={brandDisplay.logoSrc}
                          alt={client.name}
                          pageSlug="home"
                          sectionKey="trust_block"
                          field={`client_logos.${index}.imageUrl`}
                          className={`h-full w-full object-contain ${brandDisplay.imageClassName || ""}`}
                        />
                      </div>
                    ) : (
                      <div className="flex h-8 items-center justify-center rounded-md bg-primary/10 text-[10px] font-semibold text-primary">
                        {brandDisplay.badge || client.name}
                      </div>
                    )}
                  </div>
                </div>
              )})}
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
              const brandDisplay = resolveBrandDisplay(client);
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
                  <div className="w-16 h-8 md:w-20 md:h-10 flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity duration-300">
                    {brandDisplay.logoSrc ? (
                      <div className={`flex h-full w-full items-center justify-center ${brandDisplay.containerClassName || ""}`}>
                        <EnhancedImage
                          src={brandDisplay.logoSrc}
                          alt={brandDisplay.name}
                          wrapperClassName={`w-full h-full ${brandDisplay.imageWrapperClassName || ""}`}
                          className={`w-full h-full ${brandDisplay.imageClassName || ""}`}
                          fit="contain"
                          tone="logo"
                          shimmer={false}
                          sizes="120px"
                        />
                      </div>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-md bg-primary/10 text-xs font-semibold text-primary">
                        {brandDisplay.badge || brandDisplay.name}
                      </div>
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
