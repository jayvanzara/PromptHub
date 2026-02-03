import React from "react";

const DashboardHome = ({ theme }) => {
  const pageText = theme === "dark" ? "#e5e7eb" : "#111827";
  const mutedText = theme === "dark" ? "#9ca3af" : "#6b7280";

  // unified background
  const pageBg = theme === "dark" ? "#181e2a" : "#ffffff";
  const cardBg = theme === "dark" ? "#111827" : "#f8fafc";
  const borderColor = theme === "dark" ? "#374151" : "#e5e7eb";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        backgroundColor: pageBg,
        padding: "16px",
        minHeight: "100%"
      }}
    >
      <h1 style={{ fontSize: "26px", fontWeight: "700", color: pageText }}>
        Dashboard
      </h1>

      <p style={{ color: mutedText }}>
        Welcome to PromptHub. Manage your prompts and AI integrations here.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px"
        }}
      >
        <div
          style={{
            backgroundColor: cardBg,
            padding: "20px",
            borderRadius: "12px",
            border: `1px solid ${borderColor}`
          }}
        >
          <h2 style={{ fontWeight: 600, color: pageText }}>
            Your Prompts
          </h2>
          <p style={{ color: mutedText, marginTop: "6px" }}>
            No prompts created yet.
          </p>
        </div>

        <div
          style={{
            backgroundColor: cardBg,
            padding: "20px",
            borderRadius: "12px",
            border: `1px solid ${borderColor}`
          }}
        >
          <h2 style={{ fontWeight: 600, color: pageText }}>
            Activity
          </h2>
          <p style={{ color: mutedText, marginTop: "6px" }}>
            No recent activity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;