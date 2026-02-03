import React from 'react';
import { FaUserCog, FaUsers, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';

const SidebarAdmin = ({ theme = 'dark', onLogout }) => {
  const isDark = theme === 'dark';

  const sidebarStyle = {
    backgroundColor: isDark ? '#1f273d' : '#f5f7fa',
    color: isDark ? '#e1e6f0' : '#2c3e50',
    width: '250px',
    height: '100vh',
    padding: '2rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: isDark ? '2px 0 10px rgba(0,0,0,0.7)' : '2px 0 10px rgba(0,0,0,0.1)',
    borderRadius: '0 12px 12px 0',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const logoStyle = {
    fontSize: '1.8rem',
    fontWeight: '700',
    marginBottom: '2rem',
    letterSpacing: '1.5px',
    userSelect: 'none',
  };

  const navItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem 1rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  };

  const iconStyle = {
    marginRight: '1rem',
    fontSize: '1.4rem',
  };

  const navItems = [
    { icon: <FaUsers />, label: 'Manage Users' },
    { icon: <FaClipboardList />, label: 'Manage Prompts' },
    { icon: <FaUserCog />, label: 'Admin Settings' },
  ];

  return (
    <aside style={sidebarStyle} aria-label="Admin Sidebar Navigation">
      <div style={logoStyle} aria-label="Admin Panel Logo">
        Admin Panel
      </div>
      <nav style={{ flexGrow: 1 }}>
        {navItems.map(({ icon, label }) => (
          <div
            key={label}
            style={navItemStyle}
            tabIndex={0}
            role="button"
            onClick={() => alert(`${label} clicked`)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') alert(`${label} clicked`);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? '#2a3350' : '#e1e4ea';
              e.currentTarget.style.color = isDark ? '#a0b4ff' : '#34495e';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = isDark ? '#e1e6f0' : '#2c3e50';
            }}
          >
            <span style={iconStyle}>{icon}</span>
            {label}
          </div>
        ))}
      </nav>
      <button
        onClick={onLogout}
        style={{
          ...navItemStyle,
          marginTop: 'auto',
          backgroundColor: isDark ? '#3b4252' : '#dcdde1',
          color: isDark ? '#ff6b6b' : '#c0392b',
          border: 'none',
          width: '100%',
          fontWeight: '600',
          userSelect: 'none',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = isDark ? '#ff6b6b' : '#e74c3c';
          e.currentTarget.style.color = '#fff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = isDark ? '#3b4252' : '#dcdde1';
          e.currentTarget.style.color = isDark ? '#ff6b6b' : '#c0392b';
        }}
        aria-label="Logout button"
      >
        <FaSignOutAlt style={{ marginRight: '0.5rem' }} />
        Logout
      </button>
    </aside>
  );
};

export default SidebarAdmin;