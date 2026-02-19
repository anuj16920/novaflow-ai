import PortalLayout from "@/components/PortalLayout";
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import {
  LayoutDashboard, FolderKanban, Receipt,
  CheckCircle2, Clock, AlertCircle,
} from "lucide-react";

const navItems = [
  { to: "/client/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/client/projects", icon: FolderKanban, label: "Projects" },
  { to: "/client/invoices", icon: Receipt, label: "Invoices" },
];

const ClientDashboard = () => (
  <PortalLayout title="Client Dashboard" subtitle="Your project overview" navItems={navItems} portalName="Client Portal" portalColor="text-gradient-cosmic">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {[
        { label: "Active Projects", value: "2", icon: FolderKanban, glow: "cyan" as const },
        { label: "Tasks Completed", value: "18", icon: CheckCircle2, glow: "purple" as const },
        { label: "Pending Invoices", value: "$4,200", icon: Receipt, glow: "pink" as const },
      ].map((s, i) => (
        <GlassCard key={s.label} glow={s.glow} delay={i * 0.1}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="text-3xl font-bold mt-1">{s.value}</p>
            </div>
            <div className="w-10 h-10 rounded-xl glass flex items-center justify-center">
              <s.icon className="w-5 h-5 text-primary" />
            </div>
          </div>
        </GlassCard>
      ))}
    </div>

    {/* Project Progress */}
    <GlassCard hover={false} delay={0.3} className="mb-6">
      <h3 className="text-sm font-semibold mb-4">Project Progress</h3>
      {[
        { name: "NovaPM Dashboard", progress: 72 },
        { name: "Mobile App v2", progress: 45 },
      ].map((p, i) => (
        <div key={p.name} className="mb-4 last:mb-0">
          <div className="flex justify-between text-sm mb-1.5">
            <span className="font-medium">{p.name}</span>
            <span className="text-muted-foreground">{p.progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${p.progress}%` }}
              transition={{ duration: 1, delay: i * 0.2 }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" />
          </div>
        </div>
      ))}
    </GlassCard>

    {/* Recent Updates */}
    <GlassCard hover={false} delay={0.4}>
      <h3 className="text-sm font-semibold mb-4">Recent Updates</h3>
      <div className="space-y-3">
        {[
          { text: "Dashboard redesign completed", time: "2h ago", icon: CheckCircle2, color: "text-emerald-400" },
          { text: "Mobile app milestone delayed", time: "1d ago", icon: AlertCircle, color: "text-accent" },
          { text: "New invoice generated — $2,100", time: "2d ago", icon: Receipt, color: "text-primary" },
        ].map((u, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-xl glass-subtle">
            <u.icon className={`w-5 h-5 ${u.color}`} />
            <div className="flex-1">
              <p className="text-sm">{u.text}</p>
            </div>
            <span className="text-xs text-muted-foreground">{u.time}</span>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  </PortalLayout>
);

export default ClientDashboard;
