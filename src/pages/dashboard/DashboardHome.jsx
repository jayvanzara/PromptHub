import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../services/api";

const DashboardHome = ({ theme }) => {
  const isDark = theme === "dark";
  const userName = localStorage.getItem("user_name") || "User";
  const userId = localStorage.getItem("user_id");
  const [showWelcome, setShowWelcome] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    prompt_count: 0,
    categories_used: 0,
    total_categories: 0,
    recent_prompts: [],
  });

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("dashboardVisited");
    if (!hasVisited) {
      setShowWelcome(true);
      sessionStorage.setItem("dashboardVisited", "true");
    }
  }, []);

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!userId) return;
      try {
        const res = await fetch(`${BASE_URL}/api/dashboard/${userId}`);
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [userId]);

  const cardClass = `p-6 rounded-2xl border transition-all duration-200
    ${isDark ? "bg-[#1e293b] border-[#374151]" : "bg-white border-gray-200 shadow-sm"}`;

  const textClass = isDark ? "text-gray-100" : "text-gray-900";
  const subTextClass = isDark ? "text-gray-400" : "text-gray-500";

  const StatSkeleton = () => (
    <div className={`${cardClass} animate-pulse`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`h-3 w-24 rounded ${isDark ? "bg-[#374151]" : "bg-gray-200"}`} />
        <div className={`w-9 h-9 rounded-lg ${isDark ? "bg-[#374151]" : "bg-gray-200"}`} />
      </div>
      <div className={`h-8 w-16 rounded mb-2 ${isDark ? "bg-[#374151]" : "bg-gray-200"}`} />
      <div className={`h-3 w-28 rounded ${isDark ? "bg-[#374151]" : "bg-gray-200"}`} />
    </div>
  );

  const statCards = [
    {
      label: "Total Prompts",
      value: stats.prompt_count,
      sub: stats.prompt_count === 1 ? "1 prompt created" : `${stats.prompt_count} prompts created`,
      iconBg: isDark ? "bg-indigo-500/20" : "bg-indigo-100",
      iconColor: isDark ? "text-indigo-400" : "text-indigo-600",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      label: "Categories Used",
      value: stats.categories_used,
      sub: `Out of ${stats.total_categories} available`,
      iconBg: isDark ? "bg-green-500/20" : "bg-green-100",
      iconColor: isDark ? "text-green-400" : "text-green-600",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
    },
    {
      label: "Recent Activity",
      value: stats.recent_prompts.length,
      sub: "Latest prompts saved",
      iconBg: isDark ? "bg-purple-500/20" : "bg-purple-100",
      iconColor: isDark ? "text-purple-400" : "text-purple-600",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const quickActions = [
    {
      to: "/dashboard/create-prompt",
      label: "Create New Prompt",
      sub: "Generate a structured prompt with AI",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      ),
    },
    {
      to: "/dashboard/library",
      label: "Browse Library",
      sub: "View and manage your saved prompts",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      to: "/dashboard/profile",
      label: "My Profile",
      sub: "Update your personal details",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ];

  return (
    <div className={`w-full min-h-full p-8 ${textClass}`}>

      {showWelcome && (
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, <span className="text-[#6366f1]">{userName}</span>!
          </h1>
          <p className={subTextClass}>
            Ready to craft your next big idea? Here's what's happening today.
          </p>
        </div>
      )}

      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${showWelcome ? "mb-10" : "mb-10 mt-0"}`}>
        {loading ? (
          <>
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
          </>
        ) : (
          statCards.map((card) => (
            <div key={card.label} className={cardClass}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-sm font-bold uppercase tracking-wider ${subTextClass}`}>
                  {card.label}
                </h3>
                <span className={`p-2 rounded-lg ${card.iconBg} ${card.iconColor}`}>
                  {card.icon}
                </span>
              </div>
              <p className="text-3xl font-bold">{card.value}</p>
              <p className={`text-xs mt-2 ${subTextClass}`}>{card.sub}</p>
            </div>
          ))
        )}
      </div>

      <h2 className={`text-xl font-bold mb-4 ${textClass}`}>Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {quickActions.map((action) => (
          <Link
            key={action.to}
            to={action.to}
            className={`group p-6 rounded-2xl border cursor-pointer transition-all hover:border-[#6366f1] hover:-translate-y-1
              ${isDark ? "bg-[#1e293b] border-[#374151]" : "bg-white border-gray-200"}`}>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-[#6366f1]/10 text-[#6366f1] group-hover:bg-[#6366f1] group-hover:text-white transition-colors flex-shrink-0">
                {action.icon}
              </div>
              <div className="min-w-0">
                <h3 className={`font-bold text-lg truncate ${textClass}`}>{action.label}</h3>
                <p className={`text-sm truncate ${subTextClass}`}>{action.sub}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-xl font-bold ${textClass}`}>Recent Prompts</h2>
        <Link
          to="/dashboard/library"
          className="text-sm font-bold text-[#6366f1] hover:text-indigo-400 transition-colors">
          View All →
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`${cardClass} animate-pulse`}>
              <div className={`h-3 w-20 rounded mb-4 ${isDark ? "bg-[#374151]" : "bg-gray-200"}`} />
              <div className={`h-5 w-full rounded mb-3 ${isDark ? "bg-[#374151]" : "bg-gray-200"}`} />
              <div className={`h-3 w-full rounded mb-2 ${isDark ? "bg-[#374151]" : "bg-gray-200"}`} />
              <div className={`h-3 w-3/4 rounded ${isDark ? "bg-[#374151]" : "bg-gray-200"}`} />
            </div>
          ))}
        </div>
      ) : stats.recent_prompts.length === 0 ? (
        <div className={`p-8 rounded-2xl border border-dashed text-center
          ${isDark ? "border-[#374151]" : "border-gray-300"}`}>
          <p className={subTextClass}>No prompts yet. Create your first one!</p>
          <Link
            to="/dashboard/create-prompt"
            className="inline-block mt-4 px-6 py-2.5 rounded-xl bg-[#6366f1] text-white text-sm font-bold hover:bg-indigo-500 transition-colors">
            Create Prompt
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.recent_prompts.map((prompt) => (
            <div key={prompt.id} className={`${cardClass} hover:-translate-y-1`}>
              <div className="flex gap-2 mb-3">
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider
                  ${isDark ? "bg-[#6366f1]/20 text-[#818cf8]" : "bg-indigo-50 text-indigo-600"}`}>
                  {prompt.category}
                </span>
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider
                  ${isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-500"}`}>
                  {prompt.tone}
                </span>
              </div>
              <h3 className={`font-bold text-base mb-2 truncate ${textClass}`}>{prompt.title}</h3>
              <p className={`text-[13px] line-clamp-3 leading-relaxed ${subTextClass}`}>
                {prompt.generated_content}
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default DashboardHome;