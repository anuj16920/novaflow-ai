import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import GlassCard from "@/components/GlassCard";
import { useApp } from "@/contexts/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, Bell, Palette, Building2, CreditCard, AlertTriangle, X } from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "password", label: "Password", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "workspace", label: "Workspace", icon: Building2 },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "danger", label: "Danger Zone", icon: AlertTriangle },
];

const SettingsPage = () => {
  const { currentUser, theme, setTheme } = useApp();
  const [tab, setTab] = useState("profile");
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <MainLayout title="Settings" breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Settings" }]}>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Tabs */}
        <div className="w-full md:w-52 flex md:flex-col gap-1 overflow-x-auto md:overflow-visible flex-shrink-0">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${tab === t.id ? "glass-strong text-foreground glow-cyan" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"}`}>
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {tab === "profile" && (
            <GlassCard hover={false}>
              <h3 className="text-sm font-semibold mb-4">Profile Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-cosmic flex items-center justify-center text-xl font-bold">{currentUser.avatar}</div>
                  <button className="h-8 px-4 rounded-xl btn-glow-outline text-xs font-medium">Change Avatar</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Full Name</label>
                    <input defaultValue={currentUser.name} className="w-full h-10 px-4 rounded-xl glass bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Email</label>
                    <input defaultValue={currentUser.email} className="w-full h-10 px-4 rounded-xl glass bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Department</label>
                    <input defaultValue={currentUser.department} className="w-full h-10 px-4 rounded-xl glass bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Role</label>
                    <input defaultValue={currentUser.role} disabled className="w-full h-10 px-4 rounded-xl glass bg-transparent text-sm focus:outline-none capitalize opacity-60" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="h-9 px-6 rounded-xl btn-glow text-xs font-semibold text-primary-foreground">Save Changes</motion.button>
                </div>
              </div>
            </GlassCard>
          )}

          {tab === "password" && (
            <GlassCard hover={false}>
              <h3 className="text-sm font-semibold mb-4">Change Password</h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Current Password</label>
                  <input type="password" className="w-full h-10 px-4 rounded-xl glass bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">New Password</label>
                  <input type="password" className="w-full h-10 px-4 rounded-xl glass bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Confirm Password</label>
                  <input type="password" className="w-full h-10 px-4 rounded-xl glass bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="h-9 px-6 rounded-xl btn-glow text-xs font-semibold text-primary-foreground">Update Password</motion.button>
              </div>
            </GlassCard>
          )}

          {tab === "notifications" && (
            <GlassCard hover={false}>
              <h3 className="text-sm font-semibold mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {["Task assigned to you", "Task deadline approaching", "New comments on your tasks", "Project status updates", "Weekly digest email"].map((item) => (
                  <div key={item} className="flex items-center justify-between p-3 rounded-xl glass">
                    <span className="text-sm">{item}</span>
                    <button className="relative w-11 h-6 rounded-full bg-primary transition-all">
                      <div className="absolute top-1 left-[22px] w-4 h-4 rounded-full bg-foreground" />
                    </button>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {tab === "appearance" && (
            <GlassCard hover={false}>
              <h3 className="text-sm font-semibold mb-4">Appearance</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">Theme</label>
                  <div className="flex gap-3">
                    {(["dark", "light"] as const).map((t) => (
                      <button key={t} onClick={() => setTheme(t)} className={`h-20 w-28 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1 ${theme === t ? "border-primary glow-cyan" : "border-border/30 hover:border-border"}`}>
                        <div className={`w-8 h-8 rounded-lg ${t === "dark" ? "bg-card" : "bg-white"}`} />
                        <span className="text-xs capitalize">{t}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          )}

          {tab === "workspace" && (
            <GlassCard hover={false}>
              <h3 className="text-sm font-semibold mb-4">Workspace Settings</h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Workspace Name</label>
                  <input defaultValue="NovaPM Workspace" className="w-full h-10 px-4 rounded-xl glass bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Workspace URL</label>
                  <input defaultValue="novapm.workspace.com" className="w-full h-10 px-4 rounded-xl glass bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="h-9 px-6 rounded-xl btn-glow text-xs font-semibold text-primary-foreground">Save</motion.button>
              </div>
            </GlassCard>
          )}

          {tab === "billing" && (
            <GlassCard hover={false} glow="cyan">
              <h3 className="text-sm font-semibold mb-4">Billing & Subscription</h3>
              <div className="p-4 rounded-xl glass mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">Pro Plan</p>
                    <p className="text-xs text-muted-foreground">$29/month · Renews March 1, 2026</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">Active</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="h-9 px-4 rounded-xl btn-glow-outline text-xs font-medium">Change Plan</button>
                <button className="h-9 px-4 rounded-xl glass text-xs text-muted-foreground hover:text-foreground">Payment History</button>
              </div>
            </GlassCard>
          )}

          {tab === "danger" && (
            <GlassCard hover={false}>
              <h3 className="text-sm font-semibold mb-4 text-destructive">Danger Zone</h3>
              <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/5">
                <h4 className="text-sm font-medium mb-1">Delete Workspace</h4>
                <p className="text-xs text-muted-foreground mb-3">This action is permanent and cannot be undone.</p>
                <button onClick={() => setDeleteOpen(true)} className="h-9 px-4 rounded-xl bg-destructive text-destructive-foreground text-xs font-medium hover:bg-destructive/90 transition-all">Delete Workspace</button>
              </div>

              {/* Delete modal */}
              <AnimatePresence>
                {deleteOpen && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={(e) => e.stopPropagation()} className="glass-strong rounded-2xl w-full max-w-sm p-6 shadow-2xl">
                      <h3 className="text-lg font-bold text-destructive mb-2">Delete Workspace?</h3>
                      <p className="text-sm text-muted-foreground mb-4">This will permanently delete all projects, tasks, and data.</p>
                      <div className="flex gap-3">
                        <button onClick={() => setDeleteOpen(false)} className="flex-1 h-10 rounded-xl btn-glow-outline text-sm font-medium">Cancel</button>
                        <button onClick={() => setDeleteOpen(false)} className="flex-1 h-10 rounded-xl bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90">Delete</button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
