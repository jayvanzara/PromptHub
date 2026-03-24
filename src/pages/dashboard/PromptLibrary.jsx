import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../services/api";

const PromptLibrary = ({ theme }) => {
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const [myPrompts, setMyPrompts] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [templatesLoading, setTemplatesLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const [activeTab, setActiveTab] = useState("my-library");
  
  // NEW STATE: Tracks which category tab is currently selected inside Featured Templates
  const [activeCategoryTab, setActiveCategoryTab] = useState("");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [previewPrompt, setPreviewPrompt] = useState(null);
  const userId = localStorage.getItem("user_id");

  // Fetch User's My Library
  useEffect(() => {
    const fetchPrompts = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`${BASE_URL}/api/prompts/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setMyPrompts(data);
        }
      } catch (error) {
        console.error("Error fetching library:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrompts();
  }, [userId]);

  // Fetch Featured Templates
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/templates`);
        if (response.ok) {
          const data = await response.json();
          setTemplates(data);
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
      } finally {
        setTemplatesLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  // Group templates by category
  const groupedTemplates = templates.reduce((acc, template) => {
    const cat = template.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(template);
    return acc;
  }, {});

  // Filter grouped templates by search
  const filteredGrouped = Object.entries(groupedTemplates).reduce((acc, [cat, items]) => {
    const filtered = items.filter(
      (t) =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filtered.length > 0) acc[cat] = filtered;
    return acc;
  }, {});

  const categoryKeys = Object.keys(filteredGrouped);

  // Set the first category tab as active by default (and auto-switch if search hides current tab)
  useEffect(() => {
    if (categoryKeys.length > 0 && (!activeCategoryTab || !categoryKeys.includes(activeCategoryTab))) {
      setActiveCategoryTab(categoryKeys[0]);
    }
  }, [categoryKeys, activeCategoryTab]);

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this prompt?")) return;
    try {
      const response = await fetch(`${BASE_URL}/api/prompts/${id}`, { method: "DELETE" });
      if (response.ok) setMyPrompts(myPrompts.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  // Handle Copy
  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Handle Use Template
  const handleUseTemplate = (template) => {
    navigate("/dashboard/create-prompt", {
      state: {
        title: template.title,
        category: template.category,
        tone: template.tone,
        role: template.role,
        task: template.task,
      },
    });
  };

  // My Library Card
  const PromptCard = ({ prompt }) => (
    <div className={`rounded-xl p-6 border flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 h-full
      ${isDark ? "bg-[#1e293b] border-[#374151]" : "bg-white border-gray-200 shadow-sm"}`}>
      <div>
        <div className="flex gap-2 mb-4">
          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider
            ${isDark ? "bg-[#6366f1]/20 text-[#818cf8]" : "bg-indigo-50 text-indigo-600"}`}>
            {prompt.category}
          </span>
          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider
            ${isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-500"}`}>
            {prompt.tone}
          </span>
        </div>
        <h3 className={`font-bold text-lg mb-2 ${isDark ? "text-[#e5e7eb]" : "text-gray-900"}`}>
          {prompt.title}
        </h3>
        <p className={`text-[13px] line-clamp-3 mb-6 leading-relaxed ${isDark ? "text-[#9ca3af]" : "text-gray-600"}`}>
          {prompt.generated_content}
        </p>
      </div>
      <div className="flex gap-3 mt-auto">
        <button
          onClick={() => handleCopy(prompt.generated_content, prompt.id)}
          className={`flex-1 py-2.5 rounded-lg border-none font-semibold text-xs cursor-pointer transition-colors text-white shadow-sm
            ${copiedId === prompt.id ? "bg-green-500" : "bg-[#6366f1] hover:bg-indigo-600"}`}>
          {copiedId === prompt.id ? "Copied!" : "Copy"}
        </button>
        <button
          onClick={() => handleDelete(prompt.id)}
          className="px-4 py-2.5 rounded-lg border-none font-semibold text-xs cursor-pointer transition-colors text-white bg-red-500 hover:bg-red-600 shadow-sm">
          Delete
        </button>
      </div>
    </div>
  );

  // Featured Template Card
  const TemplateCard = ({ template }) => (
    <div className={`rounded-xl p-6 border flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 h-full
      ${isDark ? "bg-[#1e293b] border-[#374151]" : "bg-white border-gray-200 shadow-sm"}`}>
      <div>
        <div className="flex gap-2 mb-4">
          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider
            ${isDark ? "bg-[#6366f1]/20 text-[#818cf8]" : "bg-indigo-50 text-indigo-600"}`}>
            {template.category}
          </span>
          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider
            ${isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-500"}`}>
            {template.tone}
          </span>
        </div>
        <h3 className={`font-bold text-lg mb-2 ${isDark ? "text-[#e5e7eb]" : "text-gray-900"}`}>
          {template.title}
        </h3>
        <p className={`text-[13px] leading-relaxed mb-2 ${previewPrompt === template.id ? "" : "line-clamp-3"} ${isDark ? "text-[#9ca3af]" : "text-gray-600"}`}>
          {template.content}
        </p>
        <button
          onClick={() => setPreviewPrompt(previewPrompt === template.id ? null : template.id)}
          className={`text-[11px] font-bold uppercase tracking-wider mb-4 ${isDark ? "text-[#6366f1]" : "text-indigo-600"}`}>
          {previewPrompt === template.id ? "Show Less ▲" : "Show More ▼"}
        </button>
      </div>
      <div className="flex gap-3 mt-auto">
        <button
          onClick={() => handleCopy(template.content, template.id)}
          className={`flex-1 py-2.5 rounded-lg border-none font-semibold text-xs cursor-pointer transition-colors text-white shadow-sm
            ${copiedId === template.id ? "bg-green-500" : "bg-[#6366f1] hover:bg-indigo-600"}`}>
          {copiedId === template.id ? "Copied!" : "Copy"}
        </button>
        <button
          onClick={() => handleUseTemplate(template)}
          className={`flex-1 py-2.5 rounded-lg border-none font-semibold text-xs cursor-pointer transition-colors shadow-sm
            ${isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
          Use Template
        </button>
      </div>
    </div>
  );

  return (
    <div className={`w-full min-h-full p-8 ${isDark ? "bg-[#181e2a]" : "bg-transparent"}`}>

      {/* MAIN TAB BAR */}
      <div className={`flex gap-2 mb-8 border-b ${isDark ? "border-[#374151]" : "border-gray-200"}`}>
        <button
          onClick={() => setActiveTab("my-library")}
          className={`pb-3 px-4 text-sm font-bold uppercase tracking-widest transition-all border-b-2 -mb-px
            ${activeTab === "my-library"
              ? "border-[#6366f1] text-[#6366f1]"
              : `border-transparent ${isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-400 hover:text-gray-600"}`
            }`}>
          My Library
          <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold
            ${activeTab === "my-library"
              ? "bg-[#6366f1] text-white"
              : isDark ? "bg-[#374151] text-gray-300" : "bg-gray-100 text-gray-500"
            }`}>
            {myPrompts.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("featured")}
          className={`pb-3 px-4 text-sm font-bold uppercase tracking-widest transition-all border-b-2 -mb-px
            ${activeTab === "featured"
              ? "border-[#6366f1] text-[#6366f1]"
              : `border-transparent ${isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-400 hover:text-gray-600"}`
            }`}>
          Featured Templates
          <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold
            ${activeTab === "featured"
              ? "bg-[#6366f1] text-white"
              : isDark ? "bg-[#374151] text-gray-300" : "bg-gray-100 text-gray-500"
            }`}>
            {templates.length}
          </span>
        </button>
      </div>

      {/* MY LIBRARY TAB CONTENT */}
      {activeTab === "my-library" && (
        <div>
          {loading ? (
            <p className={isDark ? "text-gray-400" : "text-gray-500"}>Loading your prompts...</p>
          ) : myPrompts.length === 0 ? (
            <div className={`p-8 rounded-xl border border-dashed text-center ${isDark ? "border-[#374151]" : "border-gray-300"}`}>
              <p className={isDark ? "text-gray-400" : "text-gray-500"}>You haven't saved any prompts yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myPrompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* FEATURED TEMPLATES TAB CONTENT */}
      {activeTab === "featured" && (
        <div>
          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates by title or category..."
              className={`w-full h-12 px-4 rounded-2xl border outline-none text-sm font-semibold transition-all
                ${isDark
                  ? "bg-[#1e293b] border-[#374151] text-white placeholder-gray-500 focus:border-[#6366f1]"
                  : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-500 shadow-sm"}`}
            />
          </div>

          {templatesLoading ? (
            <p className={isDark ? "text-gray-400" : "text-gray-500"}>Loading templates...</p>
          ) : categoryKeys.length === 0 ? (
            <div className={`p-8 rounded-xl border border-dashed text-center ${isDark ? "border-[#374151]" : "border-gray-300"}`}>
              <p className={isDark ? "text-gray-400" : "text-gray-500"}>No templates found.</p>
            </div>
          ) : (
            <div>
              {/* CATEGORY TABS (Admin-style) */}
              <div className={`flex gap-6 mb-8 border-b overflow-x-auto scrollbar-hide ${isDark ? "border-[#334155]" : "border-gray-200"}`}>
                {categoryKeys.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategoryTab(category)}
                    className={`pb-4 flex items-center gap-2 font-black text-xs uppercase tracking-widest whitespace-nowrap transition-all border-b-2 -mb-px
                      ${activeCategoryTab === category 
                        ? `border-[#6366f1] ${isDark ? "text-[#818cf8]" : "text-indigo-600"}` 
                        : `border-transparent hover:border-gray-400 ${isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"}`
                      }`}
                  >
                    {category}
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                      activeCategoryTab === category 
                        ? isDark ? "bg-[#6366f1]/20 text-[#818cf8]" : "bg-indigo-100 text-indigo-700"
                        : isDark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500"
                    }`}>
                      {filteredGrouped[category].length}
                    </span>
                  </button>
                ))}
              </div>

              {/* ACTIVE CATEGORY GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGrouped[activeCategoryTab]?.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default PromptLibrary;