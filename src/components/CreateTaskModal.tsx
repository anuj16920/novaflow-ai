import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useApp, Task } from "@/contexts/AppContext";

interface Props {
  open: boolean;
  onClose: () => void;
  defaultProject?: string;
}

const CreateTaskModal = ({ open, onClose, defaultProject }: Props) => {
  const { addTask, projects } = useApp();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("medium");
  const [projectId, setProjectId] = useState(defaultProject || "p1");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const project = projects.find((p) => p.id === projectId);
    const newTask: Task = {
      id: `t${Date.now()}`,
      title: title.trim(),
      description,
      project: project?.name || "Unknown",
      projectId,
      status: "todo",
      priority,
      assignee: "You",
      assigneeAvatar: "AK",
      dueDate: dueDate || "TBD",
      tags: [],
      subtasks: [],
      comments: [],
      checklist: 0,
      checklistDone: 0,
      createdAt: new Date().toISOString().split("T")[0],
      timeSpent: 0,
    };
    addTask(newTask);
    setTitle("");
    setDescription("");
    setDueDate("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong rounded-2xl w-full max-w-lg p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold">Create Task</h2>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title..." className="w-full h-10 px-4 rounded-xl glass bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" autoFocus />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the task..." rows={3} className="w-full px-4 py-3 rounded-xl glass bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Project</label>
                  <select value={projectId} onChange={(e) => setProjectId(e.target.value)} className="w-full h-10 px-3 rounded-xl glass bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-primary/50">
                    {projects.map((p) => <option key={p.id} value={p.id} className="bg-card">{p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Priority</label>
                  <select value={priority} onChange={(e) => setPriority(e.target.value as Task["priority"])} className="w-full h-10 px-3 rounded-xl glass bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 capitalize">
                    {(["low", "medium", "high", "urgent"] as const).map((p) => <option key={p} value={p} className="bg-card capitalize">{p}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Due Date</label>
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full h-10 px-4 rounded-xl glass bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 h-10 rounded-xl btn-glow-outline text-sm font-medium">Cancel</button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="flex-1 h-10 rounded-xl btn-glow text-sm font-semibold text-primary-foreground">Create Task</motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateTaskModal;
