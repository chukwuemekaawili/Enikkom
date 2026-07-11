import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { EnhancedImage } from "@/components/ui/enhanced-image";
import { cn } from "@/lib/utils";

interface ProjectRecordCardProps {
  title: string;
  /** Detail-page route. Omit when no detail file is published — the card
      then renders as a non-interactive summary with a neutral status line. */
  href?: string;
  location?: string;
  /** Key figure, e.g. `16" × 3.1km` — folded into the summary line */
  metric?: string;
  /** Technical descriptor, e.g. "Africa's Longest Single Drill" */
  metricLabel?: string;
  client?: string;
  year?: string;
  thumbnail?: string;
  tags?: string[];
  className?: string;
}

/**
 * A completed project as a Shell-style tile: rounded image, bold title,
 * one summary sentence, a quiet meta line, "Read more →" bottom-right.
 */
export function ProjectRecordCard({
  title,
  href,
  location,
  metric,
  metricLabel,
  client,
  year,
  thumbnail,
  tags = [],
  className,
}: ProjectRecordCardProps) {
  const summary = [metricLabel, metric && !title.includes(metric) ? metric : null]
    .filter(Boolean)
    .join(" — ");
  const meta = [client, location, year].filter(Boolean).join(" · ");
  const hasDetail = Boolean(href);

  const body = (
    <>
      {thumbnail && (
        <div className="relative aspect-[16/9] overflow-hidden rounded-[10px]">
          <EnhancedImage
            src={thumbnail}
            alt={title}
            wrapperClassName="h-full w-full"
            loading="lazy"
            fallbackLabel={title}
          />
        </div>
      )}

      <div className="flex flex-1 flex-col px-4 pb-4 pt-5">
        <h3 className="text-[17px] font-bold leading-snug text-[var(--enk-ink)]">{title}</h3>
        {summary && (
          <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--enk-steel)]">{summary}</p>
        )}
        {meta && (
          <p className="mt-2 text-[12.5px] text-[var(--enk-meta)]">{meta}</p>
        )}

        {hasDetail ? (
          <span className="enk-readmore mt-auto justify-end pt-5">
            Read more
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        ) : (
          <span className="mt-auto pt-5 text-right text-[12.5px] text-[var(--enk-blueprint)]">
            Detail file not published
          </span>
        )}
      </div>
    </>
  );

  if (!hasDetail) {
    return (
      <div className={cn("enk-card flex h-full flex-col p-2", className)}>
        {body}
      </div>
    );
  }

  return (
    <Link
      to={href!}
      className={cn("enk-card enk-card--hover group flex h-full flex-col p-2 focus-ring", className)}
    >
      {body}
    </Link>
  );
}
