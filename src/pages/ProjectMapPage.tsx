import { Layout } from "@/components/layout";
import { Hero, CTABand } from "@/components/sections";
import { InteractiveProjectMap } from "@/components/sections/InteractiveProjectMap";
import { usePageContent } from "@/hooks/useSiteSettings";
import { EditableText } from "@/components/admin";

import heroHddRig from "@/assets/hero/hero-hdd-rig.jpg";

export default function ProjectMapPage() {
  const { content } = usePageContent('project-map');
  const heroContent = content.hero || {};
  const ctaContent = content.cta || {};

  return (
    <Layout>
      <Hero
        title={heroContent.title || "Project Locations"}
        subtitle={heroContent.subtitle || "Explore our completed projects across Nigeria's key oil & gas regions. Click on any marker to view project details."}
        badge={heroContent.badge || "Interactive Map"}
        primaryCTA={{ label: "View All Projects", href: "/projects" }}
        secondaryCTA={{ label: "Request a Quote", href: "/contact" }}
        backgroundImage={heroContent.backgroundImage || heroHddRig}
        size="default"
        pageSlug="project-map"
        sectionKey="hero"
        imageField="backgroundImage"
      />

      {/* Editable Hero Content Section */}
      <section className="py-8 bg-muted/30">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-3">
              <EditableText
                value={heroContent.section_title || "Our Project Footprint"}
                pageSlug="project-map"
                sectionKey="hero"
                field="section_title"
              />
            </h2>
            <p className="text-muted-foreground">
              <EditableText
                value={heroContent.section_description || "From the Niger Delta to Lagos, we've delivered critical infrastructure projects across Nigeria's major oil & gas regions. Each marker represents a successfully completed project."}
                pageSlug="project-map"
                sectionKey="hero"
                field="section_description"
                multiline
              />
            </p>
          </div>
        </div>
      </section>

      <InteractiveProjectMap 
        showHeader={false}
        showStats={true}
        showFilters={true}
        maxHeight="600px"
      />

      <CTABand 
        headline={ctaContent.headline || "Ready to Start Your Project?"}
        primaryCTA={{ label: ctaContent.cta_label || "Request a Quote", href: "/contact" }}
      />
    </Layout>
  );
}
