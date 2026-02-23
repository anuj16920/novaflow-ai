import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import GlassCard from "@/components/GlassCard";
import { useApp } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import { Search, Plus, DollarSign, Mail } from "lucide-react";

const Clients = () => {
  const { clients } = useApp();
  const [search, setSearch] = useState("");

  const filtered = clients.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.company.toLowerCase().includes(search.toLowerCase()));

  return (
    <MainLayout title="Clients" subtitle={`${clients.length} clients`} breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Clients" }]}>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search clients..." className="w-full h-9 pl-9 pr-4 rounded-xl glass bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
        </div>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="h-9 px-4 rounded-xl btn-glow text-xs font-medium text-primary-foreground flex items-center gap-2">
          <Plus className="w-3.5 h-3.5" /> Add Client
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((client, i) => (
          <GlassCard key={client.id} delay={i * 0.06} glow={client.status === "active" ? "cyan" : "none"}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-cosmic flex items-center justify-center text-sm font-bold flex-shrink-0">{client.avatar}</div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold">{client.name}</h3>
                <p className="text-xs text-muted-foreground">{client.company}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <Mail className="w-3 h-3" /> {client.email}
                </div>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full capitalize ${client.status === "active" ? "bg-emerald-500/20 text-emerald-400" : "bg-muted text-muted-foreground"}`}>{client.status}</span>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/20">
              <div className="text-xs text-muted-foreground">{client.projects} projects</div>
              <div className="flex items-center gap-1 text-xs font-medium">
                <DollarSign className="w-3 h-3 text-primary" /> {(client.totalBudget / 1000).toFixed(0)}k budget
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </MainLayout>
  );
};

export default Clients;
