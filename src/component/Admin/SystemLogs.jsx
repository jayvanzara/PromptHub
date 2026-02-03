import React from "react";

const SystemLogs = ({ theme = "dark" }) => {
  const isDark = theme === "dark";

  return (
    <div className="h-full flex flex-col">
      <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-[#e5e7eb]' : 'text-gray-900'}`}>System Logs</h2>
      <div className={`flex-1 rounded-xl p-6 font-mono overflow-y-auto border
        ${isDark ? 'bg-[#0f172a] border-[#334155]' : 'bg-slate-100 border-slate-200'}`}>
        <div className="mb-2 text-cyan-400">[2026-02-03 10:00:01] SYSTEM_INIT: Admin Dashboard loaded successfully.</div>
        <div className={`mb-2 ${isDark ? 'text-indigo-300' : 'text-indigo-600'}`}>[2026-02-03 10:15:23] AUTH_USER: User 'Jay' logged in (IP: 192.168.1.1)</div>
        <div className="mb-2 text-emerald-400">[2026-02-03 10:20:05] PROMPT_CREATE: New prompt "Blog Generator" added to database.</div>
        <div className="mb-2 text-red-400">[2026-02-03 10:45:12] ERROR_API: Timeout connecting to AI Service (Retrying...)</div>
        <div className="mb-2 text-cyan-400">[2026-02-03 11:00:00] CRON_JOB: Daily backup completed.</div>
      </div>
    </div>
  );
};

export default SystemLogs;