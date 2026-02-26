import { useState } from "react";
import PortalLayout from "@/components/PortalLayout";
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { LayoutDashboard, FolderKanban, Receipt, Package, Download, CheckCircle2, Clock } from "lucide-react";

const navItems = [
  { to: "/client/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/client/projects", icon: FolderKanban, label: "Projects" },
  { to: "/client/deliverables", icon: Package, label: "Deliverables" },
  { to: "/client/invoices", icon: Receipt, label: "Invoices" },
];

const deliverables = [
  { id: 1, name: "UI Design System v3", project: "NovaPM Dashboard", status: "delivered", date: "Feb 20, 2026", approved: true },
  { id: 2, name: "API Documentation", project: "Backend Services", status: "delivered", date: "Feb 18, 2026", approved: false },
  { id: 3, name: "Dashboard Wireframes", project: "NovaPM Dashboard", status: "delivered", date: "Feb 15, 2026", approved: true },
  { id: 4, name: "Mobile App Prototype", project: "Mobile App v2", status: "in_progress", date: "Mar 1, 2026", approved: false },
  { id: 5, name: "Brand Guidelines Update", project: "NovaPM Dashboard", status: "delivered", date: "Feb 10, 2026", approved: true },
];

const ClientDeliverables = () => {
  const [approvals, setApprovals] = useState<Record<number, boolean>>(
    Object.fromEntries(deliverables.map((d) => [d.id, d.approved]))
  );

  return (
    <PortalLayout title="Deliverables" subtitle="Completed items & approvals" navItems={navItems} portalName="Client Portal" portalColor="text-gradient-cosmic">
      <div className="space-y-3">
        {deliverables.map((d, i) => (
          <motion.div key={d.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <GlassCard delay={0} glow={d.status === "delivered" ? "cyan" : "none"}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-xl glass flex items-center justify-center flex-shrink-0 ${d.status === "delivered" ? "text-emerald-400" : "text-muted-foreground"}`}>
                    {d.status === "delivered" ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium truncate">{d.name}</h3>
                    <p className="text-[11px] text-muted-foreground">{d.project} · {d.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {d.status === "delivered" && (
                    <>
                      <button className="text-xs text-primary hover:underline flex items-center gap-1">
                        <Download className="w-3 h-3" /> Download
                      </button>
                      <button
                        onClick={() => setApprovals((prev) => ({ ...prev, [d.id]: !prev[d.id] }))}
                        className={`h-7 px-3 rounded-lg text-[10px] font-medium transition-all ${approvals[d.id] ? "bg-emerald-500/20 text-emerald-400" : "btn-glow-outline"}`}
                      >
                        {approvals[d.id] ? "✓ Approved" : "Approve"}
                      </button>
                    </>
                  )}
                  {d.status === "in_progress" && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary">In Progress</span>
                  )}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </PortalLayout>
  );
};

export default ClientDeliverables;
