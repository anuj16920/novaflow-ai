import { createContext, useContext, useState, ReactNode, useCallback } from "react";

// ───── Types ─────
export interface Task {
  id: string;
  title: string;
  description: string;
  project: string;
  projectId: string;
  status: "todo" | "in_progress" | "review" | "completed" | "blocked";
  priority: "low" | "medium" | "high" | "urgent";
  assignee: string;
  assigneeAvatar: string;
  dueDate: string;
  tags: string[];
  subtasks: { id: string; title: string; done: boolean }[];
  comments: { id: string; user: string; text: string; time: string }[];
  checklist: number;
  checklistDone: number;
  createdAt: string;
  timeSpent: number; // minutes
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "on_hold" | "archived";
  priority: "low" | "medium" | "high";
  progress: number;
  members: { name: string; avatar: string; role: string }[];
  deadline: string;
  budget: number;
  spent: number;
  tasksTotal: number;
  tasksDone: number;
  createdAt: string;
  color: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "member" | "client";
  avatar: string;
  department: string;
  status: "active" | "away" | "offline";
  tasksAssigned: number;
  tasksCompleted: number;
  workload: number; // 0-100
}

export interface Notification {
  id: string;
  type: "task_assigned" | "deadline" | "comment" | "project_update" | "mention";
  title: string;
  message: string;
  time: string;
  read: boolean;
  link: string;
}

