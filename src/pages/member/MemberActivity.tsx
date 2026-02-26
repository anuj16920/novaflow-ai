import PortalLayout from "@/components/PortalLayout";
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { LayoutDashboard, CheckSquare, Clock, TrendingUp, Activity, MessageSquare, FolderKanban, CheckCircle2 } from "lucide-react";

const navItems = [
  { to: "/member/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/member/tasks", icon: CheckSquare, label: "My Tasks" },
  { to: "/member/timesheet", icon: Clock, label: "Timesheet" },
  { to: "/member/performance", icon: TrendingUp, label: "Performance" },
  { to: "/member/activity", icon: Activity, label: "Activity" },
];

const activities = [
  { id: 1, action: "Completed task", target: "Mobile responsive fix", project: "NovaPM", time: "10 min ago", icon: CheckCircle2, color: "text-emerald-400" },
  { id: 2, action: "Commented on", target: "API integration layer", project: "Backend", time: "25 min ago", icon: MessageSquare, color: "text-primary" },
  { id: 3, action: "Started working on", target: "Dashboard chart widgets", project: "Dashboard", time: "1h ago", icon: Clock, color: "text-secondary" },
  { id: 4, action: "Created task", target: "Implement dark mode toggle", project: "NovaPM", time: "2h ago", icon: CheckSquare, color: "text-primary" },
  { id: 5, action: "Updated project", target: "Dashboard Redesign", project: "Dashboard", time: "3h ago", icon: FolderKanban, color: "text-accent" },
  { id: 6, action: "Completed task", target: "User onboarding flow", project: "NovaPM", time: "4h ago", icon: CheckCircle2, color: "text-emerald-400" },
  { id: 7, action: "Logged 3.5h on", target: "Design system overhaul", project: "NovaPM", time: "5h ago", icon: Clock, color: "text-secondary" },
  { id: 8, action: "Commented on", target: "Performance optimization", project: "Dashboard", time: "Yesterday", icon: MessageSquare, color: "text-primary" },
  { id: 9, action: "Completed task", target: "Fix sidebar animation", project: "Dashboard", time: "Yesterday", icon: CheckCircle2, color: "text-emerald-400" },
  { id: 10, action: "Started working on", target: "Write unit tests for auth", project: "Backend", time: "2 days ago", icon: Clock, color: "text-secondary" },
];

const MemberActivity = () => (
  <PortalLayout title="My Activity" subtitle="Personal activity log" navItems={navItems} portalName="Member Portal" portalColor="text-gradient-cyan">
    <GlassCard hover={false}>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border/30" />

        <div className="space-y-1">
          {activities.map((a, i) => (
            <motion.div key={a.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/10 transition-colors relative">
              <div className={`w-10 h-10 rounded-xl glass flex items-center justify-center flex-shrink-0 z-10 ${a.color}`}>
                <a.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="text-muted-foreground">{a.action}</span>{" "}
                  <span className="font-medium">{a.target}</span>
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{a.project}</p>
              </div>
              <span className="text-[10px] text-muted-foreground flex-shrink-0 pt-1">{a.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </GlassCard>
  </PortalLayout>
);

export default MemberActivity;
