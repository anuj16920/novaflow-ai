import PortalLayout from "@/components/PortalLayout";
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import {
  LayoutDashboard, FolderKanban, Users, BarChart3,
  TrendingUp, CheckCircle2, Clock, AlertTriangle,
  ArrowUpRight, Sparkles,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const navItems = [
  { to: "/manager/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/manager/projects", icon: FolderKanban, label: "Projects" },
  { to: "/manager/team", icon: Users, label: "Team" },
  { to: "/manager/reports", icon: BarChart3, label: "Reports" },
];

const stats = [
  { label: "My Projects", value: "8", icon: FolderKanban, glow: "cyan" as const },
  { label: "Tasks This Week", value: "24", icon: CheckCircle2, glow: "purple" as const },
  { label: "Hours Logged", value: "36h", icon: Clock, glow: "pink" as const },
  { label: "At Risk", value: "2", icon: AlertTriangle, glow: "cyan" as const },
];

const teamPerformance = [
  { name: "John", tasks: 12 }, { name: "Lisa", tasks: 18 },
  { name: "Mike", tasks: 15 }, { name: "Emma", tasks: 10 },
];

const tooltipStyle = { background: "hsl(230, 40%, 12%)", border: "1px solid hsl(230, 30%, 28%)", borderRadius: "12px", color: "#fff" };

const ManagerDashboard = () => (
  <PortalLayout title="Manager Dashboard" subtitle="Your team overview" navItems={navItems} portalName="Manager Portal" portalColor="text-gradient-cosmic">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((s, i) => (
        <GlassCard key={s.label} glow={s.glow} delay={i * 0.1}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="text-3xl font-bold mt-1">{s.value}</p>
            </div>
            <div className="w-10 h-10 rounded-xl glass flex items-center justify-center">
              <s.icon className="w-5 h-5 text-primary" />
            </div>
          </div>
        </GlassCard>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <GlassCard hover={false} delay={0.3}>
        <h3 className="text-sm font-semibold mb-4">Team Performance</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={teamPerformance}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 30%, 22%)" />
            <XAxis dataKey="name" stroke="hsl(234, 15%, 70%)" fontSize={12} />
            <YAxis stroke="hsl(234, 15%, 70%)" fontSize={12} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="tasks" fill="hsl(255, 50%, 58%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>

      <GlassCard hover={false} delay={0.4} glow="purple">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-secondary" />
          <h3 className="text-sm font-semibold">AI Recommendations</h3>
        </div>
        <div className="space-y-3">
          {[
            "Reassign 2 tasks from John — he's at 120% capacity",
            "Sprint goal at risk: 3 tasks haven't started yet",
            "Lisa has bandwidth — consider assigning the new feature work",
          ].map((insight, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.12 }}
              className="p-3 rounded-xl glass-subtle text-sm text-muted-foreground">
              {insight}
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  </PortalLayout>
);

export default ManagerDashboard;
