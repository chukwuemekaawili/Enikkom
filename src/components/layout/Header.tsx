import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Mail,
  Menu,
  Phone,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCollection, useSiteSettings } from "@/hooks/useSiteSettings";
import { getAssetUrl } from "@/lib/assetMap";
import logoColorDefault from "@/assets/images/logos/enikkom-logo-blue.png";
import logoWhite from "@/assets/images/logos/enikkom-logo-white.png";

const hddThailandLogo = "/brand/hddtec-logo.svg";
const dualBrandMicrocopy =
  "Enikkom Construction: Pipeline Works | HDDTEC: Trenchless Operations";

function BrandLockup({
  logoSrc,
  compact = false,
  dark = false,
  onClick,
}: {
  logoSrc: string;
  compact?: boolean;
  dark?: boolean;
  onClick?: () => void;
}) {
  const logoH = compact ? 38 : 52;
  const hddH  = compact ? 38 : 52;
  const divH  = compact ? 40 : 54;

  return (
    <Link
      to="/"
      onClick={onClick}
      title={dualBrandMicrocopy}
      aria-label={dualBrandMicrocopy}
      className="group flex shrink-0 items-center gap-4"
    >
      <img
        src={logoSrc}
        alt="Enikkom Construction Limited"
        style={{ height: logoH, width: "auto", display: "block", flexShrink: 0 }}
        className="object-contain"
      />

      <span
        style={{ height: divH, width: 1, flexShrink: 0 }}
        className={dark ? "bg-white/20" : "bg-border"}
      />

      <img
        src={hddThailandLogo}
        alt="HDDTEC Limited"
        title="HDDTEC: Trenchless Operations"
        style={{ height: hddH, width: "auto", display: "block", flexShrink: 0, mixBlendMode: dark ? "screen" : "normal" }}
        className="object-contain"
      />
    </Link>
  );
}

const defaultNavItems = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Company Overview", href: "/about" },
      { label: "Company Introduction", href: "/company-introduction" },
      { label: "Management Team", href: "/management-team" },
      { label: "Partners & Affiliates", href: "/partners" },
      { label: "HSE & Quality", href: "/hse-quality" },
      { label: "Testimonials", href: "/testimonials" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "All Services", href: "/services" },
      { label: "Trenchless Installations (HDD)", href: "/capabilities/hdd" },
      { label: "Pipeline Construction", href: "/capabilities/pipelines-flowlines" },
      { label: "Dredging & Piling", href: "/capabilities/dredging-piling" },
      { label: "Production Facilities", href: "/capabilities/facilities" },
      { label: "Pipeline Security & Monitoring", href: "/capabilities/pipeline-security" },
      { label: "Project Management & Support", href: "/capabilities/project-management" },
    ],
  },
  {
    label: "Projects",
    href: "/projects",
    children: [
      { label: "Featured Projects", href: "/projects" },
      { label: "Projects Gallery", href: "/projects-gallery" },
      { label: "Completed Projects", href: "/completed-projects" },
    ],
  },
  {
    label: "Equipment",
    href: "/equipment",
    children: [
      { label: "Equipment Overview", href: "/equipment" },
      { label: "HDD Equipment Details", href: "/equipment/hdd" },
    ],
  },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

const defaultMobileNavGroups = [
  {
    label: "About",
    items: [
      { label: "Company Overview", href: "/about" },
      { label: "Company Introduction", href: "/company-introduction" },
      { label: "Management Team", href: "/management-team" },
      { label: "Partners & Affiliates", href: "/partners" },
      { label: "HSE & Quality", href: "/hse-quality" },
    ],
  },
  {
    label: "Capabilities",
    items: [
      { label: "All Capabilities", href: "/capabilities" },
      { label: "Trenchless Installations (HDD)", href: "/capabilities/hdd" },
      { label: "Pipeline Construction", href: "/capabilities/pipelines-flowlines" },
      { label: "Dredging & Piling", href: "/capabilities/dredging-piling" },
      { label: "Production Facilities", href: "/capabilities/facilities" },
      { label: "Project Management & Support", href: "/capabilities/project-management" },
    ],
  },
  {
    label: "Projects",
    items: [
      { label: "Featured Projects", href: "/projects" },
      { label: "Completed Projects", href: "/completed-projects" },
      { label: "Projects Gallery", href: "/projects-gallery" },
    ],
  },
];

