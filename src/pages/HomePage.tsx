import { useEffect, useRef, useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  Anchor,
  ArrowRight,
  ArrowUpRight,
  Award,
  CheckCircle,
  ChevronDown,
  Drill,
  Factory,
  Heart,
  Leaf,
  Lightbulb,
  PipetteIcon,
  Shield,
  Target,
  TrendingUp,
  Users,
  Play,
} from "lucide-react";

import { Layout } from "@/components/layout";
import { CTABand, TrustBlock, FAQSection } from "@/components/sections";
import { Button } from "@/components/ui/button";
import { EnhancedImage } from "@/components/ui/enhanced-image";
import { getProjectImage } from "@/content/projectImageSelections";
import { siteImageSelections } from "@/content/siteImageSelections";
import { usePageContent } from "@/hooks/usePageContent";
import { useCollection } from "@/hooks/useSiteSettings";

// ── Images ──────────────────────────────────────────────────────────────────
import enikkomLogoWhite from "@/assets/images/logos/enikkom-logo-white.png";

// ── Micro-components ────────────────────────────────────────────────────────

function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  duration = 2200,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    function tick(now: number) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(2, -10 * p);
      setCount(Math.round(eased * value));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

function Label({
  children,
  variant = "dark",
}: {
  children: React.ReactNode;
  variant?: "dark" | "light" | "color";
}) {
  const styles = {
    dark: "text-white/45",
    light: "text-foreground/50",
    color: "text-primary",
  };
  const lineStyles = {
    dark: "bg-white/25",
    light: "bg-foreground/25",
    color: "bg-primary",
  };
  return (
    <div className={`flex items-center gap-3 ${styles[variant]}`}>
      <span className={`h-px w-6 shrink-0 ${lineStyles[variant]}`} />
      <span className="text-[10px] font-bold uppercase tracking-[0.28em]">
        {children}
      </span>
    </div>
  );
}

// ── Static data ──────────────────────────────────────────────────────────────

const HERO_SLIDES = [
  {
    src: siteImageSelections.home.heroSlides[0],
    alt: "Field-ready trenchless spread mobilized for a major crossing",
    position: "center 52%",
  },
  {
    src: siteImageSelections.home.heroSlides[1],
    alt: "Pipeline construction crew welding a large diameter line",
    position: "center 46%",
  },
  {
    src: siteImageSelections.home.heroSlides[2],
    alt: "Heavy field equipment deployed for complex infrastructure delivery",
    position: "center 55%",
  },
  {
    src: siteImageSelections.home.heroSlides[3],
    alt: "Close-up trenchless drilling operation with pipe string in the foreground",
    position: "center 48%",
  },
];

const DEFAULT_KPI = [
  { value: 100, suffix: "+", label: "KM of HDD Installed" },
  { value: 9, suffix: "", label: "HDD Rigs Owned" },
  { value: 34, suffix: "", label: "Years in Operation" },
  { value: 0, suffix: "", label: "Lost-Time Incidents" },
];

const RECORDS = [
  {
    index: "01",
    stat: "3.1 km × 16\"",
    label: "Africa's Longest Single HDD Drill",
    detail: "Atlas Cove–Mosimi pipeline crossing, Arepo/Imagbon, Ogun State.",
    image: getProjectImage("atlas-cove-mosimi", "homeRecord") || getProjectImage("atlas-cove-mosimi", "hero"),
  },
  {
    index: "02",
    stat: "10\" × 12 km",
    label: "Nigeria's Longest Continuous HDD",
    detail: "OML34 Utorogun–Ughelli Pump Station, Delta State.",
    image: getProjectImage("oml34-chdd", "homeRecord") || getProjectImage("oml34-chdd", "hero"),
  },
  {
    index: "03",
    stat: "> 80 m depth",
    label: "Africa's Deepest HDD Crossing",
    detail: "36-inch Ekiadolor Deep Valley crossing, February 2016.",
    image: getProjectImage("ekiadolor-deep-valley", "homeRecord") || getProjectImage("ekiadolor-deep-valley", "hero"),
  },
  {
    index: "04",
    stat: "40\" × 760 m",
    label: "Largest Pipe Size in Nigeria",
    detail: "River and road fish pond crossing for Daewoo / SPDC.",
    image: getProjectImage("yenagoa-40-crossing", "homeRecord") || getProjectImage("yenagoa-40-crossing", "hero"),
  },
  {
    index: "05",
    stat: "12\"+3\" × 2.78 km",
    label: "Africa's Longest Bundled Crossing",
    detail: "Otumara–Escravos pipeline package for Saipem / SPDC.",
    image: getProjectImage("otumara-escravos", "homeRecord") || getProjectImage("otumara-escravos", "hero"),
  },
];

