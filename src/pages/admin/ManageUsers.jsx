import React, { useState, useEffect } from "react";
import BASE_URL from "../../services/api";

const ManageUsers = ({ theme = "dark" }) => {
  const isDark = theme === "dark";
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/admin/users`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!userId) {
      alert("Invalid User ID");
      return;
    }

    if (!window.confirm("Are you sure? This will delete the user AND all their prompts.")) {
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        setUsers(users.filter((user) => user.id !== userId));
      } else {
        const errorData = await response.json();
        alert(`Failed to delete user: ${errorData.error || 'Server error'}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Could not connect to the server. Check if Flask is running.");
    }
  };

  return (
    <div className="w-full h-full animate-fade-in">
      <div className={`rounded-2xl border overflow-hidden shadow-sm
        ${isDark ? 'bg-[#1e293b] border-[#334155]' : 'bg-white border-gray-200'}`}>
        
        {loading ? (
          <div className="flex items-center justify-center p-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6366f1]"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className={`w-full border-collapse text-left ${isDark ? 'text-[#e5e7eb]' : 'text-gray-900'}`}>
              <thead className={`text-[11px] uppercase tracking-widest font-bold 
                ${isDark ? 'bg-[#111827] text-gray-500' : 'bg-gray-50 text-gray-400'}`}>
                <tr>
                  <th className="px-6 py-4 w-20">ID</th>
                  <th className="px-6 py-4">Full Name</th>
                  <th className="px-6 py-4">Email Address</th>
                  <th className="px-6 py-4">Username</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id} className={`border-t transition-colors
                      ${isDark ? 'border-[#334155] hover:bg-[#111827]/50' : 'border-gray-100 hover:bg-gray-50/80'}`}>
                      
                      <td className={`px-6 py-4 font-mono text-xs opacity-60 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        #{user.id}
                      </td>
                      
                      <td className="px-6 py-4 font-semibold">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#6366f1]/20 text-[#6366f1] flex items-center justify-center font-bold text-xs shrink-0">
                            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                          </div>
                          <span className="truncate max-w-[150px]">{user.name}</span>
                        </div>
                      </td>

                      <td className={`px-6 py-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {user.email}
                      </td>

                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-tight
                          ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                          @{user.username || "not-set"}
                        </span>
                      </td>

                      <td className={`px-6 py-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {user.phone || "--"}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="px-4 py-2 rounded-xl bg-red-500/10 text-red-500 text-xs font-bold hover:bg-red-500 hover:text-white transition-all active:scale-95"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-20 text-center text-gray-500 italic">
                      <div className="flex flex-col items-center opacity-40">
                        <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                        <p>No users found in the database.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;