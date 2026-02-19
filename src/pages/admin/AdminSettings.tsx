import { useState } from "react";
import PortalLayout from "@/components/PortalLayout";
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import {
  LayoutDashboard, FolderKanban, Users, BarChart3, Settings,
  Bell, Shield, Palette, Globe,
} from "lucide-react";

const navItems = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/projects", icon: FolderKanban, label: "Projects" },
  { to: "/admin/users", icon: Users, label: "User Management" },
  { to: "/admin/reports", icon: BarChart3, label: "Reports" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

const settingSections = [
  { icon: Globe, title: "General", desc: "App name, timezone, language" },
  { icon: Shield, title: "Security", desc: "Authentication, 2FA, sessions" },
  { icon: Bell, title: "Notifications", desc: "Email, push, in-app alerts" },
  { icon: Palette, title: "Appearance", desc: "Theme, colors, layout" },
];

const AdminSettings = () => {
  const [activeSection, setActiveSection] = useState("General");

  return (
    <PortalLayout title="Settings" subtitle="System configuration" navItems={navItems} portalName="Admin Portal">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Sidebar */}
        <div className="space-y-2">
          {settingSections.map((s, i) => (
            <motion.button
              key={s.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setActiveSection(s.title)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                activeSection === s.title ? "glass-strong text-foreground glow-cyan" : "text-muted-foreground hover:bg-muted/20"
              }`}
            >
              <s.icon className="w-5 h-5" />
              <div>
                <p className="text-sm font-medium">{s.title}</p>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <GlassCard className="lg:col-span-3" hover={false}>
          <h3 className="text-lg font-semibold mb-6">{activeSection}</h3>
          <div className="space-y-6">
            {["Setting Option 1", "Setting Option 2", "Setting Option 3"].map((label, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl glass-subtle">
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Configure {label.toLowerCase()} for your workspace</p>
                </div>
                <div className="w-12 h-6 rounded-full bg-primary/30 relative cursor-pointer">
                  <div className="w-5 h-5 rounded-full bg-primary absolute top-0.5 right-0.5" />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </PortalLayout>
  );
};

export default AdminSettings;
