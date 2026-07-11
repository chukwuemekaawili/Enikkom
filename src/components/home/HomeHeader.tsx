import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { navMenus, brand, contact, type NavMenu, type NavLink } from "@/content/home";
import enikkomLogoWhite from "@/assets/images/logos/enikkom-logo-white-trimmed.png";

const hddtecLogo = brand.hddtecLogo;

/** Plain links that should stay visible without adding another dropdown. */
const extraLinks: NavLink[] = [
  { label: "Resources", href: "/resources" },
];

/**
 * Dual-brand lockup: one group (Enikkom, white-knockout) + the HDDTEC delivery
 * arm. The HDDTEC mark carries its own dark navy plate baked into the artwork,
 * so on the dark header it's seated on a light chip for legible contrast.
 */
function BrandLockup({ compact, onClick }: { compact: boolean; onClick?: () => void }) {
  // Equal co-brand lockup: Enikkom and HDDTEC at equal optical height on one
  // baseline, separated by a clean divider, [ Enikkom ] | [ HDDTEC ].
  // Logo art is tightly trimmed (no dead padding) so these heights map to the
  // actual mark — keep them generous enough that the wordmark stays legible.
  const h = compact ? 32 : 40;
  return (
    <Link
      to="/"
      onClick={onClick}
      title={brand.microcopy}
      aria-label={`Enikkom Construction and HDDTEC, home. ${brand.microcopy}`}
      className="flex shrink-0 items-center gap-3.5 rounded-sm focus-ring sm:gap-4"
    >
      <img src={enikkomLogoWhite} alt="Enikkom Construction Limited" style={{ height: h }} className="w-auto object-contain" />
      <span aria-hidden="true" style={{ height: h - 2 }} className="w-px bg-white/25" />
      <img src={hddtecLogo} alt="HDDTEC, Trenchless Operations" style={{ height: h }} className="w-auto object-contain" />
    </Link>
  );
}

function ItemLink({ item, onClick, className, children }: { item: NavLink; onClick?: () => void; className: string; children?: React.ReactNode }) {
  return item.external ? (
    <a href={item.href} onClick={onClick} className={className}>{children ?? item.label}</a>
  ) : (
    <Link to={item.href} onClick={onClick} className={className}>{children ?? item.label}</Link>
  );
}

/** Top-level nav label: sentence case, Shell-style, flat amber rule when active. */
const navItemClass = (active: boolean) =>
  `relative inline-flex h-10 shrink-0 items-center gap-1 whitespace-nowrap px-2.5 text-[14px] font-semibold transition-colors duration-150 focus-ring ${
    active ? "text-[var(--enk-on-dark)]" : "text-[var(--enk-on-dark-muted)] hover:text-[var(--enk-on-dark)]"
  }`;

/** Flat squared active indicator — a rule, not a pill. */
function ActiveRule() {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-x-2 bottom-0 h-[2px]"
      style={{ backgroundColor: "var(--enk-accent-primary-on-dark)" }}
    />
  );
}

/** Desktop dropdown: opens on hover AND click/keyboard; Esc closes; closes on blur-out.
    Panel is a simple rounded sheet — plain sentence-case rows. */
