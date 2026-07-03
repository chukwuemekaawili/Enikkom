import { Link } from "react-router-dom";
import { FileText, Layers, FolderOpen } from "lucide-react";

/** Shell-style quick-links ("How can we help?"), mapped to existing routes. */
const quickLinks = [
  { label: "Request assessment", href: "/contact", Icon: FileText },
  { label: "Our capabilities", href: "/capabilities", Icon: Layers },
  { label: "View project records", href: "/projects", Icon: FolderOpen },
];

/** The single final CTA band, strong headline, conversion copy, fast path. */
export function FinalCta() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--enk-navy)" }}
      aria-label="How can we help?"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        aria-hidden="true"
        style={{ background: "radial-gradient(60% 120% at 85% 0%, oklch(0.50 0.14 252 / 0.35), transparent 70%)" }}
      />
      <div className="enk-container relative enk-section">
        <div className="max-w-3xl">
          {/* Quick links — Shell "How can we help?" pattern, recoloured blue */}
          <div>
            <p className="text-[13px] font-bold text-[var(--enk-on-dark-muted)]">How can we help?</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {quickLinks.map(({ label, href, Icon }) => (
                <Link key={label} to={href} className="enk-quicklink focus-ring">
                  <Icon className="h-6 w-6" fill="currentColor" aria-hidden="true" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