export interface FileItem {
  id: string;
  name: string;
  type: "image" | "document" | "spreadsheet" | "pdf" | "video" | "other";
  size: string;
  project: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface Automation {
  id: string;
  name: string;
  trigger: string;
  action: string;
  condition: string;
  enabled: boolean;
  lastRun: string;
}

export interface ClientItem {
  id: string;
  name: string;
  company: string;
  email: string;
  projects: number;
  totalBudget: number;
  status: "active" | "inactive";
  avatar: string;
}

// ───── Mock Data ─────
const mockTasks: Task[] = [
  { id: "t1", title: "Design system overhaul", description: "Rebuild the entire design system with new tokens", project: "NovaPM", projectId: "p1", status: "in_progress", priority: "high", assignee: "Alex Kim", assigneeAvatar: "AK", dueDate: "2026-03-01", tags: ["design", "ui"], subtasks: [{ id: "s1", title: "Color tokens", done: true }, { id: "s2", title: "Typography scale", done: false }], comments: [{ id: "c1", user: "Sarah M.", text: "Looking great!", time: "2h ago" }], checklist: 5, checklistDone: 3, createdAt: "2026-02-10", timeSpent: 240 },
  { id: "t2", title: "API integration layer", description: "Create abstraction layer for all API calls", project: "Backend", projectId: "p2", status: "todo", priority: "urgent", assignee: "John Davis", assigneeAvatar: "JD", dueDate: "2026-02-28", tags: ["backend", "api"], subtasks: [], comments: [], checklist: 3, checklistDone: 0, createdAt: "2026-02-15", timeSpent: 0 },
  { id: "t3", title: "User onboarding flow", description: "Create step-by-step onboarding wizard", project: "NovaPM", projectId: "p1", status: "review", priority: "medium", assignee: "Lisa Ray", assigneeAvatar: "LR", dueDate: "2026-02-25", tags: ["ux", "feature"], subtasks: [{ id: "s3", title: "Welcome screen", done: true }, { id: "s4", title: "Tutorial steps", done: true }], comments: [{ id: "c2", user: "Mike P.", text: "Needs one more revision", time: "30m ago" }], checklist: 4, checklistDone: 4, createdAt: "2026-02-08", timeSpent: 180 },
  { id: "t4", title: "Performance optimization", description: "Reduce bundle size and improve load times", project: "Dashboard", projectId: "p3", status: "in_progress", priority: "high", assignee: "Alex Kim", assigneeAvatar: "AK", dueDate: "2026-03-05", tags: ["performance"], subtasks: [], comments: [], checklist: 6, checklistDone: 2, createdAt: "2026-02-18", timeSpent: 120 },
  { id: "t5", title: "Mobile responsive fix", description: "Fix layout issues on mobile devices", project: "NovaPM", projectId: "p1", status: "completed", priority: "medium", assignee: "Sarah Mitchell", assigneeAvatar: "SM", dueDate: "2026-02-20", tags: ["bug", "mobile"], subtasks: [], comments: [], checklist: 2, checklistDone: 2, createdAt: "2026-02-12", timeSpent: 90 },
  { id: "t6", title: "Write unit tests for auth", description: "Full test coverage for authentication module", project: "Backend", projectId: "p2", status: "todo", priority: "high", assignee: "John Davis", assigneeAvatar: "JD", dueDate: "2026-03-02", tags: ["testing"], subtasks: [], comments: [], checklist: 8, checklistDone: 0, createdAt: "2026-02-20", timeSpent: 0 },
  { id: "t7", title: "Client feedback integration", description: "Add feedback collection widget for clients", project: "Client Portal", projectId: "p4", status: "blocked", priority: "low", assignee: "Lisa Ray", assigneeAvatar: "LR", dueDate: "2026-03-10", tags: ["feature", "client"], subtasks: [], comments: [{ id: "c3", user: "Alex K.", text: "Blocked by API changes", time: "1d ago" }], checklist: 3, checklistDone: 1, createdAt: "2026-02-19", timeSpent: 45 },
  { id: "t8", title: "Dashboard chart widgets", description: "Add interactive chart components to dashboard", project: "Dashboard", projectId: "p3", status: "in_progress", priority: "medium", assignee: "Mike Parker", assigneeAvatar: "MP", dueDate: "2026-02-27", tags: ["ui", "charts"], subtasks: [], comments: [], checklist: 4, checklistDone: 2, createdAt: "2026-02-14", timeSpent: 150 },
  { id: "t9", title: "Email notification system", description: "Set up transactional email notifications", project: "Backend", projectId: "p2", status: "todo", priority: "medium", assignee: "Sarah Mitchell", assigneeAvatar: "SM", dueDate: "2026-03-08", tags: ["backend", "notifications"], subtasks: [], comments: [], checklist: 5, checklistDone: 0, createdAt: "2026-02-21", timeSpent: 0 },
  { id: "t10", title: "File upload component", description: "Drag and drop file upload with preview", project: "NovaPM", projectId: "p1", status: "review", priority: "low", assignee: "Mike Parker", assigneeAvatar: "MP", dueDate: "2026-02-26", tags: ["feature", "ui"], subtasks: [], comments: [], checklist: 3, checklistDone: 3, createdAt: "2026-02-16", timeSpent: 75 },
];

const mockProjects: Project[] = [
  { id: "p1", name: "NovaPM Platform", description: "AI-powered project management SaaS platform", status: "active", priority: "high", progress: 68, members: [{ name: "Alex Kim", avatar: "AK", role: "Lead" }, { name: "Lisa Ray", avatar: "LR", role: "Designer" }, { name: "Sarah M.", avatar: "SM", role: "Dev" }], deadline: "2026-04-15", budget: 85000, spent: 52000, tasksTotal: 42, tasksDone: 28, createdAt: "2026-01-10", color: "hsl(187, 100%, 50%)" },
  { id: "p2", name: "Backend Services", description: "Microservices architecture for the platform", status: "active", priority: "high", progress: 45, members: [{ name: "John Davis", avatar: "JD", role: "Lead" }, { name: "Sarah M.", avatar: "SM", role: "Dev" }], deadline: "2026-05-01", budget: 65000, spent: 28000, tasksTotal: 36, tasksDone: 16, createdAt: "2026-01-20", color: "hsl(255, 50%, 58%)" },
  { id: "p3", name: "Dashboard Redesign", description: "Complete dashboard UI/UX overhaul", status: "active", priority: "medium", progress: 82, members: [{ name: "Alex Kim", avatar: "AK", role: "Lead" }, { name: "Mike Parker", avatar: "MP", role: "Dev" }], deadline: "2026-03-15", budget: 32000, spent: 26000, tasksTotal: 18, tasksDone: 15, createdAt: "2026-02-01", color: "hsl(320, 100%, 70%)" },
  { id: "p4", name: "Client Portal", description: "Self-service portal for clients", status: "on_hold", priority: "low", progress: 30, members: [{ name: "Lisa Ray", avatar: "LR", role: "Lead" }], deadline: "2026-06-01", budget: 45000, spent: 12000, tasksTotal: 24, tasksDone: 7, createdAt: "2026-02-05", color: "hsl(142, 71%, 45%)" },
  { id: "p5", name: "Mobile App v2", description: "Native mobile application rebuild", status: "completed", priority: "high", progress: 100, members: [{ name: "Sarah M.", avatar: "SM", role: "Lead" }, { name: "John Davis", avatar: "JD", role: "Dev" }, { name: "Mike Parker", avatar: "MP", role: "Dev" }], deadline: "2026-02-01", budget: 120000, spent: 115000, tasksTotal: 56, tasksDone: 56, createdAt: "2025-10-01", color: "hsl(40, 100%, 50%)" },
];

const mockTeam: TeamMember[] = [
  { id: "m1", name: "Alex Kim", email: "alex@novapm.com", role: "admin", avatar: "AK", department: "Engineering", status: "active", tasksAssigned: 12, tasksCompleted: 8, workload: 85 },
  { id: "m2", name: "Sarah Mitchell", email: "sarah@novapm.com", role: "manager", avatar: "SM", department: "Engineering", status: "active", tasksAssigned: 8, tasksCompleted: 5, workload: 65 },
  { id: "m3", name: "John Davis", email: "john@novapm.com", role: "member", avatar: "JD", department: "Backend", status: "active", tasksAssigned: 10, tasksCompleted: 4, workload: 90 },
  { id: "m4", name: "Lisa Ray", email: "lisa@novapm.com", role: "member", avatar: "LR", department: "Design", status: "away", tasksAssigned: 6, tasksCompleted: 4, workload: 55 },
  { id: "m5", name: "Mike Parker", email: "mike@novapm.com", role: "member", avatar: "MP", department: "Frontend", status: "active", tasksAssigned: 9, tasksCompleted: 6, workload: 72 },
  { id: "m6", name: "Emma Wilson", email: "emma@novapm.com", role: "member", avatar: "EW", department: "QA", status: "offline", tasksAssigned: 5, tasksCompleted: 5, workload: 40 },
];

const mockNotifications: Notification[] = [
  { id: "n1", type: "task_assigned", title: "New task assigned", message: "You've been assigned 'API integration layer'", time: "5m ago", read: false, link: "/tasks" },
  { id: "n2", type: "deadline", title: "Deadline approaching", message: "Design system overhaul is due in 3 days", time: "1h ago", read: false, link: "/tasks" },
  { id: "n3", type: "comment", title: "New comment", message: "Sarah commented on 'User onboarding flow'", time: "2h ago", read: false, link: "/tasks" },
  { id: "n4", type: "project_update", title: "Project updated", message: "Dashboard Redesign progress changed to 82%", time: "4h ago", read: true, link: "/projects" },
  { id: "n5", type: "mention", title: "You were mentioned", message: "Alex mentioned you in Backend Services", time: "6h ago", read: true, link: "/projects" },
  { id: "n6", type: "task_assigned", title: "Task completed", message: "Mike completed 'Mobile responsive fix'", time: "1d ago", read: true, link: "/tasks" },
];

const mockFiles: FileItem[] = [
  { id: "f1", name: "design-system-v3.fig", type: "document", size: "24 MB", project: "NovaPM", uploadedBy: "Lisa Ray", uploadedAt: "2026-02-20" },
  { id: "f2", name: "api-docs.pdf", type: "pdf", size: "2.1 MB", project: "Backend", uploadedBy: "John Davis", uploadedAt: "2026-02-19" },
  { id: "f3", name: "dashboard-mockup.png", type: "image", size: "4.5 MB", project: "Dashboard", uploadedBy: "Alex Kim", uploadedAt: "2026-02-18" },
  { id: "f4", name: "sprint-report.xlsx", type: "spreadsheet", size: "890 KB", project: "NovaPM", uploadedBy: "Sarah M.", uploadedAt: "2026-02-17" },
  { id: "f5", name: "demo-video.mp4", type: "video", size: "156 MB", project: "Mobile App", uploadedBy: "Mike Parker", uploadedAt: "2026-02-15" },
  { id: "f6", name: "brand-guidelines.pdf", type: "pdf", size: "8.2 MB", project: "NovaPM", uploadedBy: "Lisa Ray", uploadedAt: "2026-02-14" },
  { id: "f7", name: "wireframes.fig", type: "document", size: "18 MB", project: "Client Portal", uploadedBy: "Lisa Ray", uploadedAt: "2026-02-12" },
  { id: "f8", name: "architecture-diagram.png", type: "image", size: "1.2 MB", project: "Backend", uploadedBy: "John Davis", uploadedAt: "2026-02-10" },
];

const mockAutomations: Automation[] = [
  { id: "a1", name: "Auto-assign on creation", trigger: "Task Created", action: "Assign to project lead", condition: "If no assignee set", enabled: true, lastRun: "2h ago" },
  { id: "a2", name: "Deadline reminder", trigger: "Due Date -1 day", action: "Send notification", condition: "Task not completed", enabled: true, lastRun: "6h ago" },
  { id: "a3", name: "Move to Review", trigger: "All subtasks done", action: "Change status to Review", condition: "Always", enabled: false, lastRun: "1d ago" },
  { id: "a4", name: "Weekly report", trigger: "Every Monday 9am", action: "Generate report email", condition: "Always", enabled: true, lastRun: "3d ago" },
];

const mockClients: ClientItem[] = [
  { id: "cl1", name: "Acme Corp", company: "Acme Corporation", email: "contact@acme.com", projects: 3, totalBudget: 250000, status: "active", avatar: "AC" },
  { id: "cl2", name: "TechStart", company: "TechStart Inc", email: "hello@techstart.io", projects: 1, totalBudget: 85000, status: "active", avatar: "TS" },
  { id: "cl3", name: "GlobalMedia", company: "Global Media Group", email: "pm@globalmedia.com", projects: 2, totalBudget: 180000, status: "inactive", avatar: "GM" },
];

// ───── Context ─────
interface AppState {
  tasks: Task[];
  projects: Project[];
  team: TeamMember[];
  notifications: Notification[];
  files: FileItem[];
  automations: Automation[];
  clients: ClientItem[];
  currentUser: TeamMember;
  theme: "dark" | "light";
  sidebarCollapsed: boolean;
  // Actions
  setTheme: (t: "dark" | "light") => void;
  setSidebarCollapsed: (v: boolean) => void;
  addTask: (t: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addProject: (p: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  toggleAutomation: (id: string) => void;
  unreadCount: number;
}

const AppContext = createContext<AppState | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [team] = useState<TeamMember[]>(mockTeam);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [files] = useState<FileItem[]>(mockFiles);
  const [automations, setAutomations] = useState<Automation[]>(mockAutomations);
  const [clients] = useState<ClientItem[]>(mockClients);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const currentUser = team[0];
  const unreadCount = notifications.filter((n) => !n.read).length;

  const addTask = useCallback((t: Task) => setTasks((prev) => [t, ...prev]), []);
  const updateTask = useCallback((id: string, updates: Partial<Task>) => setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t))), []);
  const deleteTask = useCallback((id: string) => setTasks((prev) => prev.filter((t) => t.id !== id)), []);
  const addProject = useCallback((p: Project) => setProjects((prev) => [p, ...prev]), []);
  const updateProject = useCallback((id: string, updates: Partial<Project>) => setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p))), []);
  const markNotificationRead = useCallback((id: string) => setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n))), []);
  const clearNotifications = useCallback(() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true }))), []);
  const toggleAutomation = useCallback((id: string) => setAutomations((prev) => prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))), []);

  return (
    <AppContext.Provider
      value={{
        tasks, projects, team, notifications, files, automations, clients, currentUser, theme, sidebarCollapsed, unreadCount,
        setTheme, setSidebarCollapsed, addTask, updateTask, deleteTask, addProject, updateProject,
        markNotificationRead, clearNotifications, toggleAutomation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
