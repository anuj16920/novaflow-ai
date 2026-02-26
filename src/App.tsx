import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import { lazy, Suspense } from "react";

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

// Lazy-loaded pages
const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));

const Dashboard = lazy(() => import("./pages/Dashboard"));
const KanbanBoard = lazy(() => import("./pages/KanbanBoard"));
const Projects = lazy(() => import("./pages/Projects"));
const Tasks = lazy(() => import("./pages/Tasks"));
const CalendarPage = lazy(() => import("./pages/CalendarPage"));
const Reports = lazy(() => import("./pages/Reports"));
const Team = lazy(() => import("./pages/Team"));
const Clients = lazy(() => import("./pages/Clients"));
const Files = lazy(() => import("./pages/Files"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Automations = lazy(() => import("./pages/Automations"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));

const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminProjects = lazy(() => import("./pages/admin/AdminProjects"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminReports = lazy(() => import("./pages/admin/AdminReports"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const AdminAuditLogs = lazy(() => import("./pages/admin/AdminAuditLogs"));
const AdminWorkspaces = lazy(() => import("./pages/admin/AdminWorkspaces"));

const ManagerDashboard = lazy(() => import("./pages/manager/ManagerDashboard"));
const ManagerProjects = lazy(() => import("./pages/manager/ManagerProjects"));
const ManagerTeam = lazy(() => import("./pages/manager/ManagerTeam"));
const ManagerReports = lazy(() => import("./pages/manager/ManagerReports"));
const ManagerWorkload = lazy(() => import("./pages/manager/ManagerWorkload"));
const ManagerMilestones = lazy(() => import("./pages/manager/ManagerMilestones"));

const MemberDashboard = lazy(() => import("./pages/member/MemberDashboard"));
const MemberTasks = lazy(() => import("./pages/member/MemberTasks"));
const MemberTimesheet = lazy(() => import("./pages/member/MemberTimesheet"));
const MemberPerformance = lazy(() => import("./pages/member/MemberPerformance"));
const MemberActivity = lazy(() => import("./pages/member/MemberActivity"));

const ClientDashboard = lazy(() => import("./pages/client/ClientDashboard"));
const ClientProjects = lazy(() => import("./pages/client/ClientProjects"));
const ClientInvoices = lazy(() => import("./pages/client/ClientInvoices"));
const ClientDeliverables = lazy(() => import("./pages/client/ClientDeliverables"));
const ClientBilling = lazy(() => import("./pages/client/ClientBilling"));
const ClientFeedback = lazy(() => import("./pages/client/ClientFeedback"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Main App */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/kanban" element={<KanbanBoard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/team" element={<Team />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/files" element={<Files />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/automations" element={<Automations />} />
              <Route path="/settings" element={<SettingsPage />} />

              {/* Admin Portal */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/projects" element={<AdminProjects />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/reports" element={<AdminReports />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/audit-logs" element={<AdminAuditLogs />} />
              <Route path="/admin/workspaces" element={<AdminWorkspaces />} />

              {/* Manager Portal */}
              <Route path="/manager/dashboard" element={<ManagerDashboard />} />
              <Route path="/manager/projects" element={<ManagerProjects />} />
              <Route path="/manager/team" element={<ManagerTeam />} />
              <Route path="/manager/reports" element={<ManagerReports />} />
              <Route path="/manager/workload" element={<ManagerWorkload />} />
              <Route path="/manager/milestones" element={<ManagerMilestones />} />

              {/* Member Portal */}
              <Route path="/member/dashboard" element={<MemberDashboard />} />
              <Route path="/member/tasks" element={<MemberTasks />} />
              <Route path="/member/timesheet" element={<MemberTimesheet />} />
              <Route path="/member/performance" element={<MemberPerformance />} />
              <Route path="/member/activity" element={<MemberActivity />} />

              {/* Client Portal */}
              <Route path="/client/dashboard" element={<ClientDashboard />} />
              <Route path="/client/projects" element={<ClientProjects />} />
              <Route path="/client/invoices" element={<ClientInvoices />} />
              <Route path="/client/deliverables" element={<ClientDeliverables />} />
              <Route path="/client/billing" element={<ClientBilling />} />
              <Route path="/client/feedback" element={<ClientFeedback />} />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
