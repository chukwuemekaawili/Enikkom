import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/** Internal routes go through the router; mailto/http hrefs render as plain anchors. */
function CTALink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  if (/^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
}

interface CTABandProps {
  headline?: string;
  subhead?: string;
  eyebrow?: string;
  primaryCTA?: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
  /** Legacy prop, accepted for compatibility — the band renders one way now. */
  variant?: "primary" | "dark";
}

/**
 * Closing call-to-action band, Shell-style: bare sentence-case headline,
 * one sentence, procurement actions. No eyebrow, no title rule.
 * `eyebrow` is accepted for compatibility but no longer rendered.
 */
export function CTABand({
  headline = "Bring your project to our engineering team",
  subhead = "Send alignment sheets, an RFQ or a tender enquiry for a technical response: feasibility, method statement input, and budget pricing.",
  primaryCTA = { label: "Contact us", href: "/contact" },
  secondaryCTA,
}: CTABandProps) {
  return (
    <section style={{ backgroundColor: "var(--enk-bg-muted)" }}>
      <div className="enk-container py-14 md:py-16">
        <div className="max-w-2xl">
          <h2 className="text-[var(--enk-ink)]">
            {headline}
          </h2>
          {subhead && (
            <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-[var(--enk-steel)] md:text-[15px]">
              {subhead}
            </p>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <CTALink href={primaryCTA.href} className="enk-btn enk-btn--gold">
            {primaryCTA.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </CTALink>
          {secondaryCTA && (
            <CTALink href={secondaryCTA.href} className="enk-btn enk-btn--outline">
              {secondaryCTA.label}
            </CTALink>
          )}
        </div>
      </div>
    </section>
  );
}
