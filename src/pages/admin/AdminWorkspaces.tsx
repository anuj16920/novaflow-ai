import { useState } from "react";
import PortalLayout from "@/components/PortalLayout";
import GlassCard from "@/components/GlassCard";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderKanban, Users, BarChart3, Settings, Building2, ScrollText,
  MoreHorizontal, X,
} from "lucide-react";

const navItems = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/projects", icon: FolderKanban, label: "Projects" },
  { to: "/admin/users", icon: Users, label: "User Management" },
  { to: "/admin/reports", icon: BarChart3, label: "Reports" },
  { to: "/admin/workspaces", icon: Building2, label: "Workspaces" },
  { to: "/admin/audit-logs", icon: ScrollText, label: "Audit Logs" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

const workspaces = [
  { id: "w1", name: "NovaPM Workspace", plan: "Enterprise", members: 24, projects: 12, storage: "42 GB", status: true },
  { id: "w2", name: "Design Team", plan: "Pro", members: 8, projects: 5, storage: "12 GB", status: true },
  { id: "w3", name: "Client Projects", plan: "Pro", members: 15, projects: 8, storage: "28 GB", status: true },
  { id: "w4", name: "Legacy Workspace", plan: "Starter", members: 3, projects: 1, storage: "2 GB", status: false },
];

const AdminWorkspaces = () => {
  const [editModal, setEditModal] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<Record<string, boolean>>(
    Object.fromEntries(workspaces.map((w) => [w.id, w.status]))
  );

  const toggleStatus = (id: string) => {
    setStatuses((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const editingWorkspace = workspaces.find((w) => w.id === editModal);

  return (
    <PortalLayout title="Workspaces" subtitle="Manage all workspaces" navItems={navItems} portalName="Admin Portal">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {workspaces.map((ws, i) => (
          <GlassCard key={ws.id} delay={i * 0.08} glow={statuses[ws.id] ? "cyan" : "none"}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{ws.name}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary">{ws.plan}</span>
                </div>
              </div>
              <button onClick={() => setEditModal(ws.id)} className="w-8 h-8 rounded-lg hover:bg-muted/30 flex items-center justify-center transition-colors">
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="p-2 rounded-lg glass-subtle text-center">
                <p className="text-sm font-bold">{ws.members}</p>
                <p className="text-[10px] text-muted-foreground">Members</p>
              </div>
              <div className="p-2 rounded-lg glass-subtle text-center">
                <p className="text-sm font-bold">{ws.projects}</p>
                <p className="text-[10px] text-muted-foreground">Projects</p>
              </div>
              <div className="p-2 rounded-lg glass-subtle text-center">
                <p className="text-sm font-bold">{ws.storage}</p>
                <p className="text-[10px] text-muted-foreground">Storage</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className={`text-xs font-medium ${statuses[ws.id] ? "text-emerald-400" : "text-muted-foreground"}`}>
                {statuses[ws.id] ? "Active" : "Suspended"}
              </span>
              <button onClick={() => toggleStatus(ws.id)} className={`relative w-11 h-6 rounded-full transition-all ${statuses[ws.id] ? "bg-primary" : "bg-muted"}`}>
                <motion.div animate={{ x: statuses[ws.id] ? 20 : 2 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} className="absolute top-1 w-4 h-4 rounded-full bg-foreground" />
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editModal && editingWorkspace && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditModal(null)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={(e) => e.stopPropagation()} className="glass-strong rounded-2xl w-full max-w-md p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold">Edit Workspace</h2>
                <button onClick={() => setEditModal(null)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Workspace Name</label>
                  <input defaultValue={editingWorkspace.name} className="w-full h-10 px-4 rounded-xl glass bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Plan</label>
                  <select defaultValue={editingWorkspace.plan} className="w-full h-10 px-3 rounded-xl glass bg-transparent text-sm focus:outline-none">
                    {["Starter", "Pro", "Enterprise"].map((p) => <option key={p} value={p} className="bg-card">{p}</option>)}
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setEditModal(null)} className="flex-1 h-10 rounded-xl btn-glow-outline text-sm font-medium">Cancel</button>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setEditModal(null)} className="flex-1 h-10 rounded-xl btn-glow text-sm font-semibold text-primary-foreground">Save</motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PortalLayout>
  );
};

export default AdminWorkspaces;
