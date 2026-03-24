import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";

import Dashboard from "./layouts/Dashboard";
import DashboardHome from "./pages/dashboard/DashboardHome";
import CreatePrompt from "./pages/dashboard/CreatePrompt";
import PromptLibrary from "./pages/dashboard/PromptLibrary";
import Profile from "./pages/dashboard/Profile";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

import { ProtectedRoute, AdminProtectedRoute } from "./routes/ProtectedRoute";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected User Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard theme={theme} toggleTheme={toggleTheme} />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardHome theme={theme} />} />
        <Route path="create-prompt" element={<CreatePrompt theme={theme} />} />
        <Route path="library" element={<PromptLibrary theme={theme} />} />
        <Route path="profile" element={<Profile theme={theme} />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route path="/admin/dashboard/*" element={
        <AdminProtectedRoute>
          <AdminDashboard theme={theme} toggleTheme={toggleTheme} />
        </AdminProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;