import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import GlassCard from "@/components/GlassCard";
import { useApp } from "@/contexts/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Search, Mail, X } from "lucide-react";

const statusColors: Record<string, string> = {
  active: "bg-emerald-500/20 text-emerald-400",
  away: "bg-secondary/20 text-secondary",
  offline: "bg-muted text-muted-foreground",
};

const roleColors: Record<string, string> = {
  admin: "bg-accent/20 text-accent",
  manager: "bg-primary/20 text-primary",
  member: "bg-secondary/20 text-secondary",
  client: "bg-muted text-muted-foreground",
};

const Team = () => {
  const { team } = useApp();
  const [search, setSearch] = useState("");
  const [inviteOpen, setInviteOpen] = useState(false);

  const filtered = team.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.department.toLowerCase().includes(search.toLowerCase()));

  return (
    <MainLayout title="Team" subtitle={`${team.length} members`} breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Team" }]}>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search team..." className="w-full h-9 pl-9 pr-4 rounded-xl glass bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
        </div>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setInviteOpen(true)} className="h-9 px-4 rounded-xl btn-glow text-xs font-medium text-primary-foreground flex items-center gap-2">
          <UserPlus className="w-3.5 h-3.5" /> Invite Member
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((member, i) => (
          <GlassCard key={member.id} delay={i * 0.06}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-cosmic flex items-center justify-center text-sm font-bold flex-shrink-0">{member.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold truncate">{member.name}</h3>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full capitalize ${statusColors[member.status]}`}>{member.status}</span>
                </div>
                <p className="text-xs text-muted-foreground">{member.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full capitalize ${roleColors[member.role]}`}>{member.role}</span>
                  <span className="text-[10px] text-muted-foreground">{member.department}</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                <span>Workload</span>
                <span>{member.workload}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${member.workload}%` }} transition={{ duration: 0.6, delay: i * 0.1 }} className={`h-full rounded-full ${member.workload > 80 ? "bg-destructive" : member.workload > 60 ? "bg-accent" : "bg-primary"}`} />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-2">
                <span>{member.tasksCompleted} completed</span>
                <span>{member.tasksAssigned} assigned</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Invite Modal */}
      <AnimatePresence>
        {inviteOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setInviteOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} onClick={(e) => e.stopPropagation()} className="glass-strong rounded-2xl w-full max-w-md p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold">Invite Team Member</h2>
                <button onClick={() => setInviteOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input placeholder="colleague@company.com" className="w-full h-10 pl-9 pr-4 rounded-xl glass bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Role</label>
                  <select className="w-full h-10 px-3 rounded-xl glass bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 capitalize">
                    {["member", "manager", "admin"].map((r) => <option key={r} value={r} className="bg-card capitalize">{r}</option>)}
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setInviteOpen(false)} className="flex-1 h-10 rounded-xl btn-glow-outline text-sm font-medium">Cancel</button>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setInviteOpen(false)} className="flex-1 h-10 rounded-xl btn-glow text-sm font-semibold text-primary-foreground">Send Invite</motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
};

export default Team;
