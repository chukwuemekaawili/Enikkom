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
 * track-record figures (years, kilometres installed, workforce) with the
 * operator / EPC logo wall, so the at-a-glance credibility signals live in
 * one scannable section. Each block carries its own label: the figures read
 * as "proven track record", the logo wall as "selected clients & partners".
 * (Certification badges and the safety figures — safe man-hours, LTI record —
 * live only in the QHSE section; this band does not repeat them.)
 */
export function TrustSnapshot() {
  const mid = Math.ceil(clientLogos.length / 2);
  const rowA = clientLogos.slice(0, mid);
  const rowB = clientLogos.slice(mid);

  return (
    <section
      aria-label="Track record, clients and partners"
      className="enk-panel"
    >
      {/* One unified credibility band: a single context line, the headline
          figures, then the operator/EPC logos, read as one compact strip,
          not stacked credibility blocks. */}
      <div className="enk-container pt-10 md:pt-12">
        <p className="enk-kicker mb-6 justify-center text-center">
          Proven track record
        </p>
        <dl className="mx-auto grid max-w-3xl grid-cols-1 gap-y-5 min-[500px]:grid-cols-3 min-[500px]:gap-x-8 sm:gap-x-12">
          {kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label} className="flex min-w-0 items-start gap-4 border-l-2 pl-4 min-[500px]:flex-col min-[500px]:gap-0" style={{ borderColor: "var(--enk-line-strong)" }}>
              <dd className="shrink-0 text-[var(--enk-ink)] min-[500px]:shrink">
                <StatValue value={kpi.value} numberClassName="block text-[clamp(1.6rem,4vw,2.2rem)] text-[var(--enk-ink)]" />
              </dd>
              <dt className="mt-0 text-[13px] leading-snug text-[var(--enk-steel)] min-[500px]:mt-1.5 min-[500px]:text-[12.5px]">{kpi.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      <div className="pb-10 pt-8 mt-6 md:mt-2 md:pt-9 border-t" style={{ borderColor: "var(--enk-line-strong)" }}>
        <p className="enk-kicker mb-6 justify-center text-center">
          Selected clients, partners, and project stakeholders
        </p>
        <div className="flex flex-col gap-2.5">
          <MarqueeRow logos={rowA} />
          <MarqueeRow logos={rowB} reverse />
        </div>
      </div>
    </section>
  );
}
