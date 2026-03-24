import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaPen, FaBook, FaUser, FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({ theme }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDark = theme === "dark";

  const navItems = [
    { icon: <FaHome />, label: "Dashboard", path: "/dashboard" },
    { icon: <FaPen />, label: "Create Prompt", path: "/dashboard/create-prompt" },
    { icon: <FaBook />, label: "Library", path: "/dashboard/library" },
    { icon: <FaUser />, label: "Profile", path: "/dashboard/profile" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    sessionStorage.removeItem("dashboardVisited");
    navigate("/");
  };

  return (
    <div className={`w-[20%] min-w-[240px] max-w-[300px] h-screen flex flex-col border-r p-6 pt-4 shrink-0 box-border transition-all duration-300
      ${isDark ? 'bg-[#181e2a] text-[#e5e7eb] border-[#232a3d]' : 'bg-white text-gray-900 border-gray-200'}`}>
      
      <div className="mb-10 text-left">
        <h2 className="text-3xl font-bold text-[#6366f1] m-0">PromptHub</h2>
        <p className="text-xs text-gray-400 mt-1">AI Prompt Manager</p>
      </div>

      <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
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
              <span className="text-lg shrink-0">{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </div>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto flex items-center justify-center gap-2.5 p-3 rounded-lg bg-red-500 text-white border-none font-semibold cursor-pointer text-sm hover:bg-red-600 transition-colors shrink-0 active:scale-95"
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;