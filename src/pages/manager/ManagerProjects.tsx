import PortalLayout from "@/components/PortalLayout";
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { LayoutDashboard, FolderKanban, Users, BarChart3, Calendar } from "lucide-react";

const navItems = [
  { to: "/manager/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/manager/projects", icon: FolderKanban, label: "Projects" },
  { to: "/manager/team", icon: Users, label: "Team" },
  { to: "/manager/reports", icon: BarChart3, label: "Reports" },
];

const projects = [
  { name: "NovaPM Dashboard", progress: 72, tasks: 34, due: "Mar 15" },
  { name: "Client Portal", progress: 45, tasks: 21, due: "Apr 1" },
  { name: "Mobile App v2", progress: 15, tasks: 12, due: "May 10" },
  { name: "Marketing Website", progress: 88, tasks: 18, due: "Feb 28" },
];

const ManagerProjects = () => (
  <PortalLayout title="My Projects" subtitle="Projects you manage" navItems={navItems} portalName="Manager Portal" portalColor="text-gradient-cosmic">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((p, i) => (
        <GlassCard key={p.name} delay={i * 0.08} glow={i % 2 === 0 ? "cyan" : "purple"}>
          <h3 className="font-semibold text-sm mb-3">{p.name}</h3>
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>Progress</span><span>{p.progress}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-muted/50 overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${p.progress}%` }}
              transition={{ duration: 1, delay: i * 0.1 }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" />
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
            <span>{p.tasks} tasks</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{p.due}</span>
          </div>
        </GlassCard>
      ))}
    </div>
  </PortalLayout>
);

export default ManagerProjects;
