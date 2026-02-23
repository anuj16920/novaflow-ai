import { ReactNode, useState } from "react";
import { NavLink as RouterNavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderKanban, CheckSquare, Calendar, BarChart3, Users, Briefcase, FolderOpen,
  Bell, Zap, Settings, Shield, ChevronLeft, ChevronRight, LogOut, Sparkles, Menu, X,
} from "lucide-react";
import StarField from "./StarField";
import TopHeader from "./TopHeader";
import { useApp } from "@/contexts/AppContext";
import { LucideIcon } from "lucide-react";

interface NavSection {
  label: string;
  items: { to: string; icon: LucideIcon; label: string }[];
}

const navSections: NavSection[] = [
  {
    label: "Main",
    items: [
      { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { to: "/projects", icon: FolderKanban, label: "Projects" },
      { to: "/tasks", icon: CheckSquare, label: "Tasks" },
      { to: "/kanban", icon: FolderKanban, label: "Kanban Board" },
      { to: "/calendar", icon: Calendar, label: "Calendar" },
    ],
  },
  {
    label: "Manage",
    items: [
      { to: "/reports", icon: BarChart3, label: "Reports" },
      { to: "/team", icon: Users, label: "Team" },
      { to: "/clients", icon: Briefcase, label: "Clients" },
      { to: "/files", icon: FolderOpen, label: "Files" },
    ],
  },
  {
    label: "System",
    items: [
      { to: "/notifications", icon: Bell, label: "Notifications" },
      { to: "/automations", icon: Zap, label: "Automations" },
      { to: "/settings", icon: Settings, label: "Settings" },
      { to: "/admin/dashboard", icon: Shield, label: "Admin Portal" },
    ],
  },
];

interface MainLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; to?: string }[];
}

const MainLayout = ({ children, title, subtitle, breadcrumbs }: MainLayoutProps) => {
  const { sidebarCollapsed, setSidebarCollapsed, unreadCount } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => {
    const collapsed = mobile ? false : sidebarCollapsed;

    return (
      <>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-border/30 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg btn-glow flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            {!collapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg font-bold text-gradient-cyan">
                NovaPM
              </motion.span>
            )}
          </div>
          {mobile && (
            <button onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-6 overflow-y-auto">
          {navSections.map((section) => (
            <div key={section.label}>
              {!collapsed && (
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 px-3 mb-2">
                  {section.label}
                </p>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + "/");
                  const showBadge = item.to === "/notifications" && unreadCount > 0;
                  return (
                    <RouterNavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => mobile && setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group relative ${
                        isActive
                          ? "glass-strong text-foreground glow-cyan"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="main-sidebar-active"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-primary"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <item.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-primary" : "group-hover:text-primary/70"}`} />
                      {!collapsed && <span className="text-sm font-medium truncate">{item.label}</span>}
                      {showBadge && !collapsed && (
                        <span className="ml-auto w-5 h-5 rounded-full bg-accent text-[10px] font-bold flex items-center justify-center text-accent-foreground">
                          {unreadCount}
                        </span>
                      )}
                    </RouterNavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-3 border-t border-border/30 flex-shrink-0">
          {!mobile && (
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl w-full text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all"
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              {!collapsed && <span className="text-sm">Collapse</span>}
            </button>
          )}
          <button
            onClick={() => { navigate("/login"); mobile && setMobileOpen(false); }}
            className="flex items-center gap-3 px-3 py-2 rounded-xl w-full text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all"
          >
            <LogOut className="w-4 h-4" />
            {(!collapsed || mobile) && <span className="text-sm">Sign Out</span>}
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="flex min-h-screen w-full relative">
      <StarField />

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarCollapsed ? 72 : 260 }}
        transition={{ duration: 0.25 }}
        className="hidden md:flex h-screen sticky top-0 flex-col bg-gradient-sidebar border-r border-border/50 z-30"
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-[260px] flex flex-col bg-gradient-sidebar border-r border-border/50 z-50 md:hidden"
            >
              <SidebarContent mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10 min-w-0">
        <TopHeader
          title={title}
          subtitle={subtitle}
          breadcrumbs={breadcrumbs}
          onMenuClick={() => setMobileOpen(true)}
        />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
