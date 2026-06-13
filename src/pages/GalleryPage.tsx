import { Layout } from "@/components/layout";
import { Hero, CTABand } from "@/components/sections";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, ZoomIn, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { EditableText } from "@/components/admin";
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
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(defaultGalleryItems);
  const [isLoading, setIsLoading] = useState(true);
  
  const { content } = usePageContent('gallery');
  const heroContent = content.hero || {};

  // Fetch gallery items from database
  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const { data, error } = await supabase
          .from('gallery_items')
          .select('*')
          .eq('is_visible', true)
          .order('display_order', { ascending: true });

        if (error) throw error;

        // If DB has items, use them; otherwise use defaults
        if (data && data.length > 0) {
          const dbItems: GalleryItem[] = data.map((item: any) => ({
            image: item.image_url,
            title: item.title,
            category: item.category,
            description: item.description || '',
          }));
          setGalleryItems(dbItems);
        }
      } catch (error) {
        console.error('Error fetching gallery items:', error);
        // Keep default items on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

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
            <p className="section-eyebrow">
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
                className={`px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            /* Gallery Grid */
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
                    className="group cursor-pointer card-interactive overflow-hidden"
                    onClick={() => setSelectedImage(item)}
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <EnhancedImage
                        src={item.image}
                        alt={item.title}
                        wrapperClassName="h-full w-full"
                        className="h-full w-full"
                        hoverZoom
                        tone="natural"
                        fallbackLabel={item.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Zoom Icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <ZoomIn className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      
                      {/* Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="text-[10px] font-semibold text-primary bg-primary/20 px-2.5 py-1 rounded-md uppercase tracking-wide">
                          {item.category}
                        </span>
                        <h3 className="text-white font-semibold text-[15px] mt-2">{item.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
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
                <span className="text-[11px] font-semibold text-primary bg-primary/20 px-3 py-1.5 rounded-md uppercase tracking-wide">
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
