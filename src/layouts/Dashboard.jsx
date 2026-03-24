import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import UserSidebar from "./UserSidebar";

const Dashboard = ({ theme, toggleTheme }) => {
  const isDark = theme === "dark";
  const location = useLocation();

  const getHeaderContent = () => {
    const path = location.pathname;

    if (path.includes("/create-prompt")) {
      return {
        title: "Create New Prompt",
        sub: "Fill in the details below to generate a professional prompt."
      };
    }
    if (path.includes("/library")) {
      return {
        title: "Prompt Library",
        sub: "Manage your saved prompts and explore featured templates."
      };
    }
    if (path.includes("/profile")) {
      return {
        title: "My Profile",
        sub: "Manage your account details and personal preferences."
      };
    }

    return {
      title: "Dashboard Overview",
      sub: "Quick overview of your activity and saved prompts."
    };
  };

  const { title, sub } = getHeaderContent();

  return (
    <div className={`flex w-full h-screen overflow-hidden ${isDark ? 'bg-[#181e2a]' : 'bg-white'}`}>

      <UserSidebar theme={theme} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        <div className={`h-[72px] px-8 flex items-center justify-between border-b shrink-0
          ${isDark ? 'border-[#232a3d] bg-[#181e2a]' : 'border-gray-200 bg-white'}`}>

          <div className="min-w-0 flex-1 mr-4">
            <h1 className={`text-xl font-bold m-0 tracking-tight truncate ${isDark ? 'text-[#e5e7eb]' : 'text-gray-900'}`}>
              {title}
            </h1>
            <p className={`mt-0.5 text-[13px] truncate ${isDark ? 'text-[#9ca3af]' : 'text-gray-500'}`}>
              {sub}
            </p>
          </div>

          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg bg-[#6366f1] text-white border-none font-semibold cursor-pointer text-sm hover:bg-indigo-600 transition-all shadow-sm active:scale-95 shrink-0"
          >
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div className={`flex-1 overflow-y-auto ${isDark ? 'bg-[#181e2a]' : 'bg-white'}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;