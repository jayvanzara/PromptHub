import React, { useState, useEffect } from "react";
import BASE_URL from "../../services/api";

const ManageCategories = ({ theme = "dark" }) => {
  const isDark = theme === "dark";
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/categories`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    const name = window.prompt("Enter new category name:");
    if (!name || name.trim() === "") return;

    try {
      const response = await fetch(`${BASE_URL}/api/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (response.ok) {
        fetchCategories();
      } else {
        alert("Failed to add category. It may already exist.");
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDeleteCategory = async (catName) => {
    if (!window.confirm(`Are you sure you want to remove "${catName}"? This will affect the User Panel immediately.`)) return;

    try {
      const response = await fetch(`${BASE_URL}/api/categories/${catName}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCategories(categories.filter((cat) => cat !== catName));
      } else {
        alert("Error deleting category from system.");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="w-full h-full animate-fade-in">
      {loading ? (
        <div className="flex items-center justify-center p-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#6366f1]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <div
                key={cat}
                className={`p-6 rounded-[2.5rem] border flex items-center justify-between h-[90px] transition-all duration-300
                ${isDark ? 'bg-[#1e293b] border-[#334155] hover:border-[#ef4444]' : 'bg-white border-gray-200 shadow-sm hover:border-red-500'}`}
              >
                <span className={`text-lg font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {cat}
                </span>
                <button
                  onClick={() => handleDeleteCategory(cat)}
                  className={`w-9 h-9 rounded-full border-none flex items-center justify-center cursor-pointer transition-all
                    ${isDark ? 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white'}`}
                  title="Remove Category"
                >
                  ✕
                </button>
              </div>
            ))
          ) : (
            <div className={`col-span-full p-16 rounded-[2.5rem] border-2 border-dashed flex flex-col items-center justify-center text-center
              ${isDark ? 'border-[#334155] text-gray-500' : 'border-gray-200 text-gray-400'}`}>
              <p className="font-bold text-lg mb-1">No System Categories Found</p>
              <p className="text-sm">Click the button below to populate the system.</p>
            </div>
          )}

          <button
            onClick={handleAddCategory}
            className="border-2 border-dashed border-[#6366f1] bg-[#6366f1]/5 rounded-[2.5rem] text-[#6366f1] text-xs font-black uppercase tracking-[0.2em] cursor-pointer flex items-center justify-center gap-3 h-[90px] hover:bg-[#6366f1]/10 transition-all active:scale-95"
          >
            <span className="text-2xl">+</span> Add Category
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageCategories;