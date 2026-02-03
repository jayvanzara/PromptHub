import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaPen, FaBook, FaUser, FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({ theme }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDark = theme === "dark";

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: <FaHome /> },
    { to: "/dashboard/create", label: "Create Prompt", icon: <FaPen /> },
    { to: "/dashboard/library", label: "Prompt Library", icon: <FaBook /> },
    { to: "/dashboard/profile", label: "Profile", icon: <FaUser /> }
  ];

  return (
    <div className={`w-[260px] h-screen flex flex-col border-r p-6 shrink-0 transition-colors duration-300
      ${isDark ? 'bg-[#181e2a] text-[#e5e7eb] border-[#232a3d]' : 'bg-white text-gray-900 border-gray-200'}`}>
      
      {/* Brand */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-[#6366f1] m-0">PromptHub</h2>
        <p className="text-xs text-gray-400 mt-1">AI Prompt Generator</p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => {
          const isActive = item.to === "/dashboard" 
            ? location.pathname === "/dashboard" || location.pathname === "/dashboard/"
            : location.pathname.startsWith(item.to);

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg no-underline text-[15px] font-medium transition-all duration-200
                ${isActive 
                  ? (isDark ? 'bg-[#1e293b] text-[#6366f1]' : 'bg-[#eef2ff] text-[#6366f1]') 
                  : (isDark ? 'text-[#e5e7eb] hover:bg-[#1e293b]' : 'text-gray-900 hover:bg-gray-100')
                }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={() => navigate("/")}
        className="mt-auto flex items-center justify-center gap-2.5 p-3 rounded-lg bg-[#6366f1] text-white border-none font-semibold cursor-pointer text-sm shadow-[0_4px_12px_rgba(99,102,241,0.3)] hover:bg-indigo-600 transition-colors"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;