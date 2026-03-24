import React, { useState, useEffect } from "react";
import BASE_URL from "../../services/api";

const ManagePrompts = ({ theme = "dark" }) => {
  const isDark = theme === "dark";
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/admin/prompts`);
      if (response.ok) {
        const data = await response.json();
        setPrompts(data);
      }
    } catch (error) {
      console.error("Error fetching admin prompts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this prompt?")) return;
    try {
      const response = await fetch(`${BASE_URL}/api/prompts/${id}`, { method: "DELETE" });
      if (response.ok) setPrompts(prompts.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <div className="w-full h-full animate-fade-in">
      {loading ? (
        <div className="flex items-center justify-center p-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#6366f1]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {prompts.map((prompt) => (
            <div
              key={prompt.id}
              className={`p-8 rounded-[2rem] border flex flex-col h-[340px] transition-all duration-300
              ${isDark ? 'bg-[#1e293b] border-[#334155] hover:border-[#6366f1]' : 'bg-white border-gray-200 shadow-sm hover:border-[#6366f1]'}`}
            >
              <div className="h-16 mb-2">
                <h3 className={`text-2xl font-extrabold leading-tight line-clamp-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {prompt.title}
                </h3>
              </div>

              <div className="h-6 mb-6">
                <p className={`text-xs font-semibold ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  By <span className="text-[#6366f1]">@{prompt.creator_name || "user"}</span>
                </p>
              </div>

              <div className="flex-1 overflow-hidden">
                <p className={`text-sm leading-relaxed line-clamp-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {prompt.generated_content}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-dashed border-[#334155]/50">
                <button
                  onClick={() => handleDelete(prompt.id)}
                  className={`w-full py-4 rounded-2xl border-none font-black text-[10px] uppercase tracking-[0.2em] cursor-pointer transition-all active:scale-95
                    ${isDark ? 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white'}`}
                >
                  Delete Prompt
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagePrompts;