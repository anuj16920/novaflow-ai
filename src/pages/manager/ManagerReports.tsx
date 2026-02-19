import PortalLayout from "@/components/PortalLayout";
import GlassCard from "@/components/GlassCard";
import { LayoutDashboard, FolderKanban, Users, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const navItems = [
  { to: "/manager/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/manager/projects", icon: FolderKanban, label: "Projects" },
  { to: "/manager/team", icon: Users, label: "Team" },
  { to: "/manager/reports", icon: BarChart3, label: "Reports" },
];

const sprintData = [
  { sprint: "S1", completed: 28, planned: 30 },
  { sprint: "S2", completed: 35, planned: 32 },
  { sprint: "S3", completed: 40, planned: 42 },
  { sprint: "S4", completed: 38, planned: 35 },
];

const taskBreakdown = [
  { name: "Feature", value: 45, color: "hsl(187, 100%, 50%)" },
  { name: "Bug Fix", value: 25, color: "hsl(255, 50%, 58%)" },
  { name: "Chore", value: 20, color: "hsl(320, 100%, 70%)" },
  { name: "Research", value: 10, color: "hsl(142, 71%, 45%)" },
];

const tooltipStyle = { background: "hsl(230, 40%, 12%)", border: "1px solid hsl(230, 30%, 28%)", borderRadius: "12px", color: "#fff" };

const ManagerReports = () => (
  <PortalLayout title="Reports" subtitle="Sprint & team analytics" navItems={navItems} portalName="Manager Portal" portalColor="text-gradient-cosmic">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <GlassCard hover={false} delay={0.1}>
        <h3 className="text-sm font-semibold mb-4">Sprint Velocity</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={sprintData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 30%, 22%)" />
            <XAxis dataKey="sprint" stroke="hsl(234, 15%, 70%)" fontSize={12} />
            <YAxis stroke="hsl(234, 15%, 70%)" fontSize={12} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="completed" fill="hsl(187, 100%, 50%)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="planned" fill="hsl(255, 50%, 58%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>

      <GlassCard hover={false} delay={0.2} glow="purple">
        <h3 className="text-sm font-semibold mb-4">Task Breakdown</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={taskBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
              {taskBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap justify-center gap-3 mt-2">
          {taskBreakdown.map((t) => (
            <div key={t.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="w-2 h-2 rounded-full" style={{ background: t.color }} /> {t.name}
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  </PortalLayout>
);

export default ManagerReports;
