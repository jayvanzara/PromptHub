import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaChartPie, FaUsers, FaLayerGroup, FaListAlt, FaClipboardList, FaSignOutAlt } from "react-icons/fa";

const SidebarAdmin = ({ theme = "dark", onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDark = theme === "dark";

  const navItems = [
    { icon: <FaChartPie />, label: "Dashboard", path: "/admin/dashboard" },
    { icon: <FaUsers />, label: "Users", path: "/admin/dashboard/users" },
    { icon: <FaLayerGroup />, label: "Prompts", path: "/admin/dashboard/prompts" },
    { icon: <FaListAlt />, label: "Categories", path: "/admin/dashboard/categories" },
    { icon: <FaClipboardList />, label: "Logs", path: "/admin/dashboard/logs" },
  ];

  return (
    <div className={`w-[260px] h-screen flex flex-col border-r p-6 shrink-0 box-border
      ${isDark ? 'bg-[#181e2a] text-[#e5e7eb] border-[#232a3d]' : 'bg-white text-gray-900 border-gray-200'}`}>
      
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-[#6366f1] m-0">Admin Panel</h2>
        <p className="text-xs text-gray-400 mt-1">PromptHub Management</p>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path === "/admin/dashboard" && location.pathname === "/admin/dashboard/");
          return (
            <div
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer text-[15px] font-medium transition-all duration-200
                ${isActive 
                  ? (isDark ? 'bg-[#1e293b] text-[#6366f1]' : 'bg-[#eef2ff] text-[#6366f1]') 
                  : (isDark ? 'text-[#e5e7eb] hover:bg-[#1e293b]' : 'text-gray-900 hover:bg-gray-100')
                }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </div>
          );
        })}
      </nav>

      <button
        onClick={onLogout}
        className="mt-auto flex items-center justify-center gap-2.5 p-3 rounded-lg bg-[#6366f1] text-white border-none font-semibold cursor-pointer text-sm shadow-[0_4px_12px_rgba(99,102,241,0.3)] hover:bg-indigo-600 transition-colors"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
};

export default SidebarAdmin;