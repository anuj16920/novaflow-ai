import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { FolderKanban, Users, Calendar, MoreHorizontal } from "lucide-react";

const projects = [
  { name: "NovaPM Dashboard", status: "Active", progress: 72, members: 5, tasks: 34, due: "Mar 15", color: "from-primary to-secondary" },
  { name: "Client Portal", status: "Active", progress: 45, members: 3, tasks: 21, due: "Apr 1", color: "from-secondary to-accent" },
  { name: "Mobile App v2", status: "Planning", progress: 15, members: 4, tasks: 12, due: "May 10", color: "from-accent to-primary" },
  { name: "Marketing Website", status: "Active", progress: 88, members: 2, tasks: 18, due: "Feb 28", color: "from-primary to-emerald-400" },
  { name: "API Microservices", status: "On Hold", progress: 30, members: 6, tasks: 45, due: "Jun 1", color: "from-secondary to-primary" },
  { name: "Design System", status: "Active", progress: 60, members: 3, tasks: 28, due: "Mar 30", color: "from-accent to-secondary" },
];

const statusBadge: Record<string, string> = {
  Active: "bg-emerald-500/20 text-emerald-400",
  Planning: "bg-primary/20 text-primary",
  "On Hold": "bg-muted text-muted-foreground",
};

const Projects = () => {
  return (
    <DashboardLayout title="Projects" subtitle="6 active projects">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {projects.map((project, i) => (
          <GlassCard key={project.name} delay={i * 0.08} glow={i % 3 === 0 ? "cyan" : i % 3 === 1 ? "purple" : "pink"}>
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                <FolderKanban className="w-5 h-5 text-foreground" />
              </div>
              <button className="w-8 h-8 rounded-lg hover:bg-muted/30 flex items-center justify-center transition-colors">
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <h3 className="font-semibold text-sm mb-1">{project.name}</h3>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusBadge[project.status]}`}>
              {project.status}
            </span>

            {/* Progress */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted/50 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                  className={`h-full rounded-full bg-gradient-to-r ${project.color}`}
                />
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" /> {project.members} members
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {project.due}
              </span>
            </div>
          </GlassCard>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Projects;
