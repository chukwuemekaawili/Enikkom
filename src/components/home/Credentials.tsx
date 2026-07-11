import { clientLogos } from "@/content/home";

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

/**
 * Client strip — one quiet marquee row of the best-known operator and EPC
 * marks with a one-line heading. The full stakeholder story lives on
 * /partners; the homepage only needs the signal.
 */
export function Credentials() {
  const logos = clientLogos.slice(0, 10);

  return (
    <section aria-labelledby="credentials-heading" className="enk-section--tight">
      <div className="enk-container">
        <p
          id="credentials-heading"
          className="text-center text-[14px] font-bold text-[var(--enk-steel)]"
        >
          Trusted by Nigeria's operators and EPC partners
        </p>
      </div>

      <div className="mt-6">
        <div className="enk-marquee-mask overflow-hidden py-1">
          <div className="enk-marquee">
            {logos.map((l) => (
              <LogoCard key={`a-${l.slug}`} logo={l} />
            ))}
            {logos.map((l) => (
              <LogoCard key={`b-${l.slug}`} logo={l} hidden />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
