import React from "react";

const ManageCategories = ({ theme = "dark" }) => {
  const isDark = theme === "dark";
  const categories = ["Writing", "Coding", "Marketing", "Career", "SEO", "Productivity"];

  return (
    <div>
      <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-[#e5e7eb]' : 'text-gray-900'}`}>Categories</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {categories.map((cat) => (
          <div key={cat} className={`p-5 rounded-xl border flex items-center justify-between
            ${isDark ? 'bg-[#1e293b] border-[#334155]' : 'bg-white border-gray-200'}`}>
            <span className={`font-semibold ${isDark ? 'text-[#e5e7eb]' : 'text-gray-900'}`}>{cat}</span>
            <button className="border-none bg-transparent text-gray-400 cursor-pointer text-lg hover:text-gray-200">⋮</button>
          </div>
        ))}
        <button className="border-2 border-dashed border-[#6366f1] bg-[#6366f1]/5 rounded-xl text-[#6366f1] font-semibold cursor-pointer flex items-center justify-center min-h-[65px] hover:bg-[#6366f1]/10 transition-colors">
          + Add Category
        </button>
      </div>
    </div>
  );
};

export default ManageCategories;