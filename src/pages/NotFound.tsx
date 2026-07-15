import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout";
import SEO from "@/components/ui/SEO";
import { ArrowRight } from "lucide-react";
import { RecordStatusStamp } from "@/components/records";

const quickLinks = [
  { label: "Capabilities", href: "/capabilities" },
  { label: "Project Records", href: "/projects" },
  { label: "Company", href: "/about" },
  { label: "QHSE", href: "/hse-quality" },
  { label: "Contact", href: "/contact" },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <SEO title="Page Not Found – Enikkom" noindex />
      <section className="enk-section flex min-h-[60vh] items-center justify-center">
        <div className="enk-container">
          <div className="enk-doc-card mx-auto max-w-xl p-8 text-center md:p-10">
            <div className="flex items-center justify-center gap-3">
              <p className="enk-overline">File Reference</p>
              <span className="enk-mono text-[13px] font-semibold text-[var(--enk-blueprint)]">
                ERR-404
              </span>
            </div>

            <p className="enk-mono mt-6 text-[72px] font-semibold leading-none text-[var(--enk-rule-heavy)] md:text-[96px]">
              404
            </p>

            <div className="mt-5 flex justify-center">
              <RecordStatusStamp tone="alert">Record Not Found</RecordStatusStamp>
            </div>

            <p className="mx-auto mt-5 max-w-md text-[14px] leading-6 text-[var(--enk-steel)]">
              The requested page is not in the file. It may have been moved, renamed, or never
              existed.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/" className="enk-btn enk-btn--gold">
                Return home
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/projects" className="enk-btn enk-btn--outline">
                View projects
              </Link>
            </div>

            <div className="mt-8 border-t pt-6" style={{ borderColor: "var(--enk-rule)" }}>
              <p className="enk-overline mb-3">Registry Index</p>
              <div className="flex flex-wrap justify-center gap-2">
                {quickLinks.map((link) => (
                  <Link key={link.href} to={link.href} className="enk-chip focus-ring transition-colors hover:border-[var(--enk-accent-on-dark)] hover:text-[var(--enk-ink)]">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
