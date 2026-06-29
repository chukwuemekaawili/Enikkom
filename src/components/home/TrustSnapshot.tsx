import { kpis, clientLogos } from "@/content/home";
import { StatValue } from "./Placeholder";

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
 * Trust snapshot, the single above-fold proof band. Combines the headline
 * track-record figures (years, kilometres, workforce, safe man-hours, LTI
 * record) with the operator / EPC logo wall, so all at-a-glance trust signals
 * live in one scannable section instead of two stacked bands.
 * (Certification badges live only in the QHSE section; safety metrics live
 * only here, QHSE no longer repeats them.)
 */
export function TrustSnapshot() {
  const mid = Math.ceil(clientLogos.length / 2);
  const rowA = clientLogos.slice(0, mid);
  const rowB = clientLogos.slice(mid);

  return (
    <section
      aria-label="Track record, clients and partners"
      className="border-y border-[var(--enk-line)]"
      style={{ backgroundColor: "var(--enk-bg-muted)" }}
    >
      {/* One unified credibility band: a single context line, the headline
          figures, then the operator/EPC logos, read as one compact strip,
          not stacked credibility blocks. */}
      <div className="enk-container pt-10 md:pt-12">
        <p className="enk-kicker mb-6 justify-center text-center">
          Trusted by Nigeria&apos;s major operators &amp; EPC partners
        </p>
        <dl className="mx-auto grid max-w-3xl grid-cols-3 gap-x-6 gap-y-6 sm:gap-x-12">
          {kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label} className="min-w-0 border-l-2 border-[var(--enk-blue)] pl-4">
              <dd className="text-[var(--enk-ink)]">
                <StatValue value={kpi.value} numberClassName="block text-[clamp(1.5rem,4vw,2.2rem)] text-[var(--enk-ink)]" />
              </dd>
              <dt className="mt-1.5 text-[12.5px] leading-snug text-[var(--enk-steel)]">{kpi.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      <div className="pb-10 pt-7">
        <div className="flex flex-col gap-2.5">
          <MarqueeRow logos={rowA} />
          <MarqueeRow logos={rowB} reverse />
        </div>
      </div>
    </section>
  );
}
