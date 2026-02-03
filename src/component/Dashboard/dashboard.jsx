import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardHome from "./DashboardHome";
import CreatePrompt from "./CreatePrompt";
import PromptLibrary from "./PromptLibrary";
import Profile from "./Profile";

const Dashboard = () => {
  const [theme, setTheme] = useState("dark");
  const isDark = theme === "dark";

  return (
    <div className={`flex h-screen overflow-hidden ${isDark ? 'bg-[#181e2a]' : 'bg-white'}`}>
      <Sidebar theme={theme} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className={`h-14 px-6 flex items-center justify-end border-b shrink-0
          ${isDark ? 'border-[#232a3d] bg-[#181e2a]' : 'border-gray-200 bg-white'}`}>
          <button
            onClick={() => setTheme(prev => (prev === "dark" ? "light" : "dark"))}
            className="px-3.5 py-2 rounded-md bg-[#6366f1] text-white border-none font-medium cursor-pointer hover:bg-indigo-600 transition-colors"
          >
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Main Content */}
        <div className={`flex-1 p-6 overflow-y-auto ${isDark ? 'bg-[#181e2a]' : 'bg-white'}`}>
          <Routes>
            <Route path="/" element={<DashboardHome theme={theme} />} />
            <Route path="/create" element={<CreatePrompt theme={theme} />} />
            <Route path="/library" element={<PromptLibrary theme={theme} />} />
            <Route path="/profile" element={<Profile theme={theme} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;