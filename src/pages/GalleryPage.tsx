import { Layout } from "@/components/layout";
import { Hero, CTABand } from "@/components/sections";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, ZoomIn, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { EditableText } from "@/components/admin";
import { usePageContent } from "@/hooks/useSiteSettings";

// Import authentic project images - UNIQUE gallery set (fallback)
import heroGallery from "@/assets/projects/brochure-hero.jpg";
import galHddRig from "@/assets/projects/hdd-rig-operation.png";
import galPipeline from "@/assets/projects/pipe-welding.png";
import galDredging from "@/assets/projects/dredging-marine.png";
import galJetty from "@/assets/projects/330b-excavator.jpg";
import galShore from "@/assets/projects/drilling-site.png";
import galWelding from "@/assets/projects/welding-crew.jpg";
import galEquipment from "@/assets/projects/hdd-equipment-fleet-4.jpg";
import galExcavator from "@/assets/projects/cat-excavator.jpg";
import galScope from "@/assets/projects/scope-operations.jpg";
import galDrillString from "@/assets/projects/hdd-drill-string.jpg";
import galFleet from "@/assets/projects/equipment-fleet.jpg";
import galRiver from "@/assets/projects/swamp-pipeline.png";
import galAtlas from "@/assets/projects/pipeline-laying.png";
import galLekki from "@/assets/projects/rig-setup.png";
import galNipco from "@/assets/projects/nipco-pipeline.jpg";
import galCrane from "@/assets/projects/pipe-handling.jpg";
import galSafety from "@/assets/projects/workers-ppe.jpg";
import galTeam from "@/assets/projects/hse-safety.jpg";
import galTripping from "@/assets/projects/tripping-safety.jpg";

interface GalleryItem {
  image: string;
  title: string;
  category: string;
  description: string;
}

// Default gallery items from codebase (fallback)
const defaultGalleryItems: GalleryItem[] = [
  { image: galHddRig, title: "500T Maxi HDD Rig Operation", category: "HDD", description: "500-ton maxi HDD rig performing directional drilling for major Niger Delta river crossing." },
  { image: galPipeline, title: "36\" Pipeline Welding", category: "Pipelines", description: "API 1104 certified welders performing pipeline tie-in operations." },
  { image: galDredging, title: "Marine Dredging Operations", category: "Marine Civil", description: "Dredging operations for channel deepening and reclamation." },
  { image: galJetty, title: "330B Excavator Operations", category: "Equipment", description: "CAT 330B excavator supporting pipeline construction." },
  { image: galShore, title: "Drilling Site Setup", category: "HDD", description: "Comprehensive HDD site setup with all support equipment." },
  { image: galWelding, title: "Pipeline Welding Crew", category: "Pipelines", description: "Expert welding team performing pipeline fabrication." },
  { image: galEquipment, title: "HDD Equipment Spread", category: "Equipment", description: "Complete HDD equipment spread including maxi rig and support equipment." },
  { image: galExcavator, title: "Excavation Operations", category: "Equipment", description: "CAT excavator performing ROW preparation." },
  { image: galScope, title: "Scope Rig Operations", category: "HDD", description: "Real-time trajectory monitoring during drilling operations." },
  { image: galDrillString, title: "Drill String Assembly", category: "HDD", description: "Drill string assembly and preparation for deep crossing." },
  { image: galFleet, title: "Equipment Fleet Overview", category: "Equipment", description: "Part of Enikkom's extensive fleet of 10+ maxi HDD rigs." },
  { image: galRiver, title: "Swamp Pipeline Installation", category: "Pipelines", description: "Pipeline installation in challenging swamp terrain." },
  { image: galAtlas, title: "Pipeline Laying Operations", category: "Pipelines", description: "Large diameter pipeline laying with specialized equipment." },
  { image: galLekki, title: "Rig Setup Process", category: "HDD", description: "HDD rig setup and alignment for major crossing." },
  { image: galNipco, title: "NIPCO Gas Network", category: "Pipelines", description: "Urban gas distribution network construction." },
  { image: galCrane, title: "Pipe Handling Operations", category: "Marine Civil", description: "Specialized pipe handling for offshore installation." },
  { image: galSafety, title: "PPE & Safety Compliance", category: "HSE", description: "Workers in full PPE maintaining safety standards." },
  { image: galTeam, title: "HSE Safety Briefing", category: "HSE", description: "Daily safety briefing maintaining zero LTI record." },
  { image: galTripping, title: "Tripping Operations Safety", category: "HSE", description: "Safe tripping operations during drill string handling." },
];

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
        backgroundImage={heroContent.backgroundImage || heroGallery}
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
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain rounded-xl"
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
