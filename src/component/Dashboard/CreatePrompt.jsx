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

  const inputClass = `w-full p-3 rounded-xl border outline-none text-sm
    ${isDark ? 'bg-[#1e293b] border-[#334155] text-[#e5e7eb]' : 'bg-white border-gray-300 text-gray-900'}`;
  
  const labelClass = `block mb-2 font-medium ${isDark ? 'text-[#cbd5e1]' : 'text-gray-600'}`;

  return (
    <div className={`min-h-[calc(100vh-56px)] p-6 flex justify-start box-border ${isDark ? 'bg-[#181e2a]' : 'bg-white'}`}>
      <div className={`w-full max-w-[700px] p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] flex flex-col gap-6
        ${isDark ? 'bg-[#181e2a]' : 'bg-white'}`}>
        
        <h1 className={`text-[28px] font-bold m-0 ${isDark ? 'text-[#e5e7eb]' : 'text-gray-900'}`}>
          Create New Prompt
        </h1>

        <div className="flex flex-col gap-2">
          <label className={labelClass}>Prompt Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
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

        <div className="flex flex-col gap-2">
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

        <button
          onClick={handleGenerate}
          className="w-full py-3 rounded-xl bg-[#6366f1] text-white border-none font-semibold text-[15px] cursor-pointer hover:bg-indigo-600 transition-colors"
        >
          Generate Prompt
        </button>

        <div className="flex flex-col gap-2">
          <label className={labelClass}>Generated Prompt</label>
          <div className={`p-4 rounded-xl border min-h-[100px] 
            ${isDark ? 'bg-[#1e293b] border-[#334155] text-[#e5e7eb]' : 'bg-white border-gray-300 text-gray-900'}`}>
            {generatedPrompt || "Your generated prompt will appear here."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePrompt;