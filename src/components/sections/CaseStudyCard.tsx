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

      <div className="flex flex-1 flex-col p-6" style={{ backgroundColor: "var(--enk-navy)" }}>
        <div className="mb-2 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--enk-on-dark-muted)]">
          <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
          <span>{location}</span>
        </div>

        <h3 className="text-[17px] font-semibold leading-snug text-[var(--enk-on-dark)] line-clamp-2">
          {title}
        </h3>

        {metric && metricLabel && (
          <dl className="mt-2 flex flex-wrap items-baseline gap-1.5">
            <dt
              className="font-mono text-[11px] uppercase tracking-[0.12em]"
              style={{ color: "var(--enk-gold)" }}
            >
              {metricLabel}
            </dt>
            <dd className="text-[13.5px] font-medium text-[var(--enk-on-dark)]">{metric}</dd>
          </dl>
        )}

        <span
          className="mt-5 inline-flex items-center gap-2 text-[13.5px] font-semibold"
          style={{ color: "var(--enk-gold)" }}
        >
          Full Case Study
          <ArrowRight
            className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
