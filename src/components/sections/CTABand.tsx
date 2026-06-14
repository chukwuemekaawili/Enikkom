import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

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
  const isPrimary = variant === "primary";

  return (
    <section className={`section-padding ${isPrimary ? "bg-background" : "bg-charcoal"}`}>
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`overflow-hidden rounded-[2rem] border ${
            isPrimary
              ? "border-border bg-muted/40"
              : "border-white/10 bg-white/[0.04] text-white shadow-[0_28px_80px_rgba(0,0,0,0.16)]"
          }`}
        >
          <div className="grid gap-8 p-7 md:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p
                className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${
                  isPrimary ? "text-primary" : "text-primary/80"
                }`}
              >
                Project conversation
              </p>
              <h2 className={`mt-4 ${isPrimary ? "text-foreground" : "text-white"}`}>{headline}</h2>
              <p
                className={`mt-4 max-w-2xl text-[15px] leading-8 ${
                  isPrimary ? "text-muted-foreground" : "text-white/80"
                }`}
              >
                {subhead}
              </p>
            </div>

            <div className="lg:pl-10 lg:border-l lg:border-white/10">
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Button asChild size="xl">
                  <Link to={primaryCTA.href}>
                    {primaryCTA.label}
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>

                <Button asChild size="lg" variant={isPrimary ? "outline" : "premium"}>
                  <Link to={secondaryCTA.href}>{secondaryCTA.label}</Link>
                </Button>
              </div>

              <p className={`mt-5 text-[12px] ${isPrimary ? "text-muted-foreground" : "text-white/65"}`}>
                No obligation. Practical scoping. Response within 24 to 48 hours.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
