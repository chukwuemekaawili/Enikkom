import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { getAssetUrl } from "@/lib/assetMap";
import { RecordEyebrow } from "@/components/records";

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
 * Page hero as an archive cover sheet: full-bleed field photo under a scrim,
 * typed record eyebrow, engineered headline, procurement CTAs, and a heavy
 * title-block rule at the base. Same prop API as before (drop-in).
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
    small: "py-14 md:py-18",
    default: "py-16 md:py-24",
    large: "py-20 md:py-28",
  };

  const resolvedImage = backgroundImage ? getAssetUrl(backgroundImage) : undefined;
  const centered = align === "center";

  return (
    <section
      className="relative isolate overflow-hidden"
      style={{
        backgroundColor: "var(--enk-navy)",
        borderBottom: "2px solid var(--enk-rule-accent)",
      }}
      aria-label={badge || "Introduction"}
    >
      {resolvedImage && (
        <img
          src={resolvedImage}
          alt=""
          aria-hidden="true"
          decoding="async"
          className="enk-photo--hero absolute inset-0 h-full w-full object-cover object-center"
        />
      )}
      <div className="enk-scrim" aria-hidden="true" />

      <div className="enk-container relative">
        <div className={`${pad[size]} ${centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}`}>
          <RecordEyebrow align={centered ? "center" : "start"} className="mb-5">
            {badge || "Field Operations Record"}
          </RecordEyebrow>

          <h1 className="enk-display text-[var(--enk-on-dark)] text-[clamp(1.9rem,4.5vw,3.1rem)]">
            {title}
          </h1>

          {subtitle && (
            <p
              className={`mt-5 text-[15px] leading-relaxed text-[var(--enk-on-dark-muted)] md:text-[16px] ${
                centered ? "mx-auto max-w-2xl" : "max-w-xl"
              }`}
            >
              {subtitle}
            </p>
          )}

          {(primaryCTA || secondaryCTA) && (
            <div
              className={`mt-8 flex flex-col gap-3 sm:flex-row sm:items-center ${
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

          {trustStrip && <div className="mt-10">{trustStrip}</div>}
        </div>
      </div>
    </section>
  );
}
