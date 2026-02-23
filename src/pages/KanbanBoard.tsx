import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import CreateTaskModal from "@/components/CreateTaskModal";
import TaskDetailModal from "@/components/TaskDetailModal";
import { useApp, Task } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const columns = [
  { id: "todo", label: "To Do", color: "hsl(234, 15%, 70%)" },
  { id: "in_progress", label: "In Progress", color: "hsl(187, 100%, 50%)" },
  { id: "review", label: "Review", color: "hsl(255, 50%, 58%)" },
  { id: "completed", label: "Completed", color: "hsl(142, 71%, 45%)" },
  { id: "blocked", label: "Blocked", color: "hsl(0, 84%, 60%)" },
];
const priorityColors: Record<string, string> = { low: "text-muted-foreground", medium: "text-primary", high: "text-accent", urgent: "text-destructive" };

const KanbanBoard = () => {
  const { tasks, updateTask } = useApp();
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, taskId: string) => { setDraggedId(taskId); e.dataTransfer.effectAllowed = "move"; };
  const handleDrop = (e: React.DragEvent, status: string) => { e.preventDefault(); if (draggedId) { updateTask(draggedId, { status: status as Task["status"] }); setDraggedId(null); } };
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; };

  return (
    <MainLayout title="Kanban Board" subtitle="Drag tasks between columns" breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Kanban" }]}>
      <div className="flex gap-2 mb-6">
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setCreateOpen(true)} className="h-9 px-4 rounded-xl btn-glow text-xs font-medium text-primary-foreground flex items-center gap-2"><Plus className="w-3.5 h-3.5" /> Add Task</motion.button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);
          return (
            <div key={col.id} onDrop={(e) => handleDrop(e, col.id)} onDragOver={handleDragOver} className="flex-shrink-0 w-72 flex flex-col">
              <div className="flex items-center gap-2 mb-3 px-1"><div className="w-2.5 h-2.5 rounded-full" style={{ background: col.color }} /><h3 className="text-xs font-semibold">{col.label}</h3><span className="text-[10px] text-muted-foreground ml-auto">{colTasks.length}</span></div>
              <div className="flex-1 space-y-2 min-h-[200px] p-2 rounded-2xl glass-subtle">
                {colTasks.map((task) => (
                  <motion.div key={task.id} layout draggable onDragStart={(e: any) => handleDragStart(e, task.id)} onClick={() => setSelectedTask(task)} whileHover={{ scale: 1.02, y: -2 }} className={`glass rounded-xl p-3 cursor-grab active:cursor-grabbing hover-glow ${draggedId === task.id ? "opacity-50" : ""}`}>
                    <h4 className="text-xs font-medium mb-1.5">{task.title}</h4>
                    <div className="flex items-center justify-between"><span className={`text-[10px] font-medium capitalize ${priorityColors[task.priority]}`}>{task.priority}</span><div className="w-5 h-5 rounded-full bg-gradient-cosmic flex items-center justify-center text-[8px] font-bold">{task.assigneeAvatar}</div></div>
                    {task.tags.length > 0 && <div className="flex gap-1 mt-2 flex-wrap">{task.tags.slice(0, 2).map((tag) => <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded glass text-muted-foreground">{tag}</span>)}</div>}
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <CreateTaskModal open={createOpen} onClose={() => setCreateOpen(false)} />
      <TaskDetailModal task={selectedTask} onClose={() => setSelectedTask(null)} />
    </MainLayout>
  );
};

export default KanbanBoard;
