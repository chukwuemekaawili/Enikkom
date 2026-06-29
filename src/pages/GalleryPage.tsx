import { Layout } from "@/components/layout";
import { Hero, CTABand } from "@/components/sections";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { EditableText } from "@/components/content";
import { EnhancedImage } from "@/components/ui/enhanced-image";
import { usePageContent } from "@/hooks/useSiteSettings";
import { siteImageSelections } from "@/content/siteImageSelections";

interface GalleryItem {
  image: string;
  title: string;
  category: string;
  description: string;
}

const defaultGalleryItems: GalleryItem[] = [...siteImageSelections.gallery.items];

const categories = ["All", "HDD", "Pipelines", "Marine Civil", "Shore Approach", "Equipment", "HSE"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const galleryItems = defaultGalleryItems;

  const { content } = usePageContent('gallery');
  const heroContent = content.hero || {};

  const filteredItems = activeCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <Layout>
      <Hero
        title={heroContent.title || "Project Gallery"}
        subtitle={heroContent.subtitle || "Visual documentation of our engineering excellence across HDD, pipelines, dredging, and marine construction projects."}
        backgroundImage={heroContent.backgroundImage || siteImageSelections.gallery.hero}
        size="default"
        pageSlug="gallery"
        sectionKey="hero"
        imageField="backgroundImage"
      />

      <section className="section-padding bg-background">
        <div className="container-wide">
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="enk-kicker justify-center">
              <EditableText
                value={heroContent.eyebrow || "Our Work"}
                pageSlug="gallery"
                sectionKey="hero"
                field="eyebrow"
              />
            </p>
          </motion.div>
          
          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-[var(--enk-radius)] text-[13px] font-semibold transition-all duration-200 ${
                  activeCategory === category
                    ? "text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
                style={activeCategory === category ? { backgroundColor: "var(--enk-blue)" } : undefined}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="group cursor-pointer enk-card enk-card--hover flex flex-col overflow-hidden"
                    onClick={() => setSelectedImage(item)}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <EnhancedImage
                        src={item.image}
                        alt={item.title}
                        wrapperClassName="h-full w-full"
                        className="h-full w-full"
                        hoverZoom
                        tone="natural"
                        fallbackLabel={item.title}
                      />
                      <div
                        className="absolute inset-0"
                        aria-hidden="true"
                        style={{ background: "linear-gradient(0deg, oklch(0.13 0.03 255 / 0.5), transparent 55%)" }}
                      />
                      <span className="enk-chip enk-chip--on-dark absolute left-4 top-4">
                        {item.category}
                      </span>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <ZoomIn className="h-6 w-6 text-white drop-shadow-md" />
                      </div>
                    </div>
                    <div className="flex flex-col p-5" style={{ backgroundColor: "var(--enk-surface-card)" }}>
                      <h3 className="text-[15px] font-semibold leading-snug text-[var(--enk-on-dark)]">
                        {item.title}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6 text-white" />
            </motion.button>
            
            <motion.div 
              className="max-w-5xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <EnhancedImage
                src={selectedImage.image}
                alt={selectedImage.title}
                wrapperClassName="w-full max-h-[70vh] rounded-xl"
                className="w-full max-h-[70vh]"
                fit="contain"
                tone="natural"
                fallbackLabel={selectedImage.title}
              />
              <div className="mt-5 text-center">
                <span className="enk-chip">
                  {selectedImage.category}
                </span>
                <h3 className="text-white text-xl font-bold mt-3">{selectedImage.title}</h3>
                <p className="text-white/60 text-[15px] mt-2 max-w-lg mx-auto">{selectedImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CTABand 
        headline="Ready to Start Your Project?"
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
      />
    </Layout>
  );
}
