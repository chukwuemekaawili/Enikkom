import { Layout } from "@/components/layout";
import { Hero, CTABand } from "@/components/sections";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { EditableText } from "@/components/admin";
import { usePageContent } from "@/hooks/useSiteSettings";

import heroHddRig from "@/assets/hero/hero-hdd-rig.jpg";

// Default testimonials from Enikkom documents
const defaultTestimonials = [
  {
    quote: "Outstanding job on the 36\" x 1.5km swamp/river crossing. Impressive drilling work done by your team. We look forward to more collaborations with Enikkom in the future.",
    author: "Project Director",
    company: "Dangote Fertilizer Limited",
    project: "Lekki Gas Pipeline Project (LGPP)",
    rating: 5,
  },
  {
    quote: "ECL brings a level of client side understanding to each and every project. Their technical expertise and commitment to safety is unmatched. We have no hesitation in recommending ECL for any HDD or pipeline project.",
    author: "Project Manager",
    company: "Zakhem Construction Nigeria Limited",
    project: "Escravos-Lagos Pipeline System Phase II",
    rating: 5,
  },
  {
    quote: "We are delighted with our experience of working with ENIKKOM on the Otumara-Escravos bundled crossing. The team demonstrated unmatched professionalism throughout the project. It was a pleasure working with the team.",
    author: "Construction Manager",
    company: "Saipem Contracting Nigeria Limited",
    project: "Otumara-Escravos 12\" + 3\" Bundled HDD Crossing",
    rating: 5,
  },
  {
    quote: "Enikkom has provided Horizontal Directional Drilling services to our company, having satisfied our requirements for efficient work. Their technical capability and safety record are exemplary.",
    author: "Operations Director",
    company: "Gramen Petroserve Nigeria Limited",
    project: "Various HDD Projects",
    rating: 5,
  },
  {
    quote: "The 40\" x 760m Yenagoa crossing at 100ft depth was executed flawlessly. This was the largest pipeline crossing in Nigeria and Enikkom delivered on time with zero safety incidents.",
    author: "Project Coordinator",
    company: "Shell Petroleum Development Company (SPDC)",
    project: "Yenagoa 40\" HDD Crossing - Largest in Nigeria",
    rating: 5,
  },
  {
    quote: "The Atlas Cove-Mosimi 16\" x 3km emergency reconstruction was completed in record time. Enikkom set a new benchmark for HDD capability in Africa with this project.",
    author: "Pipeline Manager",
    company: "NNPC/PPMC",
    project: "Atlas Cove-Mosimi Emergency Reconstruction",
    rating: 5,
  },
];

const defaultStats = [
  { value: "30", label: "Years Experience" },
  { value: "100+", label: "KM HDD Installed" },
  { value: "3.1km", label: "Longest Single Drill" },
  { value: "Zero", label: "LTI Record" },
];

export default function TestimonialsPage() {
  const { content } = usePageContent('testimonials');
  
  const heroContent = content.hero || {};
  const introContent = content.intro || {};
  const quotesContent = content.client_quotes || {};
  const statsContent = content.stats || {};

  // Get testimonials (from CMS or defaults)
  const testimonials = quotesContent.testimonials && quotesContent.testimonials.length > 0 
    ? quotesContent.testimonials 
    : defaultTestimonials;

  // Get stats (from CMS or defaults)
  const stats = statsContent.stats && statsContent.stats.length > 0 
    ? statsContent.stats 
    : defaultStats;

  return (
    <Layout>
      <Hero
        title={heroContent.title || "Client Testimonials"}
        subtitle={heroContent.subtitle || "Real feedback from the industry leaders who trust Enikkom for their critical infrastructure projects."}
        backgroundImage={heroContent.backgroundImage || heroHddRig}
        size="default"
        pageSlug="testimonials"
        sectionKey="hero"
        imageField="backgroundImage"
      />

      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="mb-4">
              <EditableText
                value={introContent.title || "What Our Clients Say"}
                pageSlug="testimonials"
                sectionKey="intro"
                field="title"
              />
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              <EditableText
                value={introContent.description || "Over 30 years of delivering excellence has earned us the trust of major IOCs, EPCs, and government agencies across Nigeria and West Africa."}
                pageSlug="testimonials"
                sectionKey="intro"
                field="description"
              />
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card rounded-[14px] border p-6 relative hover-lift"
              >
                <Quote className="h-10 w-10 text-primary/20 absolute top-4 right-4" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed italic text-[14px]">
                  "{testimonial.quote}"
                </p>
                
                <div className="border-t pt-4">
                  <p className="font-medium text-sm">{testimonial.author}</p>
                  <p className="text-sm text-primary">{testimonial.company}</p>
                  <p className="text-xs text-muted-foreground mt-1">{testimonial.project}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="text-center">
            <h2 className="mb-4">
              <EditableText
                value={statsContent.title || "Trusted by Industry Leaders"}
                pageSlug="testimonials"
                sectionKey="stats"
                field="title"
              />
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              <EditableText
                value={statsContent.description || "Our track record speaks for itself: 100+ km of HDD installed, Africa's longest single drill, and zero LTI on major projects."}
                pageSlug="testimonials"
                sectionKey="stats"
                field="description"
              />
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat: any, index: number) => (
                <div key={index} className="text-center">
                  <p className="text-4xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABand 
        headline="Join Our List of Satisfied Clients"
        primaryCTA={{ label: "Start Your Project", href: "/contact" }}
      />
    </Layout>
  );
}