const utilityLinks = [
  { label: "Careers", href: "/careers" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const { branding, contact } = useSiteSettings();
  const { data: navItemsData } = useCollection("navigation_main");
  const { data: mobileNavGroupsData } = useCollection("navigation_mobile");

  const navItems = navItemsData.length > 0 ? navItemsData : defaultNavItems;
  const mobileNavGroups =
    mobileNavGroupsData.length > 0 ? mobileNavGroupsData : defaultMobileNavGroups;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const logoSrc = getAssetUrl(branding.logoUrl || logoColorDefault);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileExpandedItem(null);
    setActiveDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleMobileExpand = (label: string) => {
    setMobileExpandedItem((current) => (current === label ? null : label));
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileExpandedItem(null);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="hidden border-b border-white/6 bg-charcoal xl:block">
          <div className="container-wide flex h-11 items-center justify-between gap-6">
            <div className="flex items-center gap-5 text-[11px] font-medium text-white/60">
              <a
                href={`tel:${(contact.phone || "+234 806 573 8555").replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <Phone className="h-3.5 w-3.5 text-primary" />
                <span>{contact.phone || "+234 806 573 8555"}</span>
              </a>
              <a
                href={`mailto:${contact.email || "info@enikkom.com"}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <Mail className="h-3.5 w-3.5 text-primary" />
                <span>{contact.email || "info@enikkom.com"}</span>
              </a>
            </div>

            <div className="flex items-center gap-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
              <span className="text-white/40">Enikkom Group</span>
              {utilityLinks.map((link) => (
                <Link key={link.label} to={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`border-b border-white/8 transition-all duration-300 ${
            isScrolled
              ? "bg-charcoal shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl"
              : "bg-charcoal"
          }`}
        >
          <nav className="container-wide">
            <div
              className={`flex items-center gap-5 transition-all duration-300 ${
                isScrolled ? "h-[80px]" : "h-[90px]"
              }`}
            >
              <BrandLockup logoSrc={logoWhite} dark />

              <div className="hidden flex-1 items-center justify-center gap-1 xl:flex">
                {navItems.map((item: any) => (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => item.children && handleDropdownEnter(item.label)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <Link
                      to={item.href}
                      className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                        isActive(item.href)
                          ? "bg-white/12 text-white"
                          : "text-white/65 hover:bg-white/8 hover:text-white"
                      }`}
                    >
                      {item.label}
                      {item.children && (
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform duration-200 ${
                            activeDropdown === item.label ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </Link>

                    {item.children && (
                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="absolute left-1/2 top-[calc(100%+18px)] z-50 w-[340px] -translate-x-1/2 rounded-[1.75rem] border border-border/80 bg-white p-3 shadow-[0_28px_70px_rgba(0,0,0,0.35)]"
                            onMouseEnter={() => handleDropdownEnter(item.label)}
                            onMouseLeave={handleDropdownLeave}
                          >
                            <div className="border-b border-border/70 px-4 pb-3 pt-1">
                              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                                Explore {item.label}
                              </p>
                            </div>

                            <div className="mt-2 space-y-1">
                              {item.children.map((child: any) => (
                                <Link
                                  key={child.label}
                                  to={child.href}
                                  className="flex items-center justify-between rounded-[1.15rem] px-4 py-3 text-[14px] text-foreground/78 transition-colors hover:bg-muted/75 hover:text-foreground"
                                >
                                  <span>{child.label}</span>
                                  <ChevronRight className="h-4 w-4 text-foreground/30" />
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}
              </div>

              <div className="ml-auto hidden items-center gap-3 xl:flex">
                <Link
                  to="/projects"
                  className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50 transition-colors hover:text-white"
                >
                  Track Record
                </Link>
                <Button asChild size="lg" className="h-11 px-6">
                  <Link to="/contact">
                    Contact Us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <button
                type="button"
                className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/18 xl:hidden"
                onClick={() => setMobileMenuOpen((current) => !current)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm xl:hidden"
              onClick={closeMobileMenu}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-[390px] flex-col overflow-hidden border-l border-border bg-white shadow-[0_24px_80px_rgba(15,23,42,0.2)] xl:hidden"
            >
              <div className="border-b border-border/70 px-5 py-5">
                <div className="flex items-start justify-between gap-4">
                  <BrandLockup logoSrc={logoSrc} compact onClick={closeMobileMenu} />
                  <button
                    type="button"
                    onClick={closeMobileMenu}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-5">
                <div className="mb-4 rounded-[1.75rem] border border-border/80 bg-muted/40 p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                    Specialist Energy Infrastructure
                  </p>
                  <p className="mt-3 text-[15px] leading-7 text-foreground/78">
                    Integrated HDD, pipeline, dredging, facilities, and project support delivery
                    for complex Nigerian work fronts.
                  </p>
                </div>

                <div className="border-b border-border/70 pb-3">
                  <Link
                    to="/"
                    className={`flex items-center justify-between rounded-[1.25rem] px-4 py-4 text-[15px] font-semibold ${
                      location.pathname === "/" ? "bg-primary/8 text-foreground" : "text-foreground"
                    }`}
                    onClick={closeMobileMenu}
                  >
                    <span>Home</span>
                    <ChevronRight className="h-4 w-4 text-foreground/35" />
                  </Link>
                </div>

                <div className="py-3">
                  {mobileNavGroups.map((group: any) => (
                    <div key={group.label} className="border-b border-border/70 py-1">
                      <button
                        type="button"
                        onClick={() => toggleMobileExpand(group.label)}
                        className="flex w-full items-center justify-between rounded-[1.25rem] px-4 py-4 text-left text-[15px] font-semibold text-foreground transition-colors hover:bg-muted/70"
                      >
                        <span>{group.label}</span>
                        <ChevronDown
                          className={`h-4 w-4 text-foreground/40 transition-transform ${
                            mobileExpandedItem === group.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {mobileExpandedItem === group.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-1 px-2 pb-3">
                              {group.items.map((item: any) => (
                                <Link
                                  key={item.label}
                                  to={item.href}
                                  className={`flex items-center justify-between rounded-[1rem] px-4 py-3 text-[14px] ${
                                    location.pathname === item.href
                                      ? "bg-primary/8 text-foreground"
                                      : "text-foreground/72 hover:bg-muted/70 hover:text-foreground"
                                  }`}
                                  onClick={closeMobileMenu}
                                >
                                  <span>{item.label}</span>
                                  <ChevronRight className="h-4 w-4 text-foreground/25" />
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border/70 px-5 py-5">
                <Button asChild size="lg" className="w-full">
                  <Link to="/contact" onClick={closeMobileMenu}>
                    Contact Us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                <div className="mt-4 space-y-3 rounded-[1.5rem] bg-charcoal px-4 py-4 text-white">
                  <a
                    href={`tel:${(contact.phone || "+234 806 573 8555").replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-[13px] text-white/72"
                  >
                    <Phone className="h-4 w-4 text-primary" />
                    <span>{contact.phone || "+234 806 573 8555"}</span>
                  </a>
                  <a
                    href={`mailto:${contact.email || "info@enikkom.com"}`}
                    className="flex items-center gap-3 text-[13px] text-white/72"
                  >
                    <Mail className="h-4 w-4 text-primary" />
                    <span>{contact.email || "info@enikkom.com"}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
