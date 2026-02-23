import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import GlassCard from "@/components/GlassCard";
import CreateTaskModal from "@/components/CreateTaskModal";
import TaskDetailModal from "@/components/TaskDetailModal";
import { useApp, Task } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import { Plus, Search, Filter, CheckSquare, List, LayoutGrid } from "lucide-react";

const statusLabels: Record<string, string> = { todo: "To Do", in_progress: "In Progress", review: "Review", completed: "Completed", blocked: "Blocked" };
const statusColors: Record<string, string> = { todo: "bg-muted text-muted-foreground", in_progress: "bg-primary/20 text-primary", review: "bg-secondary/20 text-secondary", completed: "bg-emerald-500/20 text-emerald-400", blocked: "bg-destructive/20 text-destructive" };
const priorityColors: Record<string, string> = { low: "text-muted-foreground", medium: "text-primary", high: "text-accent", urgent: "text-destructive" };

const Tasks = () => {
  const { tasks } = useApp();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [tab, setTab] = useState<"all" | "my" | "assigned" | "completed">("all");
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  let filtered = tasks;
  if (tab === "completed") filtered = filtered.filter((t) => t.status === "completed");
  else if (tab === "my") filtered = filtered.filter((t) => t.assignee === "Alex Kim");
  if (search) filtered = filtered.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));
  if (statusFilter !== "all") filtered = filtered.filter((t) => t.status === statusFilter);
  if (priorityFilter !== "all") filtered = filtered.filter((t) => t.priority === priorityFilter);

  return (
    <MainLayout title="Tasks" subtitle={`${filtered.length} tasks`} breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Tasks" }]}>
      {/* Tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {(["all", "my", "assigned", "completed"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`h-8 px-4 rounded-xl text-xs font-medium transition-all capitalize ${tab === t ? "btn-glow text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"}`}>
            {t === "my" ? "My Tasks" : t === "assigned" ? "Assigned" : t}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tasks..." className="w-full h-9 pl-9 pr-4 rounded-xl glass bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
        </div>
        <div className="flex gap-2 flex-wrap">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-9 px-3 rounded-xl glass bg-transparent text-xs focus:outline-none">
            <option value="all" className="bg-card">All Status</option>
            {Object.entries(statusLabels).map(([k, v]) => <option key={k} value={k} className="bg-card">{v}</option>)}
          </select>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="h-9 px-3 rounded-xl glass bg-transparent text-xs focus:outline-none capitalize">
            <option value="all" className="bg-card">All Priority</option>
            {["low", "medium", "high", "urgent"].map((p) => <option key={p} value={p} className="bg-card capitalize">{p}</option>)}
          </select>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setCreateOpen(true)} className="h-9 px-4 rounded-xl btn-glow text-xs font-medium text-primary-foreground flex items-center gap-2">
            <Plus className="w-3.5 h-3.5" /> New Task
          </motion.button>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <GlassCard hover={false}>
            <div className="text-center py-10">
              <CheckSquare className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No tasks found</p>
            </div>
          </GlassCard>
        )}
        {filtered.map((task, i) => (
          <motion.div key={task.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <button onClick={() => setSelectedTask(task)} className="w-full text-left">
              <GlassCard delay={0}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-gradient-cosmic flex items-center justify-center text-[10px] font-bold flex-shrink-0">{task.assigneeAvatar}</div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium truncate">{task.title}</h3>
                      <p className="text-[11px] text-muted-foreground">{task.project} · Due {task.dueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {task.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="hidden md:inline text-[10px] px-1.5 py-0.5 rounded glass text-muted-foreground">{tag}</span>
                    ))}
                    <span className={`text-[10px] font-medium capitalize ${priorityColors[task.priority]}`}>{task.priority}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusColors[task.status]}`}>{statusLabels[task.status]}</span>
                  </div>
                </div>
              </GlassCard>
            </button>
          </motion.div>
        ))}
      </div>

      <CreateTaskModal open={createOpen} onClose={() => setCreateOpen(false)} />
      <TaskDetailModal task={selectedTask} onClose={() => setSelectedTask(null)} />
    </MainLayout>
  );
};

export default Tasks;
