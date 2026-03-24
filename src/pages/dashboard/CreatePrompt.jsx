import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BASE_URL from "../../services/api";

const CreatePrompt = ({ theme }) => {
  const isDark = theme === "dark";
  const location = useLocation();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("");
  const [task, setTask] = useState("");
  const [context, setContext] = useState("");

  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const [categories, setCategories] = useState([]);
  const [tones, setTones] = useState([
    "Formal",
    "Casual",
    "Professional",
    "Friendly",
    "Creative",
    "Technical",
  ]);

  // Pre-fill fields if navigated from a template
  useEffect(() => {
    if (location.state) {
      const { title, category, tone, task } = location.state;
      if (title) setTitle(title);
      if (category) setCategory(category);
      if (tone) setTone(tone);
      if (task) setTask(task);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await fetch(`${BASE_URL}/api/categories`);
        if (catRes.ok) {
          const catData = await catRes.json();
          if (catData.length > 0) setCategories(catData);
        }

        const toneRes = await fetch(`${BASE_URL}/api/tones`);
        if (toneRes.ok) {
          const toneData = await toneRes.json();
          if (toneData && toneData.length > 0) setTones(toneData);
        }
      } catch (error) {
        console.error("Sync error. Using defaults.", error);
      }
    };

    fetchData();
  }, []);

  const handleGenerate = async () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      alert("Please log in to create prompts.");
      return;
    }

    if (!title || !category || !tone || !task) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setSuccess(false);
    setCopied(false);
    setGeneratedPrompt("");

    try {
      const aiResponse = await fetch(`${BASE_URL}/api/generate-prompt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          task: task,
          role: `Expert in ${category}`,
          tone: tone,
          context: context || null,
          output_format: null,
          constraints: null,
        }),
      });

      const aiData = await aiResponse.json();

      if (aiResponse.ok) {
        const realAiContent =
          aiData.generated_prompt || aiData.prompt || aiData.content;

        if (!realAiContent) {
          alert("AI returned empty response");
          setLoading(false);
          return;
        }

        setGeneratedPrompt(realAiContent);

        const saveResponse = await fetch(`${BASE_URL}/api/prompts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title,
            category: category,
            tone: tone,
            generated_content: realAiContent,
            user_id: userId,
            role: `Expert in ${category}`,
            task: task,
            context: context || null,
            constraints: null,
            output_format: null,
          }),
        });

        if (saveResponse.ok) {
          setSuccess(true);
          // Reset form fields after successful save
          setTitle("");
          setCategory("");
          setTone("");
          setTask("");
          setContext("");
          setTimeout(() => setSuccess(false), 2000);
        } else {
          console.error("Failed to save to DB");
        }
      } else {
        alert("AI Error: " + (aiData.error || "Failed to generate"));
      }
    } catch (error) {
      console.error("Backend Error:", error);
      alert("Failed to connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputClass = `w-full px-4 rounded-2xl border outline-none text-[15px] font-semibold transition-all
    ${
      isDark
        ? "bg-[#1e293b] border-[#374151] text-[#f9fafb] focus:border-[#6366f1]"
        : "bg-white border-gray-200 text-gray-900 focus:border-indigo-500 shadow-sm"
    }`;

  const selectClass = `${inputClass} h-14 appearance-none cursor-pointer`;

  const labelClass = `block mb-2 text-sm font-bold uppercase tracking-widest ${
    isDark ? "text-[#f9fafb]" : "text-gray-900"
  }`;

  const arrowColor = isDark ? "text-gray-400" : "text-gray-500";

  const baseBtnClass =
    "w-full h-14 rounded-2xl border-none font-bold text-[15px] transition-all mt-4 shadow-md uppercase tracking-wider flex items-center justify-center";

  let generateBtnClass = baseBtnClass;

  if (loading)
    generateBtnClass += isDark
      ? " bg-indigo-900 text-gray-400 cursor-wait"
      : " bg-indigo-300 text-white cursor-wait";
  else if (success)
    generateBtnClass += " bg-green-500 text-white cursor-default hover:bg-green-600";
  else
    generateBtnClass +=
      " bg-[#6366f1] text-white cursor-pointer hover:bg-indigo-600";

  let copyBtnClass = baseBtnClass;

  if (!generatedPrompt)
    copyBtnClass += isDark
      ? " bg-[#1e293b] text-gray-600 border border-[#374151] cursor-not-allowed shadow-none"
      : " bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed shadow-none";
  else if (copied)
    copyBtnClass += " bg-green-500 text-white cursor-default hover:bg-green-600";
  else
    copyBtnClass +=
      " bg-[#6366f1] text-white cursor-pointer hover:bg-indigo-600";

  return (
    <div
      className={`w-full min-h-full p-8 ${
        isDark ? "bg-[#181e2a]" : "bg-transparent"
      }`}
    >
      <div className="max-w-3xl flex flex-col gap-6">
        <div>
          <label className={labelClass}>Prompt Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Email Marketing Campaign"
            className={`${inputClass} h-14`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className={labelClass}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={selectClass}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div
              className={`absolute right-4 top-[50px] pointer-events-none ${arrowColor}`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </div>
          </div>

          <div className="relative">
            <label className={labelClass}>Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className={selectClass}
            >
              <option value="">Select Tone</option>
              {tones.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <div
              className={`absolute right-4 top-[50px] pointer-events-none ${arrowColor}`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Task</label>
            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="What should AI do?"
              className={`${inputClass} h-24 py-3 resize-none leading-relaxed`}
            />
          </div>

          <div>
            <label className={labelClass}>Context (Optional)</label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Background details..."
              className={`${inputClass} h-24 py-3 resize-none leading-relaxed`}
            />
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className={generateBtnClass}
        >
          {loading ? "Generating..." : success ? "Generated!" : "Generate Prompt"}
        </button>

        <div className="mt-4">
          <label className={labelClass}>Generated Result</label>
          <div
            className={`p-6 rounded-2xl border min-h-[120px] leading-relaxed whitespace-pre-wrap text-[15px]
            ${
              isDark
                ? "bg-[#1e293b] border-[#374151] text-[#e5e7eb]"
                : "bg-white border-gray-200 text-gray-800 shadow-sm"
            }`}
          >
            {generatedPrompt || (
              <span className="opacity-50 italic">
                Your generated prompt will appear here...
              </span>
            )}
          </div>

          <button
            onClick={handleCopy}
            disabled={!generatedPrompt}
            className={copyBtnClass}
          >
            {copied ? "Copied!" : "Copy to Clipboard"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePrompt;