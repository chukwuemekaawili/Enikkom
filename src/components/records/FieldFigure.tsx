import type { ReactNode } from "react";
import { EnhancedImage } from "@/components/ui/enhanced-image";
import { cn } from "@/lib/utils";

interface FieldFigureProps {
  /** Image source — resolved through the site's responsive-image pipeline */
  src?: string;
  alt?: string;
  /** Custom media node (e.g. a pre-configured EnhancedImage or video); overrides src */
  children?: ReactNode;
  /** Typed caption text, e.g. "Rig-up at exit point, 48in crossing" */
  caption?: ReactNode;
  /** Plate number, e.g. "FIG 04" — rendered mono amber before the caption */
  figNo?: string;
  /** Location annotation, e.g. "Bonny Island, Rivers State" */
  location?: string;
  /** Date annotation, e.g. "2022" or "MAR 2022" */
  date?: string;
  /** CSS aspect-ratio for the media frame, e.g. "16/9", "4/3" */
  ratio?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imgClassName?: string;
}

/**
 * Field photograph presented as a documentation plate: hairline frame,
 * documentary photo grade, and a caption strip with plate number and
 * mono location/date annotation.
 */
export function FieldFigure({
  src,
  alt = "",
  children,
  caption,
  figNo,
  location,
  date,
  ratio = "16/9",
  priority,
  sizes,
  className,
  imgClassName,
}: FieldFigureProps) {
  const annotation = [location, date].filter(Boolean).join(" · ");
  const hasCaptionStrip = Boolean(caption || figNo || annotation);

  return (
    <figure className={cn("enk-figure", className)}>
      <div className="enk-figure__media" style={{ aspectRatio: ratio }}>
        {children ?? (
          <EnhancedImage
            src={src}
            alt={alt}
            tone="documentary"
            priority={priority}
            sizes={sizes}
            wrapperClassName="h-full w-full"
            className={imgClassName}
          />
        )}
      </div>
      {hasCaptionStrip && (
        <figcaption className="enk-figure__caption">
          <span className="enk-figure__text">
            {figNo && <span className="enk-figure__no">{figNo}</span>}
            {caption}
          </span>
          {annotation && <span className="enk-figure__loc">{annotation}</span>}
        </figcaption>
      )}
    </figure>
  );
}
