import MainLayout from "@/components/MainLayout";
import GlassCard from "@/components/GlassCard";
import { useApp } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import {
  BarChart3, TrendingUp, Clock, CheckCircle2,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell,
} from "recharts";

const weeklyData = [
  { day: "Mon", completed: 8, created: 5 },
  { day: "Tue", completed: 12, created: 7 },
  { day: "Wed", completed: 6, created: 9 },
  { day: "Thu", completed: 15, created: 8 },
  { day: "Fri", completed: 10, created: 6 },
];

const productivityData = [
  { week: "W1", score: 72 }, { week: "W2", score: 78 }, { week: "W3", score: 85 },
  { week: "W4", score: 82 }, { week: "W5", score: 90 }, { week: "W6", score: 88 },
];

const timeByProject = [
  { name: "NovaPM", value: 42, color: "hsl(187, 100%, 50%)" },
  { name: "Backend", value: 28, color: "hsl(255, 50%, 58%)" },
  { name: "Dashboard", value: 18, color: "hsl(320, 100%, 70%)" },
  { name: "Other", value: 12, color: "hsl(234, 15%, 70%)" },
];

const Reports = () => {
  const { tasks, projects, team } = useApp();

  const stats = [
    { label: "Tasks Completed", value: tasks.filter((t) => t.status === "completed").length, icon: CheckCircle2, change: "+12%" },
    { label: "Avg Completion Time", value: "2.4 days", icon: Clock, change: "-8%" },
    { label: "Team Productivity", value: "88%", icon: TrendingUp, change: "+5%" },
    { label: "Active Projects", value: projects.filter((p) => p.status === "active").length, icon: BarChart3, change: "+2" },
  ];

  return (
    <MainLayout title="Reports" subtitle="Analytics & insights" breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Reports" }]}>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <GlassCard key={s.label} delay={i * 0.08} glow={i === 0 ? "cyan" : i === 1 ? "purple" : i === 2 ? "pink" : "none"}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold mt-1">{s.value}</p>
                <p className="text-[10px] text-emerald-400 mt-1">{s.change}</p>
              </div>
              <div className="w-9 h-9 rounded-xl glass flex items-center justify-center">
                <s.icon className="w-4 h-4 text-primary" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Weekly Activity */}
        <GlassCard hover={false} delay={0.3}>
          <h3 className="text-sm font-semibold mb-4">Weekly Task Activity</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 30%, 22%)" />
              <XAxis dataKey="day" stroke="hsl(234, 15%, 70%)" fontSize={12} />
              <YAxis stroke="hsl(234, 15%, 70%)" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(230, 40%, 12%)", border: "1px solid hsl(230, 30%, 28%)", borderRadius: "12px", color: "#fff" }} />
              <Bar dataKey="completed" fill="hsl(187, 100%, 50%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="created" fill="hsl(255, 50%, 58%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Productivity Trend */}
        <GlassCard hover={false} delay={0.4}>
          <h3 className="text-sm font-semibold mb-4">Productivity Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={productivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 30%, 22%)" />
              <XAxis dataKey="week" stroke="hsl(234, 15%, 70%)" fontSize={12} />
              <YAxis stroke="hsl(234, 15%, 70%)" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(230, 40%, 12%)", border: "1px solid hsl(230, 30%, 28%)", borderRadius: "12px", color: "#fff" }} />
              <Line type="monotone" dataKey="score" stroke="hsl(320, 100%, 70%)" strokeWidth={2} dot={{ fill: "hsl(320, 100%, 70%)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Time by Project */}
        <GlassCard hover={false} delay={0.5} glow="purple">
          <h3 className="text-sm font-semibold mb-4">Time by Project</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={timeByProject} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                {timeByProject.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(230, 40%, 12%)", border: "1px solid hsl(230, 30%, 28%)", borderRadius: "12px", color: "#fff" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-3 flex-wrap">
            {timeByProject.map((p) => (
              <div key={p.name} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <div className="w-2 h-2 rounded-full" style={{ background: p.color }} /> {p.name} ({p.value}h)
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Team Performance */}
        <GlassCard hover={false} delay={0.5}>
          <h3 className="text-sm font-semibold mb-4">Team Performance</h3>
          <div className="space-y-3">
            {team.map((m) => (
              <div key={m.id} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-gradient-cosmic flex items-center justify-center text-[10px] font-bold flex-shrink-0">{m.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium truncate">{m.name}</span>
                    <span className="text-[10px] text-muted-foreground">{m.tasksCompleted}/{m.tasksAssigned}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted mt-1 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${m.workload}%` }}
                      transition={{ duration: 0.6 }}
                      className={`h-full rounded-full ${m.workload > 80 ? "bg-destructive" : m.workload > 60 ? "bg-accent" : "bg-primary"}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </MainLayout>
  );
};

export default Reports;
