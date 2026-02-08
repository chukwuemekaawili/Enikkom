import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileStickyCTAProps {
  href?: string;
  label?: string;
}

export function MobileStickyCTA({ 
  href = "/contact", 
  label = "Get Quote" 
}: MobileStickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 2 viewport heights
      const scrollThreshold = window.innerHeight * 2;
      setIsVisible(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-5 right-5 z-50 md:hidden"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <Button
            asChild
            size="lg"
            className="h-12 px-5 text-[13px] font-semibold bg-primary hover:bg-primary/90 rounded-full shadow-xl shadow-primary/30"
          >
            <Link to={href}>
              <MessageSquare className="mr-2 h-4 w-4" />
              {label}
            </Link>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
