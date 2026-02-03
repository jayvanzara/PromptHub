import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin";
import ManageUsers from "./ManageUsers";
import ManagePrompts from "./ManagePrompts";
import ManageCategories from "./ManageCategories";
import SystemLogs from "./SystemLogs";

const AdminDashboard = ({ theme = "dark", onLogout }) => {
  const [sidebarTheme] = useState(theme);
  const isDark = theme === "dark";

  const stats = [
    { label: "Total Users", value: "1,240", color: "text-[#6366f1]" },
    { label: "Total Prompts", value: "856", color: "text-[#10b981]" },
    { label: "Categories", value: "12", color: "text-[#f59e0b]" },
    { label: "AI Usage", value: "15.4k", color: "text-[#ef4444]" },
  ];

  const sections = ["User Management", "Prompt Management", "Category Management"];

  const DashboardHome = () => (
    <>
      <header className={`px-10 py-8 border-b ${isDark ? 'border-[#334155]' : 'border-gray-200'}`}>
        <h1 className={`text-[28px] font-bold m-0 ${isDark ? 'text-[#e5e7eb]' : 'text-gray-900'}`}>Dashboard Overview</h1>
        <p className={`mt-2 ${isDark ? 'text-[#9ca3af]' : 'text-gray-500'}`}>Welcome back, Administrator. Here's what's happening today.</p>
      </header>
      <div className="p-10 flex-1">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6 mb-10">
          {stats.map((stat) => (
            <div key={stat.label} className={`p-6 rounded-2xl border shadow-sm flex flex-col gap-3
              ${isDark ? 'bg-[#1e293b] border-[#334155] shadow-black/10' : 'bg-white border-gray-200 shadow-gray-200/50'}`}>
              <span className={`text-sm font-semibold uppercase tracking-wide ${isDark ? 'text-[#9ca3af]' : 'text-gray-500'}`}>{stat.label}</span>
              <span className={`text-3xl font-bold ${stat.color}`}>{stat.value}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
          {sections.map((section) => (
            <div key={section} className={`p-6 rounded-2xl border shadow-sm min-h-[200px]
              ${isDark ? 'bg-[#1e293b] border-[#334155]' : 'bg-white border-gray-200'}`}>
              <div className="flex justify-between items-center mb-5">
                <h3 className={`text-lg font-semibold m-0 ${isDark ? 'text-[#e5e7eb]' : 'text-gray-900'}`}>{section}</h3>
                <button className={`px-3 py-1.5 text-xs font-semibold rounded-md border bg-transparent cursor-pointer
                  ${isDark ? 'border-[#334155] text-[#9ca3af]' : 'border-gray-200 text-gray-500'}`}>Manage</button>
              </div>
              <div className={`h-[120px] rounded-lg border border-dashed flex items-center justify-center text-sm
                ${isDark ? 'bg-[#181e2a] border-[#334155] text-[#9ca3af]' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
                No recent activity in {section.split(" ")[0]}
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className={`px-10 py-6 border-t text-[13px] flex justify-between
        ${isDark ? 'border-[#334155] text-[#9ca3af]' : 'border-gray-200 text-gray-500'}`}>
        <span>PromptHub Admin Panel v1.0.0</span>
        <span>&copy; 2026 PromptHub Inc. All rights reserved.</span>
      </footer>
    </>
  );

  return (
    <div className={`flex h-screen font-sans ${isDark ? 'bg-[#181e2a]' : 'bg-gray-50'}`}>
      <SidebarAdmin theme={sidebarTheme} onLogout={onLogout} />
      <main className="flex-1 flex flex-col overflow-y-auto">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="users" element={<div className="p-10"><ManageUsers theme={theme} /></div>} />
          <Route path="prompts" element={<div className="p-10"><ManagePrompts theme={theme} /></div>} />
          <Route path="categories" element={<div className="p-10"><ManageCategories theme={theme} /></div>} />
          <Route path="logs" element={<div className="p-10 h-full"><SystemLogs theme={theme} /></div>} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;