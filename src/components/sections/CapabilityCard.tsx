import { Link } from "react-router-dom";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { EnhancedImage } from "@/components/ui/enhanced-image";

interface CapabilityCardProps {
  title: string;
  description: string;
  href: string;
  icon?: LucideIcon;
  image?: string;
  /** Short scope descriptor, e.g. "Long-distance trenchless crossings" */
  metric?: string;
  ctaLabel?: string;
  /** Typed header label, e.g. "Capability Statement" */
  docType?: string;
  index?: number;
}

/**
 * Capability presented as a filed capability statement: typed header row,
 * documentary photo plate, scope line, mono action. Squared, ruled — the
 * border sharpens on hover, no lift, no zoom.
 */
export function CapabilityCard({
  title,
  description,
  href,
  image,
  metric,
  ctaLabel = "View capability",
  docType = "Capability Statement",
  index,
}: CapabilityCardProps) {
  return (
    <Link
      to={href}
      className="enk-doc-card enk-doc-card--interactive group flex h-full flex-col overflow-hidden focus-ring"
    >
      {/* Typed header row */}
      <div className="flex min-h-[38px] items-center justify-between gap-3 border-b border-[var(--enk-rule)] px-4 py-1.5">
        <p className="enk-overline !text-[10px]">{docType}</p>
        {typeof index === "number" && (
          <span className="enk-mono text-[11px] font-medium text-[var(--enk-blueprint)]">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>

      {image && (
        <div className="relative aspect-[16/9] overflow-hidden border-b border-[var(--enk-rule)]">
          <EnhancedImage
            src={image}
            alt={title}
            tone="documentary"
            wrapperClassName="h-full w-full"
            loading="lazy"
            fallbackLabel={title}
          />
        </div>
      )}

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3.5">
        <h3 className="font-heading text-[16px] font-semibold leading-snug text-[var(--enk-ink)]">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-[12.5px] leading-[1.55] text-[var(--enk-steel)]">
          {description}
        </p>

        {metric && (
          <div className="mt-3.5 border-t border-[var(--enk-rule)] pt-3">
            <p className="enk-overline !text-[10px]">Scope</p>
            <p className="mt-1.5 text-[12px] leading-[1.5] text-[var(--enk-blueprint)]">{metric}</p>
          </div>
        )}

        <span className="enk-mono mt-auto flex items-center gap-1.5 border-t border-[var(--enk-rule)] pt-3.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--enk-accent-on-dark)] transition-colors group-hover:text-[var(--enk-accent-primary-on-dark)]">
          {ctaLabel}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
