import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import GlassCard from "@/components/GlassCard";
import { useApp } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import { Upload, Search, FileText, Image, Film, FileSpreadsheet, File, Eye } from "lucide-react";

const typeIcons: Record<string, typeof FileText> = {
  document: FileText, image: Image, video: Film, spreadsheet: FileSpreadsheet, pdf: FileText, other: File,
};

const typeColors: Record<string, string> = {
  document: "text-primary", image: "text-emerald-400", video: "text-accent", spreadsheet: "text-secondary", pdf: "text-destructive", other: "text-muted-foreground",
};

const Files = () => {
  const { files } = useApp();
  const [search, setSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState("all");

  const uniqueProjects = [...new Set(files.map((f) => f.project))];
  const filtered = files.filter((f) => {
    if (search && !f.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (projectFilter !== "all" && f.project !== projectFilter) return false;
    return true;
  });

  return (
    <MainLayout title="Files" subtitle={`${filtered.length} files`} breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Files" }]}>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search files..." className="w-full h-9 pl-9 pr-4 rounded-xl glass bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
        </div>
        <div className="flex gap-2">
          <select value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)} className="h-9 px-3 rounded-xl glass bg-transparent text-xs focus:outline-none">
            <option value="all" className="bg-card">All Projects</option>
            {uniqueProjects.map((p) => <option key={p} value={p} className="bg-card">{p}</option>)}
          </select>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="h-9 px-4 rounded-xl btn-glow text-xs font-medium text-primary-foreground flex items-center gap-2">
            <Upload className="w-3.5 h-3.5" /> Upload
          </motion.button>
        </div>
      </div>

      {/* Drop zone */}
      <div className="border-2 border-dashed border-border/50 rounded-2xl p-8 text-center mb-6 hover:border-primary/30 transition-colors">
        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">Drag & drop files here or click Upload</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((file, i) => {
          const Icon = typeIcons[file.type] || File;
          return (
            <GlassCard key={file.id} delay={i * 0.04}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center flex-shrink-0">
                  <Icon className={`w-5 h-5 ${typeColors[file.type]}`} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-medium truncate">{file.name}</h3>
                  <p className="text-[10px] text-muted-foreground">{file.size} · {file.project}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 text-[10px] text-muted-foreground">
                <span>{file.uploadedBy}</span>
                <span>{file.uploadedAt}</span>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </MainLayout>
  );
};

export default Files;
