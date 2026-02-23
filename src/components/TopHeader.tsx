import { useState, useRef, useEffect } from "react";
import { Bell, Search, Plus, Menu, Sun, Moon, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import CommandPalette from "./CommandPalette";

interface TopHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; to?: string }[];
  onMenuClick?: () => void;
}

const TopHeader = ({ title, subtitle, breadcrumbs, onMenuClick }: TopHeaderProps) => {
  const { notifications, unreadCount, markNotificationRead, clearNotifications, theme, setTheme, currentUser } = useApp();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <header className="h-14 border-b border-border/30 flex items-center justify-between px-4 md:px-6 glass-subtle sticky top-0 z-20">
        <div className="flex items-center gap-3 min-w-0">
          {onMenuClick && (
            <button onClick={onMenuClick} className="md:hidden text-muted-foreground hover:text-foreground">
              <Menu className="w-5 h-5" />
            </button>
          )}
          <div className="min-w-0">
            {breadcrumbs && breadcrumbs.length > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-0.5">
                {breadcrumbs.map((b, i) => (
                  <span key={i} className="flex items-center gap-1">
                    {i > 0 && <ChevronRight className="w-3 h-3" />}
                    {b.to ? <Link to={b.to} className="hover:text-foreground transition-colors">{b.label}</Link> : <span>{b.label}</span>}
                  </span>
                ))}
              </div>
            )}
            <h1 className="text-base font-semibold text-foreground truncate">{title}</h1>
            {subtitle && <p className="text-[11px] text-muted-foreground">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Search trigger */}
          <button
            onClick={() => setCmdOpen(true)}
            className="hidden sm:flex items-center gap-2 h-8 px-3 rounded-xl glass text-xs text-muted-foreground hover:text-foreground transition-all"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search...</span>
            <kbd className="hidden lg:inline text-[10px] px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground">⌘K</kbd>
          </button>

          {/* Quick Add */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/tasks")}
            className="h-8 px-3 rounded-xl btn-glow text-xs font-medium text-primary-foreground flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New</span>
          </motion.button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-8 h-8 rounded-xl glass flex items-center justify-center hover-glow transition-all text-muted-foreground hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Notifications */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative w-8 h-8 rounded-xl glass flex items-center justify-center hover-glow transition-all"
            >
              <Bell className="w-3.5 h-3.5 text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent text-[9px] font-bold flex items-center justify-center text-accent-foreground">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-80 glass-strong rounded-2xl p-2 z-50 shadow-xl"
                >
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-sm font-semibold">Notifications</span>
                    <button onClick={clearNotifications} className="text-xs text-primary hover:underline">Mark all read</button>
                  </div>
                  <div className="max-h-72 overflow-y-auto space-y-0.5">
                    {notifications.slice(0, 5).map((n) => (
                      <button
                        key={n.id}
                        onClick={() => { markNotificationRead(n.id); navigate(n.link); setNotifOpen(false); }}
                        className={`w-full text-left p-3 rounded-xl transition-all hover:bg-muted/30 ${!n.read ? "bg-primary/5" : ""}`}
                      >
                        <p className="text-xs font-medium">{n.title}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{n.message}</p>
                        <p className="text-[10px] text-muted-foreground/60 mt-1">{n.time}</p>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => { navigate("/notifications"); setNotifOpen(false); }}
                    className="w-full mt-1 p-2 rounded-xl text-xs text-primary hover:bg-muted/30 transition-all text-center"
                  >
                    View all notifications
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-8 h-8 rounded-xl bg-gradient-cosmic flex items-center justify-center text-xs font-bold text-foreground"
            >
              {currentUser.avatar}
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-56 glass-strong rounded-2xl p-2 z-50 shadow-xl"
                >
                  <div className="px-3 py-2 border-b border-border/30">
                    <p className="text-sm font-medium">{currentUser.name}</p>
                    <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                  </div>
                  {[
                    { label: "Profile Settings", to: "/settings" },
                    { label: "My Tasks", to: "/tasks" },
                    { label: "Notifications", to: "/notifications" },
                  ].map((item) => (
                    <button
                      key={item.to}
                      onClick={() => { navigate(item.to); setProfileOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all"
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="border-t border-border/30 mt-1 pt-1">
                    <button
                      onClick={() => { navigate("/login"); setProfileOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-sm text-destructive hover:bg-destructive/10 transition-all"
                    >
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </>
  );
};

export default TopHeader;
