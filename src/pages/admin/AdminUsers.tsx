import PortalLayout from "@/components/PortalLayout";
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import {
  LayoutDashboard, FolderKanban, Users, BarChart3, Settings,
  MoreHorizontal, Shield, Mail, Plus,
} from "lucide-react";

const navItems = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/projects", icon: FolderKanban, label: "Projects" },
  { to: "/admin/users", icon: Users, label: "User Management" },
  { to: "/admin/reports", icon: BarChart3, label: "Reports" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

const users = [
  { name: "Alex Kim", email: "alex@novapm.com", role: "Admin", status: "Active", projects: 8 },
  { name: "Sarah Miller", email: "sarah@novapm.com", role: "Manager", status: "Active", projects: 5 },
  { name: "John Davis", email: "john@novapm.com", role: "Member", status: "Active", projects: 3 },
  { name: "Lisa Rodriguez", email: "lisa@novapm.com", role: "Member", status: "Active", projects: 4 },
  { name: "Mike Parker", email: "mike@novapm.com", role: "Manager", status: "Inactive", projects: 2 },
  { name: "Emma Wilson", email: "emma@client.com", role: "Client", status: "Active", projects: 1 },
];

const roleBadge: Record<string, string> = {
  Admin: "bg-accent/20 text-accent",
  Manager: "bg-secondary/20 text-secondary",
  Member: "bg-primary/20 text-primary",
  Client: "bg-muted text-muted-foreground",
};

const AdminUsers = () => (
  <PortalLayout title="User Management" subtitle="Manage team members" navItems={navItems} portalName="Admin Portal">
    <div className="flex items-center justify-between mb-6">
      <span className="text-sm text-muted-foreground">{users.length} users</span>
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        className="h-9 px-4 rounded-xl btn-glow text-sm font-medium text-primary-foreground flex items-center gap-2">
        <Plus className="w-4 h-4" /> Invite User
      </motion.button>
    </div>

    <GlassCard hover={false}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/30">
              <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">User</th>
              <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">Role</th>
              <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">Status</th>
              <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">Projects</th>
              <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <motion.tr
                key={user.email}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="border-b border-border/10 hover:bg-muted/10 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-cosmic flex items-center justify-center text-xs font-bold">
                      {user.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3" />{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`text-[10px] font-semibold px-2 py-1 rounded-full flex items-center gap-1 w-fit ${roleBadge[user.role]}`}>
                    <Shield className="w-3 h-3" />{user.role}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`text-xs font-medium ${user.status === "Active" ? "text-emerald-400" : "text-muted-foreground"}`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-muted-foreground">{user.projects}</td>
                <td className="py-3 px-4 text-right">
                  <button className="w-8 h-8 rounded-lg hover:bg-muted/30 flex items-center justify-center transition-colors ml-auto">
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  </PortalLayout>
);

export default AdminUsers;
