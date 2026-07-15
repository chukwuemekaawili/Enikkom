import { Link } from "react-router-dom";
import { ArrowRight, Mail, FolderOpen, FileText, type LucideIcon } from "lucide-react";
import { contact } from "@/content/home";

/**
 * How can we help? — three procurement routes as the site's own white tiles
 * (same card language as the capability tiles): blue stroke icon, bold
 * sentence-case title, one line, "action →" bottom-right. Sits on a full
 * brand-blue band — the one saturated color moment between the dark hero
 * and the navy footer (the Shell CTA-band pattern), so the long light
 * midsection has an anchor and the tiles pop as the page's clearest CTAs.
 */
const routes: {
  icon: LucideIcon;
  title: string;
  body: string;
  action: string;
  href: string;
  external?: boolean;
}[] = [
  {
    icon: Mail,
    title: "Send an RFQ or tender",
    body: "Alignment sheets, drawings or bid documents go straight to the engineering team.",
    action: "Contact us",
    href: "/contact",
  },
  {
    icon: FolderOpen,
    title: "View the project register",
    body: "Delivered crossings and pipeline scopes, with clients and measurable outcomes.",
    action: "View register",
    href: "/projects#record",
  },
  {
    icon: FileText,
    title: "Capability statement",
    body: "Procurement-ready company profile covering scopes, equipment spreads and QHSE.",
    action: "Download PDF",
    href: contact.capabilityStatement,
    external: true,
  },
];

function RouteTile({ route }: { route: (typeof routes)[number] }) {
  const Icon = route.icon;
  const tileClass = "enk-card enk-card--hover group flex h-full flex-col p-6 focus-ring";

  const inner = (
    <>
      <Icon className="h-6 w-6 text-[var(--enk-accent-primary)]" strokeWidth={1.75} aria-hidden="true" />
      <h3 className="mt-4 text-[17px] font-bold leading-snug text-[var(--enk-ink)]">{route.title}</h3>
      <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-[var(--enk-steel)]">{route.body}</p>
      <span className="enk-readmore mt-auto justify-end pt-5">
        {route.action}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </>
  );

  return route.external ? (
    <a href={route.href} target="_blank" rel="noopener noreferrer" className={tileClass}>
      {inner}
    </a>
  ) : (
    <Link to={route.href} className={tileClass}>
      {inner}
    </Link>
  );
}

export function QuickActions() {
  return (
    <section
      aria-labelledby="quickactions-heading"
      className="enk-section"
      style={{ backgroundColor: "var(--enk-accent-primary)" }}
    >
      <div className="enk-container">
        <h2 id="quickactions-heading" className="text-white">
          How can we help?
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {routes.map((r) => (
            <RouteTile key={r.title} route={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
