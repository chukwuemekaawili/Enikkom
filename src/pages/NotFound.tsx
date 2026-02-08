import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Phone, Briefcase } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <section className="section-padding min-h-[60vh] flex items-center justify-center">
        <div className="container-wide text-center">
          {/* 404 Visual */}
          <div className="mb-8">
            <span className="text-[120px] md:text-[180px] font-bold text-primary/10 leading-none font-heading">
              404
            </span>
          </div>
          
          <h1 className="text-[28px] md:text-[36px] mb-4">Page Not Found</h1>
          <p className="text-muted-foreground text-[16px] md:text-[17px] max-w-md mx-auto mb-8">
            Sorry, we couldn't find the page you're looking for. It may have been moved or doesn't exist.
          </p>
          
          {/* Navigation Options */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Button asChild size="lg" className="h-12 px-6">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go to Homepage
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-6">
              <Link to="/contact">
                <Phone className="mr-2 h-4 w-4" />
                Contact Us
              </Link>
            </Button>
          </div>
          
          {/* Quick Links */}
          <div className="border-t pt-8">
            <p className="text-sm text-muted-foreground mb-4">Popular pages:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button asChild variant="ghost" size="sm">
                <Link to="/capabilities">Our Services</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to="/projects">Projects</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to="/about">About Us</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to="/equipment">Equipment</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
