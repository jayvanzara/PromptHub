import { useState } from "react";

const CreatePrompt = ({ theme }) => {
  const isDark = theme === "dark";

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");

  const handleGenerate = () => {
    setGeneratedPrompt("This is a generated prompt based on your selected title, category, and tone.");
  };

  const inputClass = `w-full p-3.5 rounded-xl border outline-none text-[15px] transition-all
    ${isDark 
      ? 'bg-[#1e293b] border-[#374151] text-[#f9fafb] focus:border-[#6366f1]' 
      : 'bg-white border-gray-200 text-gray-900 focus:border-indigo-500 shadow-sm'}`;
  
  const labelClass = `block mb-2 text-sm font-medium ${isDark ? 'text-[#9ca3af]' : 'text-gray-500'}`;

  return (
    <div className={`w-full min-h-full p-8 ${isDark ? 'bg-[#181e2a]' : 'bg-transparent'}`}>
      
      <div className="mb-8">
        <h1 className={`text-2xl font-bold m-0 ${isDark ? 'text-[#e5e7eb]' : 'text-gray-900'}`}>
          Create New Prompt
        </h1>
        <p className={`mt-1 text-sm ${isDark ? 'text-[#9ca3af]' : 'text-gray-500'}`}>
          Fill in the details below to generate a professional prompt.
        </p>
      </div>

      <div className="max-w-3xl flex flex-col gap-6">
        
        <div>
          <label className={labelClass}>Prompt Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Email Marketing Campaign"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            >
              <option value="">Select Category</option>
              <option value="Writing">Writing</option>
              <option value="Coding">Coding</option>
              <option value="Marketing">Marketing</option>
              <option value="Career">Career</option>
              <option value="Study Help">Study Help</option>
              <option value="Blog">Blog</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className={inputClass}
            >
              <option value="">Select Tone</option>
              <option value="Formal">Formal</option>
              <option value="Casual">Casual</option>
              <option value="Professional">Professional</option>
              <option value="Friendly">Friendly</option>
              <option value="Creative">Creative</option>
            </select>
          </div>
        </div>

        {/* ✅ FIXED: Removed shadow-lg shadow-indigo-500/20. Button is now flat. */}
        <button
          onClick={handleGenerate}
          className="w-full py-3.5 rounded-xl bg-[#6366f1] text-white border-none font-semibold text-[15px] cursor-pointer hover:bg-indigo-600 transition-colors mt-2"
        >
          Generate Prompt
        </button>

        <div>
          <label className={labelClass}>Generated Result</label>
          <div className={`p-5 rounded-xl border min-h-[120px] leading-relaxed
            ${isDark 
              ? 'bg-[#1e293b] border-[#374151] text-[#e5e7eb]' 
              : 'bg-white border-gray-200 text-gray-800 shadow-sm'}`}>
            {generatedPrompt || <span className="opacity-50 italic">Your generated prompt will appear here...</span>}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreatePrompt;