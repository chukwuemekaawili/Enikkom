import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { EditModeProvider } from "@/contexts/EditModeContext";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CompanyIntroPage from "./pages/CompanyIntroPage";
import CapabilitiesPage from "./pages/CapabilitiesPage";
import CapabilityDetailPage from "./pages/CapabilityDetailPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import EquipmentPage from "./pages/EquipmentPage";
import HDDEquipmentPage from "./pages/HDDEquipmentPage";
import CompletedProjectsPage from "./pages/CompletedProjectsPage";
import HSEQualityPage from "./pages/HSEQualityPage";
import CareersPage from "./pages/CareersPage";
import ContactPage from "./pages/ContactPage";
import ServicesPage from "./pages/ServicesPage";
import ManagementPage from "./pages/ManagementPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import GalleryPage from "./pages/GalleryPage";
import ProjectsGalleryPage from "./pages/ProjectsGalleryPage";
import ProjectMapPage from "./pages/ProjectMapPage";
import ResourcesPage from "./pages/ResourcesPage";
import PartnersPage from "./pages/PartnersPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <EditModeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/company-introduction" element={<CompanyIntroPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/our-services" element={<ServicesPage />} />
              <Route path="/capabilities" element={<CapabilitiesPage />} />
              <Route path="/capabilities/:slug" element={<CapabilityDetailPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/portfolio" element={<ProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectDetailPage />} />
              <Route path="/equipment" element={<EquipmentPage />} />
              <Route path="/equipment/hdd" element={<HDDEquipmentPage />} />
              <Route path="/hdd-equipment" element={<HDDEquipmentPage />} />
              <Route path="/completed-projects" element={<CompletedProjectsPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/projects-gallery" element={<ProjectsGalleryPage />} />
              <Route path="/project-map" element={<ProjectMapPage />} />
              <Route path="/hse-quality" element={<HSEQualityPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/partners" element={<PartnersPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/contact-us" element={<ContactPage />} />
              <Route path="/management-team" element={<ManagementPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              
              {/* Admin routes */}
              <Route path="/admin" element={<AdminLoginPage />} />
              <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </EditModeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
