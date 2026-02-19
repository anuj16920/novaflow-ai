import PortalLayout from "@/components/PortalLayout";
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import {
  LayoutDashboard, FolderKanban, Users, BarChart3, Settings,
  TrendingUp, CheckCircle2, Clock, DollarSign, ArrowUpRight, ArrowDownRight, Sparkles,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

const navItems = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/projects", icon: FolderKanban, label: "Projects" },
  { to: "/admin/users", icon: Users, label: "User Management" },
  { to: "/admin/reports", icon: BarChart3, label: "Reports" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

const stats = [
  { label: "Total Revenue", value: "$124,500", change: "+18%", up: true, icon: DollarSign, glow: "cyan" as const },
  { label: "Active Projects", value: "32", change: "+5", up: true, icon: FolderKanban, glow: "purple" as const },
  { label: "Tasks Completed", value: "487", change: "+12%", up: true, icon: CheckCircle2, glow: "pink" as const },
  { label: "Team Members", value: "24", change: "+3", up: true, icon: Users, glow: "cyan" as const },
];

const revenueData = [
  { month: "Jan", revenue: 18000 }, { month: "Feb", revenue: 22000 }, { month: "Mar", revenue: 19500 },
  { month: "Apr", revenue: 28000 }, { month: "May", revenue: 32000 }, { month: "Jun", revenue: 35000 },
];

const projectStatus = [
  { name: "Active", value: 18, color: "hsl(187, 100%, 50%)" },
  { name: "Completed", value: 10, color: "hsl(142, 71%, 45%)" },
  { name: "On Hold", value: 4, color: "hsl(255, 50%, 58%)" },
];

const recentActivity = [
  { user: "Alex K.", action: "completed task", target: "API Integration", time: "2m ago" },
  { user: "Sarah M.", action: "created project", target: "Mobile App v3", time: "15m ago" },
  { user: "John D.", action: "commented on", target: "Dashboard Redesign", time: "1h ago" },
  { user: "Lisa R.", action: "assigned", target: "Bug Fix Sprint", time: "2h ago" },
  { user: "Mike P.", action: "updated status", target: "Client Portal", time: "3h ago" },
];

const AdminDashboard = () => (
  <PortalLayout title="Admin Dashboard" subtitle="System overview" navItems={navItems} portalName="Admin Portal">
    {/* Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, i) => (
        <GlassCard key={stat.label} glow={stat.glow} delay={i * 0.1}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-3xl font-bold mt-1">{stat.value}</p>
              <div className={`flex items-center gap-1 mt-2 text-xs ${stat.up ? "text-emerald-400" : "text-red-400"}`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl glass flex items-center justify-center">
              <stat.icon className="w-5 h-5 text-primary" />
            </div>
          </div>
        </GlassCard>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      {/* Revenue Chart */}
      <GlassCard className="lg:col-span-2" hover={false} delay={0.3}>
        <h3 className="text-sm font-semibold mb-4">Revenue Overview</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 30%, 22%)" />
            <XAxis dataKey="month" stroke="hsl(234, 15%, 70%)" fontSize={12} />
            <YAxis stroke="hsl(234, 15%, 70%)" fontSize={12} />
            <Tooltip contentStyle={{ background: "hsl(230, 40%, 12%)", border: "1px solid hsl(230, 30%, 28%)", borderRadius: "12px", color: "#fff" }} />
            <Area type="monotone" dataKey="revenue" stroke="hsl(187, 100%, 50%)" fill="url(#revGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>

      {/* Project Status Pie */}
      <GlassCard hover={false} delay={0.4} glow="purple">
        <h3 className="text-sm font-semibold mb-4">Project Status</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={projectStatus} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
              {projectStatus.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ background: "hsl(230, 40%, 12%)", border: "1px solid hsl(230, 30%, 28%)", borderRadius: "12px", color: "#fff" }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-4 mt-2">
          {projectStatus.map((s) => (
            <div key={s.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
              {s.name}
            </div>
          ))}
        </div>
      </GlassCard>
    </div>

    {/* Activity Feed */}
    <GlassCard hover={false} delay={0.5}>
      <h3 className="text-sm font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {recentActivity.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.08 }}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-cosmic flex items-center justify-center text-xs font-bold">
                {a.user.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium">{a.user}</span>{" "}
                  <span className="text-muted-foreground">{a.action}</span>{" "}
                  <span className="text-primary">{a.target}</span>
                </p>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">{a.time}</span>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  </PortalLayout>
);

export default AdminDashboard;
