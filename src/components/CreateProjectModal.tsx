import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useApp, Project } from "@/contexts/AppContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateProjectModal = ({ open, onClose }: Props) => {
  const { addProject } = useApp();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Project["priority"]>("medium");
  const [deadline, setDeadline] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const newProject: Project = {
      id: `p${Date.now()}`,
      name: name.trim(),
      description,
      status: "active",
      priority,
      progress: 0,
      members: [{ name: "You", avatar: "AK", role: "Lead" }],
      deadline: deadline || "TBD",
      budget: Number(budget) || 0,
      spent: 0,
      tasksTotal: 0,
      tasksDone: 0,
      createdAt: new Date().toISOString().split("T")[0],
      color: "hsl(187, 100%, 50%)",
    };
    addProject(newProject);
    setName("");
    setDescription("");
    setDeadline("");
    setBudget("");
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
              <h2 className="text-lg font-bold">Create Project</h2>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Project Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Project name..." className="w-full h-10 px-4 rounded-xl glass bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" autoFocus />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the project..." rows={3} className="w-full px-4 py-3 rounded-xl glass bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Priority</label>
                  <select value={priority} onChange={(e) => setPriority(e.target.value as Project["priority"])} className="w-full h-10 px-3 rounded-xl glass bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 capitalize">
                    {(["low", "medium", "high"] as const).map((p) => <option key={p} value={p} className="bg-card capitalize">{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Budget ($)</label>
                  <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="0" className="w-full h-10 px-4 rounded-xl glass bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Deadline</label>
                <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="w-full h-10 px-4 rounded-xl glass bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 h-10 rounded-xl btn-glow-outline text-sm font-medium">Cancel</button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="flex-1 h-10 rounded-xl btn-glow text-sm font-semibold text-primary-foreground">Create Project</motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateProjectModal;