const CAPABILITIES = [
  {
    title: "Horizontal Directional Drilling",
    short: "HDD / Trenchless",
    description:
      "Trenchless pipeline installations across roads, railways, rivers, and sensitive corridors. Nigeria's largest owned rig fleet.",
    href: "/capabilities/hdd",
    icon: Drill,
    image: siteImageSelections.home.capabilityCards.hdd,
    metric: "3.1 km record",
    metricLabel: "Longest single drill in Africa",
  },
  {
    title: "Pipelines & Flowlines",
    short: "Pipeline Systems",
    description:
      "Fabrication, construction, repair, and maintenance of pipeline infrastructure across land, swamp, and offshore environments.",
    href: "/capabilities/pipelines-flowlines",
    icon: PipetteIcon,
    image: siteImageSelections.home.capabilityCards.pipelines,
    metric: "Multi-terrain",
    metricLabel: "Land, swamp & offshore",
  },
  {
    title: "Dredging & Piling",
    short: "Marine Civil",
    description:
      "Marine civil delivery for sand filling, reclamation, piling, access improvement, and difficult swamp operations.",
    href: "/capabilities/dredging-piling",
    icon: Anchor,
    image: siteImageSelections.home.capabilityCards.dredging,
    metric: "Full scope",
    metricLabel: "Reclamation & piling",
  },
  {
    title: "Production Facilities",
    short: "Facilities",
    description:
      "Integrated production systems, wellhead upgrades, structural works, and plant support designed to international standards.",
    href: "/capabilities/facilities",
    icon: Factory,
    image: siteImageSelections.home.capabilityCards.facilities,
    metric: "Turnkey",
    metricLabel: "Flow stations & wellheads",
  },
];

const DEFAULT_PROJECTS = [
  {
    title: "OML34 Continuous HDD — 10\" × 12 km",
    location: "Utorogun, Delta State",
    metric: "12 km",
    metricLabel: "Nigeria's Longest CHDD",
    tags: ["CHDD", "Record"],
    href: "/projects/oml34-chdd",
    thumbnail: getProjectImage("oml34-chdd", "homeFeature"),
    year: "2021",
  },
  {
    title: "Dangote Fertilizer — 36\" × 2 km Lagoon",
    location: "Ejirin, Lagos Lagoon",
    metric: "36\" × 2 km",
    metricLabel: "Swamp / River HDD Crossing",
    tags: ["HDD", "Pipeline"],
    href: "/projects/dangote-lagoon",
    thumbnail: getProjectImage("dangote-lagoon", "homeFeature"),
    year: "2016",
  },
  {
    title: "Atlas Cove–Mosimi — 16\" × 3.1 km",
    location: "Arepo / Imagbon, Ogun State",
    metric: "3.1 km",
    metricLabel: "Africa's Longest Single Drill",
    tags: ["HDD", "Record"],
    href: "/projects/atlas-cove-mosimi",
    thumbnail: getProjectImage("atlas-cove-mosimi", "homeFeature"),
    year: "2016",
  },
];

function resolveCapabilityImage(capability: { title?: string; image?: string }) {
  const title = (capability.title || "").toLowerCase();
  if (title.includes("hdd") || title.includes("trenchless")) return siteImageSelections.home.capabilityCards.hdd;
  if (title.includes("pipeline")) return siteImageSelections.home.capabilityCards.pipelines;
  if (title.includes("dredg") || title.includes("piling") || title.includes("marine")) {
    return siteImageSelections.home.capabilityCards.dredging;
  }
  if (title.includes("facilit") || title.includes("production")) {
    return siteImageSelections.home.capabilityCards.facilities;
  }
  return capability.image || siteImageSelections.home.capabilityCards.hdd;
}

function resolveProjectThumbnail(
  project: { title?: string; slug?: string; href?: string; thumbnail?: string },
  index: number
) {
  const slugOrHref = project.slug || project.href || "";
  return (
    getProjectImage(slugOrHref, "homeFeature") ||
    project.thumbnail ||
    DEFAULT_PROJECTS[index]?.thumbnail ||
    siteImageSelections.home.capabilityCards.hdd
  );
}

