import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ theme }) => {
  const navigate = useNavigate();

  const colors = {
    dark: "#181e2a", // ✅ updated to PromptLibrary grey
    light: "#ffffff"
  };

  const textColor = theme === "dark" ? "#e5e7eb" : "#111827";

  return (
    <div
      style={{
        width: "260px",
        height: "100vh",
        backgroundColor: colors[theme],
        color: textColor,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        borderRight: theme === "dark" ? "1px solid #232a3d" : "1px solid #e5e7eb"
      }}
    >
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#6366f1" }}>
          PromptHub
        </h2>
        <p style={{ fontSize: "12px", color: "#9ca3af" }}>
          AI Prompt Generator
        </p>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {[
          { to: "/dashboard", label: "Dashboard" },
          { to: "/dashboard/create", label: "Create Prompt" },
          { to: "/dashboard/library", label: "Prompt Library" },
          { to: "/dashboard/profile", label: "Profile" }
        ].map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            style={{
              textDecoration: "none",
              color: textColor,
              padding: "10px 12px",
              borderRadius: "6px",
              transition: "transform 0.15s ease"
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "auto",
          padding: "10px",
          borderRadius: "6px",
          backgroundColor: "#6366f1",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontWeight: "500"
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;