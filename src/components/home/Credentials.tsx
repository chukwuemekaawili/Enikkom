import { clientLogos } from "@/content/home";
import { RecordEyebrow } from "@/components/records";

type Logo = { slug: string; src: string };

function LogoCard({ logo, hidden = false }: { logo: Logo; hidden?: boolean }) {
  return (
    <div className="enk-logo-card" aria-hidden={hidden || undefined}>
      <img
        src={logo.src}
        alt={hidden ? "" : `${logo.slug.replace(/-/g, " ")} logo`}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

/** One seamless marquee row: real set + an aria-hidden duplicate for the loop. */
function MarqueeRow({ logos, reverse = false }: { logos: Logo[]; reverse?: boolean }) {
  return (
    <div className="enk-marquee-mask overflow-hidden py-1">
      <div className={`enk-marquee ${reverse ? "enk-marquee--reverse" : ""}`}>
        {logos.map((l) => (
          <LogoCard key={`a-${l.slug}`} logo={l} />
        ))}
        {logos.map((l) => (
          <LogoCard key={`b-${l.slug}`} logo={l} hidden />
        ))}
      </div>
    </div>
  );
}

/**
 * Procurement & delivery history — the operator / EPC / stakeholder record,
 * framed as a credential ledger rather than a SaaS "trusted by" strip. The
 * light logo tiles are the only light surfaces on the page (brand recognition
 * is itself a trust signal), held under a typed record header.
 */
export function Credentials() {
  const mid = Math.ceil(clientLogos.length / 2);
  const rowA = clientLogos.slice(0, mid);
  const rowB = clientLogos.slice(mid);

  return (
    <section
      aria-labelledby="credentials-heading"
      className="enk-section"
      style={{ borderBottom: "1px solid var(--enk-rule)" }}
    >
      <div className="enk-container">
        <div className="max-w-2xl">
          <RecordEyebrow refNo={`${clientLogos.length} ON RECORD`}>Procurement &amp; Delivery History</RecordEyebrow>
          <h2 id="credentials-heading" className="enk-display mt-4 text-[clamp(1.5rem,2.8vw,2rem)] text-[var(--enk-ink)]">
            Selected operators, EPCs, and infrastructure stakeholders
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[var(--enk-steel)] md:text-[15px]">
            Project stakeholders on record — operators, national oil companies, and EPC
            contractors Enikkom has delivered crossings and pipeline works for.
          </p>
        </div>
      </div>

      <div className="mt-9 flex flex-col gap-2.5">
        <MarqueeRow logos={rowA} />
        <MarqueeRow logos={rowB} reverse />
      </div>
    </section>
  );
}
