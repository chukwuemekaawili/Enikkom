import { EnhancedImage } from "@/components/ui/enhanced-image";
import { approvedClientBrands, approvedStrategicPartners } from "@/content/brandRegistry";

interface LogoMarqueeProps {
  variant?: "light" | "dark";
  showTitle?: boolean;
  /** Legacy prop, accepted for compatibility. */
  speed?: number;
}

/**
 * Client marks on the standard light registry tiles (.enk-logo-card), moved
 * by the shared CSS marquee — no drag physics, no hover lift. Same treatment
 * as the homepage Credentials strip so client proof reads identically sitewide.
 */
export function LogoMarquee({ showTitle = true }: LogoMarqueeProps) {
  // Duplicate logos for a seamless loop
  const duplicatedClients = [...approvedClientBrands, ...approvedClientBrands];

  return (
    <section className="enk-section overflow-hidden" style={{ backgroundColor: "var(--enk-bg-muted)" }}>
      {showTitle && (
        <div className="enk-container">
          <div className="mb-10 max-w-2xl">
            <p className="enk-kicker">Procurement &amp; Delivery History</p>
            <h2 className="enk-display mt-4 text-[clamp(1.5rem,2.8vw,2.05rem)] text-[var(--enk-ink)]">
              Trusted By Industry Leaders
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[var(--enk-steel)] md:text-[15px]">
              Partnering with Nigeria's leading oil &amp; gas operators for over 30 years.
            </p>
          </div>
        </div>
      )}

      <div className="enk-marquee-mask">
        <div className="enk-marquee py-1">
          {duplicatedClients.map((client, index) => (
            <div key={`${client.id}-${index}`} className="enk-logo-card" title={client.fullName}>
              <EnhancedImage
                src={client.logoSrc}
                alt={client.fullName}
                wrapperClassName={`h-full w-full bg-transparent ${client.imageWrapperClassName || ""}`}
                className={`h-full w-full ${client.imageClassName || ""}`}
                fit="contain"
                tone="logo"
                shimmer={false}
                sizes="120px"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Strategic partners */}
      <div className="enk-container mt-10">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <p className="enk-overline">Strategic Partners</p>
          {approvedStrategicPartners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center gap-2.5 rounded-[var(--enk-radius-record)] border px-3.5 py-2"
              style={{ borderColor: "var(--enk-rule-strong)", backgroundColor: "var(--enk-record-surface)" }}
            >
              {partner.logoSrc ? (
                <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-[2px] bg-white px-0.5">
                  <EnhancedImage
                    src={partner.logoSrc}
                    alt={partner.name}
                    wrapperClassName={`h-full w-full bg-transparent ${partner.imageWrapperClassName || ""}`}
                    className={`h-full w-full ${partner.imageClassName || ""}`}
                    fit="contain"
                    tone="logo"
                    shimmer={false}
                    sizes="56px"
                  />
                </div>
              ) : (
                <span className="enk-mono text-[11px] font-semibold text-[var(--enk-accent-on-dark)]">
                  {partner.badge}
                </span>
              )}
              <span className="text-[13px] font-semibold text-[var(--enk-ink)]">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