function NavDropdown({ menu, active }: { menu: NavMenu; active: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
          if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); }
        }}
        className={navItemClass(active)}
      >
        {menu.label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-150 ease-out ${open ? "rotate-180" : ""}`} aria-hidden="true" />
        {active && <ActiveRule />}
      </button>

      <div
        className="absolute left-0 top-full pt-1.5"
        style={{
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          transform: open ? "translateY(0)" : "translateY(-4px)",
          transition: "opacity 160ms ease-out, transform 160ms ease-out, visibility 160ms",
        }}
      >
        <ul
          className="min-w-[280px] overflow-hidden py-1.5"
          style={{
            backgroundColor: "var(--enk-record-surface-raised)",
            border: "1px solid var(--enk-rule)",
            borderRadius: "var(--enk-radius-record)",
          }}
        >
          {menu.items.map((item) => (
            <li key={item.label}>
              <ItemLink
                item={item}
                className="flex min-h-[42px] items-center px-4 py-2 text-[13.5px] text-[var(--enk-on-dark-muted)] transition-colors duration-150 hover:bg-white/5 hover:text-[var(--enk-on-dark)] focus-ring"
              >
                {item.label}
              </ItemLink>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

/** Mobile drawer with each parent as an accordion section plus a records-style action block. */
function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <nav aria-label="Mobile" className="enk-container flex flex-col py-3">
      <Link
        to="/"
        onClick={onNavigate}
        className="flex min-h-[52px] w-full items-center border-b border-[var(--enk-line-dark)] px-1 py-3 text-[15px] font-semibold text-[var(--enk-on-dark)] focus-ring"
      >
        Home
      </Link>
      {navMenus.map((menu, i) => {
        const expanded = openIdx === i;
        return (
          <Fragment key={menu.label}>
            <div className="border-b border-[var(--enk-line-dark)]">
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={`m-sec-${i}`}
              onClick={() => setOpenIdx(expanded ? null : i)}
              className="flex min-h-[52px] w-full items-center justify-between px-1 py-3 text-[15px] font-semibold text-[var(--enk-on-dark)] focus-ring"
            >
              {menu.label}
              <ChevronDown className={`h-5 w-5 transition-transform duration-150 ease-out ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
            {expanded && (
              <ul id={`m-sec-${i}`} className="pb-2">
                {menu.items.map((item) => (
                  <li key={item.label}>
                    <ItemLink
                      item={item}
                      onClick={onNavigate}
                      className="flex min-h-[44px] items-center rounded-md px-3 py-2.5 text-[14.5px] text-[var(--enk-on-dark-muted)] transition-colors hover:bg-white/5 hover:text-[var(--enk-on-dark)] focus-ring"
                    >
                      {item.label}
                    </ItemLink>
                  </li>
                ))}
              </ul>
            )}
            </div>
          </Fragment>
        );
      })}
      {[...extraLinks, { label: "Contact", href: "/contact" }].map((link) => (
        <Link
          key={link.label}
          to={link.href}
          onClick={onNavigate}
          className="flex min-h-[52px] w-full items-center border-b border-[var(--enk-line-dark)] px-1 py-3 text-[15px] font-semibold text-[var(--enk-on-dark)] focus-ring"
        >
          {link.label}
        </Link>
      ))}

      {/* Priority actions — procurement fast paths, not marketing CTAs */}
      <div className="mt-4 flex flex-col gap-2.5">
        <Link
          to="/projects"
          onClick={onNavigate}
          className="flex min-h-[48px] w-full items-center justify-center border px-4 py-3 text-[14px] font-semibold text-[var(--enk-on-dark)] focus-ring"
          style={{ borderColor: "var(--enk-rule-strong)", borderRadius: "var(--enk-radius-record)" }}
        >
          View projects
        </Link>
        <div className="grid grid-cols-1 gap-2.5">
          <a
            href={contact.capabilityStatement}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] items-center justify-center border px-2 py-2 text-center text-[13px] font-semibold text-[var(--enk-on-dark-muted)] focus-ring"
            style={{ borderColor: "var(--enk-rule)", borderRadius: "var(--enk-radius-record)" }}
          >
            Capability statement
          </a>
        </div>
      </div>

      {/* Direct lines */}
      <div className="mt-5 border-t border-[var(--enk-line-dark)] pt-4 pb-2 text-[13px] leading-relaxed text-[var(--enk-on-dark-muted)]">
        <a href={contact.phoneHref} className="block py-1 focus-ring rounded-sm">{contact.phone}</a>
        <a href={`mailto:${contact.email}`} className="block py-1 focus-ring rounded-sm">{contact.email}</a>
      </div>
    </nav>
  );
}

export function HomeHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        navigate("/search");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <>
      <header
        className="sticky top-0 z-50"
        style={{
          // Solid navy header bar — never a translucent band. A hairline rule
          // separates it from content; on scroll the rule strengthens instead
          // of casting a floating shadow.
          background: "var(--enk-navy)",
          borderBottom: `1px solid ${scrolled ? "var(--enk-rule-strong)" : "var(--enk-line-dark)"}`,
        }}
      >
        <div className="enk-container">
          <div className="flex h-[60px] items-center justify-between gap-4 md:h-[68px] min-[1120px]:justify-start">
            <BrandLockup compact={false} />

            <nav aria-label="Primary" className="hidden min-[1120px]:block min-[1120px]:ml-6">
              <ul className="flex items-center gap-0">
                {navMenus.map((menu) => (
                  <NavDropdown
                    key={menu.label}
                    menu={menu}
                    active={location.pathname === menu.href || location.pathname.startsWith(`${menu.href}/`)}
                  />
                ))}
                {extraLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className={navItemClass(location.pathname === link.href)}>
                      {link.label}
                      {location.pathname === link.href && <ActiveRule />}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/contact" className={navItemClass(location.pathname === "/contact")}>
                    Contact
                    {location.pathname === "/contact" && <ActiveRule />}
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-2 lg:ml-auto">
              <Link
                to="/search"
                aria-label="Search the site"
                className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-[var(--enk-on-dark)] transition-colors hover:bg-white/10 focus-ring"
              >
                <Search className="h-5 w-5" aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? "Close menu" : "Open menu"}
                className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-[var(--enk-on-dark)] transition-colors hover:bg-white/10 focus-ring min-[1120px]:hidden"
              >
                {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div id="mobile-nav" className="max-h-[calc(100vh-60px)] md:max-h-[calc(100vh-68px)] overflow-y-auto min-[1120px]:hidden" style={{ backgroundColor: "var(--enk-navy)" }}>
            <MobileMenu onNavigate={() => setOpen(false)} />
          </div>
        )}
      </header>
    </>
  );
}
