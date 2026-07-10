import { currentProjectImage } from "@/content/siteImageSelections";
import { ProjectRecordCard } from "@/components/records";

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

/**
 * Legacy alias — renders the canonical ProjectRecordCard so every project
 * reference sitewide shares one filed-record treatment.
 */
export function CaseStudyCard({
  title,
  client,
  location,
  metric,
  metricLabel,
  thumbnail,
  tags,
  href,
  year,
}: CaseStudyCardProps) {
  return (
    <ProjectRecordCard
      title={title}
      href={href}
      client={client}
      location={location}
      metric={metric}
      metricLabel={metricLabel}
      year={year}
      thumbnail={thumbnail || currentProjectImage("hdd-night-panorama-cropped.jpg")}
      tags={tags}
    />
  );
}
