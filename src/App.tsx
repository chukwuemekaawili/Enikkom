import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { MotionConfig } from "framer-motion";
import { PublicErrorBoundary } from "@/components/layout/PublicErrorBoundary";

// Lazy loaded public pages
const HomePage = React.lazy(() => import("./pages/HomePage"));
const AboutPage = React.lazy(() => import("./pages/AboutPage"));
const CapabilitiesPage = React.lazy(() => import("./pages/CapabilitiesPage"));
const CapabilityDetailPage = React.lazy(() => import("./pages/CapabilityDetailPage"));
const ProjectsPage = React.lazy(() => import("./pages/ProjectsPage"));
const ProjectDetailPage = React.lazy(() => import("./pages/ProjectDetailPage"));
const EquipmentPage = React.lazy(() => import("./pages/EquipmentPage"));
const HDDEquipmentPage = React.lazy(() => import("./pages/HDDEquipmentPage"));
const HSEQualityPage = React.lazy(() => import("./pages/HSEQualityPage"));
const CareersPage = React.lazy(() => import("./pages/CareersPage"));
const SustainabilityPage = React.lazy(() => import("./pages/SustainabilityPage"));
const NewsInsightsPage = React.lazy(() => import("./pages/NewsInsightsPage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));
const ManagementPage = React.lazy(() => import("./pages/ManagementPage"));
const TestimonialsPage = React.lazy(() => import("./pages/TestimonialsPage"));
const ResourcesPage = React.lazy(() => import("./pages/ResourcesPage"));
const PartnersPage = React.lazy(() => import("./pages/PartnersPage"));
const PrivacyPage = React.lazy(() => import("./pages/PrivacyPage"));
const TermsPage = React.lazy(() => import("./pages/TermsPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const FallbackLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-background">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

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
                <Route path="/capabilities/:slug" element={<PublicErrorBoundary><CapabilityDetailPage /></PublicErrorBoundary>} />
                <Route path="/projects" element={<PublicErrorBoundary><ProjectsPage /></PublicErrorBoundary>} />
                <Route path="/portfolio" element={<PublicErrorBoundary><ProjectsPage /></PublicErrorBoundary>} />
                <Route path="/projects/:slug" element={<PublicErrorBoundary><ProjectDetailPage /></PublicErrorBoundary>} />
                <Route path="/equipment" element={<PublicErrorBoundary><EquipmentPage /></PublicErrorBoundary>} />
                <Route path="/equipment/hdd" element={<PublicErrorBoundary><HDDEquipmentPage /></PublicErrorBoundary>} />
                <Route path="/hdd-equipment" element={<PublicErrorBoundary><HDDEquipmentPage /></PublicErrorBoundary>} />
                <Route path="/completed-projects" element={<Navigate to="/projects#record" replace />} />
                <Route path="/gallery" element={<Navigate to="/projects#gallery" replace />} />
                <Route path="/projects-gallery" element={<Navigate to="/projects#gallery" replace />} />
                <Route path="/project-map" element={<Navigate to="/projects#map" replace />} />
                <Route path="/hse-quality" element={<PublicErrorBoundary><HSEQualityPage /></PublicErrorBoundary>} />
                <Route path="/testimonials" element={<PublicErrorBoundary><TestimonialsPage /></PublicErrorBoundary>} />
                <Route path="/resources" element={<PublicErrorBoundary><ResourcesPage /></PublicErrorBoundary>} />
                <Route path="/partners" element={<PublicErrorBoundary><PartnersPage /></PublicErrorBoundary>} />
                <Route path="/careers" element={<PublicErrorBoundary><CareersPage /></PublicErrorBoundary>} />
                <Route path="/sustainability" element={<PublicErrorBoundary><SustainabilityPage /></PublicErrorBoundary>} />
                <Route path="/news-insights" element={<PublicErrorBoundary><NewsInsightsPage /></PublicErrorBoundary>} />
                <Route path="/search" element={<PublicErrorBoundary><SearchPage /></PublicErrorBoundary>} />
                <Route path="/contact" element={<PublicErrorBoundary><ContactPage /></PublicErrorBoundary>} />
                <Route path="/contact-us" element={<PublicErrorBoundary><ContactPage /></PublicErrorBoundary>} />
                <Route path="/management-team" element={<PublicErrorBoundary><ManagementPage /></PublicErrorBoundary>} />
                <Route path="/privacy" element={<PublicErrorBoundary><PrivacyPage /></PublicErrorBoundary>} />
                <Route path="/terms" element={<PublicErrorBoundary><TermsPage /></PublicErrorBoundary>} />

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
