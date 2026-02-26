import { useState } from "react";
import PortalLayout from "@/components/PortalLayout";
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { LayoutDashboard, FolderKanban, Users, BarChart3, Gauge, Flag, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

const navItems = [
  { to: "/manager/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/manager/projects", icon: FolderKanban, label: "Projects" },
  { to: "/manager/milestones", icon: Flag, label: "Milestones" },
  { to: "/manager/team", icon: Users, label: "Team" },
  { to: "/manager/workload", icon: Gauge, label: "Workload" },
  { to: "/manager/reports", icon: BarChart3, label: "Reports" },
];

const milestones = [
  { id: 1, name: "Design System Complete", project: "NovaPM Platform", dueDate: "Feb 28, 2026", status: "completed", progress: 100 },
  { id: 2, name: "MVP Launch", project: "NovaPM Platform", dueDate: "Mar 15, 2026", status: "in_progress", progress: 68 },
  { id: 3, name: "API v2 Release", project: "Backend Services", dueDate: "Mar 30, 2026", status: "in_progress", progress: 45 },
  { id: 4, name: "Beta Testing", project: "Mobile App v2", dueDate: "Apr 10, 2026", status: "at_risk", progress: 20 },
  { id: 5, name: "Client Portal Launch", project: "Client Portal", dueDate: "May 1, 2026", status: "upcoming", progress: 0 },
  { id: 6, name: "Performance Audit", project: "Dashboard Redesign", dueDate: "Mar 10, 2026", status: "in_progress", progress: 82 },
];

const statusConfig: Record<string, { icon: typeof CheckCircle2; color: string; label: string }> = {
  completed: { icon: CheckCircle2, color: "text-emerald-400", label: "Completed" },
  in_progress: { icon: Clock, color: "text-primary", label: "In Progress" },
  at_risk: { icon: AlertTriangle, color: "text-accent", label: "At Risk" },
  upcoming: { icon: Flag, color: "text-muted-foreground", label: "Upcoming" },
};

const ManagerMilestones = () => {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? milestones : milestones.filter((m) => m.status === filter);

  return (
    <PortalLayout title="Milestones" subtitle="Project milestones" navItems={navItems} portalName="Manager Portal" portalColor="text-gradient-cosmic">
      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", "completed", "in_progress", "at_risk", "upcoming"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`h-8 px-4 rounded-xl text-xs font-medium transition-all capitalize ${filter === f ? "btn-glow text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"}`}>
            {f.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((ms, i) => {
          const config = statusConfig[ms.status];
          const Icon = config.icon;
          return (
            <motion.div key={ms.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <GlassCard delay={0} glow={ms.status === "at_risk" ? "pink" : ms.status === "completed" ? "cyan" : "none"}>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-xl glass flex items-center justify-center flex-shrink-0 ${config.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium truncate">{ms.name}</h3>
                      <p className="text-[11px] text-muted-foreground">{ms.project} · Due {ms.dueDate}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 ${ms.status === "completed" ? "bg-emerald-500/20 text-emerald-400" : ms.status === "at_risk" ? "bg-accent/20 text-accent" : ms.status === "in_progress" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                    {config.label}
                  </span>
                </div>
                {ms.progress > 0 && (
                  <div>
                    <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                      <span>Progress</span><span>{ms.progress}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${ms.progress}%` }} transition={{ duration: 0.8, delay: i * 0.1 }}
                        className={`h-full rounded-full ${ms.status === "at_risk" ? "bg-accent" : "bg-primary"}`} />
                    </div>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </PortalLayout>
  );
};

export default ManagerMilestones;
