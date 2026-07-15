import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HomeHeader } from "@/components/home/HomeHeader";
import { HomeFooter } from "@/components/home/HomeFooter";
import { BackToTopButton } from "@/components/sections/BackToTopButton";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="enk min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[var(--enk-accent-primary)] focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      <HomeHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <HomeFooter />
      <BackToTopButton />
    </div>
  );
}
