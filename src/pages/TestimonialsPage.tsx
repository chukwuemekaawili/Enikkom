import { Layout } from "@/components/layout";
import { Hero, CTABand } from "@/components/sections";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { EditableText } from "@/components/content";
import { usePageContent } from "@/hooks/useSiteSettings";
import { siteImageSelections } from "@/content/siteImageSelections";
import { SectionHeading } from "@/components/home/SectionHeading";

// Default testimonials from Enikkom documents
const defaultTestimonials = [
  {
    quote: "Outstanding job on the 36\" × 2km swamp/lagoon crossing. Impressive drilling work done by your team. We look forward to more collaborations with Enikkom in the future.",
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
    quote: "The Atlas Cove-Mosimi 16\" × 3.1km emergency reconstruction was completed in record time. Enikkom set a new benchmark for HDD capability in Africa with this project.",
    author: "Pipeline Manager",
    company: "NNPC/PPMC",
    project: "Atlas Cove-Mosimi 16\" × 3.1km, Africa's Longest Single Drill",
    rating: 5,
  },
];

const defaultStats = [
  { value: "34", label: "Years Experience" },
  { value: "100+", label: "KM HDD Installed" },
  { value: "3.1km", label: "Longest Single Drill" },
  { value: "Zero", label: "LTI Record" },
];

export default function TestimonialsPage() {
  const { content } = usePageContent('testimonials');
  const testimonialImages = siteImageSelections.testimonials;
  
  const heroContent = content.hero || {};
  const introContent = content.intro || {};
  const quotesContent = content.client_quotes || {};
  const statsContent = content.stats || {};

  // Get testimonials (from CMS or defaults)
  const testimonials = quotesContent.testimonials && quotesContent.testimonials.length > 0 
    ? quotesContent.testimonials 
    : defaultTestimonials;

  // Get stats (from CMS or defaults)
  const stats = (statsContent.stats && statsContent.stats.length > 0 
    ? statsContent.stats 
    : defaultStats).map((stat: any) =>
      typeof stat.label === "string" && stat.label.toLowerCase().includes("year")
        ? { ...stat, value: "34" }
        : stat
    );

  return (
    <Layout>
      <Hero
        title={heroContent.title || "Client Testimonials"}
        subtitle={heroContent.subtitle || "Real feedback from the industry leaders who trust Enikkom for their critical infrastructure projects."}
        backgroundImage={heroContent.backgroundImage || testimonialImages.hero}
        size="default"
        pageSlug="testimonials"
        sectionKey="hero"
        imageField="backgroundImage"
      />

      <section className="section-padding">
        <div className="container-wide">
          <div className="mb-12">
            <SectionHeading
              kicker="Client Feedback"
              title={
                <EditableText
                  value={introContent.title || "What Our Clients Say"}
                  pageSlug="testimonials"
                  sectionKey="intro"
                  field="title"
                />
              }
              intro={
                <EditableText
                  value={introContent.description || "Over 30 years of delivering excellence has earned us the trust of major IOCs, EPCs, and government agencies across Nigeria and West Africa."}
                  pageSlug="testimonials"
                  sectionKey="intro"
                  field="description"
                />
              }
              onDark
              align="center"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="enk-card enk-card--hover p-6 relative"
              >
                <Quote className="h-10 w-10 absolute top-4 right-4" style={{ color: "var(--enk-steel)", opacity: 0.25 }} aria-hidden="true" />

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4" style={{ fill: "var(--enk-gold)", color: "var(--enk-gold)" }} />
                  ))}
                </div>

                <p className="mb-6 leading-relaxed italic text-[14px]" style={{ color: "var(--enk-on-dark-muted)" }}>
                  "{testimonial.quote}"
                </p>

                <div className="border-t border-white/10 pt-4">
                  <p className="font-medium text-sm" style={{ color: "var(--enk-on-dark)" }}>{testimonial.author}</p>
                  <p className="text-sm font-mono uppercase tracking-[0.08em]" style={{ color: "var(--enk-bronze)" }}>{testimonial.company}</p>
                  <p className="text-xs mt-1" style={{ color: "var(--enk-on-dark-muted)" }}>{testimonial.project}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="text-center">
            <SectionHeading
              kicker="Track Record"
              title={
                <EditableText
                  value={statsContent.title || "Trusted by Industry Leaders"}
                  pageSlug="testimonials"
                  sectionKey="stats"
                  field="title"
                />
              }
              intro={
                <EditableText
                  value={statsContent.description || "Our track record speaks for itself: 100+ km of HDD installed, Africa's longest single drill, and zero LTI on major projects."}
                  pageSlug="testimonials"
                  sectionKey="stats"
                  field="description"
                />
              }
              onDark
              align="center"
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mt-8">
              {stats.map((stat: any, index: number) => (
                <div key={index} className="text-center">
                  <p className="text-4xl font-bold" style={{ color: "var(--enk-accent-on-dark)" }}>{stat.value}</p>
                  <p className="text-sm" style={{ color: "var(--enk-steel)" }}>{stat.label}</p>
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
