import PortalLayout from "@/components/PortalLayout";
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { LayoutDashboard, FolderKanban, Receipt, Package, CreditCard, CheckCircle2 } from "lucide-react";

const navItems = [
  { to: "/client/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/client/projects", icon: FolderKanban, label: "Projects" },
  { to: "/client/deliverables", icon: Package, label: "Deliverables" },
  { to: "/client/billing", icon: CreditCard, label: "Billing" },
  { to: "/client/invoices", icon: Receipt, label: "Invoices" },
];

const payments = [
  { id: "PAY-001", amount: "$4,200", date: "Feb 15, 2026", method: "Visa •••• 4242", status: "Completed" },
  { id: "PAY-002", amount: "$3,800", date: "Jan 15, 2026", method: "Visa •••• 4242", status: "Completed" },
  { id: "PAY-003", amount: "$5,000", date: "Dec 15, 2025", method: "Visa •••• 4242", status: "Completed" },
  { id: "PAY-004", amount: "$3,200", date: "Nov 15, 2025", method: "Wire Transfer", status: "Completed" },
];

const ClientBilling = () => (
  <PortalLayout title="Billing" subtitle="Payment history & subscription" navItems={navItems} portalName="Client Portal" portalColor="text-gradient-cosmic">
    {/* Subscription Card */}
    <GlassCard hover={false} glow="cyan" className="mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold">Current Plan</h3>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold">Pro</span>
            <span className="text-sm text-muted-foreground">· $29/month</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Next billing date: March 1, 2026</p>
        </div>
        <div className="flex gap-2">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="h-9 px-4 rounded-xl btn-glow text-xs font-semibold text-primary-foreground">Upgrade Plan</motion.button>
          <button className="h-9 px-4 rounded-xl btn-glow-outline text-xs font-medium">Manage</button>
        </div>
      </div>
    </GlassCard>

    {/* Payment History */}
    <GlassCard hover={false}>
      <h3 className="text-sm font-semibold mb-4">Payment History</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/30">
              <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">ID</th>
              <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">Amount</th>
              <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4 hidden sm:table-cell">Method</th>
              <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">Date</th>
              <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, i) => (
              <motion.tr key={p.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="border-b border-border/10 hover:bg-muted/10 transition-colors">
                <td className="py-3 px-4 text-sm font-medium">{p.id}</td>
                <td className="py-3 px-4 text-sm font-semibold">{p.amount}</td>
                <td className="py-3 px-4 text-sm text-muted-foreground hidden sm:table-cell">{p.method}</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">{p.date}</td>
                <td className="py-3 px-4">
                  <span className="flex items-center gap-1 text-xs font-medium text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" /> {p.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  </PortalLayout>
);

export default ClientBilling;
