import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { MotionConfig } from "framer-motion";
import { PublicErrorBoundary } from "@/components/layout/PublicErrorBoundary";

// The homepage is the most common landing point, so it's bundled eagerly to
// render on first paint with no spinner and no extra network round-trip.
import HomePage from "./pages/HomePage";

// Remaining public pages stay lazy for code-splitting.
const AboutPage = React.lazy(() => import("./pages/AboutPage"));
const CapabilitiesPage = React.lazy(() => import("./pages/CapabilitiesPage"));
const CapabilityDetailPage = React.lazy(() => import("./pages/CapabilityDetailPage"));
const ProjectsPage = React.lazy(() => import("./pages/ProjectsPage"));
const ProjectDetailPage = React.lazy(() => import("./pages/ProjectDetailPage"));
const EquipmentPage = React.lazy(() => import("./pages/EquipmentPage"));
const HSEQualityPage = React.lazy(() => import("./pages/HSEQualityPage"));
const CareersPage = React.lazy(() => import("./pages/CareersPage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));
const ManagementPage = React.lazy(() => import("./pages/ManagementPage"));
const ResourcesPage = React.lazy(() => import("./pages/ResourcesPage"));
const PartnersPage = React.lazy(() => import("./pages/PartnersPage"));
const PrivacyPage = React.lazy(() => import("./pages/PrivacyPage"));
const TermsPage = React.lazy(() => import("./pages/TermsPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

// Dev-only styleguide for the Industrial Field Records kit (src/components/records).
const RecordsKitDemo = import.meta.env.DEV ? React.lazy(() => import("./dev/RecordsKitDemo")) : null;

const queryClient = new QueryClient();

// Minimal fallback for lazy route chunks: just holds the background so route
// transitions don't flash white. No spinner — it read as a slow "preloader".
const FallbackLoader = () => <div className="min-h-screen bg-background" />;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      {/* Calms blanket scroll animations site-wide: disables transform/slide
          reveals (the AI-generated "everything flies up" tell), leaving only a
          restrained opacity fade — consistent with the static homepage. */}
      <MotionConfig reducedMotion="always">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Suspense fallback={<FallbackLoader />}>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<PublicErrorBoundary><HomePage /></PublicErrorBoundary>} />
                <Route path="/about" element={<PublicErrorBoundary><AboutPage /></PublicErrorBoundary>} />
                <Route path="/services" element={<Navigate to="/capabilities" replace />} />
                <Route path="/our-services" element={<Navigate to="/capabilities" replace />} />
                <Route path="/capabilities" element={<PublicErrorBoundary><CapabilitiesPage /></PublicErrorBoundary>} />
                <Route path="/capabilities/logistics" element={<Navigate to="/equipment" replace />} />
                <Route path="/capabilities/:slug" element={<PublicErrorBoundary><CapabilityDetailPage /></PublicErrorBoundary>} />
                <Route path="/projects" element={<PublicErrorBoundary><ProjectsPage /></PublicErrorBoundary>} />
                <Route path="/portfolio" element={<PublicErrorBoundary><ProjectsPage /></PublicErrorBoundary>} />
                <Route path="/projects/:slug" element={<PublicErrorBoundary><ProjectDetailPage /></PublicErrorBoundary>} />
                <Route path="/equipment" element={<PublicErrorBoundary><EquipmentPage /></PublicErrorBoundary>} />
                <Route path="/equipment/hdd" element={<Navigate to="/equipment#hdd" replace />} />
                <Route path="/hdd-equipment" element={<Navigate to="/equipment#hdd" replace />} />
                <Route path="/completed-projects" element={<Navigate to="/projects#record" replace />} />
                <Route path="/gallery" element={<Navigate to="/projects#gallery" replace />} />
                <Route path="/projects-gallery" element={<Navigate to="/projects#gallery" replace />} />
                <Route path="/project-map" element={<Navigate to="/projects#map" replace />} />
                <Route path="/hse-quality" element={<PublicErrorBoundary><HSEQualityPage /></PublicErrorBoundary>} />
                <Route path="/testimonials" element={<Navigate to="/projects#testimonials" replace />} />
                <Route path="/resources" element={<PublicErrorBoundary><ResourcesPage /></PublicErrorBoundary>} />
                <Route path="/partners" element={<PublicErrorBoundary><PartnersPage /></PublicErrorBoundary>} />
                <Route path="/careers" element={<PublicErrorBoundary><CareersPage /></PublicErrorBoundary>} />
                <Route path="/sustainability" element={<Navigate to="/hse-quality#sustainability" replace />} />
                <Route path="/news-insights" element={<Navigate to="/resources#videos" replace />} />
                <Route path="/search" element={<PublicErrorBoundary><SearchPage /></PublicErrorBoundary>} />
                <Route path="/contact" element={<PublicErrorBoundary><ContactPage /></PublicErrorBoundary>} />
                <Route path="/contact-us" element={<PublicErrorBoundary><ContactPage /></PublicErrorBoundary>} />
                <Route path="/about/leadership" element={<PublicErrorBoundary><ManagementPage /></PublicErrorBoundary>} />
                <Route path="/management-team" element={<Navigate to="/about/leadership" replace />} />
                <Route path="/privacy" element={<PublicErrorBoundary><PrivacyPage /></PublicErrorBoundary>} />
                <Route path="/terms" element={<PublicErrorBoundary><TermsPage /></PublicErrorBoundary>} />

                {RecordsKitDemo && <Route path="/dev/records" element={<RecordsKitDemo />} />}

                <Route path="*" element={<PublicErrorBoundary><NotFound /></PublicErrorBoundary>} />
              </Routes>
            </Suspense>
          </BrowserRouter>
      </TooltipProvider>
      </MotionConfig>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
