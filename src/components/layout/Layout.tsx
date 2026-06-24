import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HomeHeader } from "@/components/home/HomeHeader";
import { HomeFooter } from "@/components/home/HomeFooter";
import { MobileStickyCTA } from "@/components/sections/MobileStickyCTA";
import { BackToTopButton } from "@/components/sections/BackToTopButton";

interface LayoutProps {
  children: ReactNode;
}

/**
 * Shared public layout. Uses the same `.enk` chrome (HomeHeader / HomeFooter)
 * as the homepage so navigating between pages is visually seamless. The header
 * is sticky and in-flow, so no top padding compensation is needed on <main>.
 */
export function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  // Don't show mobile sticky CTA on contact page (already there)
  const showMobileCTA = pathname !== "/contact";

  return (
    <div className="enk min-h-screen flex flex-col">
      {/* Skip to Content Link - Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[var(--enk-blue)] focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      <HomeHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <HomeFooter />
      {showMobileCTA && <MobileStickyCTA />}
      <BackToTopButton />
    </div>
  );
}
