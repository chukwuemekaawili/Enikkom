import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminErrorBoundary } from "@/components/admin/AdminErrorBoundary";
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
const CompletedProjectsPage = React.lazy(() => import("./pages/CompletedProjectsPage"));
const HSEQualityPage = React.lazy(() => import("./pages/HSEQualityPage"));
const CareersPage = React.lazy(() => import("./pages/CareersPage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));
const ServicesPage = React.lazy(() => import("./pages/ServicesPage"));
const ManagementPage = React.lazy(() => import("./pages/ManagementPage"));
const TestimonialsPage = React.lazy(() => import("./pages/TestimonialsPage"));
const GalleryPage = React.lazy(() => import("./pages/GalleryPage"));
const ProjectsGalleryPage = React.lazy(() => import("./pages/ProjectsGalleryPage"));
const ProjectMapPage = React.lazy(() => import("./pages/ProjectMapPage"));
const ResourcesPage = React.lazy(() => import("./pages/ResourcesPage"));
const PartnersPage = React.lazy(() => import("./pages/PartnersPage"));
const PrivacyPage = React.lazy(() => import("./pages/PrivacyPage"));
const TermsPage = React.lazy(() => import("./pages/TermsPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

// Lazy loaded Admin pages
const AdminLoginPage = React.lazy(() => import("./pages/admin/AdminLoginPage"));
const AdminDashboard = React.lazy(() => import("./pages/admin/AdminDashboard"));

const queryClient = new QueryClient();

const FallbackLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-background">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<FallbackLoader />}>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<PublicErrorBoundary><HomePage /></PublicErrorBoundary>} />
                <Route path="/about" element={<PublicErrorBoundary><AboutPage /></PublicErrorBoundary>} />
                <Route path="/services" element={<PublicErrorBoundary><ServicesPage /></PublicErrorBoundary>} />
                <Route path="/our-services" element={<PublicErrorBoundary><ServicesPage /></PublicErrorBoundary>} />
                <Route path="/capabilities" element={<PublicErrorBoundary><CapabilitiesPage /></PublicErrorBoundary>} />
                <Route path="/capabilities/:slug" element={<PublicErrorBoundary><CapabilityDetailPage /></PublicErrorBoundary>} />
                <Route path="/projects" element={<PublicErrorBoundary><ProjectsPage /></PublicErrorBoundary>} />
                <Route path="/portfolio" element={<PublicErrorBoundary><ProjectsPage /></PublicErrorBoundary>} />
                <Route path="/projects/:slug" element={<PublicErrorBoundary><ProjectDetailPage /></PublicErrorBoundary>} />
                <Route path="/equipment" element={<PublicErrorBoundary><EquipmentPage /></PublicErrorBoundary>} />
                <Route path="/equipment/hdd" element={<PublicErrorBoundary><HDDEquipmentPage /></PublicErrorBoundary>} />
                <Route path="/hdd-equipment" element={<PublicErrorBoundary><HDDEquipmentPage /></PublicErrorBoundary>} />
                <Route path="/completed-projects" element={<PublicErrorBoundary><CompletedProjectsPage /></PublicErrorBoundary>} />
                <Route path="/gallery" element={<PublicErrorBoundary><GalleryPage /></PublicErrorBoundary>} />
                <Route path="/projects-gallery" element={<PublicErrorBoundary><ProjectsGalleryPage /></PublicErrorBoundary>} />
                <Route path="/project-map" element={<PublicErrorBoundary><ProjectMapPage /></PublicErrorBoundary>} />
                <Route path="/hse-quality" element={<PublicErrorBoundary><HSEQualityPage /></PublicErrorBoundary>} />
                <Route path="/testimonials" element={<PublicErrorBoundary><TestimonialsPage /></PublicErrorBoundary>} />
                <Route path="/resources" element={<PublicErrorBoundary><ResourcesPage /></PublicErrorBoundary>} />
                <Route path="/partners" element={<PublicErrorBoundary><PartnersPage /></PublicErrorBoundary>} />
                <Route path="/careers" element={<PublicErrorBoundary><CareersPage /></PublicErrorBoundary>} />
                <Route path="/contact" element={<PublicErrorBoundary><ContactPage /></PublicErrorBoundary>} />
                <Route path="/contact-us" element={<PublicErrorBoundary><ContactPage /></PublicErrorBoundary>} />
                <Route path="/management-team" element={<PublicErrorBoundary><ManagementPage /></PublicErrorBoundary>} />
                <Route path="/privacy" element={<PublicErrorBoundary><PrivacyPage /></PublicErrorBoundary>} />
                <Route path="/terms" element={<PublicErrorBoundary><TermsPage /></PublicErrorBoundary>} />

                {/* Admin routes */}
                <Route path="/admin" element={<AdminLoginPage />} />
                <Route path="/admin/*" element={
                  <AdminErrorBoundary>
                    <AdminDashboard />
                  </AdminErrorBoundary>
                } />

                <Route path="*" element={<PublicErrorBoundary><NotFound /></PublicErrorBoundary>} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
