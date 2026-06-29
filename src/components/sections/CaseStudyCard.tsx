import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { currentProjectImage } from "@/content/siteImageSelections";

interface CaseStudyCardProps {
  title: string;
  client?: string;
  location: string;
  metric?: string;
  metricLabel?: string;
  thumbnail?: string;
  tags: string[];
  href: string;
  year?: string;
  index?: number;
}

/** Project / case-study card, in the `.enk` design language. */
export function CaseStudyCard({
  title,
  location,
  metric,
  metricLabel,
  thumbnail,
  tags,
  href,
  year,
}: CaseStudyCardProps) {
  const resolvedThumbnail = thumbnail || currentProjectImage("hdd-night-panorama-cropped.jpg");

  return (
    <Link
      to={href}
      className="enk-card enk-card--hover group flex h-full flex-col overflow-hidden focus-ring"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={resolvedThumbnail}
          alt={title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, oklch(0.13 0.03 255 / 0.5), transparent 55%)" }}
          aria-hidden="true"
        />
        {(year || tags.length > 0) && (
          <span className="enk-chip enk-chip--on-dark absolute left-4 top-4">{year || tags[0]}</span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6" style={{ backgroundColor: "var(--enk-surface-card)" }}>
        <div className="mb-2 flex items-center gap-1.5 text-[12px] font-semibold text-[var(--enk-on-dark-muted)]">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{location}</span>
        </div>

        <h3 className="text-[17px] font-bold leading-snug text-[var(--enk-on-dark)] line-clamp-2">
          {title}
        </h3>

        {metric && metricLabel && (
          <dl className="mt-2 flex flex-wrap items-baseline gap-1.5">
            <dt className="text-[12px] font-bold text-[var(--enk-accent-on-dark)]">
              {metricLabel}
            </dt>
            <dd className="text-[14px] font-medium text-[var(--enk-on-dark)]">{metric}</dd>
          </dl>
        )}

        <span className="enk-readmore mt-5">
          Full Case Study
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
