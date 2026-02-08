import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight, Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import logoWhiteDefault from "@/assets/enikkom-logo-white.png";

// Desktop navigation items (full structure)
const navItems = [
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
      { label: "HDD Trenchless Crossings", href: "/capabilities/hdd" },
      { label: "Pipelines & Flowlines", href: "/capabilities/pipelines-flowlines" },
      { label: "Dredging & Piling", href: "/capabilities/dredging-piling" },
      { label: "Jetty & Quay Walls", href: "/capabilities/jetty-quay-walls" },
      { label: "Shore Approach", href: "/capabilities/shore-approach" },
    ],
  },
  {
    label: "Projects",
    href: "/projects",
    children: [
      { label: "Featured Projects", href: "/projects" },
      { label: "Projects Gallery", href: "/projects-gallery" },
      { label: "Project Map", href: "/project-map" },
      { label: "Completed Projects", href: "/completed-projects" },
    ],
  },
  {
    label: "Equipment",
    href: "/equipment",
    children: [
      { label: "Equipment Overview", href: "/equipment" },
      { label: "HDD & Thrust Boring", href: "/equipment/hdd" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Resources", href: "/resources" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

// Mobile navigation - grouped for better UX
const mobileNavGroups = [
  {
    label: "About Us",
    items: [
      { label: "Company Overview", href: "/about" },
      { label: "Company Introduction", href: "/company-introduction" },
      { label: "Management Team", href: "/management-team" },
      { label: "Partners & Affiliates", href: "/partners" },
      { label: "HSE & Quality", href: "/hse-quality" },
      { label: "Testimonials", href: "/testimonials" },
    ],
  },
  {
    label: "Services & Capabilities",
    items: [
      { label: "All Capabilities", href: "/capabilities" },
      { label: "HDD Trenchless Crossings", href: "/capabilities/hdd" },
      { label: "Pipelines & Flowlines", href: "/capabilities/pipelines-flowlines" },
      { label: "Dredging & Piling", href: "/capabilities/dredging-piling" },
      { label: "Jetty & Quay Walls", href: "/capabilities/jetty-quay-walls" },
      { label: "Shore Approach", href: "/capabilities/shore-approach" },
      { label: "Equipment Fleet", href: "/equipment" },
      { label: "HDD Equipment Details", href: "/equipment/hdd" },
    ],
  },
  {
    label: "Projects & Gallery",
    items: [
      { label: "Featured Projects", href: "/projects" },
      { label: "Projects Gallery", href: "/projects-gallery" },
      { label: "Project Map", href: "/project-map" },
      { label: "Photo Gallery", href: "/gallery" },
    ],
  },
];

const mobileQuickLinks = [
  { label: "Resources", href: "/resources" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const { branding } = useSiteSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null);
  const location = useLocation();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dragControls = useDragControls();

  // Use dynamic logo or fallback to default
  const logoWhite = branding.logoUrl || logoWhiteDefault;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileExpandedItem(null);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  // Handle dropdown hover with delay for smooth transition
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
    setMobileExpandedItem(mobileExpandedItem === label ? null : label);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileExpandedItem(null);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "shadow-xl backdrop-blur-md" 
            : ""
        }`}
        style={{ 
          backgroundColor: isScrolled ? 'rgba(11, 18, 32, 0.97)' : '#0B1220'
        }}
      >
        <nav className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[80px] md:h-[100px]">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex-shrink-0 py-2 transition-transform duration-200 hover:scale-[1.02]"
            >
              <img
                src={logoWhite}
                alt="Enikkom Construction Limited"
                className="h-[60px] md:h-[80px] w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && handleDropdownEnter(item.label)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link
                    to={item.href}
                    className={`px-3.5 py-2.5 text-[13px] font-medium transition-all duration-200 flex items-center gap-1 rounded-lg ${
                      isActive(item.href)
                        ? "text-white bg-white/10"
                        : "text-white/80 hover:text-white hover:bg-white/5"
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

                  {/* Dropdown with hover tunnel */}
                  {item.children && (
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <>
                          {/* Invisible bridge to prevent hover gap */}
                          <div className="absolute top-full left-0 w-full h-3" />
                          
                          <motion.div 
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className="absolute top-[calc(100%+8px)] left-0 w-64 rounded-xl shadow-2xl py-2 z-50"
                            style={{ 
                              backgroundColor: '#0B1220',
                              border: '1px solid rgba(255,255,255,0.1)',
                              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                            }}
                            onMouseEnter={() => handleDropdownEnter(item.label)}
                            onMouseLeave={handleDropdownLeave}
                          >
                            {item.children.map((child, idx) => (
                              <Link
                                key={child.label}
                                to={child.href}
                                className="block px-4 py-2.5 text-[13px] text-white/75 hover:text-white hover:bg-white/8 transition-all duration-150 relative z-10"
                                style={{ pointerEvents: 'auto' }}
                              >
                                <motion.span
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.15, delay: idx * 0.03 }}
                                >
                                  {child.label}
                                </motion.span>
                              </Link>
                            ))}
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Button 
                asChild 
                className="h-10 px-6 text-[13px] font-semibold rounded-lg bg-brand-primary hover:bg-brand-primary-hover transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <Link to="/contact">Request a Quote</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              type="button"
              className="lg:hidden p-3 text-white hover:bg-white/10 rounded-xl transition-colors active:scale-95"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              whileTap={{ scale: 0.92 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation - Premium Slide-in Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ 
                backgroundColor: 'rgba(11, 18, 32, 0.6)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
              }}
              onClick={closeMobileMenu}
            />

            {/* Slide-in Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: "spring", 
                damping: 30, 
                stiffness: 300,
                mass: 0.8
              }}
              drag="x"
              dragControls={dragControls}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={{ left: 0, right: 0.5 }}
              onDragEnd={(_, info) => {
                if (info.offset.x > 100 || info.velocity.x > 500) {
                  closeMobileMenu();
                }
              }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[380px] z-50 lg:hidden overflow-hidden"
              style={{ 
                backgroundColor: '#0B1220',
                boxShadow: '-20px 0 60px rgba(0, 0, 0, 0.5)'
              }}
            >
              {/* Drawer Header */}
              <div 
                className="flex items-center justify-between px-5 h-[80px]"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
              >
                <Link to="/" onClick={closeMobileMenu}>
                  <img
                    src={logoWhite}
                    alt="Enikkom"
                    className="h-[50px] w-auto"
                  />
                </Link>
                <motion.button
                  onClick={closeMobileMenu}
                  className="p-2.5 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                  whileTap={{ scale: 0.92 }}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              {/* Drawer Content - Grouped Navigation */}
              <div className="h-[calc(100vh-80px)] overflow-y-auto overscroll-contain pb-safe">
                {/* Home Link */}
                <div className="py-3 px-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                  >
                    <Link
                      to="/"
                      className={`flex items-center py-3 text-[16px] font-semibold transition-all duration-200 ${
                        location.pathname === "/" ? "text-primary" : "text-white"
                      }`}
                      onClick={closeMobileMenu}
                    >
                      Home
                    </Link>
                  </motion.div>
                </div>

                {/* Grouped Navigation Sections */}
                <div className="py-2">
                  {mobileNavGroups.map((group, groupIndex) => (
                    <motion.div 
                      key={group.label}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: 0.1 + groupIndex * 0.06,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      className="border-b"
                      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                    >
                      <button
                        onClick={() => toggleMobileExpand(group.label)}
                        className="w-full flex items-center justify-between px-5 py-4 text-[15px] font-semibold transition-all duration-200 active:bg-white/10 text-white"
                      >
                        <span>{group.label}</span>
                        <motion.div
                          animate={{ rotate: mobileExpandedItem === group.label ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="h-5 w-5 text-white/40" />
                        </motion.div>
                      </button>
                      
                      <AnimatePresence>
                        {mobileExpandedItem === group.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                            style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                          >
                            <div className="pb-2">
                              {group.items.map((item, itemIdx) => (
                                <motion.div
                                  key={item.label}
                                  initial={{ opacity: 0, x: 12 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.2, delay: itemIdx * 0.025 }}
                                >
                                  <Link
                                    to={item.href}
                                    className={`flex items-center gap-3 px-7 py-3 text-[14px] transition-all duration-150 active:bg-white/8 ${
                                      location.pathname === item.href
                                        ? "text-primary bg-primary/10"
                                        : "text-white/60 hover:text-white"
                                    }`}
                                    onClick={closeMobileMenu}
                                  >
                                    <div className="w-1 h-1 rounded-full bg-current opacity-40" />
                                    {item.label}
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Links */}
                <div className="py-3 px-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-3"
                  >
                    {mobileQuickLinks.map((link) => (
                      <Link
                        key={link.label}
                        to={link.href}
                        className={`px-4 py-2 text-[13px] font-medium rounded-lg transition-all ${
                          location.pathname === link.href
                            ? "bg-primary/20 text-primary"
                            : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                        }`}
                        onClick={closeMobileMenu}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                </div>
                
                {/* CTA Section */}
                <motion.div 
                  className="px-5 pt-5 pb-6"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                >
                  <Button 
                    asChild 
                    className="w-full h-14 text-[15px] font-semibold bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/25 active:scale-[0.98] transition-all"
                  >
                    <Link to="/contact" onClick={closeMobileMenu}>
                      Get Your Free Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <p className="text-center text-[11px] text-white/40 mt-3">
                    Response within 24 hours
                  </p>
                </motion.div>

                {/* Contact Info */}
                <motion.div 
                  className="px-5 pb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-4">
                    Contact Us
                  </p>
                  <div className="space-y-3">
                    <a 
                      href="tel:+2348035082614"
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/8 transition-colors active:scale-[0.98]"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Phone className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-[14px] text-white/70">+234 803 508 2614</span>
                    </a>
                    <a 
                      href="mailto:info@enikkom.com"
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/8 transition-colors active:scale-[0.98]"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Mail className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-[14px] text-white/70">info@enikkom.com</span>
                    </a>
                  </div>
                </motion.div>

                {/* Swipe indicator */}
                <motion.div 
                  className="absolute top-1/2 -translate-y-1/2 left-1 w-1 h-16 rounded-full bg-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
