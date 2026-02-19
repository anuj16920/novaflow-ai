import PortalLayout from "@/components/PortalLayout";
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { LayoutDashboard, FolderKanban, Receipt, Download, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const navItems = [
  { to: "/client/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/client/projects", icon: FolderKanban, label: "Projects" },
  { to: "/client/invoices", icon: Receipt, label: "Invoices" },
];

const invoices = [
  { id: "INV-001", project: "NovaPM Dashboard", amount: "$4,200", date: "Feb 15, 2026", status: "Paid" },
  { id: "INV-002", project: "Mobile App v2", amount: "$2,100", date: "Feb 1, 2026", status: "Pending" },
  { id: "INV-003", project: "NovaPM Dashboard", amount: "$3,800", date: "Jan 15, 2026", status: "Paid" },
  { id: "INV-004", project: "Mobile App v2", amount: "$1,500", date: "Jan 1, 2026", status: "Overdue" },
];

const statusIcon: Record<string, any> = {
  Paid: { icon: CheckCircle2, class: "text-emerald-400" },
  Pending: { icon: Clock, class: "text-primary" },
  Overdue: { icon: AlertCircle, class: "text-accent" },
};

const ClientInvoices = () => (
  <PortalLayout title="Invoices" subtitle="Billing history" navItems={navItems} portalName="Client Portal" portalColor="text-gradient-cosmic">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {[
        { label: "Total Paid", value: "$8,000", glow: "cyan" as const },
        { label: "Pending", value: "$2,100", glow: "purple" as const },
        { label: "Overdue", value: "$1,500", glow: "pink" as const },
      ].map((s, i) => (
        <GlassCard key={s.label} glow={s.glow} delay={i * 0.1}>
          <p className="text-sm text-muted-foreground">{s.label}</p>
          <p className="text-3xl font-bold mt-1">{s.value}</p>
        </GlassCard>
      ))}
    </div>

    <GlassCard hover={false}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/30">
              <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">Invoice</th>
              <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">Project</th>
              <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">Amount</th>
              <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">Date</th>
              <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">Status</th>
              <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, i) => {
              const StatusIcon = statusIcon[inv.status].icon;
              return (
                <motion.tr key={inv.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="border-b border-border/10 hover:bg-muted/10 transition-colors">
                  <td className="py-3 px-4 text-sm font-medium">{inv.id}</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{inv.project}</td>
                  <td className="py-3 px-4 text-sm font-semibold">{inv.amount}</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{inv.date}</td>
                  <td className="py-3 px-4">
                    <span className={`flex items-center gap-1 text-xs font-medium ${statusIcon[inv.status].class}`}>
                      <StatusIcon className="w-3 h-3" /> {inv.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-xs text-primary hover:underline flex items-center gap-1 ml-auto">
                      <Download className="w-3 h-3" /> PDF
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </GlassCard>
  </PortalLayout>
);

export default ClientInvoices;
