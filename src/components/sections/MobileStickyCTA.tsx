import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileStickyCTAProps {
  href?: string;
  label?: string;
  phone?: string;
}

export function MobileStickyCTA({
  href = "/contact",
  label = "Contact Us",
  phone = "+2348035082614",
}: MobileStickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="border-t border-white/10 bg-[#071630]/95 backdrop-blur-md px-4 py-3 pb-safe">
            <div className="flex items-center gap-3">
              <a
                href={`tel:${phone}`}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition-colors active:bg-white/15"
                aria-label="Call us"
              >
                <Phone className="h-4.5 w-4.5" />
              </a>
              <Link
                to={href}
                className="flex flex-1 items-center justify-center gap-2 rounded-[var(--enk-radius)] px-5 py-3 text-[13px] font-bold uppercase tracking-[0.1em] transition-all active:scale-[0.98]"
                style={{ backgroundColor: "var(--enk-accent-primary)", color: "var(--enk-navy)" }}
              >
                {label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
