import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import GlassCard from "@/components/GlassCard";
import CreateProjectModal from "@/components/CreateProjectModal";
import { useApp } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import { Plus, Grid3X3, List, Search } from "lucide-react";

const statusColors: Record<string, string> = { active: "bg-primary/20 text-primary", completed: "bg-emerald-500/20 text-emerald-400", on_hold: "bg-secondary/20 text-secondary", archived: "bg-muted text-muted-foreground" };

const Projects = () => {
  const { projects } = useApp();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [createOpen, setCreateOpen] = useState(false);
  const filtered = projects.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    return true;
  });

  return (
    <MainLayout title="Projects" subtitle={`${filtered.length} projects`} breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Projects" }]}>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects..." className="w-full h-9 pl-9 pr-4 rounded-xl glass bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" /></div>
        <div className="flex gap-2">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-9 px-3 rounded-xl glass bg-transparent text-xs focus:outline-none"><option value="all" className="bg-card">All Status</option><option value="active" className="bg-card">Active</option><option value="completed" className="bg-card">Completed</option><option value="on_hold" className="bg-card">On Hold</option></select>
          <div className="flex rounded-xl glass overflow-hidden"><button onClick={() => setView("grid")} className={`w-9 h-9 flex items-center justify-center ${view === "grid" ? "bg-primary/20 text-primary" : "text-muted-foreground"}`}><Grid3X3 className="w-4 h-4" /></button><button onClick={() => setView("list")} className={`w-9 h-9 flex items-center justify-center ${view === "list" ? "bg-primary/20 text-primary" : "text-muted-foreground"}`}><List className="w-4 h-4" /></button></div>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setCreateOpen(true)} className="h-9 px-4 rounded-xl btn-glow text-xs font-medium text-primary-foreground flex items-center gap-2"><Plus className="w-3.5 h-3.5" /> New Project</motion.button>
        </div>
      </div>
      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((project, i) => (
            <GlassCard key={project.id} delay={i * 0.06}>
              <div className="flex items-start justify-between mb-3"><div><h3 className="text-sm font-semibold">{project.name}</h3><p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{project.description}</p></div><span className={`text-[10px] px-2 py-0.5 rounded-full capitalize flex-shrink-0 ${statusColors[project.status]}`}>{project.status.replace("_", " ")}</span></div>
              <div className="mb-3"><div className="flex justify-between text-[10px] text-muted-foreground mb-1"><span>Progress</span><span>{project.progress}%</span></div><div className="h-1.5 rounded-full bg-muted overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${project.progress}%` }} transition={{ duration: 0.8, delay: i * 0.1 }} className="h-full rounded-full" style={{ background: project.color }} /></div></div>
              <div className="flex items-center justify-between"><div className="flex -space-x-2">{project.members.slice(0, 3).map((m) => <div key={m.name} className="w-6 h-6 rounded-full bg-gradient-cosmic flex items-center justify-center text-[9px] font-bold border-2 border-card">{m.avatar}</div>)}</div><div className="text-[10px] text-muted-foreground">{project.tasksDone}/{project.tasksTotal} tasks</div></div>
            </GlassCard>
          ))}
        </div>
      ) : (
        <GlassCard hover={false}>
          <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-xs text-muted-foreground border-b border-border/30"><th className="text-left py-3 px-3 font-medium">Name</th><th className="text-left py-3 px-3 font-medium hidden sm:table-cell">Status</th><th className="text-left py-3 px-3 font-medium hidden md:table-cell">Progress</th><th className="text-left py-3 px-3 font-medium hidden lg:table-cell">Deadline</th></tr></thead><tbody>
            {filtered.map((p) => (<tr key={p.id} className="border-b border-border/10 hover:bg-muted/10 transition-colors"><td className="py-3 px-3"><p className="font-medium">{p.name}</p></td><td className="py-3 px-3 hidden sm:table-cell"><span className={`text-[10px] px-2 py-0.5 rounded-full capitalize ${statusColors[p.status]}`}>{p.status.replace("_"," ")}</span></td><td className="py-3 px-3 hidden md:table-cell"><div className="flex items-center gap-2"><div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden"><div className="h-full rounded-full bg-primary" style={{ width: `${p.progress}%` }} /></div><span className="text-xs text-muted-foreground">{p.progress}%</span></div></td><td className="py-3 px-3 text-xs text-muted-foreground hidden lg:table-cell">{p.deadline}</td></tr>))}
          </tbody></table></div>
        </GlassCard>
      )}
      <CreateProjectModal open={createOpen} onClose={() => setCreateOpen(false)} />
    </MainLayout>
  );
};

export default Projects;
