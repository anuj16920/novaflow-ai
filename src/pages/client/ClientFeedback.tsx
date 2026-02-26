import { useState } from "react";
import PortalLayout from "@/components/PortalLayout";
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { LayoutDashboard, FolderKanban, Receipt, Package, CreditCard, MessageCircle, Send, Star } from "lucide-react";

const navItems = [
  { to: "/client/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/client/projects", icon: FolderKanban, label: "Projects" },
  { to: "/client/deliverables", icon: Package, label: "Deliverables" },
  { to: "/client/feedback", icon: MessageCircle, label: "Feedback" },
  { to: "/client/invoices", icon: Receipt, label: "Invoices" },
];

const feedbackHistory = [
  { id: 1, project: "NovaPM Dashboard", message: "The new design system looks fantastic! Love the color palette.", rating: 5, date: "Feb 20, 2026" },
  { id: 2, project: "Backend Services", message: "API docs could use more examples for the auth endpoints.", rating: 3, date: "Feb 18, 2026" },
  { id: 3, project: "NovaPM Dashboard", message: "Great progress on the dashboard. Minor alignment issues on mobile.", rating: 4, date: "Feb 12, 2026" },
];

const ClientFeedback = () => {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = () => {
    if (!message.trim()) return;
    setMessage("");
    setRating(0);
  };

  return (
    <PortalLayout title="Feedback" subtitle="Share your thoughts" navItems={navItems} portalName="Client Portal" portalColor="text-gradient-cosmic">
      {/* Submit Feedback */}
      <GlassCard hover={false} glow="purple" className="mb-6">
        <h3 className="text-sm font-semibold mb-4">Submit Feedback</h3>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(star)} className="transition-transform hover:scale-110">
                  <Star className={`w-6 h-6 ${(hoverRating || rating) >= star ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Message</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} placeholder="Share your feedback..." className="w-full px-4 py-3 rounded-xl glass bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none" />
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSubmit} className="h-9 px-6 rounded-xl btn-glow text-xs font-semibold text-primary-foreground flex items-center gap-2">
            <Send className="w-3.5 h-3.5" /> Submit Feedback
          </motion.button>
        </div>
      </GlassCard>

      {/* History */}
      <h3 className="text-sm font-semibold mb-3">Feedback History</h3>
      <div className="space-y-3">
        {feedbackHistory.map((f, i) => (
          <motion.div key={f.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <GlassCard delay={0}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-primary">{f.project}</span>
                    <span className="text-[10px] text-muted-foreground">{f.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{f.message}</p>
                </div>
                <div className="flex gap-0.5 flex-shrink-0">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`w-3 h-3 ${f.rating >= star ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`} />
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </PortalLayout>
  );
};

export default ClientFeedback;
