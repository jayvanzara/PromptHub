import React, { useState, useEffect } from "react";
import BASE_URL from "../../services/api";

const ManageTemplates = ({ theme = "dark" }) => {
  const isDark = theme === "dark";
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "",
    tone: "",
    role: "",
    task: "",
    content: "",
  });
  const [categories, setCategories] = useState([]);
  const [tones, setTones] = useState([]);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    fetchTemplates();
    fetchCategories();
    fetchTones();
  }, []);

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
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/categories`);
      if (response.ok) setCategories(await response.json());
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchTones = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/tones`);
      if (response.ok) setTones(await response.json());
    } catch (error) {
      console.error("Error fetching tones:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    if (!form.title || !form.category || !form.tone || !form.content) {
      alert("Please fill in Title, Category, Tone and Content.");
      return;
    }
    setSaving(true);
    try {
      const response = await fetch(`${BASE_URL}/api/templates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setForm({ title: "", category: "", tone: "", role: "", task: "", content: "" });
        setShowForm(false);
        fetchTemplates();
      } else {
        alert("Failed to add template.");
      }
    } catch (error) {
      console.error("Error adding template:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this template?")) return;
    try {
      const response = await fetch(`${BASE_URL}/api/templates/${id}`, { method: "DELETE" });
      if (response.ok) setTemplates(templates.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  };

  const groupedTemplates = templates.reduce((acc, template) => {
    const cat = template.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(template);
    return acc;
  }, {});

  const categoryKeys = Object.keys(groupedTemplates);

  useEffect(() => {
    if (categoryKeys.length > 0 && !categoryKeys.includes(activeTab)) {
      setActiveTab(categoryKeys[0]);
    }
  }, [categoryKeys, activeTab]);

  const inputClass = `w-full px-4 rounded-2xl border outline-none text-[15px] font-semibold transition-all
    ${isDark
      ? "bg-[#181e2a] border-[#374151] text-[#f9fafb] focus:border-[#6366f1]"
      : "bg-white border-gray-200 text-gray-900 focus:border-indigo-500 shadow-sm"}`;

  const selectClass = `${inputClass} h-14 appearance-none cursor-pointer`;
  const labelClass = `block mb-2 text-sm font-bold uppercase tracking-widest ${isDark ? "text-[#f9fafb]" : "text-gray-900"}`;
  const arrowColor = isDark ? "text-gray-400" : "text-gray-500";

  return (
    <div className="w-full h-full animate-fade-in">

      {/* CHANGED: Combined Top Navigation & Actions Bar to remove vertical gaps */}
      <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b ${isDark ? "border-[#334155]" : "border-gray-200"}`}>
        
        {/* Tabs Container */}
        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {!loading && categoryKeys.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`pb-4 flex items-center gap-2 font-black text-xs uppercase tracking-widest whitespace-nowrap transition-all border-b-2 -mb-px
                ${activeTab === category 
                  ? `border-[#6366f1] ${isDark ? "text-[#818cf8]" : "text-indigo-600"}` 
                  : `border-transparent hover:border-gray-400 ${isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"}`
                }`}
            >
              {category}
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                activeTab === category 
                  ? isDark ? "bg-[#6366f1]/20 text-[#818cf8]" : "bg-indigo-100 text-indigo-700"
                  : isDark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500"
              }`}>
                {groupedTemplates[category].length}
              </span>
            </button>
          ))}
        </div>

        {/* Action Button */}
        <div className="pb-3 sm:pb-4 flex-shrink-0">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-2.5 rounded-xl bg-[#6366f1] text-white font-bold text-sm hover:bg-indigo-500 transition-all border-none cursor-pointer active:scale-95"
          >
            {showForm ? "Cancel" : "+ Add Template"}
          </button>
        </div>
      </div>

      {/* Add Template Form */}
      {showForm && (
        <div className={`rounded-3xl border p-8 mb-10 ${isDark ? "bg-[#1e293b] border-[#374151]" : "bg-white border-gray-200 shadow-sm"}`}>
          <div className={`flex items-center gap-3 mb-8 pb-6 border-b ${isDark ? "border-[#374151]" : "border-gray-100"}`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? "bg-[#6366f1]/20" : "bg-indigo-50"}`}>
              <svg className={`w-4 h-4 ${isDark ? "text-[#818cf8]" : "text-indigo-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className={`text-sm font-bold uppercase tracking-widest ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              New Template
            </h3>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <label className={labelClass}>Template Title</label>
              <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. SEO Blog Post Writer" className={`${inputClass} h-14`} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className={labelClass}>Category</label>
                <select name="category" value={form.category} onChange={handleChange} className={selectClass}>
                  <option value="">Select Category</option>
                  {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <div className={`absolute right-4 top-[50px] pointer-events-none ${arrowColor}`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z" /></svg>
                </div>
              </div>

              <div className="relative">
                <label className={labelClass}>Tone</label>
                <select name="tone" value={form.tone} onChange={handleChange} className={selectClass}>
                  <option value="">Select Tone</option>
                  {tones.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <div className={`absolute right-4 top-[50px] pointer-events-none ${arrowColor}`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z" /></svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Role (Optional)</label>
                <input name="role" value={form.role} onChange={handleChange} placeholder="e.g. SEO Expert" className={`${inputClass} h-14`} />
              </div>
              <div>
                <label className={labelClass}>Task (Optional)</label>
                <input name="task" value={form.task} onChange={handleChange} placeholder="e.g. Write a blog post" className={`${inputClass} h-14`} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Prompt Content</label>
              <textarea name="content" value={form.content} onChange={handleChange} placeholder="Write the full prompt content here..." className={`${inputClass} py-3 resize-none leading-relaxed`} rows={5} />
            </div>

            <button onClick={handleAdd} disabled={saving} className={`w-full h-14 rounded-2xl border-none font-bold text-[15px] transition-all shadow-md uppercase tracking-wider ${saving ? (isDark ? "bg-indigo-900 text-gray-400 cursor-wait" : "bg-indigo-300 text-white cursor-wait") : "bg-[#6366f1] text-white cursor-pointer hover:bg-indigo-600"}`}>
              {saving ? "Saving..." : "Save Template"}
            </button>
          </div>
        </div>
      )}

      {/* Templates Display Area */}
      {loading ? (
        <div className="flex items-center justify-center p-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#6366f1]"></div>
        </div>
      ) : categoryKeys.length === 0 ? (
        <div className={`p-16 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center ${isDark ? "border-[#334155] text-gray-500" : "border-gray-200 text-gray-400"}`}>
          <p className="font-bold text-lg mb-1">No Templates Found</p>
          <p className="text-sm">Click the button above to add your first template.</p>
        </div>
      ) : (
        /* ACTIVE CATEGORY GRID */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {groupedTemplates[activeTab]?.map((template) => (
            <div
              key={template.id}
              className={`p-6 rounded-2xl border flex flex-col h-full transition-all duration-300 ${isDark ? "bg-[#1e293b] border-[#334155] hover:border-[#6366f1]" : "bg-white border-gray-200 shadow-sm hover:border-[#6366f1]"}`}
            >
              <div className="flex gap-2 mb-3">
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${isDark ? "bg-[#6366f1]/20 text-[#818cf8]" : "bg-indigo-50 text-indigo-600"}`}>
                  {template.category}
                </span>
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-500"}`}>
                  {template.tone}
                </span>
              </div>

              <h3 className={`font-bold text-base mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                {template.title}
              </h3>

              <p className={`text-[13px] line-clamp-3 leading-relaxed flex-1 mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {template.content}
              </p>

              <button
                onClick={() => handleDelete(template.id)}
                className={`w-full py-2.5 rounded-xl border-none font-black text-[10px] uppercase tracking-[0.2em] cursor-pointer transition-all active:scale-95 ${isDark ? "bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white" : "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"}`}
              >
                Delete Template
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default ManageTemplates;