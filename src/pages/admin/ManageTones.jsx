import React, { useState, useEffect } from "react";
import BASE_URL from "../../services/api";

const ManageTones = ({ theme = "dark" }) => {
  const isDark = theme === "dark";
  
  const [tones, setTones] = useState([
    "Formal", "Casual", "Professional", "Friendly", "Creative", "Technical"
  ]);

  useEffect(() => {
    const fetchTones = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/tones`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setTones(data);
          }
        }
      } catch (error) {
        console.error("Error fetching tones, using defaults");
      }
    };
    fetchTones();
  }, []);

  const handleAddTone = async () => {
    const name = window.prompt("Enter new tone name:");
    if (!name || name.trim() === "") return;

    try {
      const response = await fetch(`${BASE_URL}/api/tones`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (response.ok) {
        setTones((prev) => [...prev, name.trim()]);
      } else {
        alert("Failed to add tone. It may already exist.");
      }
    } catch (error) {
      setTones((prev) => [...prev, name.trim()]);
    }
  };

  const handleDeleteTone = async (toneName) => {
    if (!window.confirm(`Remove "${toneName}"?`)) return;

    try {
      const response = await fetch(`${BASE_URL}/api/tones/${toneName}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTones((prev) => prev.filter((t) => t !== toneName));
      } else {
        setTones((prev) => prev.filter((t) => t !== toneName));
      }
    } catch (error) {
      setTones((prev) => prev.filter((t) => t !== toneName));
    }
  };

  return (
    <div className="w-full h-full animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tones.map((tone) => (
          <div
            key={tone}
            className={`p-6 rounded-[2.5rem] border flex items-center justify-between h-[90px] transition-all duration-300
            ${isDark ? 'bg-[#1e293b] border-[#334155] hover:border-[#8b5cf6]' : 'bg-white border-gray-200 shadow-sm hover:border-violet-500'}`}
          >
            <span className={`text-lg font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {tone}
            </span>
            <button
              onClick={() => handleDeleteTone(tone)}
              className={`w-9 h-9 rounded-full border-none flex items-center justify-center cursor-pointer transition-all
                ${isDark ? 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white'}`}
              title="Remove Tone"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          onClick={handleAddTone}
          className="border-2 border-dashed border-[#8b5cf6] bg-[#8b5cf6]/5 rounded-[2.5rem] text-[#8b5cf6] text-xs font-black uppercase tracking-[0.2em] cursor-pointer flex items-center justify-center gap-3 h-[90px] hover:bg-[#8b5cf6]/10 transition-all active:scale-95"
        >
          <span className="text-2xl">+</span> Add Tone
        </button>
      </div>
    </div>
  );
};

export default ManageTones;