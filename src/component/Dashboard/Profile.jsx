import React, { useState } from "react";

const Profile = ({ theme }) => {
  // EXACT same visual system as PromptLibrary
  const pageBg = theme === "dark" ? "#181e2a" : "#ffffff";
  const cardBg = theme === "dark" ? "#181e2a" : "#ffffff";
  const text = theme === "dark" ? "#e5e7eb" : "#111827";
  const muted = theme === "dark" ? "#9ca3af" : "#6b7280";
  const border = theme === "dark" ? "#232a3d" : "#e5e7eb";

  const cardShadow =
    theme === "dark"
      ? "0 8px 30px rgba(0,0,0,0.35)"
      : "0 8px 32px rgba(0,0,0,0.35)"; // SAME AS PROMPT LIBRARY FLOAT

  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "Jay Vanzara",
    email: "jay@example.com",
    phone: "+91 9XXXXXXXXX",
    username: "jayvanzara"
  });

  const handleChange = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: pageBg,
        padding: "24px",
        boxSizing: "border-box"
      }}
    >
      <div
        style={{
          maxWidth: "820px",
          backgroundColor: cardBg,
          borderRadius: "18px",
          padding: "32px",
          color: text,
          boxShadow: cardShadow
        }}
      >
        <h1 style={{ fontSize: "26px", fontWeight: 700, marginBottom: "24px" }}>
          Profile
        </h1>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "#6366f1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 700,
              color: "#fff"
            }}
          >
            J
          </div>

          <div>
            <div style={{ fontSize: "18px", fontWeight: 600 }}>
              {user.name}
            </div>
            <div style={{ fontSize: "14px", color: muted }}>
              @{user.username}
            </div>
          </div>
        </div>

        {/* Info */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginTop: "28px"
          }}
        >
          {["name", "email", "phone"].map(field => (
            <div key={field}>
              <div
                style={{
                  fontSize: "12px",
                  color: muted,
                  marginBottom: "6px"
                }}
              >
                {field === "name"
                  ? "Full Name"
                  : field === "email"
                  ? "Email"
                  : "Phone Number"}
              </div>

              <input
                value={user[field]}
                disabled={!isEditing}
                onChange={e => handleChange(field, e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: `1px solid ${border}`,
                  backgroundColor: isEditing
                    ? theme === "dark"
                      ? "#1f2937"
                      : "#ffffff"
                    : "transparent",
                  color: text,
                  outline: "none"
                }}
              />
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                background: "#6366f1",
                color: "#fff",
                border: "none",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(false)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  background: "#6366f1",
                  color: "#fff",
                  border: "none",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Save
              </button>

              <button
                onClick={() => setIsEditing(false)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  background: "transparent",
                  border: `1px solid ${border}`,
                  color: text,
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;