import { useState } from "react";
import PortalLayout from "@/components/PortalLayout";
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { LayoutDashboard, CheckSquare, Clock, Filter } from "lucide-react";

const navItems = [
  { to: "/member/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/member/tasks", icon: CheckSquare, label: "My Tasks" },
  { to: "/member/timesheet", icon: Clock, label: "Timesheet" },
];

const tasks = [
  { title: "Implement login flow", project: "NovaPM", status: "In Progress", priority: "High", due: "Feb 20" },
  { title: "Fix sidebar animation", project: "Dashboard", status: "Todo", priority: "Medium", due: "Feb 22" },
  { title: "Review PR #142", project: "API", status: "Review", priority: "Low", due: "Feb 19" },
  { title: "Write unit tests", project: "Backend", status: "Todo", priority: "High", due: "Feb 23" },
  { title: "Update documentation", project: "Docs", status: "In Progress", priority: "Low", due: "Feb 25" },
  { title: "Design settings page", project: "NovaPM", status: "Done", priority: "Medium", due: "Feb 15" },
];

const statusColors: Record<string, string> = {
  "In Progress": "bg-primary/20 text-primary",
  Review: "bg-secondary/20 text-secondary",
  Todo: "bg-muted text-muted-foreground",
  Done: "bg-emerald-500/20 text-emerald-400",
};

const priorityColors: Record<string, string> = {
  High: "text-accent",
  Medium: "text-primary",
  Low: "text-muted-foreground",
};

const MemberTasks = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? tasks : tasks.filter(t => t.status === filter);

  return (
    <PortalLayout title="My Tasks" subtitle={`${filtered.length} tasks`} navItems={navItems} portalName="Member Portal">
      <div className="flex gap-2 mb-6 flex-wrap">
        {["All", "Todo", "In Progress", "Review", "Done"].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`h-8 px-4 rounded-xl text-xs font-medium transition-all ${
              filter === f ? "btn-glow text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"
            }`}>{f}</button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((task, i) => (
          <motion.div key={task.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}>
            <GlassCard delay={0}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">{task.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{task.project} · Due {task.due}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium ${priorityColors[task.priority]}`}>{task.priority}</span>
                  <span className={`text-xs px-2.5 py-1 rounded-full ${statusColors[task.status]}`}>{task.status}</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </PortalLayout>
  );
};

export default MemberTasks;
