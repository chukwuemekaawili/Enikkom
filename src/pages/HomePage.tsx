import { Layout } from "@/components/layout";
import { ImageSliderHero, CTABand, CapabilityCard, CaseStudyCard, AnimatedKPIBand, TrustStrip, TrustBlock, MobileCapabilityCarousel, FAQSection } from "@/components/sections";
import { Drill, PipetteIcon, Anchor } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Target, Lightbulb, Heart, Award } from "lucide-react";
import { motion } from "framer-motion";
import { usePageContent } from "@/hooks/useSiteSettings";
import { EditableText, EditableImage } from "@/components/admin";

// Import authentic project images from PDFs - UNIQUE per section
// Hero Slides (5 unique images)
import heroSlide1 from "@/assets/projects/hdd-night-panorama.jpg";
import heroSlide2 from "@/assets/projects/pipe-laying-crane.jpg";
import heroSlide3 from "@/assets/projects/dredging-hero.jpg";
import heroSlide4 from "@/assets/projects/jetty-construction.jpg";
import heroSlide5 from "@/assets/projects/hdd-equipment-fleet.jpg";

// Capability Card images (3 most important - reduced from 6)
import capHdd from "@/assets/projects/hdd-rig-night.jpg";
import capPipeline from "@/assets/projects/pipeline-construction.jpg";
import capDredging from "@/assets/projects/otumara-escravos.jpg";

// Featured Projects (3 unique images)
import projOml34 from "@/assets/projects/drilling-ops-5.jpg";
import projLekki from "@/assets/projects/lekki-gas-pipeline.jpg";
import projAtlas from "@/assets/projects/atlas-cove-mosimi.jpg";

// Default hero slides (used if none set in admin)
const defaultHeroSlides = [
  { image: heroSlide1, title: "HDD Operations" },
  { image: heroSlide2, title: "Pipeline Construction" },
  { image: heroSlide3, title: "Dredging & Marine Works" },
  { image: heroSlide4, title: "Jetty Construction" },
  { image: heroSlide5, title: "Equipment Fleet" },
];

// Top 3 capabilities only (reduced from 6 for homepage focus)
const capabilities = [
  {
    title: "Horizontal Directional Drilling",
    description: "Pioneers of HDD in Nigeria since 2003. Over 100km installed including the historic River Niger crossing.",
    href: "/capabilities/hdd",
    icon: Drill,
    image: capHdd,
    metric: "Up to 48\" diameter, 3.1km span",
  },
  {
    title: "Pipelines & Flowlines",
    description: "Complete pipeline construction services from fabrication to commissioning. Land, swamp, and offshore.",
    href: "/capabilities/pipelines-flowlines",
    icon: PipetteIcon,
    image: capPipeline,
    metric: "Up to 48\" diameter capacity",
  },
  {
    title: "Dredging & Marine Works",
    description: "River, swamp and coastal dredging with bored, driven and sheet piling for foundations and jetties.",
    href: "/capabilities/dredging-piling",
    icon: Anchor,
    image: capDredging,
    metric: "Multiple dredgers available",
  },
];

// Real Featured Projects from documents
const featuredProjects = [
  {
    title: "OML34 Continuous HDD - 10\" x 12km",
    location: "Niger Delta, Nigeria",
    metric: "12km",
    metricLabel: "Longest CHDD in Nigeria",
    tags: ["HDD", "Record"],
    href: "/projects/oml34-chdd",
    thumbnail: projOml34,
    year: "2020",
  },
  {
    title: "Lekki Gas Pipeline - Dangote",
    location: "Lagos, Nigeria",
    metric: "36\" x 1.5km",
    metricLabel: "Swamp/River Crossing",
    tags: ["HDD", "Pipeline"],
    href: "/projects/lekki-gas-pipeline",
    thumbnail: projLekki,
    year: "2019",
  },
  {
    title: "Atlas Cove-Mosimi Emergency Reconstruction",
    location: "Lagos/Ogun, Nigeria",
    metric: "16\" x 3km",
    metricLabel: "Longest Single Drill in Africa",
    tags: ["HDD", "Record"],
    href: "/projects/atlas-cove-mosimi",
    thumbnail: projAtlas,
    year: "2017",
  },
];

// PRICE Core Values
const coreValues = [
  { icon: Award, title: "Performance", description: "Delivering results that exceed expectations" },
  { icon: Target, title: "Resilience", description: "Thriving in Nigeria's toughest conditions" },
  { icon: Lightbulb, title: "Innovation", description: "Pioneering new technologies and methods" },
  { icon: Heart, title: "Care", description: "Prioritizing safety and community" },
  { icon: CheckCircle, title: "Expertise", description: "Decades of specialized experience" },
];

// Default KPI Stats (used if none set in admin)
const defaultKpiStats = [
  { value: 100, label: "KM HDD Installed", suffix: "+" },
  { value: 10, label: "Maxi HDD Rigs", suffix: "+" },
  { value: 30, label: "Years Experience", suffix: "+" },
  { value: 0, label: "Lost Time Incidents" },
];

