import { Link } from "react-router-dom";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface CapabilityCardProps {
  title: string;
  description: string;
  href: string;
  icon?: LucideIcon;
  image?: string;
  metric?: string;
  ctaLabel?: string;
  index?: number;
}

/** Capability / service card, in the `.enk` design language. */
export function CapabilityCard({
  title,
  description,
  href,
  image,
  metric,
  ctaLabel = "View Details",
}: CapabilityCardProps) {
  return (
    <Link
      to={href}
      className="enk-card enk-card--hover group flex h-full flex-col overflow-hidden focus-ring"
    >
      {image && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(0deg, oklch(0.13 0.03 255 / 0.55), transparent 55%)" }}
            aria-hidden="true"
          />
          {metric && (
            <span className="enk-chip enk-chip--on-dark absolute left-4 top-4">
              {metric}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col p-6" style={{ backgroundColor: "var(--enk-surface-card)" }}>
        <h3 className="text-[18px] font-bold leading-snug text-[var(--enk-on-dark)]">{title}</h3>
        <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-[var(--enk-on-dark-muted)] line-clamp-3">
          {description}
        </p>
        <span className="enk-readmore mt-5">
          {ctaLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
