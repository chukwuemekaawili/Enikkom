import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout";
import SEO from "@/components/ui/SEO";
import { CapabilityCard } from "@/components/sections";
import { Search as SearchIcon, ArrowRight, ChevronRight } from "lucide-react";
import { searchIndex, type SearchEntry } from "@/content/searchIndex";
import { siteImageSelections } from "@/content/siteImageSelections";

function matches(entry: SearchEntry, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    entry.title.toLowerCase().includes(q) ||
    entry.description.toLowerCase().includes(q) ||
    entry.category.toLowerCase().includes(q)
  );
}

function breadcrumb(href: string) {
  return `enikkom.com${href === "/" ? "" : href}`;
}

const popularSearches = [
  { label: "Capabilities", href: "/capabilities" },
  { label: "Projects", href: "/projects" },
  { label: "Careers", href: "/careers" },
  { label: "Equipment", href: "/equipment" },
  { label: "Contact", href: "/contact" },
];

const featuredLinks = [
  {
    title: "Careers",
    description: "Open roles and working life at Enikkom and HDDTEC.",
    href: "/careers",
    image: siteImageSelections.careers.hero,
    ctaLabel: "View Careers",
  },
  {
    title: "Resources",
    description: "Capability statement, certifications and compliance policy downloads.",
    href: "/resources",
    image: siteImageSelections.resources.hero,
    ctaLabel: "Browse Resources",
  },
];

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const initialQuery = params.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(params.get("q") ?? "");
  }, [params]);

  const trimmed = query.trim();
  const results = useMemo(
    () => (trimmed ? searchIndex.filter((entry) => matches(entry, trimmed)) : []),
    [trimmed]
  );

  return (
    <Layout>
      <SEO title="Search – Enikkom" canonical="/search" noindex />
      <section className="relative isolate overflow-hidden" style={{ backgroundColor: "var(--enk-bg-muted)", borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container relative py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[13px] text-[var(--enk-steel)]">
            <Link to="/" className="transition-colors hover:text-[var(--enk-ink)]">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-[var(--enk-ink)]">Search</span>
          </nav>

          <h1 className="enk-display mb-8 text-[var(--enk-ink)]">
            Search the site
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setParams(trimmed ? { q: trimmed } : {});
            }}
            className="flex max-w-2xl items-stretch gap-3"
          >
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pages, capabilities, projects..."
              autoFocus
              className="h-14 flex-1 rounded-md border border-[var(--enk-line-strong)] bg-white px-5 text-[16px] text-[var(--enk-ink)] placeholder:text-[var(--enk-meta)] focus-ring"
            />
            <button
              type="submit"
              aria-label="Search"
              className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-md text-white transition-colors focus-ring"
              style={{ backgroundColor: "var(--enk-accent-primary)" }}
            >
              <SearchIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </form>
        </div>
      </section>

      <section className="enk-section min-h-[40vh]" style={{ backgroundColor: "var(--enk-bg)" }}>
        <div className="enk-container">
          {!trimmed ? (
            <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
              <div>
                <h2 className="enk-kicker mb-4">Frequently visited</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {featuredLinks.map((item) => (
                    <CapabilityCard
                      key={item.href}
                      title={item.title}
                      description={item.description}
                      href={item.href}
                      image={item.image}
                      ctaLabel={item.ctaLabel}
                      docType="Site Index"
                    />
                  ))}
                </div>
              </div>

              <div>
                <h2 className="enk-kicker mb-4">Popular searches</h2>
                <ul className="space-y-3">
                  {popularSearches.map((item) => (
                    <li key={item.href}>
                      <Link to={item.href} className="enk-link text-[16px]">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <p className="text-[13.5px] text-muted-foreground mb-6">
                {`${results.length} result${results.length === 1 ? "" : "s"} found for "${trimmed}"`}
              </p>

              {results.length > 0 ? (
                <ul className="space-y-7">
                  {results.map((entry) => (
                    <li key={`${entry.category}-${entry.title}`}>
                      <Link to={entry.href} className="group block focus-ring rounded-md">
                        <p className="flex items-center gap-2 text-[12px] text-muted-foreground">
                          <span className="text-[12px] font-semibold text-primary">{entry.category}</span>
                          <span aria-hidden="true">&middot;</span>
                          <span>{breadcrumb(entry.href)}</span>
                        </p>
                        <h2 className="text-[18px] font-semibold text-primary group-hover:underline inline-flex items-center gap-1.5">
                          {entry.title}
                          <ArrowRight className="h-4 w-4 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" aria-hidden="true" />
                        </h2>
                        <p className="mt-1 text-[14px] text-muted-foreground leading-relaxed">{entry.description}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="rounded-[var(--enk-radius-record)] border border-dashed p-8 text-center" style={{ borderColor: "var(--enk-rule-strong)" }}>
                  <p className="font-semibold mb-1">No results for "{trimmed}"</p>
                  <p className="text-[14px] text-muted-foreground mb-4">Try a different term, or jump to one of these:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {[
                      { label: "Home", href: "/" },
                      { label: "Capabilities", href: "/capabilities" },
                      { label: "Projects", href: "/projects" },
                      { label: "Contact", href: "/contact" },
                    ].map((l) => (
                      <Link key={l.href} to={l.href} className="enk-chip">
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
