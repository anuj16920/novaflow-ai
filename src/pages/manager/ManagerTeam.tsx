import PortalLayout from "@/components/PortalLayout";
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { LayoutDashboard, FolderKanban, Users, BarChart3, Mail } from "lucide-react";

const navItems = [
  { to: "/manager/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/manager/projects", icon: FolderKanban, label: "Projects" },
  { to: "/manager/team", icon: Users, label: "Team" },
  { to: "/manager/reports", icon: BarChart3, label: "Reports" },
];

const team = [
  { name: "John Davis", role: "Frontend Dev", tasks: 12, hours: 38, status: "Available" },
  { name: "Lisa Rodriguez", role: "Designer", tasks: 8, hours: 42, status: "Busy" },
  { name: "Mike Parker", role: "Backend Dev", tasks: 15, hours: 35, status: "Available" },
  { name: "Emma Wilson", role: "QA Engineer", tasks: 6, hours: 30, status: "On Leave" },
];

const statusColor: Record<string, string> = {
  Available: "text-emerald-400",
  Busy: "text-accent",
  "On Leave": "text-muted-foreground",
};

const ManagerTeam = () => (
  <PortalLayout title="Team" subtitle="Your team members" navItems={navItems} portalName="Manager Portal" portalColor="text-gradient-cosmic">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {team.map((m, i) => (
        <GlassCard key={m.name} delay={i * 0.08} glow={i % 3 === 0 ? "cyan" : i % 3 === 1 ? "purple" : "pink"}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-cosmic flex items-center justify-center text-sm font-bold">
              {m.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold">{m.name}</h3>
              <p className="text-xs text-muted-foreground">{m.role}</p>
            </div>
            <span className={`text-xs font-medium ${statusColor[m.status]}`}>{m.status}</span>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="p-2 rounded-lg glass-subtle text-center">
              <p className="text-lg font-bold">{m.tasks}</p>
              <p className="text-[10px] text-muted-foreground">Active Tasks</p>
            </div>
            <div className="p-2 rounded-lg glass-subtle text-center">
              <p className="text-lg font-bold">{m.hours}h</p>
              <p className="text-[10px] text-muted-foreground">This Week</p>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  </PortalLayout>
);

export default ManagerTeam;