const QHSE_PILLARS = [
  {
    icon: Shield,
    title: "Safety",
    description:
      "Certified equipment, preventive maintenance, and disciplined work planning on every site.",
    stat: "Zero LTI",
  },
  {
    icon: Award,
    title: "Quality",
    description:
      "ISO-aligned systems and inspection-led execution that keep delivery accountable to every standard.",
    stat: "ISO Aligned",
  },
  {
    icon: Leaf,
    title: "Environment",
    description:
      "Reducing impact through trenchless methods, controlled operations, and active site stewardship.",
    stat: "Trenchless First",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Working responsibly in host communities and maintaining long-term local trust and transparency.",
    stat: "Host-First",
  },
];

const CORE_VALUES = [
  { icon: TrendingUp, letter: "P", title: "Performance", description: "Measurable results on complex work fronts without losing momentum." },
  { icon: Target, letter: "R", title: "Resilience", description: "Built for onshore, swamp, and river environments across Nigeria." },
  { icon: Lightbulb, letter: "I", title: "Innovation", description: "Trenchless methods where standard approaches fail." },
  { icon: Heart, letter: "C", title: "Care", description: "Protecting people, communities, and the environment." },
  { icon: CheckCircle, letter: "E", title: "Expertise", description: "Specialist HDD capability backed by decades of field experience." },
];

const ABOUT_MILESTONES = [
  { year: "1995", label: "Founded", detail: "Wholly indigenous engineering and infrastructure group." },
  { year: "2003", label: "HDD Pioneer", detail: "Delivered Nigeria's first River Niger HDD crossing." },
  { year: "2016", label: "Africa Record", detail: "Longest and deepest HDD crossings on the continent." },
  { year: "2021", label: "12 km CHDD", detail: "Completed Nigeria's longest continuous HDD at OML34." },
];

const VIDEO_STATS = [
  { value: "10\"", label: "Pipe Diameter" },
  { value: "12 km", label: "Installed Length" },
  { value: "NPDC", label: "Client" },
  { value: "#1", label: "Nigeria Record" },
];

