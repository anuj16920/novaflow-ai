import PortalLayout from "@/components/PortalLayout";
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import {
  LayoutDashboard, FolderKanban, Users, BarChart3, Settings,
  MoreHorizontal, Calendar, Plus,
} from "lucide-react";

const navItems = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/projects", icon: FolderKanban, label: "Projects" },
  { to: "/admin/users", icon: Users, label: "User Management" },
  { to: "/admin/reports", icon: BarChart3, label: "Reports" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

const projects = [
  { name: "NovaPM Dashboard", status: "Active", progress: 72, members: 5, tasks: 34, due: "Mar 15", budget: "$12,000" },
  { name: "Client Portal", status: "Active", progress: 45, members: 3, tasks: 21, due: "Apr 1", budget: "$8,500" },
  { name: "Mobile App v2", status: "Planning", progress: 15, members: 4, tasks: 12, due: "May 10", budget: "$25,000" },
  { name: "Marketing Website", status: "Active", progress: 88, members: 2, tasks: 18, due: "Feb 28", budget: "$5,000" },
  { name: "API Microservices", status: "On Hold", progress: 30, members: 6, tasks: 45, due: "Jun 1", budget: "$18,000" },
  { name: "Design System", status: "Active", progress: 60, members: 3, tasks: 28, due: "Mar 30", budget: "$7,200" },
];

const statusBadge: Record<string, string> = {
  Active: "bg-emerald-500/20 text-emerald-400",
  Planning: "bg-primary/20 text-primary",
  "On Hold": "bg-muted text-muted-foreground",
};

const AdminProjects = () => (
  <PortalLayout title="Projects" subtitle="Manage all projects" navItems={navItems} portalName="Admin Portal">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">{projects.length} projects</span>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="h-9 px-4 rounded-xl btn-glow text-sm font-medium text-primary-foreground flex items-center gap-2"
      >
        <Plus className="w-4 h-4" /> New Project
      </motion.button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {projects.map((project, i) => (
        <GlassCard key={project.name} delay={i * 0.08} glow={i % 3 === 0 ? "cyan" : i % 3 === 1 ? "purple" : "pink"}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-sm">{project.name}</h3>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusBadge[project.status]}`}>
                {project.status}
              </span>
            </div>
            <button className="w-8 h-8 rounded-lg hover:bg-muted/30 flex items-center justify-center transition-colors">
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>Progress</span>
              <span>{project.progress}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted/50 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Users className="w-3 h-3" />{project.members}</span>
            <span>{project.tasks} tasks</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{project.due}</span>
          </div>
          <div className="mt-2 text-xs font-medium text-primary">{project.budget}</div>
        </GlassCard>
      ))}
    </div>
  </PortalLayout>
);

export default AdminProjects;
