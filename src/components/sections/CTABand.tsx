import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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

/**
 * Reusable conversion band, in the `.enk` design language. `dark` (default)
 * sits on navy; `primary` is a light variant for use mid-page on white.
 */
export function CTABand({
  headline = "Start Your Project Today",
  subhead = "Our engineering team is ready to scope your next infrastructure challenge.",
  primaryCTA = { label: "Contact Us", href: "/contact" },
  secondaryCTA,
  variant = "dark",
}: CTABandProps) {
  const dark = variant !== "primary";

  return (
    <section
      className="enk-section"
      style={{ backgroundColor: dark ? "var(--enk-navy)" : "var(--enk-bg-muted)" }}
    >
      <div className="enk-container">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className={`enk-display text-[clamp(1.8rem,3.5vw,2.6rem)] ${
              dark ? "text-[var(--enk-on-dark)]" : "text-[var(--enk-ink)]"
            }`}
          >
            {headline}
          </h2>
          {subhead && (
            <p
              className={`mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed ${
                dark ? "text-[var(--enk-on-dark-muted)]" : "text-[var(--enk-steel)]"
              }`}
            >
              {subhead}
            </p>
          )}

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to={primaryCTA.href} className="enk-btn enk-btn--gold">
              {primaryCTA.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            {secondaryCTA && (
              <Link
                to={secondaryCTA.href}
                className={`enk-btn ${dark ? "enk-btn--on-dark" : "enk-btn--outline"}`}
              >
                {secondaryCTA.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
