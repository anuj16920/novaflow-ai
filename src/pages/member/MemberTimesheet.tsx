import PortalLayout from "@/components/PortalLayout";
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { LayoutDashboard, CheckSquare, Clock, Play, Pause } from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/member/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/member/tasks", icon: CheckSquare, label: "My Tasks" },
  { to: "/member/timesheet", icon: Clock, label: "Timesheet" },
];

const timesheetData = [
  { date: "Mon, Feb 17", entries: [
    { task: "Implement login flow", project: "NovaPM", hours: 3.5 },
    { task: "Code review", project: "API", hours: 1.5 },
  ]},
  { date: "Tue, Feb 18", entries: [
    { task: "Fix sidebar animation", project: "Dashboard", hours: 4.0 },
    { task: "Team standup", project: "General", hours: 0.5 },
  ]},
  { date: "Wed, Feb 19", entries: [
    { task: "Write unit tests", project: "Backend", hours: 5.0 },
    { task: "Documentation", project: "Docs", hours: 2.0 },
  ]},
];

const MemberTimesheet = () => {
  const [tracking, setTracking] = useState(false);

  return (
    <PortalLayout title="Timesheet" subtitle="Track your hours" navItems={navItems} portalName="Member Portal">
      {/* Timer */}
      <GlassCard hover={false} glow="cyan" className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Current Timer</p>
            <p className="text-3xl font-bold font-mono mt-1">{tracking ? "02:34:18" : "00:00:00"}</p>
            {tracking && <p className="text-xs text-primary mt-1">Working on: Implement login flow</p>}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTracking(!tracking)}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              tracking ? "bg-destructive/20 text-destructive" : "btn-glow text-primary-foreground"
            }`}
          >
            {tracking ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </motion.button>
        </div>
      </GlassCard>

      {/* Timesheet entries */}
      <div className="space-y-4">
        {timesheetData.map((day, di) => (
          <motion.div key={day.date} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: di * 0.1 }}>
            <h3 className="text-sm font-semibold mb-2 text-muted-foreground">{day.date}</h3>
            <GlassCard hover={false}>
              <div className="space-y-3">
                {day.entries.map((entry, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/20 transition-colors">
                    <div>
                      <p className="text-sm font-medium">{entry.task}</p>
                      <p className="text-xs text-muted-foreground">{entry.project}</p>
                    </div>
                    <span className="text-sm font-semibold text-primary">{entry.hours}h</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-border/20 flex justify-between text-sm">
                <span className="text-muted-foreground">Total</span>
                <span className="font-semibold">{day.entries.reduce((a, e) => a + e.hours, 0)}h</span>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </PortalLayout>
  );
};

export default MemberTimesheet;
