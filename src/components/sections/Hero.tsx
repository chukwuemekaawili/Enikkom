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
 * Page hero, in the `.enk` design language, matches the homepage chrome so the
 * sticky header melts into the dark hero. Same prop API as before (drop-in).
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
  const pad = {
    small: "py-16 md:py-20",
    default: "py-20 md:py-28",
    large: "py-24 md:py-36",
  };

  const resolvedImage = backgroundImage ? getAssetUrl(backgroundImage) : undefined;
  const centered = align === "center";

  return (
    <section
      className="relative isolate overflow-hidden"
      style={{ backgroundColor: "var(--enk-navy)" }}
      aria-label={badge || "Introduction"}
    >
      {resolvedImage && (
        <img
          src={resolvedImage}
          alt=""
          aria-hidden="true"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      )}
      <div className="enk-scrim" aria-hidden="true" />

      <div className="enk-container relative">
        <div className={`${pad[size]} ${centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}`}>
          <p className={`enk-kicker enk-kicker--on-dark mb-6 ${centered ? "justify-center" : ""}`}>
            {badge || "Engineering delivery"}
          </p>

          <h1 className="enk-display text-[var(--enk-on-dark)] text-[clamp(2rem,5vw,3.5rem)]">
            {title}
          </h1>

          {subtitle && (
            <p
              className={`mt-6 text-[17px] leading-relaxed text-[var(--enk-on-dark-muted)] md:text-[18px] ${
                centered ? "mx-auto max-w-2xl" : "max-w-xl"
              }`}
            >
              {subtitle}
            </p>
          )}

          {(primaryCTA || secondaryCTA) && (
            <div
              className={`mt-9 flex flex-col gap-3 sm:flex-row sm:items-center ${
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

          {trustStrip && <div className="mt-12">{trustStrip}</div>}
        </div>
      </div>
    </section>
  );
}
