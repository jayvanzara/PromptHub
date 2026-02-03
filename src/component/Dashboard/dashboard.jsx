import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardHome from "./DashboardHome";
import CreatePrompt from "./CreatePrompt";
import PromptLibrary from "./PromptLibrary";
import Profile from "./Profile";

const Dashboard = () => {
  const [theme, setTheme] = useState("dark");

  const colors = {
    dark: {
      pageBg: "#181e2a",      // unified grey background
      headerBorder: "#232a3d"
    },
    light: {
      pageBg: "#ffffff",
      headerBorder: "#e5e7eb"
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: colors[theme].pageBg
      }}
    >
      <Sidebar theme={theme} />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        }}
      >
        {/* Header */}
        <div
          style={{
            height: "56px",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            borderBottom: `1px solid ${colors[theme].headerBorder}`
          }}
        >
          <button
            onClick={() =>
              setTheme(prev => (prev === "dark" ? "light" : "dark"))
            }
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              backgroundColor: "#6366f1",
              color: "#ffffff",
              border: "none",
              fontWeight: 500,
              cursor: "pointer"
            }}
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>

        {/* Main content */}
        <div
          style={{
            flex: 1,
            padding: "20px 24px",
            overflowY: "auto",
            backgroundColor: colors[theme].pageBg
          }}
        >
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