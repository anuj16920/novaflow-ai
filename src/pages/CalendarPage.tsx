import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import GlassCard from "@/components/GlassCard";
import { useApp } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import CreateTaskModal from "@/components/CreateTaskModal";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const CalendarPage = () => {
  const { tasks } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 23)); // Feb 2026
  const [view, setView] = useState<"month" | "week">("month");
  const [createOpen, setCreateOpen] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prev = () => setCurrentDate(new Date(year, month - 1, 1));
  const next = () => setCurrentDate(new Date(year, month + 1, 1));

  const getTasksForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return tasks.filter((t) => t.dueDate === dateStr);
  };

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const today = new Date();
  const isToday = (d: number) => d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <MainLayout title="Calendar" subtitle={`${MONTHS[month]} ${year}`} breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Calendar" }]}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={prev} className="w-8 h-8 rounded-xl glass flex items-center justify-center hover-glow"><ChevronLeft className="w-4 h-4" /></button>
          <h2 className="text-sm font-semibold">{MONTHS[month]} {year}</h2>
          <button onClick={next} className="w-8 h-8 rounded-xl glass flex items-center justify-center hover-glow"><ChevronRight className="w-4 h-4" /></button>
        </div>
        <div className="flex gap-2">
          {(["month", "week"] as const).map((v) => (
            <button key={v} onClick={() => setView(v)} className={`h-8 px-3 rounded-xl text-xs font-medium capitalize transition-all ${view === v ? "btn-glow text-primary-foreground" : "glass text-muted-foreground"}`}>{v}</button>
          ))}
        </div>
      </div>

      <GlassCard hover={false}>
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-px mb-1">
          {DAYS.map((d) => (
            <div key={d} className="text-center text-[10px] font-semibold text-muted-foreground py-2">{d}</div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-px">
          {days.map((day, i) => {
            const dayTasks = day ? getTasksForDate(day) : [];
            return (
              <div
                key={i}
                className={`min-h-[80px] md:min-h-[100px] p-1.5 rounded-lg transition-all ${
                  day ? "hover:bg-muted/20 cursor-pointer" : ""
                } ${day && isToday(day) ? "ring-1 ring-primary/40 bg-primary/5" : ""}`}
                onClick={() => day && setCreateOpen(true)}
              >
                {day && (
                  <>
                    <span className={`text-xs font-medium ${isToday(day) ? "text-primary" : "text-muted-foreground"}`}>{day}</span>
                    <div className="mt-1 space-y-0.5">
                      {dayTasks.slice(0, 2).map((t) => (
                        <div key={t.id} className="text-[9px] px-1.5 py-0.5 rounded bg-primary/15 text-primary truncate">{t.title}</div>
                      ))}
                      {dayTasks.length > 2 && <div className="text-[9px] text-muted-foreground">+{dayTasks.length - 2} more</div>}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </GlassCard>

      <CreateTaskModal open={createOpen} onClose={() => setCreateOpen(false)} />
    </MainLayout>
  );
};

export default CalendarPage;
