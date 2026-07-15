import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { getAssetUrl } from "@/lib/assetMap";

interface HeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  primaryCTA?: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
  backgroundImage?: string;
  trustStrip?: ReactNode;
  size?: "default" | "large" | "small";
  align?: "left" | "center";
  /** Legacy CMS props, accepted for compatibility, no longer used. */
  pageSlug?: string;
  sectionKey?: string;
  imageField?: string;
}

/**
 * Page hero as a Shell-style rounded tile inset from the viewport: field
 * photo inside the tile, a translucent rounded overlay panel with the
 * headline, one sentence, and the page actions. Same prop API (drop-in);
 * `badge` is kept for the aria-label only — no eyebrows.
 */
export function Hero({
  title,
  subtitle,
  badge,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  trustStrip,
  size = "default",
  align = "left",
}: HeroProps) {
  const minH = {
    small: "min-h-[280px] md:min-h-[320px]",
    default: "min-h-[340px] md:min-h-[400px]",
    large: "min-h-[400px] md:min-h-[480px]",
  };

  const resolvedImage = backgroundImage ? getAssetUrl(backgroundImage) : undefined;
  const centered = align === "center";

  return (
    <section
      className="pt-3 md:pt-4"
      style={{ backgroundColor: "var(--enk-bg)" }}
      aria-label={badge || "Introduction"}
    >
      <div className="mx-auto max-w-[1440px] px-3 md:px-5">
        <div className="relative isolate overflow-hidden rounded-[16px]" style={{ backgroundColor: "var(--enk-navy)" }}>
          {resolvedImage && (
            <img
              src={resolvedImage}
              alt=""
              aria-hidden="true"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          )}
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{ background: "linear-gradient(to top, rgba(11,19,30,0.45) 0%, rgba(11,19,30,0.12) 45%, rgba(11,19,30,0.2) 100%)" }}
          />

          <div className={`relative flex ${minH[size]} items-center px-4 py-10 md:px-10 md:py-14 ${centered ? "justify-center" : ""}`}>
            <div
              className={`max-w-xl rounded-[12px] p-6 md:p-8 ${centered ? "text-center" : ""}`}
              style={{ backgroundColor: "rgba(16,27,42,0.78)" }}
            >
              <h1 className="text-white">{title}</h1>

              {subtitle && (
                <p className="mt-3 text-[15px] leading-relaxed text-white/80">
                  {subtitle}
                </p>
              )}

              {(primaryCTA || secondaryCTA) && (
                <div
                  className={`mt-6 flex flex-col gap-3 sm:flex-row sm:items-center ${
                    centered ? "sm:justify-center" : ""
                  }`}
                >
                  {primaryCTA && (
                    <Link to={primaryCTA.href} className="enk-btn enk-btn--gold">
                      {primaryCTA.label}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  )}
                  {secondaryCTA && (
                    <Link to={secondaryCTA.href} className="enk-btn enk-btn--on-dark">
                      {secondaryCTA.label}
                    </Link>
                  )}
                </div>
              )}

              {trustStrip && <div className="mt-8">{trustStrip}</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