export default function HomePage() {
  const { content, isLoading } = usePageContent('home');

  // Get dynamic content with fallbacks
  const heroContent = content.hero || {};
  const kpiContent = content.kpi_stats || {};
  const capabilitiesContent = content.capabilities_intro || {};
  const aboutContent = content.about_section || {};
  const videoContent = content.video_showcase || {};
  const ctaContent = content.cta_band || {};

  // Build hero slides from admin or use defaults
  const heroSlides = (heroContent.slides && heroContent.slides.length > 0)
    ? heroContent.slides.map((slide: any) => ({
        image: slide.image || heroSlide1,
        title: slide.title || "",
      }))
    : defaultHeroSlides;

  // Build KPI stats from admin or use defaults
  const kpiStats = kpiContent.stat1_value ? [
    { value: parseInt(kpiContent.stat1_value) || 100, label: kpiContent.stat1_label || "KM HDD Installed", suffix: kpiContent.stat1_value?.includes('+') ? '+' : '' },
    { value: parseInt(kpiContent.stat2_value) || 10, label: kpiContent.stat2_label || "Maxi HDD Rigs", suffix: kpiContent.stat2_value?.includes('+') ? '+' : '' },
    { value: parseInt(kpiContent.stat3_value) || 30, label: kpiContent.stat3_label || "Years Experience", suffix: kpiContent.stat3_value?.includes('+') ? '+' : '' },
    { value: parseInt(kpiContent.stat4_value) || 0, label: kpiContent.stat4_label || "Lost Time Incidents", suffix: kpiContent.stat4_value?.includes('+') ? '+' : '' },
  ] : defaultKpiStats;

  // Video stats
  const videoStats = videoContent.stats || [
    { value: "12km", label: "Total Length" },
    { value: "10\"", label: "Pipe Diameter" },
    { value: "NPDC", label: "Client" },
    { value: "#1", label: "In Nigeria" },
  ];

  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return "https://www.youtube.com/embed/uv_ozmjIo-E";
    if (url.includes('embed/')) return url;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  return (
    <Layout>
      {/* Image Slider Hero Section - Dynamic */}
      <ImageSliderHero
        slides={heroSlides}
        title={heroContent.title || "Nigeria's Premier Trenchless & Pipeline Contractor"}
        subtitle={heroContent.subtitle || "Pioneers of HDD in Nigeria since 2003. Over 100km installed, including Africa's longest single drill (3.1km) and Nigeria's longest Continuous HDD (12km). Trusted by Shell, Dangote, NNPC, and Saipem."}
        badge={heroContent.badge || "Pioneers of HDD in Nigeria since 2003"}
        primaryCTA={{ 
          label: heroContent.primaryBtnText || "Get Your Free Quote", 
          href: heroContent.primaryBtnLink || "/contact" 
        }}
        secondaryCTA={{ 
          label: heroContent.secondaryBtnText || "View Our Projects", 
          href: heroContent.secondaryBtnLink || "/projects" 
        }}
        trustStrip={<TrustStrip />}
        autoPlayInterval={5000}
        pageSlug="home"
        sectionKey="hero"
      />

      {/* Consolidated Trust Block (Stats + Testimonial + Clients) */}
      <TrustBlock variant="light" />

      {/* Animated KPI Stats with Dynamic Data */}
      <AnimatedKPIBand 
        variant="dark" 
        stats={kpiStats}
      />

      {/* Capabilities Grid - Reduced to 3 cards */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          {/* Refined Header - Dynamic with Live Editing */}
          <motion.div 
            className="text-center mb-10 md:mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[11px] md:text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              <EditableText
                value={capabilitiesContent.subtitle || "What We Do"}
                pageSlug="home"
                sectionKey="capabilities_intro"
                field="subtitle"
              />
            </p>
            <h2 className="mb-3">
              <EditableText
                value={capabilitiesContent.title || "Infrastructure Capabilities"}
                pageSlug="home"
                sectionKey="capabilities_intro"
                field="title"
              />
            </h2>
            <p className="text-[14px] md:text-[15px] text-muted-foreground max-w-xl mx-auto">
              <EditableText
                value={capabilitiesContent.description || "End-to-end solutions for Nigeria's most demanding infrastructure projects."}
                pageSlug="home"
                sectionKey="capabilities_intro"
                field="description"
              />
            </p>
          </motion.div>

          {/* Mobile Carousel */}
          <MobileCapabilityCarousel capabilities={capabilities} />

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-5">
            {capabilities.map((cap, index) => (
              <CapabilityCard
                key={cap.title}
                {...cap}
                index={index}
              />
            ))}
          </div>

          <motion.div 
            className="text-center mt-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Button asChild variant="outline" size="default" className="h-10 px-5 text-sm hover-lift">
              <Link to="/capabilities">
                View All Capabilities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding bg-muted/40">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-[11px] md:text-xs font-semibold uppercase tracking-widest text-primary mb-2">Track Record</p>
              <h2 className="mb-2">Featured Projects</h2>
              <p className="text-[14px] md:text-[15px] text-muted-foreground max-w-md">
                Record-breaking HDD crossings for Nigeria's leading operators.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Button asChild variant="outline" size="sm" className="mt-4 md:mt-0 h-9 px-4 text-sm">
                <Link to="/projects">
                  View All
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredProjects.map((project, index) => (
              <CaseStudyCard
                key={project.title}
                {...project}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About / Story Section - Dynamic with Live Editing */}
      <section className="bg-charcoal section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-[11px] md:text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                <EditableText
                  value={aboutContent.subtitle || "Our Story"}
                  pageSlug="home"
                  sectionKey="about_section"
                  field="subtitle"
                />
              </p>
              <h2 className="text-white text-[22px] md:text-[26px] font-semibold mb-5">
                <EditableText
                  value={aboutContent.title || "Pioneers of HDD in Nigeria Since 2003"}
                  pageSlug="home"
                  sectionKey="about_section"
                  field="title"
                />
              </h2>
              <p className="text-white/60 text-[14px] md:text-[15px] mb-4 leading-relaxed">
                <EditableText
                  value={aboutContent.description || "Founded in 1995, Enikkom Construction Limited pioneered Horizontal Directional Drilling (HDD) technology in Nigeria with the historic River Niger crossing in 2003. Today, we hold records for Africa's longest single drill (3.1km) and Nigeria's longest Continuous HDD (12km)."}
                  pageSlug="home"
                  sectionKey="about_section"
                  field="description"
                  multiline
                />
              </p>
              <p className="text-white/60 text-[14px] md:text-[15px] mb-6 leading-relaxed">
                <EditableText
                  value={aboutContent.description2 || "Our strategic partnership with HDDThailand and ownership of West Africa's largest HDD fleet—10+ maxi rigs with capacities up to 500 tons—positions us as the region's premier trenchless contractor."}
                  pageSlug="home"
                  sectionKey="about_section"
                  field="description2"
                  multiline
                />
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 border border-white/10 rounded-[14px] p-4 hover:bg-white/8 transition-colors duration-200">
                  <h5 className="text-white text-sm font-medium mb-1.5">Mission</h5>
                  <p className="text-white/50 text-xs leading-relaxed">
                    <EditableText
                      value={aboutContent.mission || "To offer innovative and cost effective solutions to our clients."}
                      pageSlug="home"
                      sectionKey="about_section"
                      field="mission"
                    />
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-[14px] p-4 hover:bg-white/8 transition-colors duration-200">
                  <h5 className="text-white text-sm font-medium mb-1.5">Vision</h5>
                  <p className="text-white/50 text-xs leading-relaxed">
                    <EditableText
                      value={aboutContent.vision || "To be the foremost indigenous engineering construction company in Nigeria."}
                      pageSlug="home"
                      sectionKey="about_section"
                      field="vision"
                    />
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="text-[11px] md:text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Core Values - PRICE</p>
              <div className="space-y-3">
                {coreValues.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <motion.div 
                      key={value.title} 
                      className="flex items-center gap-3 p-3 rounded-[14px] bg-white/5 border border-white/10 hover:bg-white/8 transition-all duration-200"
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h5 className="text-white text-sm font-medium">{value.title}</h5>
                        <p className="text-white/50 text-xs">{value.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* OML34 Video Showcase - Dynamic with Live Editing */}
      <section className="section-padding bg-muted/40">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-[11px] md:text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                <EditableText
                  value={videoContent.subtitle || "Featured Project"}
                  pageSlug="home"
                  sectionKey="video_showcase"
                  field="subtitle"
                />
              </p>
              <h2 className="mb-3">
                <EditableText
                  value={videoContent.title || "OML34 Continuous HDD - 12km Record"}
                  pageSlug="home"
                  sectionKey="video_showcase"
                  field="title"
                />
              </h2>
              <p className="text-[14px] md:text-[15px] text-muted-foreground mb-5 leading-relaxed">
                <EditableText
                  value={videoContent.description || "Watch the documentary of Nigeria's longest functional Continuous HDD project—10\" x 12km pipeline installation for NPDC, setting a new industry benchmark."}
                  pageSlug="home"
                  sectionKey="video_showcase"
                  field="description"
                  multiline
                />
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {videoStats.map((stat: any) => (
                  <div key={stat.label} className="text-center p-3 bg-background rounded-[14px] border">
                    <div className="text-lg font-bold text-primary">{stat.value}</div>
                    <div className="text-[11px] text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <Button asChild size="sm" className="h-9 px-4 text-sm bg-brand-primary hover:bg-brand-primary-hover btn-press">
                <Link to="/projects/oml34-chdd">
                  See Full Case Study
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div 
              className="relative rounded-xl overflow-hidden hover-lift aspect-video"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <iframe
                src={getYouTubeEmbedUrl(videoContent.videoUrl)}
                title={videoContent.title || "OML34 10\" x 12km Continuous HDD Project Review"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full absolute inset-0"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Band - Dynamic */}
      <CTABand 
        headline={ctaContent.headline || "Start Your Project Today"}
        subhead={ctaContent.subhead || "Response within 24 hours"}
        primaryCTA={{ 
          label: ctaContent.primaryBtnText || "Get Your Free Quote", 
          href: ctaContent.primaryBtnLink || "/contact" 
        }}
      />
    </Layout>
  );
}
