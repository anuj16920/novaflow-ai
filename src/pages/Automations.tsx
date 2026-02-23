import MainLayout from "@/components/MainLayout";
import GlassCard from "@/components/GlassCard";
import { useApp } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import { Zap, Plus, Play, Pause } from "lucide-react";

const Automations = () => {
  const { automations, toggleAutomation } = useApp();

  return (
    <MainLayout title="Automations" subtitle={`${automations.filter((a) => a.enabled).length} active`} breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Automations" }]}>
      <div className="flex gap-3 mb-6">
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="h-9 px-4 rounded-xl btn-glow text-xs font-medium text-primary-foreground flex items-center gap-2">
          <Plus className="w-3.5 h-3.5" /> New Automation
        </motion.button>
      </div>

      <div className="space-y-3">
        {automations.map((auto, i) => (
          <motion.div key={auto.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <GlassCard delay={0} glow={auto.enabled ? "cyan" : "none"}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-xl glass flex items-center justify-center flex-shrink-0 ${auto.enabled ? "text-primary" : "text-muted-foreground"}`}>
                    <Zap className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold">{auto.name}</h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-[10px] px-2 py-0.5 rounded glass text-muted-foreground">{auto.trigger}</span>
                      <span className="text-[10px] text-muted-foreground">→</span>
                      <span className="text-[10px] px-2 py-0.5 rounded glass text-muted-foreground">{auto.action}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">Condition: {auto.condition} · Last run: {auto.lastRun}</p>
                  </div>
                </div>

                {/* Toggle */}
                <button
                  onClick={() => toggleAutomation(auto.id)}
                  className={`relative w-11 h-6 rounded-full transition-all flex-shrink-0 ${auto.enabled ? "bg-primary" : "bg-muted"}`}
                >
                  <motion.div
                    animate={{ x: auto.enabled ? 20 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-4 h-4 rounded-full bg-foreground"
                  />
                </button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Rule Builder UI */}
      <GlassCard hover={false} delay={0.4} className="mt-6" glow="purple">
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2"><Zap className="w-4 h-4 text-primary" /> Automation Builder</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">When (Trigger)</label>
            <select className="w-full h-10 px-3 rounded-xl glass bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-primary/50">
              <option className="bg-card">Task Created</option>
              <option className="bg-card">Task Completed</option>
              <option className="bg-card">Due Date Approaching</option>
              <option className="bg-card">Status Changed</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">If (Condition)</label>
            <select className="w-full h-10 px-3 rounded-xl glass bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-primary/50">
              <option className="bg-card">Always</option>
              <option className="bg-card">Priority is High</option>
              <option className="bg-card">No Assignee</option>
              <option className="bg-card">Overdue</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Then (Action)</label>
            <select className="w-full h-10 px-3 rounded-xl glass bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-primary/50">
              <option className="bg-card">Send Notification</option>
              <option className="bg-card">Assign to Lead</option>
              <option className="bg-card">Change Status</option>
              <option className="bg-card">Send Email</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="h-9 px-6 rounded-xl btn-glow text-xs font-semibold text-primary-foreground">
            Create Automation
          </motion.button>
        </div>
      </GlassCard>
    </MainLayout>
  );
};

export default Automations;
