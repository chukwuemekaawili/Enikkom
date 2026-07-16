import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { EnhancedImage } from "@/components/ui/enhanced-image";
import { selectedGeneralImage, selectedEquipmentImage } from "@/content/siteImageSelections";

const items = [
  {
    title: "Safety & quality",
    body: "Certified to three ISO standards, with HSE embedded across every project.",
    href: "/hse-quality",
    image: selectedGeneralImage("rg-031.jpg"),
    imageAlt: "Site crew in PPE working around drilling support equipment under a clear sky.",
  },
  {
    title: "Equipment & fleet",
    body: "The HDD rigs, marine plant and pipeline spreads behind every crossing we deliver.",
    href: "/equipment",
    image: selectedEquipmentImage("eq-030.jpg"),
    imageAlt: "Crawler crane lifting an Enikkom container on a palm-lined project site.",
  },
  {
    title: "About Enikkom",
    body: "An indigenous EPC contractor delivering projects across Nigeria since 1995.",
    href: "/about",
    image: selectedGeneralImage("pl-13.jpg"),
    imageAlt: "Two Enikkom engineers inspecting a large-diameter pipe section in the field.",
  },
] as const;

/**
 * You may also be interested in — Shell's closing row: three image link
 * cards routing deeper into the site. Absorbs the old QHSE and field-ops
 * homepage sections (their detail lives on the destination pages).
 */
export function MoreAtEnikkom() {
  return (
    <section
      aria-labelledby="more-heading"
      className="enk-section"
      style={{ backgroundColor: "var(--enk-bg-muted)" }}
    >
      <div className="enk-container">
        <h2 id="more-heading" className="text-[var(--enk-ink)]">
          You may also be interested in
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="enk-card enk-card--hover group flex h-full flex-col p-2 focus-ring"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-[10px]">
                <EnhancedImage
                  src={item.image}
                  alt={item.imageAlt}
                  wrapperClassName="h-full w-full"
                  loading="lazy"
                  sizes="(min-width: 1300px) 405px, (min-width: 768px) 33vw, 100vw"
                  fallbackLabel={item.title}
                />
              </div>
              <div className="flex flex-1 flex-col px-4 pb-4 pt-5">
                <h3 className="text-[18px] font-bold leading-snug text-[var(--enk-ink)]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-[var(--enk-steel)]">{item.body}</p>
                <span className="enk-readmore mt-auto justify-end pt-6">
                  Read more
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
