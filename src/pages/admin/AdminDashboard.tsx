import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Settings, 
  FileText, 
  Image, 
  Mail, 
  LogOut, 
  Menu,
  X,
  Home,
  Search,
  Users,
  Palette,
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

// Import admin sub-pages
import DashboardHome from './DashboardHome';
import BrandingSettings from './BrandingSettings';
import SEOSettings from './SEOSettings';
import ContentEditor from './ContentEditor';
import MediaManager from './MediaManager';
import RFQManager from './RFQManager';
import TeamManager from './TeamManager';
import PagesEditor from './PagesEditor';
import GalleryManager from './GalleryManager';

const navItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/dashboard/branding', label: 'Branding & Contact', icon: Palette },
  { path: '/admin/dashboard/seo', label: 'SEO & Hero', icon: Search },
  { path: '/admin/dashboard/pages', label: 'All Pages', icon: Globe },
  { path: '/admin/dashboard/team', label: 'Team Members', icon: Users },
  { path: '/admin/dashboard/gallery', label: 'Gallery', icon: Image },
  { path: '/admin/dashboard/media', label: 'Media Library', icon: Image },
  { path: '/admin/dashboard/rfq', label: 'RFQ Submissions', icon: Mail },
];

const AdminDashboard: React.FC = () => {
  const { user, signOut, isAdmin, isLoading } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background border-b z-50 flex items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        <span className="ml-4 font-semibold text-lg">Admin Panel</span>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-64 bg-background border-r transition-transform lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b">
            <span className="font-bold text-xl text-primary">ECL Admin</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t space-y-3">
            <div className="px-4 py-2">
              <p className="text-sm font-medium truncate">{user?.email}</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                asChild
              >
                <a href="/" target="_blank" rel="noopener noreferrer">
                  <Home className="h-4 w-4 mr-2" />
                  View Site
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-4 lg:p-8">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="branding" element={<BrandingSettings />} />
            <Route path="seo" element={<SEOSettings />} />
            <Route path="content" element={<ContentEditor />} />
            <Route path="pages" element={<PagesEditor />} />
            <Route path="team" element={<TeamManager />} />
            <Route path="gallery" element={<GalleryManager />} />
            <Route path="media" element={<MediaManager />} />
            <Route path="rfq" element={<RFQManager />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
