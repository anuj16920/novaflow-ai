import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: "cyan" | "purple" | "pink" | "none";
  hover?: boolean;
  delay?: number;
}

const glowMap = {
  cyan: "glow-cyan",
  purple: "glow-purple",
  pink: "glow-pink",
  none: "",
};

const GlassCard = ({ children, className = "", glow = "none", hover = true, delay = 0 }: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
      className={`glass rounded-2xl p-6 ${hover ? "hover-glow cursor-pointer" : ""} ${glowMap[glow]} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
