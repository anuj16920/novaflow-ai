import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { motion, Reorder } from "framer-motion";
import { MoreHorizontal, Plus, Clock, MessageSquare, Paperclip } from "lucide-react";

interface Task {
  id: string;
  title: string;
  priority: "High" | "Medium" | "Low";
  assignee: string;
  dueDate: string;
  comments: number;
  attachments: number;
}

interface Column {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}

const initialColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    color: "bg-muted-foreground",
    tasks: [
      { id: "1", title: "Design new landing page", priority: "High", assignee: "AK", dueDate: "Feb 20", comments: 3, attachments: 2 },
      { id: "2", title: "Set up CI/CD pipeline", priority: "Medium", assignee: "JD", dueDate: "Feb 22", comments: 1, attachments: 0 },
      { id: "3", title: "Write API documentation", priority: "Low", assignee: "SM", dueDate: "Feb 25", comments: 0, attachments: 1 },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "bg-primary",
    tasks: [
      { id: "4", title: "Implement auth flow", priority: "High", assignee: "AK", dueDate: "Feb 18", comments: 5, attachments: 3 },
      { id: "5", title: "Build dashboard charts", priority: "Medium", assignee: "LR", dueDate: "Feb 21", comments: 2, attachments: 1 },
    ],
  },
  {
    id: "review",
    title: "In Review",
    color: "bg-secondary",
    tasks: [
      { id: "6", title: "Database schema review", priority: "High", assignee: "JD", dueDate: "Feb 17", comments: 8, attachments: 2 },
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "bg-emerald-400",
    tasks: [
      { id: "7", title: "Project setup & config", priority: "Low", assignee: "AK", dueDate: "Feb 15", comments: 2, attachments: 0 },
      { id: "8", title: "UI component library", priority: "Medium", assignee: "SM", dueDate: "Feb 16", comments: 4, attachments: 5 },
    ],
  },
];

const priorityBadge: Record<string, string> = {
  High: "bg-accent/20 text-accent",
  Medium: "bg-primary/20 text-primary",
  Low: "bg-muted text-muted-foreground",
};

const KanbanBoard = () => {
  const [columns] = useState(initialColumns);

  return (
    <DashboardLayout title="Kanban Board" subtitle="NovaPM — Sprint 4">
      <div className="flex gap-4 overflow-x-auto pb-4 min-h-[calc(100vh-10rem)]">
        {columns.map((column, colIdx) => (
          <motion.div
            key={column.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: colIdx * 0.1 }}
            className="flex-shrink-0 w-80"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${column.color}`} />
                <h3 className="text-sm font-semibold">{column.title}</h3>
                <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                  {column.tasks.length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button className="w-7 h-7 rounded-lg hover:bg-muted/30 flex items-center justify-center transition-colors">
                  <Plus className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="w-7 h-7 rounded-lg hover:bg-muted/30 flex items-center justify-center transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Tasks */}
            <div className="space-y-3">
              {column.tasks.map((task, taskIdx) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: colIdx * 0.1 + taskIdx * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="glass rounded-2xl p-4 hover-glow cursor-grab active:cursor-grabbing"
                >
                  {/* Priority */}
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${priorityBadge[task.priority]}`}>
                    {task.priority}
                  </span>

                  {/* Title */}
                  <h4 className="text-sm font-medium mt-2.5 mb-3">{task.title}</h4>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {task.dueDate}
                      </span>
                      {task.comments > 0 && (
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" /> {task.comments}
                        </span>
                      )}
                      {task.attachments > 0 && (
                        <span className="flex items-center gap-1">
                          <Paperclip className="w-3 h-3" /> {task.attachments}
                        </span>
                      )}
                    </div>
                    <div className="w-7 h-7 rounded-full bg-gradient-cosmic flex items-center justify-center text-[10px] font-bold">
                      {task.assignee}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Add Task Button */}
              <button className="w-full p-3 rounded-2xl border border-dashed border-border/50 text-sm text-muted-foreground hover:border-primary/30 hover:text-primary/70 transition-all flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Add Task
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default KanbanBoard;