function resolveCapabilityHref(capability: { title?: string; href?: string }) {
  const title = (capability.title || "").toLowerCase();
  if (title.includes("security")) return "/capabilities/pipeline-security";
  if (title.includes("project management")) return "/capabilities/project-management";
  if (title.includes("hdd") || title.includes("trenchless")) return "/capabilities/hdd";
  if (title.includes("pipeline")) return "/capabilities/pipelines-flowlines";
  if (title.includes("dredg")) return "/capabilities/dredging-piling";
  if (title.includes("facilit") || title.includes("production")) return "/capabilities/facilities";
  return capability.href || "/capabilities";
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";
  const { content: cmsContent } = usePageContent("home", isPreview);
  const { data: dbProjects } = useCollection("projects_list");
  const { data: dbCapabilities } = useCollection("capabilities_list");

  const [heroIdx, setHeroIdx] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const t = setInterval(
      () => setHeroIdx((i) => (i + 1) % HERO_SLIDES.length),
      7000
    );
    return () => clearInterval(t);
  }, []);

  const content = useMemo(() => {
    if (!cmsContent?.sections) return {};
    const sections: Record<string, any> = {};
    cmsContent.sections.forEach((s: any) => {
      sections[s.section_key] = s.content;
    });
    return sections;
  }, [cmsContent]);

  const heroContent = content.hero || {};
  const ctaContent = content.cta_band || {};
  const videoContent = content.video_showcase || {};

  const capabilities = (
    dbCapabilities.length > 0 ? dbCapabilities.slice(0, 4) : CAPABILITIES
  ).map((c: any) => ({
    ...c,
    href: resolveCapabilityHref(c),
    image: resolveCapabilityImage(c),
  }));

  const featuredProjects =
    dbProjects.length > 0
      ? dbProjects.filter((p: any) => p.featured !== false).slice(0, 3)
      : DEFAULT_PROJECTS;

  const curatedProjects = featuredProjects.map((project: any, index: number) => ({
    ...project,
    thumbnail: resolveProjectThumbnail(project, index),
  }));

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return "https://www.youtube.com/embed/uv_ozmjIo-E";
    if (url.includes("embed/")) return url;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  return (
    <Layout>
      {/* ═══════════════════════════════════════════════════
          01 · HERO — Full-screen cinematic
      ═══════════════════════════════════════════════════ */}
      <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#071630]">
        {/* Cycling backgrounds */}
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity"
            style={{
              opacity: i === heroIdx ? 1 : 0,
              transitionDuration: "1400ms",
            }}
          >
            <EnhancedImage
              src={slide.src}
              alt={slide.alt}
              priority={i === 0}
              tone="cinematic"
              wrapperClassName="absolute inset-0 bg-[#071630]"
              className="absolute inset-0 h-full w-full object-cover scale-[1.02]"
              style={{ objectPosition: slide.position }}
            />
          </div>
        ))}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071630]/90 via-[#071630]/56 to-[#071630]/14" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060b14]/78 via-[#060b14]/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(255,196,87,0.12),transparent_32%)]" />

        {/* Accent glow */}
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-brand-amber/70 via-brand-amber/25 to-transparent" />

        {/* Content */}
        <div className="relative flex flex-1 flex-col">
          <div className="container-wide flex flex-1 flex-col justify-center pt-36 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <Label variant="dark">
                {heroContent.badge || "Pioneers of HDD in Nigeria · Since 2003"}
              </Label>

              <h1 className="mt-6 text-[52px] font-extrabold leading-[1.04] tracking-tight text-white sm:text-[68px] lg:text-[86px] xl:text-[100px]">
                {heroContent.title ? (
                  heroContent.title
                ) : (
                  <>
                    Built for the
                    <br />
                    <span className="text-brand-amber">Crossings</span> That
                    <br />
                    Count.
                  </>
                )}
              </h1>

              <p className="mt-6 max-w-xl text-[16px] leading-[1.7] text-white/75 md:text-[18px]">
                {heroContent.subtitle ||
                  "Nigeria's specialist partner for trenchless crossings, pipeline systems, dredging, and complex energy infrastructure—end-to-end."}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="h-13 px-8 text-[15px] bg-brand-amber hover:bg-brand-amber-hover text-white border-0 shadow-[0_0_0_1px_rgba(245,158,11,0.25),0_8px_28px_rgba(245,158,11,0.28)]">
                  <Link to={heroContent.primaryBtnLink || "/capabilities"}>
                    {heroContent.primaryBtnText || "Explore Capabilities"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="lg"
                  className="h-13 border border-white/20 px-8 text-[15px] text-white hover:bg-white/8 hover:text-white"
                >
                  <Link to={heroContent.secondaryBtnLink || "/projects"}>
                    {heroContent.secondaryBtnText || "See Track Record"}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Image indicators */}
          <div className="relative container-wide pb-8 flex items-end justify-between gap-6">
              <div className="flex items-center gap-2">
               {HERO_SLIDES.map((_, i) => (
                 <button
                   key={i}
                   onClick={() => setHeroIdx(i)}
                  className={`h-0.5 rounded-full transition-all duration-500 ${
                    i === heroIdx ? "w-8 bg-brand-amber" : "w-3 bg-white/25"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="hidden items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/35 sm:flex"
            >
              <ChevronDown className="h-4 w-4 animate-bounce" />
              Scroll to explore
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          02 · KPI BAND — Animated metrics
      ═══════════════════════════════════════════════════ */}
      <section className="bg-[#071630] border-y border-white/6">
        <div className="container-wide">
          <div className="grid grid-cols-2 divide-x divide-white/6 lg:grid-cols-4">
            {DEFAULT_KPI.map((stat: typeof DEFAULT_KPI[number], i: number) => {
              const isZeroLTI = i === 3;
              return (
                <motion.div
                  key={stat.label}
                  className="flex flex-col items-start gap-3 px-6 py-10 md:px-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.09 }}
                >
                  <div className={`text-[52px] font-extrabold leading-none tracking-tight md:text-[68px] ${isZeroLTI ? "text-brand-amber" : "text-white"}`}>
                    <AnimatedNumber
                      value={stat.value}
                      suffix={stat.suffix}
                    />
                  </div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                    {stat.label}
                  </div>
                  {isZeroLTI && (
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-amber/60">
                      Safety Record
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          03 · GROUP STORY — One group, two arms
      ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-slate-50">
        <div className="container-wide grid items-center gap-12 py-24 lg:grid-cols-2 lg:gap-20 lg:py-32">
          {/* Left — editorial */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Label variant="color">Enikkom Group</Label>
            <h2 className="mt-5 text-[38px] font-bold leading-[1.1] md:text-[50px] lg:text-[58px]">
              One Group.
              <br />
              Two Specialist
              <br />
              <span className="text-brand-amber">Operating Arms.</span>
            </h2>
            <p className="mt-6 max-w-lg text-[16px] leading-[1.75] text-muted-foreground">
              Enikkom drives pipeline, facilities, dredging, and project support delivery,
              while HDDTEC deepens trenchless capability. Together, the group combines
              indigenous execution strength with specialist engineering depth.
            </p>

            {/* Milestones */}
            <div className="mt-10 space-y-0">
              {ABOUT_MILESTONES.map((m, i) => (
                <motion.div
                  key={m.year}
                  className="flex items-start gap-5 border-t border-border py-5"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                >
                  <span className="w-12 shrink-0 text-[13px] font-bold text-primary">
                    {m.year}
                  </span>
                  <div>
                    <div className="text-[14px] font-semibold text-foreground">
                      {m.label}
                    </div>
                    <div className="mt-0.5 text-[13px] text-muted-foreground">
                      {m.detail}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button asChild variant="outline" size="lg" className="mt-10">
              <Link to="/about">
                About the Group
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Right — photo mosaic */}
          <motion.div
            className="grid grid-cols-2 gap-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative overflow-hidden rounded-[20px] aspect-[4/5]">
              <EnhancedImage
                src={siteImageSelections.home.introMosaic.fieldLeadership}
                alt="Field leadership team reviewing pipeline work on site"
                tone="cinematic"
                hoverZoom
                wrapperClassName="h-full w-full"
                className="h-full w-full object-cover"
                style={{ objectPosition: "center 50%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="relative overflow-hidden rounded-[20px] aspect-square">
                <EnhancedImage
                  src={siteImageSelections.home.introMosaic.main}
                  alt="Premium trenchless drilling close-up"
                  tone="cinematic"
                  hoverZoom
                  wrapperClassName="h-full w-full"
                  className="h-full w-full object-cover"
                  style={{ objectPosition: "center 48%" }}
                />
              </div>
              <div className="relative overflow-hidden rounded-[20px] flex-1">
                <EnhancedImage
                  src={siteImageSelections.home.introMosaic.riverDelivery}
                  alt="Marine civil and dredging spread operating at dusk"
                  tone="cinematic"
                  hoverZoom
                  wrapperClassName="h-full w-full"
                  className="h-full w-full object-cover"
                  style={{ objectPosition: "center 55%" }}
                />
                <div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-white/90 px-4 py-3 backdrop-blur-sm border border-blue-100 shadow-sm">
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">In-Country Fleet</div>
                  <div className="mt-0.5 text-[18px] font-extrabold text-foreground">9 HDD Rigs</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          04 · CAPABILITIES — Image-driven cards
      ═══════════════════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-wide">
          {/* Header */}
          <div className="mb-16 grid items-end gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Label variant="color">What We Deliver</Label>
              <h2 className="mt-4 text-[38px] font-bold leading-[1.1] md:text-[50px]">
                Core Capabilities
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:border-l lg:border-border lg:pl-10"
            >
              <p className="text-[16px] leading-[1.75] text-muted-foreground">
                From river crossings and pipeline systems to dredging, facilities, and project
                support — structured around the work fronts clients actually buy.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button asChild size="sm" className="h-10 px-5">
                  <Link to="/capabilities">
                    Full Capability Map
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Link to="/contact" className="text-[12px] font-bold uppercase tracking-[0.14em] text-primary hover:underline">
                  Need a specific package? Talk to us →
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Cards grid */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {capabilities.map((cap: any, i: number) => {
              const Icon = cap.icon || Drill;
              return (
                <motion.div
                  key={cap.title}
                  className="group relative overflow-hidden rounded-[24px] bg-slate-900"
                  style={{ aspectRatio: "3/4" }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.09 }}
                >
                  {/* Background image */}
                  {cap.image && (
                    <EnhancedImage
                      src={cap.image}
                      alt={cap.title}
                      tone="cinematic"
                      wrapperClassName="absolute inset-0"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                      style={{ transform: "scale(1.02)" }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060b14]/95 via-[#060b14]/50 to-[#060b14]/10" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/20 backdrop-blur-sm">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-2">
                      {cap.metric || cap.short || ""}
                    </div>
                    <h3 className="text-[18px] font-bold leading-tight text-white">
                      {cap.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-white/70 line-clamp-3">
                      {cap.description}
                    </p>
                    <Link
                      to={cap.href}
                      className="mt-5 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"
                    >
                      Explore
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          05 · RECORD ACHIEVEMENTS — Editorial dark
      ═══════════════════════════════════════════════════ */}
      <section className="bg-[#071630] py-24 lg:py-32">
        <div className="container-wide">
          {/* Section header */}
          <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Label variant="dark">Africa-First · Nigeria-First</Label>
              <h2 className="mt-4 text-[38px] font-bold leading-[1.1] text-white md:text-[50px]">
                Record-Breaking
                <br />
                Achievements
              </h2>
            </motion.div>
            <Button asChild variant="outline" size="sm" className="h-10 px-6 border-white/15 text-white hover:bg-white/8 hover:border-white/30 self-start md:self-auto">
              <Link to="/projects">
                View Full Track Record
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Headline record */}
          <motion.div
            className="mb-6 relative overflow-hidden rounded-[28px] border border-white/8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <EnhancedImage
              src={RECORDS[0].image}
              alt={RECORDS[0].label}
              tone="cinematic"
              wrapperClassName="absolute inset-0"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071630]/97 via-[#071630]/80 to-[#071630]/40" />
            <div className="relative p-8 md:p-12 lg:p-16">
              <div className="flex items-start gap-6">
                <div className="text-[11px] font-bold text-primary/60 mt-2">
                  {RECORDS[0].index}
                </div>
                <div className="flex-1">
                  <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-amber/70 mb-4">
                    Africa Record
                  </div>
                  <div className="text-[52px] font-extrabold leading-none tracking-tight text-brand-amber md:text-[72px] lg:text-[88px]">
                    {RECORDS[0].stat}
                  </div>
                  <div className="mt-4 text-[22px] font-semibold text-white md:text-[28px]">
                    {RECORDS[0].label}
                  </div>
                  <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-white/55">
                    {RECORDS[0].detail}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Other records */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {RECORDS.slice(1).map((r, i) => (
              <motion.div
                key={r.label}
                className="group relative overflow-hidden rounded-[22px] border border-white/8 bg-white/4 p-6 transition-colors duration-200 hover:bg-white/7 hover:border-white/15"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
              >
                <div className="text-[11px] font-bold text-white/40 mb-4">
                  {r.index}
                </div>
                <div className="text-[26px] font-extrabold leading-none text-brand-amber md:text-[30px]">
                  {r.stat}
                </div>
                <div className="mt-3 text-[15px] font-semibold text-white">
                  {r.label}
                </div>
                <div className="mt-2 text-[12px] leading-relaxed text-white/60">
                  {r.detail}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          06 · FEATURED PROJECTS — Photo-first grid
      ═══════════════════════════════════════════════════ */}
      <section className="bg-slate-50 py-24 lg:py-32">
        <div className="container-wide">
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Label variant="color">Track Record</Label>
              <h2 className="mt-4 text-[38px] font-bold leading-[1.1] md:text-[48px]">
                Featured Projects
              </h2>
              <p className="mt-3 max-w-lg text-[15px] text-muted-foreground">
                Selected case studies showing how the team performs under scale, terrain
                complexity, and delivery pressure.
              </p>
            </motion.div>
            <Button asChild variant="outline" size="sm" className="h-10 px-6 self-start md:self-auto">
              <Link to="/projects">
                All Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Asymmetric grid */}
          <div className="grid gap-4 md:grid-cols-5 md:grid-rows-2">
            {/* Large featured — left */}
            {curatedProjects[0] && (
              <motion.div
                className="group relative col-span-5 overflow-hidden rounded-[24px] md:col-span-3 md:row-span-2"
                style={{ minHeight: "420px" }}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
              >
                <EnhancedImage
                  src={curatedProjects[0].thumbnail}
                  alt={curatedProjects[0].title}
                  tone="cinematic"
                  hoverZoom
                  wrapperClassName="absolute inset-0"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071630]/95 via-[#071630]/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-10">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(curatedProjects[0].tags || []).map((tag: string) => (
                      <span key={tag} className="rounded-full bg-primary/20 border border-primary/30 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-[36px] font-extrabold leading-none text-white mb-1 md:text-[48px]">
                    {curatedProjects[0].metric}
                  </div>
                  <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-primary mb-3">
                    {curatedProjects[0].metricLabel}
                  </div>
                  <h3 className="text-[20px] font-bold text-white leading-tight md:text-[24px]">
                    {curatedProjects[0].title}
                  </h3>
                  <div className="mt-2 text-[13px] text-white/65">
                    {curatedProjects[0].location} · {curatedProjects[0].year}
                  </div>
                  <Link
                    to={curatedProjects[0].href}
                    className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition-all hover:bg-primary/90"
                  >
                    View Case Study
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Two smaller — right */}
            {curatedProjects.slice(1, 3).map((project: any, i: number) => (
              <motion.div
                key={project.title}
                className="group relative col-span-5 overflow-hidden rounded-[24px] md:col-span-2"
                style={{ minHeight: "200px" }}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              >
                  <EnhancedImage
                    src={project.thumbnail}
                    alt={project.title}
                  tone="cinematic"
                  hoverZoom
                  wrapperClassName="absolute inset-0"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071630]/95 via-[#071630]/50 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="text-[28px] font-extrabold leading-none text-white mb-1">
                    {project.metric}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary mb-2">
                    {project.metricLabel}
                  </div>
                  <h3 className="text-[15px] font-bold text-white leading-snug">
                    {project.title}
                  </h3>
                  <div className="mt-1 text-[12px] text-white/60">
                    {project.location} · {project.year}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          07 · VIDEO SHOWCASE — Full-width embed
      ═══════════════════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32 border-y border-border">
        <div className="container-wide">
          <div className="mb-12 grid gap-10 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Label variant="color">
                {videoContent.subtitle || "Featured Project"}
              </Label>
              <h2 className="mt-4 text-[34px] font-bold leading-[1.1] md:text-[44px]">
                {videoContent.title || "OML34 — Nigeria's Longest CHDD at 12 km"}
              </h2>
              <p className="mt-4 text-[15px] leading-[1.75] text-muted-foreground">
                {videoContent.description ||
                  "Awarded to Pipeline Infrastructure Enikkom Joint Venture in 2021. A 10-inch by 12-kilometre pipeline installation by continuous horizontal directional drilling from Utorogu Gas Plant to Ughelli Pump Station."}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {VIDEO_STATS.map((s: typeof VIDEO_STATS[number]) => (
                  <div key={s.label} className="rounded-[18px] border border-border bg-slate-50 p-4 text-center">
                    <div className="text-[22px] font-extrabold text-primary">{s.value}</div>
                    <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <Button asChild size="sm" className="mt-8 h-10 px-6">
                <Link to="/projects/oml34-chdd">
                  Full Case Study
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              className="relative overflow-hidden rounded-[24px] border border-white/8 bg-[#071630] shadow-[0_32px_80px_rgba(0,0,0,0.4)]"
              style={{ aspectRatio: "16/9" }}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {videoOpen ? (
                <iframe
                  src={`${getYouTubeEmbedUrl(videoContent.videoUrl)}&autoplay=1`}
                  title="OML34 HDD — ENIKKOM"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <>
                  <EnhancedImage
                    src={
                      getProjectImage("oml34-chdd", "projectGallery") ||
                      getProjectImage("oml34-chdd", "hero")
                    }
                    alt="OML34 project"
                    tone="cinematic"
                    wrapperClassName="absolute inset-0"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#071630]/50" />
                  <button
                    onClick={() => setVideoOpen(true)}
                    className="absolute inset-0 flex items-center justify-center"
                    aria-label="Play video"
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur-sm transition-all duration-300 hover:bg-white/25 hover:scale-110">
                      <Play className="h-8 w-8 fill-white text-white ml-1" />
                    </div>
                  </button>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          08 · QHSE — Clean pillars on white
      ═══════════════════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-wide">
          <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Label variant="color">Our Commitment</Label>
              <h2 className="mt-4 text-[38px] font-bold leading-[1.1] md:text-[48px]">
                QHSE
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:border-l lg:border-border lg:pl-10"
            >
              <p className="text-[16px] leading-[1.75] text-muted-foreground">
                Quality, Health, Safety & Environment is part of the operating model—not an
                isolated compliance claim. It shapes planning, mobilisation, execution, and handover.
              </p>
              <Button asChild variant="outline" size="sm" className="mt-5 h-10 px-5">
                <Link to="/hse-quality">
                  Certifications & Policies
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {QHSE_PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  className="group relative overflow-hidden rounded-[24px] border border-border bg-slate-50 p-7 transition-all duration-300 hover:border-primary/20 hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)]"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/15">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-2">
                    {pillar.stat}
                  </div>
                  <h3 className="text-[18px] font-bold text-foreground mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          09 · ABOUT + CORE VALUES (PRICE)
      ═══════════════════════════════════════════════════ */}
      <section className="bg-slate-50 py-24 lg:py-32">
        <div className="container-wide">
          <div className="mb-14">
            <Label variant="color">Purpose-Driven Engineering</Label>
          </div>

          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            {/* Mission / Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-[38px] font-bold leading-[1.1] md:text-[50px]">
                An Indigenous Group
                <br />
                <span className="text-brand-amber">Built to Last.</span>
              </h2>
              <p className="mt-6 text-[16px] leading-[1.75] text-muted-foreground">
                Enikkom Group provides end-to-end engineering, procurement, fabrication,
                construction, and installation support for onshore and offshore flowlines,
                pipelines, and facilities across Nigeria.
              </p>
              <p className="mt-4 text-[15px] leading-[1.75] text-muted-foreground">
                With roots dating to 1995, the group combines local operating knowledge, modern
                equipment, and strategic trenchless capability to deliver infrastructure packages
                that need both speed and technical control.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[20px] border border-border bg-white p-5 shadow-sm">
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-3">
                    Mission
                  </div>
                  <p className="text-[14px] leading-relaxed text-muted-foreground">
                    To set the benchmark for engineering and construction excellence in energy and
                    infrastructure across Africa.
                  </p>
                </div>
                <div className="rounded-[20px] border border-border bg-white p-5 shadow-sm">
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-3">
                    Vision
                  </div>
                  <p className="text-[14px] leading-relaxed text-muted-foreground">
                    To create exceptional stakeholder value through innovation, technology, and
                    disciplined sustainability.
                  </p>
                </div>
              </div>

              <div className="relative mt-8 overflow-hidden rounded-[24px]">
                <EnhancedImage
                  src={
                    getProjectImage("ob3-river-niger", "projectMap") ||
                    siteImageSelections.home.introMosaic.finalBlock
                  }
                  alt="Enikkom field team reviewing live HDD operations"
                  tone="cinematic"
                  wrapperClassName="h-56 w-full"
                  className="h-full w-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent" />
                <div className="absolute bottom-4 left-5">
                  <img src={enikkomLogoWhite} alt="Enikkom" style={{ height: "24px", width: "auto" }} />
                </div>
              </div>
            </motion.div>

            {/* PRICE values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="mb-6">
                <h3 className="text-[28px] font-bold text-foreground">
                  PRICE in Practice
                </h3>
                <p className="mt-2 text-[12px] text-muted-foreground uppercase tracking-[0.18em] font-semibold">
                  Performance · Resilience · Innovation · Care · Expertise
                </p>
              </div>

              <div className="space-y-3">
                {CORE_VALUES.map((v, i) => {
                  const Icon = v.icon;
                  return (
                    <motion.div
                      key={v.title}
                      className="group flex items-start gap-5 rounded-[20px] border border-border bg-white p-5 shadow-sm transition-all duration-200 hover:border-primary/25 hover:shadow-md cursor-default"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="text-[22px] font-extrabold text-primary/25 leading-none">{v.letter}</span>
                          <h4 className="text-[16px] font-bold text-foreground">{v.title}</h4>
                        </div>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                          {v.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          10 · TRUST / CLIENTS
      ═══════════════════════════════════════════════════ */}
      <TrustBlock variant="light" />

      {/* ═══════════════════════════════════════════════════
          11 · FAQ
      ═══════════════════════════════════════════════════ */}
      <FAQSection />

      {/* ═══════════════════════════════════════════════════
          12 · CTA BAND
      ═══════════════════════════════════════════════════ */}
      <CTABand
        headline={
          ctaContent.headline || "Ready to scope your next infrastructure package?"
        }
        subhead={
          ctaContent.subhead ||
          "Tell us the crossing, terrain, or facility challenge. Our team will come back with a practical conversation starter—not generic boilerplate."
        }
        primaryCTA={{
          label: ctaContent.primaryBtnText || "Contact Us",
          href: ctaContent.primaryBtnLink || "/contact",
        }}
        secondaryCTA={{ label: "View Projects", href: "/projects" }}
      />
    </Layout>
  );
}
