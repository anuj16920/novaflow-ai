import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import StarField from "@/components/StarField";
import { motion } from "framer-motion";
import { Sparkles, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <StarField />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center"
      >
        <p className="text-8xl font-extrabold text-gradient-cosmic mb-4">404</p>
        <h1 className="text-xl font-semibold mb-2">Lost in space</h1>
        <p className="text-muted-foreground mb-6">This page doesn't exist in this galaxy.</p>
        <Link to="/" className="inline-flex items-center gap-2 h-10 px-6 rounded-xl btn-glow text-sm font-medium text-primary-foreground">
          <ArrowLeft className="w-4 h-4" /> Return Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
