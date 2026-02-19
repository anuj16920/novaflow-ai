import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  Users,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const stats = [
  { label: "Total Projects", value: "24", change: "+12%", up: true, icon: TrendingUp, glow: "cyan" as const },
  { label: "Tasks Completed", value: "156", change: "+8%", up: true, icon: CheckCircle2, glow: "purple" as const },
  { label: "Hours Tracked", value: "1,240", change: "-3%", up: false, icon: Clock, glow: "pink" as const },
  { label: "Team Members", value: "18", change: "+2", up: true, icon: Users, glow: "cyan" as const },
];

const chartData = [
  { name: "Mon", tasks: 12, hours: 8 },
  { name: "Tue", tasks: 19, hours: 10 },
  { name: "Wed", tasks: 15, hours: 7 },
  { name: "Thu", tasks: 22, hours: 11 },
  { name: "Fri", tasks: 28, hours: 9 },
  { name: "Sat", tasks: 8, hours: 4 },
  { name: "Sun", tasks: 5, hours: 2 },
];

const recentTasks = [
  { name: "Design system update", project: "NovaPM", status: "In Progress", priority: "High" },
  { name: "API integration", project: "Client Portal", status: "Review", priority: "Medium" },
  { name: "User testing", project: "Mobile App", status: "Todo", priority: "High" },
  { name: "Database migration", project: "Backend", status: "Done", priority: "Low" },
  { name: "Landing page redesign", project: "Marketing", status: "In Progress", priority: "Medium" },
];

const priorityColors: Record<string, string> = {
  High: "text-accent",
  Medium: "text-primary",
  Low: "text-muted-foreground",
};

const statusColors: Record<string, string> = {
  "In Progress": "bg-primary/20 text-primary",
  Review: "bg-secondary/20 text-secondary",
  Todo: "bg-muted text-muted-foreground",
  Done: "bg-emerald-500/20 text-emerald-400",
};

const aiInsights = [
  "3 tasks are at risk of missing their deadline this week",
  "Team velocity increased 15% compared to last sprint",
  "Consider reassigning 'API Integration' — assignee is overloaded",
];

const Dashboard = () => {
  return (
    <DashboardLayout title="Dashboard" subtitle="Welcome back, Alex">
      {/* Stats Grid */}
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
        {/* Area Chart */}
        <GlassCard className="lg:col-span-2" hover={false} delay={0.3}>
          <h3 className="text-sm font-semibold mb-4">Task Completion Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="taskGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 30%, 22%)" />
              <XAxis dataKey="name" stroke="hsl(234, 15%, 70%)" fontSize={12} />
              <YAxis stroke="hsl(234, 15%, 70%)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "hsl(230, 40%, 12%)",
                  border: "1px solid hsl(230, 30%, 28%)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Area type="monotone" dataKey="tasks" stroke="hsl(187, 100%, 50%)" fill="url(#taskGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* AI Insights */}
        <GlassCard glow="purple" hover={false} delay={0.4}>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-secondary" />
            <h3 className="text-sm font-semibold">AI Insights</h3>
          </div>
          <div className="space-y-3">
            {aiInsights.map((insight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.15 }}
                className="p-3 rounded-xl glass-subtle text-sm text-muted-foreground leading-relaxed"
              >
                {insight}
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Tasks */}
        <GlassCard className="lg:col-span-2" hover={false} delay={0.5}>
          <h3 className="text-sm font-semibold mb-4">Recent Tasks</h3>
          <div className="space-y-2">
            {recentTasks.map((task, i) => (
              <motion.div
                key={task.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.08 }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/20 transition-colors cursor-pointer"
              >
                <div>
                  <p className="text-sm font-medium">{task.name}</p>
                  <p className="text-xs text-muted-foreground">{task.project}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-full ${statusColors[task.status]}`}>
                    {task.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Hours Chart */}
        <GlassCard hover={false} delay={0.6}>
          <h3 className="text-sm font-semibold mb-4">Hours This Week</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 30%, 22%)" />
              <XAxis dataKey="name" stroke="hsl(234, 15%, 70%)" fontSize={12} />
              <YAxis stroke="hsl(234, 15%, 70%)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "hsl(230, 40%, 12%)",
                  border: "1px solid hsl(230, 30%, 28%)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="hours" fill="hsl(255, 50%, 58%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
