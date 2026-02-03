import React, { useState } from 'react';
import SidebarAdmin from './SidebarAdmin';

const AdminDashboard = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';

  const pageBg = isDark ? '#181e2a' : '#f9fafb';
  const cardBg = isDark ? '#2c3349' : '#ffffff';
  const shadow = isDark
    ? '0 4px 12px rgba(0,0,0,0.7)'
    : '0 4px 12px rgba(0,0,0,0.1)';
  const textColor = isDark ? '#e1e6f0' : '#1f2937';

  const [sidebarTheme] = useState(theme);

  const containerStyle = {
    display: 'flex',
    height: '100vh',
    backgroundColor: pageBg,
    color: textColor,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const mainContentStyle = {
    flexGrow: 1,
    padding: '2rem 3rem',
    overflowY: 'auto',
  };

  const headerStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    userSelect: 'none',
  };

  const cardStyle = {
    backgroundColor: cardBg,
    borderRadius: '14px',
    boxShadow: shadow,
    padding: '1.5rem 2rem',
    marginBottom: '2rem',
  };

  const sectionTitleStyle = {
    fontSize: '1.4rem',
    fontWeight: '600',
    marginBottom: '1rem',
  };

  const placeholderTextStyle = {
    fontSize: '1rem',
    color: isDark ? '#a0a8c0' : '#6b7280',
  };

  const handleLogout = () => {
    alert('Logout clicked - implement your logout logic here');
  };

  return (
    <div style={containerStyle}>
      <SidebarAdmin theme={sidebarTheme} onLogout={handleLogout} />
      <main style={mainContentStyle} aria-label="Admin Dashboard Main Content">
        <header style={headerStyle}>Welcome, Admin</header>

        <section style={cardStyle} aria-labelledby="manage-users-section">
          <h2 id="manage-users-section" style={sectionTitleStyle}>
            Manage Users
          </h2>
          <p style={placeholderTextStyle}>
            Placeholder content for managing users. Implement user list, edit, delete, and add user functionalities here.
          </p>
        </section>

        <section style={cardStyle} aria-labelledby="manage-prompts-section">
          <h2 id="manage-prompts-section" style={sectionTitleStyle}>
            Manage Prompts
          </h2>
          <p style={placeholderTextStyle}>
            Placeholder content for managing prompts. Implement prompt creation, editing, and moderation here.
          </p>
        </section>

        <section style={cardStyle} aria-labelledby="admin-settings-section">
          <h2 id="admin-settings-section" style={sectionTitleStyle}>
            Admin Settings
          </h2>
          <p style={placeholderTextStyle}>
            Placeholder content for admin settings. Configure system preferences, themes, and other options here.
          </p>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;