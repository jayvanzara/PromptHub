import React from "react";

const ManagePrompts = ({ theme = "dark" }) => {
  const isDark = theme === "dark";
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-bold ${isDark ? 'text-[#e5e7eb]' : 'text-gray-900'}`}>All Prompts</h2>
        <button className="px-5 py-2.5 bg-[#6366f1] text-white border-none rounded-lg font-semibold cursor-pointer hover:bg-indigo-600 transition-colors">
          + Create New
        </button>
      </div>
      
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className={`p-6 rounded-xl border
            ${isDark ? 'bg-[#1e293b] border-[#334155]' : 'bg-white border-gray-200'}`}>
            <div className="flex justify-between mb-3">
              <span className="text-xs text-[#6366f1] font-semibold bg-[#6366f1]/10 px-2 py-1 rounded">Marketing</span>
              <span className="text-xs text-gray-400">Feb 03, 2026</span>
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-[#e5e7eb]' : 'text-gray-900'}`}>Product Launch Email</h3>
            <p className="text-sm text-gray-400 mb-5 leading-relaxed">
              Generate a professional email sequence for a new SaaS product launch targeting...
            </p>
            <div className="flex gap-2.5">
              <button className={`flex-1 py-2 rounded-md border bg-transparent cursor-pointer
                ${isDark ? 'border-[#334155] text-[#e5e7eb]' : 'border-gray-200 text-gray-900'}`}>View</button>
              <button className="flex-1 py-2 rounded-md border-none bg-red-500/10 text-red-500 cursor-pointer">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePrompts;