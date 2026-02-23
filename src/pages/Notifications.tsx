import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import GlassCard from "@/components/GlassCard";
import { useApp } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import { Bell, CheckSquare, Clock, MessageSquare, FolderKanban, AtSign, Check, Trash2 } from "lucide-react";

const typeIcons: Record<string, typeof Bell> = {
  task_assigned: CheckSquare,
  deadline: Clock,
  comment: MessageSquare,
  project_update: FolderKanban,
  mention: AtSign,
};

const Notifications = () => {
  const { notifications, markNotificationRead, clearNotifications } = useApp();
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? notifications : filter === "unread" ? notifications.filter((n) => !n.read) : notifications.filter((n) => n.type === filter);

  return (
    <MainLayout title="Notifications" subtitle={`${notifications.filter((n) => !n.read).length} unread`} breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Notifications" }]}>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex gap-2 flex-wrap flex-1">
          {["all", "unread", "task_assigned", "deadline", "comment", "mention"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`h-8 px-3 rounded-xl text-xs font-medium transition-all capitalize ${filter === f ? "btn-glow text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"}`}>
              {f.replace("_", " ")}
            </button>
          ))}
        </div>
        <button onClick={clearNotifications} className="h-8 px-3 rounded-xl glass text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5" /> Mark all read
        </button>
      </div>

      <div className="space-y-2">
        {filtered.length === 0 && (
          <GlassCard hover={false}>
            <div className="text-center py-10">
              <Bell className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          </GlassCard>
        )}
        {filtered.map((notif, i) => {
          const Icon = typeIcons[notif.type] || Bell;
          return (
            <motion.div key={notif.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <GlassCard delay={0} glow={!notif.read ? "cyan" : "none"}>
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-xl glass flex items-center justify-center flex-shrink-0 ${!notif.read ? "text-primary" : "text-muted-foreground"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className={`text-sm font-medium ${!notif.read ? "" : "text-muted-foreground"}`}>{notif.title}</h3>
                      {!notif.read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{notif.message}</p>
                    <p className="text-[10px] text-muted-foreground/60 mt-1">{notif.time}</p>
                  </div>
                  {!notif.read && (
                    <button onClick={() => markNotificationRead(notif.id)} className="text-xs text-primary hover:underline flex-shrink-0">
                      Mark read
                    </button>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </MainLayout>
  );
};

export default Notifications;
