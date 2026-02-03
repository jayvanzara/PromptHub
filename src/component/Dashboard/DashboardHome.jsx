import React from "react";

const DashboardHome = ({ theme }) => {
  const isDark = theme === "dark";

  const stats = [
    { label: "Prompts Created", value: "12", color: "text-[#6366f1]" },
    { label: "Saved to Library", value: "5", color: "text-[#10b981]" },
    { label: "AI Generations", value: "34", color: "text-[#f59e0b]" },
  ];

  return (
    <div className="flex flex-col gap-8 font-sans">
      {/* Title */}
      <div>
        <h1 className={`text-[28px] font-bold m-0 ${isDark ? 'text-[#e5e7eb]' : 'text-gray-900'}`}>
          Hello, Jay
        </h1>
        <p className={`mt-2 ${isDark ? 'text-[#9ca3af]' : 'text-gray-500'}`}>
          Here is an overview of your creative activity.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className={`p-6 rounded-2xl border flex flex-col gap-2 shadow-sm
            ${isDark ? 'bg-[#1e293b] border-[#334155] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]' : 'bg-white border-gray-200 shadow-sm'}`}>
            <span className={`text-[13px] font-semibold uppercase ${isDark ? 'text-[#9ca3af]' : 'text-gray-500'}`}>
              {stat.label}
            </span>
            <span className={`text-4xl font-bold ${stat.color}`}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        {/* Recent Prompts */}
        <div className={`p-6 rounded-2xl border shadow-sm
           ${isDark ? 'bg-[#1e293b] border-[#334155]' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-lg font-semibold mb-5 m-0 ${isDark ? 'text-[#e5e7eb]' : 'text-gray-900'}`}>
            Recent Prompts
          </h3>
          <div className="flex flex-col gap-4">
            {[1, 2].map((i) => (
              <div key={i} className={`p-4 rounded-xl border flex justify-between items-center
                ${isDark ? 'bg-[#181e2a] border-[#334155]' : 'bg-gray-50 border-gray-200'}`}>
                <div>
                  <div className={`font-medium text-[15px] ${isDark ? 'text-[#e5e7eb]' : 'text-gray-900'}`}>
                    Email Marketing Campaign
                  </div>
                  <div className={`text-[13px] mt-1 ${isDark ? 'text-[#9ca3af]' : 'text-gray-500'}`}>
                    Marketing • 2 hours ago
                  </div>
                </div>
                <button className="text-[#6366f1] bg-transparent border-none font-semibold text-sm cursor-pointer hover:underline">Open</button>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-[#6366f1] rounded-2xl p-6 text-white flex flex-col justify-between shadow-[0_10px_25px_-5px_rgba(99,102,241,0.4)]">
          <div>
            <h3 className="text-lg font-semibold mb-2 m-0">Free Plan</h3>
            <p className="text-sm opacity-90 m-0">You are using the free tier.</p>
          </div>
          <div>
            <div className="text-[32px] font-bold">85%</div>
            <div className="text-[13px] opacity-90 mt-1">Daily Usage Limit</div>
            <div className="mt-3 h-1.5 bg-white/30 rounded-full overflow-hidden">
              <div className="w-[85%] h-full bg-white"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;