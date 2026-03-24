import React from "react";

const SystemLogs = ({ theme = "dark" }) => {
  const isDark = theme === "dark";

  // Mock logs for demonstration
  const logs = [
    { id: 1, action: "User Login", user: "jay@vanzara.com", time: "2026-02-24 10:45 AM", status: "Success" },
    { id: 2, action: "Prompt Created", user: "admin@hub.com", time: "2026-02-24 11:12 AM", status: "Success" },
    { id: 3, action: "Category Deleted", user: "admin@hub.com", time: "2026-02-24 01:20 PM", status: "Warning" },
    { id: 4, action: "Database Backup", user: "System", time: "2026-02-24 03:00 PM", status: "Success" },
  ];

  return (
    <div className="w-full animate-fade-in">
      <div className={`overflow-hidden rounded-2xl border ${isDark ? 'bg-[#1e293b] border-[#334155]' : 'bg-white border-gray-200 shadow-sm'}`}>
        <table className="w-full text-left border-collapse">
          <thead className={`${isDark ? 'bg-[#181e2a]' : 'bg-gray-50'}`}>
            <tr>
              <th className={`p-4 text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Action</th>
              <th className={`p-4 text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>User</th>
              <th className={`p-4 text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Timestamp</th>
              <th className={`p-4 text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Status</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDark ? 'divide-[#334155]' : 'divide-gray-100'}`}>
            {logs.map((log) => (
              <tr key={log.id} className={`transition-colors ${isDark ? 'hover:bg-[#232a3d]' : 'hover:bg-gray-50'}`}>
                <td className={`p-4 font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{log.action}</td>
                <td className={`p-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{log.user}</td>
                <td className={`p-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{log.time}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                    log.status === "Success" 
                      ? 'bg-green-500/10 text-green-500' 
                      : 'bg-yellow-500/10 text-yellow-500'
                  }`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button className={`px-4 py-2 text-sm font-semibold rounded-lg border bg-transparent cursor-pointer transition-colors
          ${isDark ? 'border-[#334155] text-[#9ca3af] hover:bg-[#334155]' : 'border-gray-200 text-gray-500 hover:bg-gray-100'}`}>
          Export Logs (.CSV)
        </button>
      </div>
    </div>
  );
};

export default SystemLogs;