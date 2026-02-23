import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Tag, MessageSquare, Paperclip, Clock, CheckSquare, ChevronDown, User } from "lucide-react";
import { Task, useApp } from "@/contexts/AppContext";

interface Props {
  task: Task | null;
  onClose: () => void;
}

const statusOptions = ["todo", "in_progress", "review", "completed", "blocked"] as const;
const priorityOptions = ["low", "medium", "high", "urgent"] as const;

const statusLabels: Record<string, string> = { todo: "To Do", in_progress: "In Progress", review: "Review", completed: "Completed", blocked: "Blocked" };
const statusColors: Record<string, string> = { todo: "bg-muted text-muted-foreground", in_progress: "bg-primary/20 text-primary", review: "bg-secondary/20 text-secondary", completed: "bg-emerald-500/20 text-emerald-400", blocked: "bg-destructive/20 text-destructive" };
const priorityColors: Record<string, string> = { low: "text-muted-foreground", medium: "text-primary", high: "text-accent", urgent: "text-destructive" };

const TaskDetailModal = ({ task, onClose }: Props) => {
  const { updateTask } = useApp();
  const [comment, setComment] = useState("");
  const [tab, setTab] = useState<"details" | "comments" | "activity">("details");

  if (!task) return null;

  const addComment = () => {
    if (!comment.trim()) return;
    const newComment = { id: `c${Date.now()}`, user: "You", text: comment, time: "Just now" };
    updateTask(task.id, { comments: [...task.comments, newComment] });
    setComment("");
  };

  const toggleSubtask = (sId: string) => {
    updateTask(task.id, {
      subtasks: task.subtasks.map((s) => (s.id === sId ? { ...s, done: !s.done } : s)),
    });
  };

  return (
    <AnimatePresence>
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
          className="glass-strong rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 pb-4 border-b border-border/30">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold">{task.title}</h2>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className={`text-xs px-2.5 py-1 rounded-full ${statusColors[task.status]}`}>
                  {statusLabels[task.status]}
                </span>
                <span className={`text-xs font-medium capitalize ${priorityColors[task.priority]}`}>
                  {task.priority}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {task.dueDate}
                </span>
              </div>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors ml-4">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 px-6 pt-3">
            {(["details", "comments", "activity"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                  tab === t ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {tab === "details" && (
              <>
                {/* Description */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Description</label>
                  <p className="text-sm text-foreground/80">{task.description || "No description"}</p>
                </div>

                {/* Meta Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Status</label>
                    <select
                      value={task.status}
                      onChange={(e) => updateTask(task.id, { status: e.target.value as Task["status"] })}
                      className="w-full h-9 px-3 rounded-xl glass bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                    >
                      {statusOptions.map((s) => <option key={s} value={s} className="bg-card">{statusLabels[s]}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Priority</label>
                    <select
                      value={task.priority}
                      onChange={(e) => updateTask(task.id, { priority: e.target.value as Task["priority"] })}
                      className="w-full h-9 px-3 rounded-xl glass bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 capitalize"
                    >
                      {priorityOptions.map((p) => <option key={p} value={p} className="bg-card capitalize">{p}</option>)}
                    </select>
                  </div>
                </div>

                {/* Assignee */}
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <div className="w-6 h-6 rounded-full bg-gradient-cosmic flex items-center justify-center text-[10px] font-bold">
                    {task.assigneeAvatar}
                  </div>
                  <span className="text-sm">{task.assignee}</span>
                </div>

                {/* Tags */}
                {task.tags.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    {task.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full glass text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                )}

                {/* Subtasks */}
                {task.subtasks.length > 0 && (
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                      <CheckSquare className="w-3 h-3" /> Subtasks ({task.subtasks.filter((s) => s.done).length}/{task.subtasks.length})
                    </label>
                    <div className="space-y-1.5">
                      {task.subtasks.map((st) => (
                        <button
                          key={st.id}
                          onClick={() => toggleSubtask(st.id)}
                          className={`flex items-center gap-2 text-sm w-full text-left p-2 rounded-lg hover:bg-muted/20 transition-all ${st.done ? "line-through text-muted-foreground" : ""}`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${st.done ? "bg-primary border-primary" : "border-border"}`}>
                            {st.done && <span className="text-[10px] text-primary-foreground">✓</span>}
                          </div>
                          {st.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Time */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Time spent: {Math.floor(task.timeSpent / 60)}h {task.timeSpent % 60}m</span>
                </div>
              </>
            )}

            {tab === "comments" && (
              <>
                <div className="space-y-3">
                  {task.comments.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-6">No comments yet</p>
                  )}
                  {task.comments.map((c) => (
                    <div key={c.id} className="p-3 rounded-xl glass">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium">{c.user}</span>
                        <span className="text-[10px] text-muted-foreground">{c.time}</span>
                      </div>
                      <p className="text-sm text-foreground/80">{c.text}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addComment()}
                    placeholder="Add a comment..."
                    className="flex-1 h-9 px-3 rounded-xl glass bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                  <button onClick={addComment} className="h-9 px-4 rounded-xl btn-glow text-xs font-medium text-primary-foreground">
                    Send
                  </button>
                </div>
              </>
            )}

            {tab === "activity" && (
              <div className="space-y-3">
                <div className="p-3 rounded-xl glass">
                  <p className="text-xs"><span className="font-medium">You</span> <span className="text-muted-foreground">created this task</span></p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{task.createdAt}</p>
                </div>
                <div className="p-3 rounded-xl glass">
                  <p className="text-xs"><span className="font-medium">{task.assignee}</span> <span className="text-muted-foreground">was assigned</span></p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{task.createdAt}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TaskDetailModal;
