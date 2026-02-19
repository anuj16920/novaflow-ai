import PortalLayout from "@/components/PortalLayout";
import GlassCard from "@/components/GlassCard";
import {
  LayoutDashboard, FolderKanban, Users, BarChart3, Settings,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line,
} from "recharts";

const navItems = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/projects", icon: FolderKanban, label: "Projects" },
  { to: "/admin/users", icon: Users, label: "User Management" },
  { to: "/admin/reports", icon: BarChart3, label: "Reports" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

const teamProductivity = [
  { name: "Alex", tasks: 45 }, { name: "Sarah", tasks: 38 }, { name: "John", tasks: 32 },
  { name: "Lisa", tasks: 28 }, { name: "Mike", tasks: 22 },
];

const weeklyTrend = [
  { week: "W1", completed: 42, created: 55 },
  { week: "W2", completed: 58, created: 48 },
  { week: "W3", completed: 65, created: 52 },
  { week: "W4", completed: 72, created: 60 },
];

const tooltipStyle = { background: "hsl(230, 40%, 12%)", border: "1px solid hsl(230, 30%, 28%)", borderRadius: "12px", color: "#fff" };

const AdminReports = () => (
  <PortalLayout title="Reports" subtitle="Analytics & insights" navItems={navItems} portalName="Admin Portal">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {[
        { label: "Avg. Task Completion", value: "3.2 days", sub: "↓ 12% from last month" },
        { label: "Team Utilization", value: "78%", sub: "↑ 5% from last month" },
        { label: "On-Time Delivery", value: "92%", sub: "↑ 3% from last month" },
      ].map((s, i) => (
        <GlassCard key={s.label} glow={["cyan", "purple", "pink"][i] as any} delay={i * 0.1}>
          <p className="text-sm text-muted-foreground">{s.label}</p>
          <p className="text-3xl font-bold mt-1">{s.value}</p>
          <p className="text-xs text-emerald-400 mt-2">{s.sub}</p>
        </GlassCard>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <GlassCard hover={false} delay={0.3}>
        <h3 className="text-sm font-semibold mb-4">Team Productivity</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={teamProductivity}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 30%, 22%)" />
            <XAxis dataKey="name" stroke="hsl(234, 15%, 70%)" fontSize={12} />
            <YAxis stroke="hsl(234, 15%, 70%)" fontSize={12} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="tasks" fill="hsl(187, 100%, 50%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>

      <GlassCard hover={false} delay={0.4}>
        <h3 className="text-sm font-semibold mb-4">Weekly Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={weeklyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 30%, 22%)" />
            <XAxis dataKey="week" stroke="hsl(234, 15%, 70%)" fontSize={12} />
            <YAxis stroke="hsl(234, 15%, 70%)" fontSize={12} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="completed" stroke="hsl(187, 100%, 50%)" strokeWidth={2} dot={{ fill: "hsl(187, 100%, 50%)" }} />
            <Line type="monotone" dataKey="created" stroke="hsl(255, 50%, 58%)" strokeWidth={2} dot={{ fill: "hsl(255, 50%, 58%)" }} />
          </LineChart>
        </ResponsiveContainer>
      </GlassCard>
    </div>
  </PortalLayout>
);

export default AdminReports;
