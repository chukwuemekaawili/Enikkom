import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Linkedin, Twitter, Facebook, Youtube, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import logoWhite from "@/assets/enikkom-logo-white.png";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Management Team", href: "/management-team" },
    { label: "Projects", href: "/projects" },
    { label: "Equipment", href: "/equipment" },
    { label: "HSE & Quality", href: "/hse-quality" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  capabilities: [
    { label: "Horizontal Directional Drilling", href: "/capabilities/hdd" },
    { label: "Pipelines & Flowlines", href: "/capabilities/pipelines-flowlines" },
    { label: "Dredging & Piling", href: "/capabilities/dredging-piling" },
    { label: "Jetty & Quay Walls", href: "/capabilities/jetty-quay-walls" },
    { label: "Shore Approach", href: "/capabilities/shore-approach" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const certifications = [
  { name: "NIPEX", full: "Nigerian Petroleum Exchange" },
  { name: "DPR", full: "Dept. of Petroleum Resources" },
  { name: "NCDMB", full: "Nigerian Content Development" },
  { name: "NPC", full: "Nigerian Ports Certified" },
  { name: "ISO 9001:2015", full: "Quality Management" },
  { name: "ISO 14001:2015", full: "Environmental Management" },
  { name: "ISO 45001:2018", full: "Occupational Health & Safety" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { contact, branding } = useSiteSettings();

  // Build social links dynamically from settings
  const socialLinks = [
    { icon: Linkedin, href: contact.linkedinUrl || "https://linkedin.com/company/enikkom", label: "LinkedIn" },
    { icon: Twitter, href: contact.twitterUrl || "https://twitter.com/enikkom", label: "Twitter" },
    { icon: Facebook, href: "https://facebook.com/enikkom", label: "Facebook" },
    { icon: Youtube, href: contact.youtubeUrl || "https://youtube.com/@enikkom", label: "YouTube" },
  ];

  return (
    <footer style={{ backgroundColor: '#0B1220' }} className="text-white">
      {/* Certifications Strip */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-2 md:gap-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/5"
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}
              >
                <div 
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: 'hsl(var(--brand-cyan))' }}
                />
                <span className="text-[12px] font-semibold text-white/90">{cert.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Company Info */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Link to="/" className="inline-block mb-5 transition-transform duration-200 hover:scale-[1.02]">
              <img
                src={branding.logoUrl || logoWhite}
                alt={branding.companyName || "Enikkom Construction Limited"}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-white/55 text-[14px] leading-relaxed mb-5">
              {branding.tagline || "West Africa's foremost indigenous trenchless engineering and construction company, delivering world-class HDD, pipeline, dredging, and marine civil works since 1995."}
            </p>
            
            {/* Contact Info - Dynamic from settings */}
            <div className="space-y-2.5 mb-5">
              <a
                href={`tel:${contact.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2.5 text-[13px] text-white/55 hover:text-white transition-colors duration-200 group"
              >
                <Phone className="h-3.5 w-3.5 flex-shrink-0 text-brand-cyan group-hover:scale-110 transition-transform" />
                <span>{contact.phone || "+234 806 573 8555"}</span>
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2.5 text-[13px] text-white/55 hover:text-white transition-colors duration-200 group"
              >
                <Mail className="h-3.5 w-3.5 flex-shrink-0 text-brand-cyan group-hover:scale-110 transition-transform" />
                <span>{contact.email || "info@enikkom.com"}</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-brand-primary transition-all duration-200"
                  style={{ 
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)'
                  }}
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h4 className="text-[12px] font-semibold uppercase tracking-wider mb-4 text-white/80">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-[13px] text-white/55 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Capabilities Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <h4 className="text-[12px] font-semibold uppercase tracking-wider mb-4 text-white/80">Capabilities</h4>
            <ul className="space-y-2.5">
              {footerLinks.capabilities.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-[13px] text-white/55 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Locations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h4 className="text-[12px] font-semibold uppercase tracking-wider mb-4 text-white/80">Locations</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-brand-cyan" />
                <div>
                  <p className="text-[13px] font-medium text-white/90">Abuja Head Office</p>
                  <p className="text-[12px] text-white/45">11, 65 Road Abuja Model City, Gwarinpa, FCT</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-brand-cyan" />
                <div>
                  <p className="text-[13px] font-medium text-white/90">Lagos Corporate Office</p>
                  <p className="text-[12px] text-white/45">5b Theophilus Orji Street, Lekki Phase 1, Lagos</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-brand-cyan" />
                <div>
                  <p className="text-[13px] font-medium text-white/90">Arepo Operations Base</p>
                  <p className="text-[12px] text-white/45">7 Joseph Ogunjobi Street, Praise Hill Estate, Ogun State</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-brand-cyan" />
                <div>
                  <p className="text-[13px] font-medium text-white/90">Warri Operations Base</p>
                  <p className="text-[12px] text-white/45">Km7-DCS Road, Warri, Delta State</p>
                </div>
              </div>
            </div>
            
            {/* Registrations */}
            <div className="mt-5 pt-4 space-y-1.5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-[11px] text-white/35">
                <span className="text-white/50">Website:</span> www.enikkom.com
              </p>
              <p className="text-[11px] text-white/35">
                <span className="text-white/50">NIPEX:</span> Registered Contractor
              </p>
              <p className="text-[11px] text-white/35">
                <span className="text-white/50">NPC:</span> Licensed Operator
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <p className="text-[12px] text-white/35">
            © {currentYear} Enikkom Construction Limited. All rights reserved.
          </p>
          <div className="flex gap-5">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-[12px] text-white/35 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
