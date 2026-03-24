import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import AdminSidebar from "../../layouts/AdminSidebar";
import ManageUsers from "./ManageUsers";
import ManagePrompts from "./ManagePrompts";
import ManageCategories from "./ManageCategories";
import ManageTones from "./ManageTones";
import ManageTemplates from "./ManageTemplates";
import SystemLogs from "./SystemLogs";
import BASE_URL from "../../services/api";

const DashboardHome = ({ stats, isDark }) => {
  const sections = ["User Management", "Prompt Management", "Category Management"];

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="mb-8">
        <p className={`text-sm ${isDark ? 'text-[#9ca3af]' : 'text-gray-500'}`}>
          Welcome back, Administrator. Here is your real-time system overview.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className={`p-6 rounded-2xl border shadow-sm flex flex-col gap-3 min-h-[120px] justify-center
            ${isDark ? 'bg-[#1e293b] border-[#334155] shadow-black/10' : 'bg-white border-gray-200 shadow-gray-200/50'}`}>
            <span className={`text-sm font-semibold uppercase tracking-wide ${isDark ? 'text-[#9ca3af]' : 'text-gray-500'}`}>{stat.label}</span>
            <span className={`text-4xl font-bold ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-auto">
        {sections.map((section) => (
          <div key={section} className={`p-6 rounded-2xl border shadow-sm min-h-[180px] flex flex-col
            ${isDark ? 'bg-[#1e293b] border-[#334155]' : 'bg-white border-gray-200'}`}>
            <div className="flex justify-between items-center mb-5">
              <h3 className={`text-lg font-semibold m-0 ${isDark ? 'text-[#e5e7eb]' : 'text-gray-900'}`}>{section}</h3>
            </div>
            <div className={`flex-1 rounded-lg border border-dashed flex items-center justify-center text-sm
              ${isDark ? 'bg-[#181e2a] border-[#334155] text-[#9ca3af]' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
              System Status: Active
            </div>
          </div>
        ))}
      </div>

      <footer className={`py-6 border-t text-[13px] flex justify-between mt-10
        ${isDark ? 'border-[#334155] text-[#9ca3af]' : 'border-gray-200 text-gray-500'}`}>
        <span>PromptHub Admin Panel v1.0.0</span>
        <span>&copy; 2026 PromptHub Inc.</span>
      </footer>
    </div>
  );
};

const AdminDashboard = ({ theme = "dark", toggleTheme }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDark = theme === "dark";

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("/users")) return "User Management";
    if (path.includes("/prompts")) return "Prompt Management";
    if (path.includes("/categories")) return "Category Management";
    if (path.includes("/tones")) return "Tone Management";
    if (path.includes("/templates")) return "Template Management";
    if (path.includes("/logs")) return "System Logs";
    return "Dashboard Overview";
  };

  const [stats, setStats] = useState([
    { label: "Total Users", value: "...", color: "text-[#6366f1]" },
    { label: "Total Prompts", value: "...", color: "text-[#10b981]" },
    { label: "Categories", value: "...", color: "text-[#f59e0b]" },
    { label: "Active Sessions", value: "1", color: "text-[#ef4444]" },
  ]);

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    sessionStorage.removeItem("dashboardVisited");
    navigate("/admin/login");
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/admin/stats`);
        const catResponse = await fetch(`${BASE_URL}/api/categories`);
        
        if (response.ok && catResponse.ok) {
          const data = await response.json();
          const categories = await catResponse.json();
          setStats([
            { label: "Total Users", value: data.total_users, color: "text-[#6366f1]" },
            { label: "Total Prompts", value: data.total_prompts, color: "text-[#10b981]" },
            { label: "Categories", value: categories.length, color: "text-[#f59e0b]" },
            { label: "Active Sessions", value: data.active_sessions, color: "text-[#ef4444]" },
          ]);
        }
      } catch (error) {
        console.error("Failed to load admin stats");
      }
    };
    fetchStats();
  }, []);

  return (
    <div className={`flex w-full h-screen overflow-hidden ${isDark ? 'bg-[#181e2a]' : 'bg-gray-50'}`}>
      
      <AdminSidebar theme={theme} onLogout={handleLogout} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        <div className={`h-16 px-8 flex items-center justify-between border-b shrink-0 z-10
          ${isDark ? 'border-[#232a3d] bg-[#181e2a]' : 'border-gray-200 bg-white'}`}>
          
          <h1 className={`text-xl font-bold tracking-tight truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {getPageTitle()}
          </h1>

          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg bg-[#6366f1] text-white border-none font-semibold cursor-pointer text-sm shadow-md hover:bg-indigo-600 transition-all shrink-0 active:scale-95"
          >
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <main className={`flex-1 overflow-y-auto px-8 py-8 ${isDark ? 'bg-[#181e2a]' : 'bg-gray-50'}`}>
          <Routes>
            <Route path="/" element={<DashboardHome stats={stats} isDark={isDark} />} />
            <Route path="users" element={<ManageUsers theme={theme} />} />
            <Route path="prompts" element={<ManagePrompts theme={theme} />} />
            <Route path="categories" element={<ManageCategories theme={theme} />} />
            <Route path="tones" element={<ManageTones theme={theme} />} />
            <Route path="templates" element={<ManageTemplates theme={theme} />} />
            <Route path="logs" element={<SystemLogs theme={theme} />} />
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;