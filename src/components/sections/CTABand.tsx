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
  subhead = "Our engineering team is ready to scope your next infrastructure challenge.",
  primaryCTA = { label: "Contact Us", href: "/contact" },
  secondaryCTA,
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
          <div className="grid gap-8 p-7 md:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <h2 className={`${isPrimary ? "text-foreground" : "text-white"}`}>{headline}</h2>
              {subhead && (
                <p
                  className={`mt-4 max-w-2xl text-[15px] leading-8 ${
                    isPrimary ? "text-muted-foreground" : "text-white/80"
                  }`}
                >
                  {subhead}
                </p>
              )}
            </div>

            <div className="lg:pl-10 lg:border-l lg:border-white/10">
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link to={primaryCTA.href}>
                    {primaryCTA.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                {secondaryCTA && (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className={isPrimary ? "" : "border-white/25 text-white hover:bg-white/10"}
                  >
                    <Link to={secondaryCTA.href}>{secondaryCTA.label}</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
