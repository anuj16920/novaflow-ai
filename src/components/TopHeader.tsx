import { Bell, Search, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface TopHeaderProps {
  title: string;
  subtitle?: string;
}

const TopHeader = ({ title, subtitle }: TopHeaderProps) => {
  return (
    <header className="h-16 border-b border-border/30 flex items-center justify-between px-6 glass-subtle sticky top-0 z-20">
      <div>
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 h-9 pl-9 pr-4 rounded-xl glass text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all bg-transparent"
          />
        </div>

        {/* New Task */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-9 px-4 rounded-xl btn-glow text-sm font-medium text-primary-foreground flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Task</span>
        </motion.button>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl glass flex items-center justify-center hover-glow transition-all">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent text-[10px] font-bold flex items-center justify-center text-accent-foreground">
            3
          </span>
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl bg-gradient-cosmic flex items-center justify-center text-sm font-bold text-foreground">
          A
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
