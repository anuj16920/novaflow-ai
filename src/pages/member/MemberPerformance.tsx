import PortalLayout from "@/components/PortalLayout";
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { LayoutDashboard, CheckSquare, Clock, TrendingUp, Target, Award } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const navItems = [
  { to: "/member/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/member/tasks", icon: CheckSquare, label: "My Tasks" },
  { to: "/member/timesheet", icon: Clock, label: "Timesheet" },
  { to: "/member/performance", icon: TrendingUp, label: "Performance" },
];

const completionTrend = [
  { week: "W1", tasks: 5 }, { week: "W2", tasks: 8 }, { week: "W3", tasks: 6 },
  { week: "W4", tasks: 10 }, { week: "W5", tasks: 7 }, { week: "W6", tasks: 12 },
];

const timeData = [
  { day: "Mon", hours: 6.5 }, { day: "Tue", hours: 7.2 }, { day: "Wed", hours: 5.8 },
  { day: "Thu", hours: 8.0 }, { day: "Fri", hours: 6.0 },
];

const tooltipStyle = { background: "hsl(230, 40%, 12%)", border: "1px solid hsl(230, 30%, 28%)", borderRadius: "12px", color: "#fff" };

const MemberPerformance = () => (
  <PortalLayout title="My Performance" subtitle="Your productivity stats" navItems={navItems} portalName="Member Portal" portalColor="text-gradient-cyan">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {[
        { label: "Tasks Completed (Month)", value: "23", icon: Target, glow: "cyan" as const },
        { label: "Avg Completion Time", value: "1.8 days", icon: Clock, glow: "purple" as const },
        { label: "Streak", value: "7 days", icon: Award, glow: "pink" as const },
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
        <h3 className="text-sm font-semibold mb-4">Tasks Completed Per Week</h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={completionTrend}>
            <defs>
              <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 30%, 22%)" />
            <XAxis dataKey="week" stroke="hsl(234, 15%, 70%)" fontSize={12} />
            <YAxis stroke="hsl(234, 15%, 70%)" fontSize={12} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="tasks" stroke="hsl(187, 100%, 50%)" fill="url(#perfGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>

      <GlassCard hover={false} delay={0.4}>
        <h3 className="text-sm font-semibold mb-4">Daily Hours This Week</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={timeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 30%, 22%)" />
            <XAxis dataKey="day" stroke="hsl(234, 15%, 70%)" fontSize={12} />
            <YAxis stroke="hsl(234, 15%, 70%)" fontSize={12} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="hours" fill="hsl(255, 50%, 58%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>
    </div>
  </PortalLayout>
);

export default MemberPerformance;
