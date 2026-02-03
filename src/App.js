import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard/dashboard";
import AdminLogin from "./component/Admin/AdminLogin";
import AdminDashboard from "./component/Admin/AdminDashboard";

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
  };

  return (
    <Routes>
      {/* User routes */}
      <Route path="/" element={<Login />} />
      <Route path="/dashboard/*" element={<Dashboard />} />

      {/* Admin routes */}
      <Route
        path="/admin/login"
        element={<AdminLogin onLogin={() => setIsAdminAuthenticated(true)} />}
      />
      <Route
        path="/admin/dashboard/*"
        element={
          isAdminAuthenticated ? (
            <AdminDashboard theme="dark" onLogout={handleAdminLogout} />
          ) : (
            <Navigate to="/admin/login" replace />
          )
        }
      />

      {/* Optional: fallback 404 */}
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
}

export default App;