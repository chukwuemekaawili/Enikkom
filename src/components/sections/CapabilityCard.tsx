import { Link } from "react-router-dom";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { EnhancedImage } from "@/components/ui/enhanced-image";

interface CapabilityCardProps {
  title: string;
  description: string;
  href: string;
  icon?: LucideIcon;
  image?: string;
  /** Legacy scope descriptor — accepted for compatibility, no longer rendered. */
  metric?: string;
  ctaLabel?: string;
  /** Legacy typed-header label — accepted for compatibility, no longer rendered. */
  docType?: string;
  index?: number;
}

/**
 * Capability as a Shell-style tile: rounded image, bold title, one
 * sentence, "Read more →" bottom-right. Same prop API as before.
 */
export function CapabilityCard({
  title,
  description,
  href,
  image,
  ctaLabel = "Read more",
}: CapabilityCardProps) {
  return (
    <Link
      to={href}
      className="enk-card enk-card--hover group flex h-full flex-col p-2 focus-ring"
    >
      {image && (
        <div className="relative aspect-[16/9] overflow-hidden rounded-[10px]">
          <EnhancedImage
            src={image}
            alt={title}
            wrapperClassName="h-full w-full"
            loading="lazy"
            sizes="(min-width: 1300px) 405px, (min-width: 768px) 33vw, 100vw"
            fallbackLabel={title}
          />
        </div>
      )}

      <div className="flex flex-1 flex-col px-4 pb-4 pt-5">
        <h3 className="text-[17px] font-bold leading-snug text-[var(--enk-ink)]">{title}</h3>
        <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-[var(--enk-steel)]">
          {description}
        </p>

        <span className="enk-readmore mt-auto justify-end pt-5">
          {ctaLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
