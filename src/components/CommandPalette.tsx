import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, LayoutDashboard, FolderKanban, CheckSquare, Calendar, BarChart3, Users, Settings, Zap, FolderOpen, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const allCommands = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard, section: "Pages" },
  { label: "Projects", to: "/projects", icon: FolderKanban, section: "Pages" },
  { label: "Tasks", to: "/tasks", icon: CheckSquare, section: "Pages" },
  { label: "Kanban Board", to: "/kanban", icon: FolderKanban, section: "Pages" },
  { label: "Calendar", to: "/calendar", icon: Calendar, section: "Pages" },
  { label: "Reports", to: "/reports", icon: BarChart3, section: "Pages" },
  { label: "Team", to: "/team", icon: Users, section: "Pages" },
  { label: "Files", to: "/files", icon: FolderOpen, section: "Pages" },
  { label: "Notifications", to: "/notifications", icon: Bell, section: "Pages" },
  { label: "Automations", to: "/automations", icon: Zap, section: "Pages" },
  { label: "Settings", to: "/settings", icon: Settings, section: "Pages" },
  { label: "Admin Dashboard", to: "/admin/dashboard", icon: LayoutDashboard, section: "Admin" },
  { label: "Admin Users", to: "/admin/users", icon: Users, section: "Admin" },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

const CommandPalette = ({ open, onClose }: Props) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);

  const filtered = allCommands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => { setSelected(0); }, [query]);

  const go = (to: string) => { navigate(to); onClose(); };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
    else if (e.key === "Enter" && filtered[selected]) { go(filtered[selected].to); }
    else if (e.key === "Escape") { onClose(); }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[90%] max-w-lg glass-strong rounded-2xl z-50 overflow-hidden shadow-2xl"
          >
            <div className="flex items-center gap-3 px-4 h-12 border-b border-border/30">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search pages, commands..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground">ESC</kbd>
            </div>
            <div className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-6">No results found</p>
              )}
              {filtered.map((cmd, i) => (
                <button
                  key={cmd.to}
                  onClick={() => go(cmd.to)}
                  onMouseEnter={() => setSelected(i)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                    i === selected ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <cmd.icon className="w-4 h-4" />
                  <span>{cmd.label}</span>
                  <span className="ml-auto text-[10px] text-muted-foreground/50">{cmd.section}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
