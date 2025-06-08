
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import LandingPage from "./components/LandingPage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ForgotPassword from "./components/Auth/ForgotPassword";
import MFAPrompt from "./components/Auth/MFAPrompt";
import MFASetup from "./components/Auth/MFASetup";
import MainLayout from "./components/Layout/MainLayout";
import Dashboard from "./components/Dashboard/Dashboard";
import SequenceList from "./components/TaskSequences/SequenceList";
import SequenceEditor from "./components/TaskSequences/SequenceEditor";
import ImageList from "./components/ReferenceImages/ImageList";
import AppList from "./components/Applications/AppList";
import AppLibrary from "./components/Applications/AppLibrary";
import DriverList from "./components/Drivers/DriverList";
import DeviceList from "./components/Devices/DeviceList";
import DeviceEnrollment from "./components/Devices/DeviceEnrollment";
import Reporting from "./components/Reports/Reporting";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import UserProfile from "./components/Settings/UserProfile";
import TenantSettings from "./components/Settings/TenantSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'Admin' | 'Technician' | 'Dashboard' | 'Read-Only' | 'Helpdesk'>('Admin');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/mfa-prompt" element={<MFAPrompt />} />
            <Route path="/mfa-setup" element={<MFASetup />} />
            
            {/* Protected Routes */}
            {isAuthenticated ? (
              <Route path="/" element={<MainLayout userRole={userRole}>
                <Routes>
                  <Route index element={<Dashboard />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="task-sequences" element={<SequenceList />} />
                  <Route path="task-sequences/new" element={<SequenceEditor />} />
                  <Route path="task-sequences/:id/edit" element={<SequenceEditor />} />
                  <Route path="reference-images" element={<ImageList />} />
                  <Route path="applications" element={<AppList />} />
                  <Route path="app-library" element={<AppLibrary />} />
                  <Route path="drivers" element={<DriverList />} />
                  <Route path="devices" element={<DeviceList />} />
                  <Route path="devices/enrollment" element={<DeviceEnrollment />} />
                  <Route path="reports" element={<Reporting />} />
                  {(userRole === 'Admin') && (
                    <Route path="admin" element={<AdminPanel />} />
                  )}
                  <Route path="profile" element={<UserProfile />} />
                  <Route path="settings" element={<TenantSettings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </MainLayout>} />
            ) : (
              <Route path="*" element={<Navigate to="/landing" replace />} />
            )}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
