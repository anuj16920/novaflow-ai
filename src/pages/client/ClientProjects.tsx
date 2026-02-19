import PortalLayout from "@/components/PortalLayout";
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { LayoutDashboard, FolderKanban, Receipt, Calendar, Users, Download } from "lucide-react";

const navItems = [
  { to: "/client/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/client/projects", icon: FolderKanban, label: "Projects" },
  { to: "/client/invoices", icon: Receipt, label: "Invoices" },
];

const projects = [
  { name: "NovaPM Dashboard", progress: 72, status: "Active", team: 5, due: "Mar 15",
    milestones: ["Design ✓", "Frontend 70%", "Backend 40%", "Testing —"] },
  { name: "Mobile App v2", progress: 45, status: "Active", team: 4, due: "May 10",
    milestones: ["Planning ✓", "UI Design 60%", "Development 20%", "QA —"] },
];

const ClientProjects = () => (
  <PortalLayout title="My Projects" subtitle="Track your project progress" navItems={navItems} portalName="Client Portal" portalColor="text-gradient-cosmic">
    <div className="space-y-4">
      {projects.map((p, i) => (
        <GlassCard key={p.name} hover={false} delay={i * 0.1} glow={i % 2 === 0 ? "cyan" : "purple"}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{p.team} members</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Due {p.due}</span>
              </div>
            </div>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400">{p.status}</span>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>Overall Progress</span><span>{p.progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${p.progress}%` }}
                transition={{ duration: 1, delay: i * 0.2 }}
                className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {p.milestones.map((m, j) => (
              <div key={j} className="p-2 rounded-lg glass-subtle text-xs text-center text-muted-foreground">{m}</div>
            ))}
          </div>

          <button className="mt-4 flex items-center gap-2 text-xs text-primary hover:underline">
            <Download className="w-3 h-3" /> Download Report
          </button>
        </GlassCard>
      ))}
    </div>
  </PortalLayout>
);

export default ClientProjects;
