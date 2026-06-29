import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { capabilities } from "@/content/home";
import { SectionHeading } from "./SectionHeading";

/** Core capabilities. Photo-led cards: real site imagery + proof, not icons. */
export function Capabilities() {
  return (
    <section id="capabilities" className="enk-section">
      <div className="enk-container">
        <SectionHeading
          kicker="Capabilities"
          title="Core disciplines for complex energy infrastructure"
          intro="Specialist crossing, pipeline and marine scopes for oil & gas operators and EPC partners across Nigeria."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap) => (
            <Link
              key={cap.key}
              to={cap.href}
              className="enk-card enk-card--hover group flex flex-col overflow-hidden focus-ring"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={cap.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6" style={{ backgroundColor: "var(--enk-navy)" }}>
                <h3 className="text-[17px] font-semibold leading-snug text-[var(--enk-on-dark)]">{cap.name}</h3>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-[var(--enk-on-dark-muted)]">{cap.proof}</p>
                <span className="enk-readmore mt-5">
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
