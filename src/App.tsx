import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";

// Public pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";

// Main app pages
import Dashboard from "./pages/Dashboard";
import KanbanBoard from "./pages/KanbanBoard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import CalendarPage from "./pages/CalendarPage";
import Reports from "./pages/Reports";
import Team from "./pages/Team";
import Clients from "./pages/Clients";
import Files from "./pages/Files";
import Notifications from "./pages/Notifications";
import Automations from "./pages/Automations";
import SettingsPage from "./pages/SettingsPage";

// Admin portal
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminReports from "./pages/admin/AdminReports";
import AdminSettings from "./pages/admin/AdminSettings";

// Manager portal
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import ManagerProjects from "./pages/manager/ManagerProjects";
import ManagerTeam from "./pages/manager/ManagerTeam";
import ManagerReports from "./pages/manager/ManagerReports";

// Member portal
import MemberDashboard from "./pages/member/MemberDashboard";
import MemberTasks from "./pages/member/MemberTasks";
import MemberTimesheet from "./pages/member/MemberTimesheet";

// Client portal
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientProjects from "./pages/client/ClientProjects";
import ClientInvoices from "./pages/client/ClientInvoices";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppProvider>
        <BrowserRouter>
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

            {/* Manager Portal */}
            <Route path="/manager/dashboard" element={<ManagerDashboard />} />
            <Route path="/manager/projects" element={<ManagerProjects />} />
            <Route path="/manager/team" element={<ManagerTeam />} />
            <Route path="/manager/reports" element={<ManagerReports />} />

            {/* Member Portal */}
            <Route path="/member/dashboard" element={<MemberDashboard />} />
            <Route path="/member/tasks" element={<MemberTasks />} />
            <Route path="/member/timesheet" element={<MemberTimesheet />} />

            {/* Client Portal */}
            <Route path="/client/dashboard" element={<ClientDashboard />} />
            <Route path="/client/projects" element={<ClientProjects />} />
            <Route path="/client/invoices" element={<ClientInvoices />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
