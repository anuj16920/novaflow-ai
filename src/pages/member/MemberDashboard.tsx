import PortalLayout from "@/components/PortalLayout";
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import {
  LayoutDashboard, CheckSquare, Clock,
  ArrowUpRight, Sparkles,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const navItems = [
  { to: "/member/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/member/tasks", icon: CheckSquare, label: "My Tasks" },
  { to: "/member/timesheet", icon: Clock, label: "Timesheet" },
];

const weekData = [
  { day: "Mon", tasks: 4 }, { day: "Tue", tasks: 6 }, { day: "Wed", tasks: 3 },
  { day: "Thu", tasks: 7 }, { day: "Fri", tasks: 5 },
];

const myTasks = [
  { title: "Implement login flow", project: "NovaPM", status: "In Progress", priority: "High" },
  { title: "Fix sidebar animation", project: "Dashboard", status: "Todo", priority: "Medium" },
  { title: "Review PR #142", project: "API", status: "Review", priority: "Low" },
];

const statusColors: Record<string, string> = {
  "In Progress": "bg-primary/20 text-primary",
  Review: "bg-secondary/20 text-secondary",
  Todo: "bg-muted text-muted-foreground",
};

const MemberDashboard = () => (
  <PortalLayout title="My Dashboard" subtitle="Welcome back" navItems={navItems} portalName="Member Portal" portalColor="text-gradient-cyan">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {[
        { label: "Active Tasks", value: "7", icon: CheckSquare, glow: "cyan" as const },
        { label: "Hours Today", value: "5.5h", icon: Clock, glow: "purple" as const },
        { label: "Completed", value: "23", icon: ArrowUpRight, glow: "pink" as const },
      ].map((s, i) => (
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
        <h3 className="text-sm font-semibold mb-4">This Week</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={weekData}>
            <defs>
              <linearGradient id="memGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 30%, 22%)" />
            <XAxis dataKey="day" stroke="hsl(234, 15%, 70%)" fontSize={12} />
            <YAxis stroke="hsl(234, 15%, 70%)" fontSize={12} />
            <Tooltip contentStyle={{ background: "hsl(230, 40%, 12%)", border: "1px solid hsl(230, 30%, 28%)", borderRadius: "12px", color: "#fff" }} />
            <Area type="monotone" dataKey="tasks" stroke="hsl(187, 100%, 50%)" fill="url(#memGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>

      <GlassCard hover={false} delay={0.4}>
        <h3 className="text-sm font-semibold mb-4">My Tasks</h3>
        <div className="space-y-2">
          {myTasks.map((t, i) => (
            <motion.div key={t.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/20 transition-colors cursor-pointer">
              <div>
                <p className="text-sm font-medium">{t.title}</p>
                <p className="text-xs text-muted-foreground">{t.project}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full ${statusColors[t.status]}`}>{t.status}</span>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  </PortalLayout>
);

export default MemberDashboard;
