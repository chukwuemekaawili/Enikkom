import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CTABandProps {
  headline?: string;
  subhead?: string;
  primaryCTA?: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
  variant?: "primary" | "dark";
}

export function CTABand({
  headline = "Start Your Project Today",
  subhead = "Get a detailed proposal within 48 hours. Our engineering team is ready to scope your next infrastructure challenge.",
  primaryCTA = { label: "Get Your Free Quote", href: "/contact" },
  secondaryCTA = { label: "View Our Track Record", href: "/projects" },
  variant = "dark",
}: CTABandProps) {
  return (
    <section className="bg-charcoal py-16 md:py-20 lg:py-24 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />
      
      <div className="container-wide relative z-10">
        <motion.div 
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 
            className="text-white text-[24px] md:text-[28px] lg:text-[32px] font-bold mb-4 leading-tight"
            style={{ textShadow: '0 1px 8px rgba(0, 0, 0, 0.25)' }}
          >
            {headline}
          </h2>
          <p className="text-white/60 text-[15px] md:text-[16px] mb-8 leading-relaxed max-w-xl mx-auto">
            {subhead}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              size="lg"
              className="h-12 px-7 text-[14px] font-semibold bg-primary hover:bg-primary/90 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
            >
              <Link to={primaryCTA.href}>
                {primaryCTA.label}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 px-7 text-[14px] font-semibold border-white/20 text-white bg-transparent hover:bg-white/8 hover:border-white/35 rounded-xl transition-all duration-200"
            >
              <Link to={secondaryCTA.href}>
                {secondaryCTA.label}
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <p className="text-white/40 text-[12px] mt-6 font-medium">
            ✓ No obligation · ✓ Response within 24 hours · ✓ Free site assessment
          </p>
        </motion.div>
      </div>
    </section>
  );
}
