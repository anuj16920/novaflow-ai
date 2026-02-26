import PortalLayout from "@/components/PortalLayout";
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { LayoutDashboard, FolderKanban, Users, BarChart3, Gauge } from "lucide-react";

const navItems = [
  { to: "/manager/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/manager/projects", icon: FolderKanban, label: "Projects" },
  { to: "/manager/team", icon: Users, label: "Team" },
  { to: "/manager/workload", icon: Gauge, label: "Workload" },
  { to: "/manager/reports", icon: BarChart3, label: "Reports" },
];

const teamCapacity = [
  { name: "John Davis", role: "Frontend Dev", capacity: 90, assigned: 12, max: 14, color: "bg-destructive" },
  { name: "Lisa Rodriguez", role: "Designer", capacity: 55, assigned: 6, max: 10, color: "bg-primary" },
  { name: "Mike Parker", role: "Backend Dev", capacity: 72, assigned: 9, max: 12, color: "bg-accent" },
  { name: "Emma Wilson", role: "QA Engineer", capacity: 40, assigned: 5, max: 12, color: "bg-primary" },
  { name: "Sarah Mitchell", role: "Tech Lead", capacity: 65, assigned: 8, max: 12, color: "bg-secondary" },
];

const ManagerWorkload = () => (
  <PortalLayout title="Team Workload" subtitle="Capacity overview" navItems={navItems} portalName="Manager Portal" portalColor="text-gradient-cosmic">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {[
        { label: "Avg Capacity", value: "64%", glow: "cyan" as const },
        { label: "Overloaded", value: "1", glow: "pink" as const },
        { label: "Available", value: "2", glow: "purple" as const },
      ].map((s, i) => (
        <GlassCard key={s.label} glow={s.glow} delay={i * 0.1}>
          <p className="text-sm text-muted-foreground">{s.label}</p>
          <p className="text-3xl font-bold mt-1">{s.value}</p>
        </GlassCard>
      ))}
    </div>

    <div className="space-y-3">
      {teamCapacity.map((member, i) => (
        <motion.div key={member.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
          <GlassCard delay={0} glow={member.capacity > 80 ? "pink" : "none"}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-cosmic flex items-center justify-center text-sm font-bold flex-shrink-0">
                {member.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <h3 className="text-sm font-medium">{member.name}</h3>
                    <p className="text-[11px] text-muted-foreground">{member.role}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-bold ${member.capacity > 80 ? "text-destructive" : member.capacity > 60 ? "text-accent" : "text-primary"}`}>
                      {member.capacity}%
                    </span>
                    <p className="text-[10px] text-muted-foreground">{member.assigned}/{member.max} tasks</p>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }} animate={{ width: `${member.capacity}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className={`h-full rounded-full ${member.capacity > 80 ? "bg-destructive" : member.capacity > 60 ? "bg-accent" : "bg-primary"}`}
                  />
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  </PortalLayout>
);

export default ManagerWorkload;
