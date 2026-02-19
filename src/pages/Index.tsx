import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";
import GlassCard from "@/components/GlassCard";
import {
  Sparkles,
  Zap,
  Shield,
  BarChart3,
  Users,
  Clock,
  ArrowRight,
  CheckCircle2,
  Brain,
} from "lucide-react";

const features = [
  { icon: Brain, title: "AI-Powered Tasks", desc: "Auto-generate, prioritize, and predict deadlines with AI." },
  { icon: Zap, title: "Lightning Fast", desc: "Sub-second interactions. 60fps animations. Zero lag." },
  { icon: Shield, title: "Enterprise Security", desc: "Role-based access, encryption, and audit trails." },
  { icon: BarChart3, title: "Real-time Analytics", desc: "Live dashboards with actionable team insights." },
  { icon: Users, title: "Team Collaboration", desc: "Comments, mentions, and real-time task updates." },
  { icon: Clock, title: "Time Tracking", desc: "Built-in timers with automated reporting." },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <StarField />

      {/* Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-secondary/10 blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[150px] animate-glow-pulse" style={{ animationDelay: "3s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 lg:px-12 h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg btn-glow flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-gradient-cyan">NovaPM</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="h-9 px-5 rounded-xl btn-glow-outline text-sm font-medium"
            >
              Log In
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/dashboard")}
              className="h-9 px-5 rounded-xl btn-glow text-sm font-medium text-primary-foreground"
            >
              Get Started
            </motion.button>
          </div>
        </nav>

        {/* Hero */}
        <section className="flex flex-col items-center text-center px-6 pt-20 pb-16 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-medium text-primary px-3 py-1.5 rounded-full glass mb-6">
              <Sparkles className="w-3 h-3" /> AI-Powered Project Management
            </span>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
              Manage projects at{" "}
              <span className="text-gradient-cosmic">warp speed</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              NovaPM combines AI intelligence with a stunning interface to help your team ship faster.
              Task generation, smart prioritization, and deadline prediction — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/dashboard")}
                className="h-12 px-8 rounded-2xl btn-glow text-sm font-semibold text-primary-foreground flex items-center gap-2"
              >
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </motion.button>
              <button
                onClick={() => navigate("/dashboard")}
                className="h-12 px-8 rounded-2xl btn-glow-outline text-sm font-semibold"
              >
                View Demo
              </button>
            </div>
          </motion.div>

          {/* Floating stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 mt-16"
          >
            {[
              { value: "10k+", label: "Teams" },
              { value: "2M+", label: "Tasks Completed" },
              { value: "99.9%", label: "Uptime" },
              { value: "4.9★", label: "Rating" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-gradient-cyan">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Features */}
        <section className="px-6 lg:px-12 pb-24 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-3">
              Everything you need to <span className="text-gradient-cosmic">ship faster</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Built for modern teams who demand speed, intelligence, and beauty.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <GlassCard key={f.title} delay={i * 0.08} glow={i % 3 === 0 ? "cyan" : i % 3 === 1 ? "purple" : "pink"}>
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-24 max-w-3xl mx-auto text-center">
          <GlassCard hover={false} glow="cyan" className="py-12">
            <h2 className="text-3xl font-bold mb-3">Ready to launch?</h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of teams already using NovaPM to build the future.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/dashboard")}
              className="h-12 px-8 rounded-2xl btn-glow text-sm font-semibold text-primary-foreground"
            >
              Get Started — It's Free
            </motion.button>
          </GlassCard>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/30 py-8 text-center text-xs text-muted-foreground">
          © 2026 NovaPM. Built with ✦ in the cosmos.
        </footer>
      </div>
    </div>
  );
};

export default Index;
