import { useState } from "react";
import PortalLayout from "@/components/PortalLayout";
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import {
  LayoutDashboard, FolderKanban, Users, BarChart3, Settings, ScrollText,
  Search, Download, Filter,
} from "lucide-react";

const navItems = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/projects", icon: FolderKanban, label: "Projects" },
  { to: "/admin/users", icon: Users, label: "User Management" },
  { to: "/admin/reports", icon: BarChart3, label: "Reports" },
  { to: "/admin/audit-logs", icon: ScrollText, label: "Audit Logs" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

const logs = [
  { id: 1, user: "Alex Kim", action: "Updated project settings", target: "NovaPM Platform", timestamp: "2026-02-26 14:32", ip: "192.168.1.12" },
  { id: 2, user: "Sarah Mitchell", action: "Deleted task", target: "Old migration script", timestamp: "2026-02-26 13:15", ip: "192.168.1.45" },
  { id: 3, user: "John Davis", action: "Invited user", target: "emma@client.com", timestamp: "2026-02-26 11:02", ip: "10.0.0.8" },
  { id: 4, user: "Alex Kim", action: "Changed user role", target: "Mike Parker → Manager", timestamp: "2026-02-25 17:45", ip: "192.168.1.12" },
  { id: 5, user: "Lisa Ray", action: "Archived project", target: "Legacy Dashboard", timestamp: "2026-02-25 15:20", ip: "10.0.0.22" },
  { id: 6, user: "Alex Kim", action: "Updated billing plan", target: "Pro → Enterprise", timestamp: "2026-02-25 10:10", ip: "192.168.1.12" },
  { id: 7, user: "Sarah Mitchell", action: "Created automation", target: "Auto-assign on creation", timestamp: "2026-02-24 16:30", ip: "192.168.1.45" },
  { id: 8, user: "John Davis", action: "Reset password", target: "Self", timestamp: "2026-02-24 09:05", ip: "10.0.0.8" },
];

const AdminAuditLogs = () => {
  const [search, setSearch] = useState("");
  const [userFilter, setUserFilter] = useState("all");

  const uniqueUsers = [...new Set(logs.map((l) => l.user))];
  const filtered = logs.filter((l) => {
    if (search && !l.action.toLowerCase().includes(search.toLowerCase()) && !l.target.toLowerCase().includes(search.toLowerCase())) return false;
    if (userFilter !== "all" && l.user !== userFilter) return false;
    return true;
  });

  return (
    <PortalLayout title="Audit Logs" subtitle="System activity trail" navItems={navItems} portalName="Admin Portal">
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search logs..." className="w-full h-9 pl-9 pr-4 rounded-xl glass bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
        </div>
        <div className="flex gap-2">
          <select value={userFilter} onChange={(e) => setUserFilter(e.target.value)} className="h-9 px-3 rounded-xl glass bg-transparent text-xs focus:outline-none">
            <option value="all" className="bg-card">All Users</option>
            {uniqueUsers.map((u) => <option key={u} value={u} className="bg-card">{u}</option>)}
          </select>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="h-9 px-4 rounded-xl btn-glow-outline text-xs font-medium flex items-center gap-2">
            <Download className="w-3.5 h-3.5" /> Export
          </motion.button>
        </div>
      </div>

      <GlassCard hover={false}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">User</th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">Action</th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4 hidden md:table-cell">Target</th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4 hidden lg:table-cell">IP</th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log, i) => (
                <motion.tr key={log.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="border-b border-border/10 hover:bg-muted/10 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-cosmic flex items-center justify-center text-[10px] font-bold">{log.user.split(" ").map(n => n[0]).join("")}</div>
                      <span className="text-sm font-medium">{log.user}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{log.action}</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground hidden md:table-cell">{log.target}</td>
                  <td className="py-3 px-4 text-xs text-muted-foreground font-mono hidden lg:table-cell">{log.ip}</td>
                  <td className="py-3 px-4 text-xs text-muted-foreground">{log.timestamp}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </PortalLayout>
  );
};

export default AdminAuditLogs;
