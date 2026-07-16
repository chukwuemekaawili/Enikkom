import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { capabilities, type Capability } from "@/content/home";
import { EnhancedImage } from "@/components/ui/enhanced-image";

/**
 * What we do — simple Shell-style tiles: rounded image, title, one
 * sentence, "Read more →". No discipline codes, no scope blocks.
 */
function CapabilityTile({ cap }: { cap: Capability }) {
  return (
    <Link
      to={cap.href}
      className="enk-card enk-card--hover group flex h-full flex-col p-2 focus-ring"
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-[10px]">
        <EnhancedImage
          src={cap.image}
          alt={cap.imageAlt}
          wrapperClassName="h-full w-full"
          loading="lazy"
          sizes="(min-width: 1300px) 405px, (min-width: 768px) 33vw, 100vw"
          fallbackLabel={cap.name}
        />
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-5">
        <h3 className="text-[18px] font-bold leading-snug text-[var(--enk-ink)]">{cap.name}</h3>
        <p className="mt-2.5 text-[14px] leading-relaxed text-[var(--enk-steel)]">{cap.proof}</p>
        <span className="enk-readmore mt-auto justify-end pt-6">
          Read more
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export function Capabilities() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="enk-section"
      style={{ backgroundColor: "var(--enk-bg-muted)" }}
    >
      <div className="enk-container">
        <h2 id="capabilities-heading" className="text-[var(--enk-ink)]">
          What we do
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap) => (
            <CapabilityTile key={cap.key} cap={cap} />
          ))}
        </div>
      </div>
    </section>
  );
}
