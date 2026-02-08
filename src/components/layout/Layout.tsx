import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileStickyCTA } from "@/components/sections/MobileStickyCTA";
import { LiveEditToolbar } from "@/components/admin/LiveEditToolbar";
import { useEditModeKeyboard } from "@/hooks/useEditModeKeyboard";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation();

  // Enable keyboard shortcuts for edit mode
  useEditModeKeyboard();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  // Don't show mobile sticky CTA on contact page (already there)
  const showMobileCTA = pathname !== "/contact";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Skip to Content Link - Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Skip to main content
      </a>
      
      <Header />
      <main id="main-content" className="flex-1 pt-[88px] md:pt-[108px]">
        {children}
      </main>
      <Footer />
      {showMobileCTA && <MobileStickyCTA />}
      
      {/* Admin live edit toolbar */}
      <LiveEditToolbar />
    </div>
  );
}
