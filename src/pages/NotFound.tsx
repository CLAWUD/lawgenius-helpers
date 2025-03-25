
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-50 p-4">
      <div className="glass-card max-w-md w-full text-center p-8 animate-scale-in">
        <div className="w-20 h-20 rounded-full bg-navy-100 flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl font-bold text-navy-500">404</span>
        </div>
        <h1 className="text-2xl font-bold text-navy-800 mb-4">Page Not Found</h1>
        <p className="text-navy-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="button-primary inline-flex items-center gap-2">
            <ArrowLeft size={16} />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
