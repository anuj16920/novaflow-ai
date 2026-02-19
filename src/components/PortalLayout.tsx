import { ReactNode } from "react";
import { NavLink as RouterNavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, LogOut, Sparkles } from "lucide-react";
import { useState } from "react";
import StarField from "./StarField";
import TopHeader from "./TopHeader";
import { LucideIcon } from "lucide-react";

export interface NavItem {
  to: string;
  icon: LucideIcon;
  label: string;
}

interface PortalLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  navItems: NavItem[];
  portalName: string;
  portalColor?: string;
}

const PortalLayout = ({ children, title, subtitle, navItems, portalName, portalColor = "text-gradient-cyan" }: PortalLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full relative">
      <StarField />

      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1, width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.3 }}
        className="h-screen sticky top-0 flex flex-col bg-gradient-sidebar border-r border-border/50 z-30"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-16 border-b border-border/30">
          <div className="w-8 h-8 rounded-lg btn-glow flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
              <span className={`text-lg font-bold ${portalColor}`}>NovaPM</span>
              <span className="text-[10px] text-muted-foreground -mt-1">{portalName}</span>
            </motion.div>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <RouterNavLink
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                  isActive
                    ? "glass-strong text-foreground glow-cyan"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="portal-sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-primary" : "group-hover:text-primary/70"}`} />
                {!collapsed && <span className="text-sm font-medium truncate">{item.label}</span>}
              </RouterNavLink>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-border/30">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            {!collapsed && <span className="text-sm font-medium">Collapse</span>}
          </button>
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all mt-1"
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      <div className="flex-1 flex flex-col relative z-10">
        <TopHeader title={title} subtitle={subtitle} />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default PortalLayout;
