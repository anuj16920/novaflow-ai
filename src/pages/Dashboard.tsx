import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import GlassCard from "@/components/GlassCard";
import CreateTaskModal from "@/components/CreateTaskModal";
import CreateProjectModal from "@/components/CreateProjectModal";
import TaskDetailModal from "@/components/TaskDetailModal";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { TrendingUp, CheckCircle2, Clock, FolderKanban, ArrowUpRight, AlertTriangle, Plus, Sparkles } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const trendData = [
  { month: "Jan", tasks: 42 }, { month: "Feb", tasks: 58 }, { month: "Mar", tasks: 35 },
  { month: "Apr", tasks: 72 }, { month: "May", tasks: 65 }, { month: "Jun", tasks: 88 },
];
const distData = [
  { name: "Todo", value: 12, color: "hsl(234, 15%, 70%)" },
  { name: "In Progress", value: 8, color: "hsl(187, 100%, 50%)" },
  { name: "Review", value: 5, color: "hsl(255, 50%, 58%)" },
  { name: "Done", value: 22, color: "hsl(142, 71%, 45%)" },
];

const Dashboard = () => {
  const { tasks, projects } = useApp();
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<typeof tasks[0] | null>(null);
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const completionRate = Math.round((completedTasks / tasks.length) * 100);
  const stats = [
    { label: "Total Projects", value: projects.length.toString(), change: "+2", icon: FolderKanban, glow: "cyan" as const },
    { label: "Total Tasks", value: tasks.length.toString(), change: "+5", icon: CheckCircle2, glow: "purple" as const },
    { label: "Completion Rate", value: `${completionRate}%`, change: "+8%", icon: TrendingUp, glow: "pink" as const },
    { label: "Overdue", value: "3", change: "-2", icon: AlertTriangle, glow: "none" as const },
  ];
  const activity = [
    { user: "Alex K.", action: "completed", target: "API Integration", time: "2m ago" },
    { user: "Sarah M.", action: "created project", target: "Mobile App v3", time: "15m ago" },
    { user: "John D.", action: "commented on", target: "Dashboard Redesign", time: "1h ago" },
    { user: "Lisa R.", action: "assigned task", target: "Bug Fix Sprint", time: "2h ago" },
  ];

  return (
    <MainLayout title="Dashboard" subtitle="Welcome back, Alex" breadcrumbs={[{ label: "Home" }, { label: "Dashboard" }]}>
      <div className="flex gap-3 mb-6 flex-wrap">
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setCreateTaskOpen(true)} className="h-9 px-4 rounded-xl btn-glow text-xs font-medium text-primary-foreground flex items-center gap-2"><Plus className="w-3.5 h-3.5" /> New Task</motion.button>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setCreateProjectOpen(true)} className="h-9 px-4 rounded-xl btn-glow-outline text-xs font-medium flex items-center gap-2"><Plus className="w-3.5 h-3.5" /> New Project</motion.button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <GlassCard key={s.label} glow={s.glow} delay={i * 0.08}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-3xl font-bold mt-1">{s.value}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-emerald-400"><ArrowUpRight className="w-3 h-3" /> {s.change}</div>
              </div>
              <div className="w-9 h-9 rounded-xl glass flex items-center justify-center"><s.icon className="w-4 h-4 text-primary" /></div>
            </div>
          </GlassCard>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <GlassCard className="lg:col-span-2" hover={false} delay={0.3}>
          <h3 className="text-sm font-semibold mb-4">Task Completion Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={trendData}>
              <defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0.3} /><stop offset="95%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 30%, 22%)" />
              <XAxis dataKey="month" stroke="hsl(234, 15%, 70%)" fontSize={12} />
              <YAxis stroke="hsl(234, 15%, 70%)" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(230, 40%, 12%)", border: "1px solid hsl(230, 30%, 28%)", borderRadius: "12px", color: "#fff" }} />
              <Area type="monotone" dataKey="tasks" stroke="hsl(187, 100%, 50%)" fill="url(#tg)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard hover={false} delay={0.4} glow="purple">
          <h3 className="text-sm font-semibold mb-4">Task Distribution</h3>
          <ResponsiveContainer width="100%" height={170}>
            <PieChart><Pie data={distData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">{distData.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie></PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-3 flex-wrap mt-1">{distData.map((s) => <div key={s.name} className="flex items-center gap-1 text-[10px] text-muted-foreground"><div className="w-2 h-2 rounded-full" style={{ background: s.color }} /> {s.name}</div>)}</div>
        </GlassCard>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <GlassCard hover={false} delay={0.5}>
          <h3 className="text-sm font-semibold mb-4">Recent Tasks</h3>
          <div className="space-y-2">{tasks.slice(0, 5).map((t) => (
            <button key={t.id} onClick={() => setSelectedTask(t)} className="w-full text-left flex items-center justify-between p-2.5 rounded-xl hover:bg-muted/20 transition-all">
              <div className="min-w-0"><p className="text-sm font-medium truncate">{t.title}</p><p className="text-[11px] text-muted-foreground">{t.project}</p></div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${t.status === "completed" ? "bg-emerald-500/20 text-emerald-400" : t.status === "in_progress" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>{t.status.replace("_", " ")}</span>
            </button>
          ))}</div>
        </GlassCard>
        <GlassCard hover={false} delay={0.5}>
          <h3 className="text-sm font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-2.5">{activity.map((a, i) => (
            <div key={i} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-muted/20 transition-colors">
              <div className="flex items-center gap-3"><div className="w-7 h-7 rounded-full bg-gradient-cosmic flex items-center justify-center text-[10px] font-bold">{a.user.split(" ").map((n) => n[0]).join("")}</div><p className="text-xs"><span className="font-medium">{a.user}</span> <span className="text-muted-foreground">{a.action}</span> <span className="text-primary">{a.target}</span></p></div>
              <span className="text-[10px] text-muted-foreground flex-shrink-0">{a.time}</span>
            </div>
          ))}</div>
        </GlassCard>
      </div>
      <GlassCard hover={false} delay={0.6} glow="cyan">
        <div className="flex items-center gap-2 mb-3"><Sparkles className="w-4 h-4 text-primary" /><h3 className="text-sm font-semibold">AI Insights</h3></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl glass"><p className="text-xs font-medium text-primary">Workload Alert</p><p className="text-xs text-muted-foreground mt-1">John Davis is at 90% capacity. Consider redistributing 2 tasks.</p></div>
          <div className="p-3 rounded-xl glass"><p className="text-xs font-medium text-accent">Deadline Risk</p><p className="text-xs text-muted-foreground mt-1">Backend Services may miss its deadline by 5 days.</p></div>
          <div className="p-3 rounded-xl glass"><p className="text-xs font-medium text-emerald-400">Opportunity</p><p className="text-xs text-muted-foreground mt-1">Dashboard Redesign is ahead of schedule.</p></div>
        </div>
      </GlassCard>
      <CreateTaskModal open={createTaskOpen} onClose={() => setCreateTaskOpen(false)} />
      <CreateProjectModal open={createProjectOpen} onClose={() => setCreateProjectOpen(false)} />
      <TaskDetailModal task={selectedTask} onClose={() => setSelectedTask(null)} />
    </MainLayout>
  );
};

export default Dashboard;
