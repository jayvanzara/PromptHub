import React from "react";

const PromptLibrary = ({ theme }) => {
  const isDark = theme === "dark";

  const promptCategories = [
    {
      name: "Writing",
      prompts: [
        { id: 1, title: "Blog Generator", description: "Generate engaging blog posts on any topic." },
        { id: 2, title: "Story Starter", description: "Kickstart your creative writing with unique story openers." }
      ]
    },
    {
      name: "Career",
      prompts: [
        { id: 3, title: "Resume Improver", description: "Enhance your resume with professional phrasing." },
        { id: 4, title: "Cover Letter Builder", description: "Craft compelling cover letters for job applications." }
      ]
    },
    {
      name: "Marketing",
      prompts: [
        { id: 5, title: "Product Description", description: "Write persuasive product descriptions for e-commerce." },
        { id: 6, title: "Ad Copy", description: "Generate catchy ad copy for campaigns." }
      ]
    },
    {
      name: "Study Help",
      prompts: [
        { id: 7, title: "Study Guide Maker", description: "Summarize topics into simple study guides." },
        { id: 8, title: "Quiz Generator", description: "Create quizzes for self-assessment." }
      ]
    }
  ];

  return (
    // ✅ FIXED: Light mode is 'bg-transparent'
    <div className={`w-full min-h-full p-8 ${isDark ? 'bg-[#181e2a]' : 'bg-transparent'}`}>
      
      <div className="mb-10">
        <h1 className={`text-2xl font-bold m-0 ${isDark ? 'text-[#e5e7eb]' : 'text-gray-900'}`}>
          Prompt Library
        </h1>
        <p className={`mt-1 text-sm ${isDark ? 'text-[#9ca3af]' : 'text-gray-500'}`}>
          Browse and reuse high-quality templates.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {promptCategories.map((cat, idx) => (
          <div key={cat.name}>
            
            <div className="flex items-center mb-5 gap-3">
              <span className={`text-lg font-bold tracking-tight ${isDark ? 'text-[#6366f1]' : 'text-indigo-600'}`}>
                {cat.name}
              </span>
              <div className={`h-px flex-1 ${isDark ? 'bg-[#374151]' : 'bg-gray-200'}`}></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.prompts.map((prompt) => (
                <div key={prompt.id} className={`rounded-xl p-7 border transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between
                  ${isDark 
                    ? 'bg-[#1e293b] border-[#374151] hover:border-[#6366f1]/50' 
                    : 'bg-white border-gray-200 hover:border-indigo-300 shadow-sm'
                  }`}>
                  
                  <div>
                    <h3 className={`font-bold text-lg mb-3 ${isDark ? 'text-[#e5e7eb]' : 'text-gray-900'}`}>
                      {prompt.title}
                    </h3>
                    
                    <p className={`text-[15px] mb-6 leading-relaxed ${isDark ? 'text-[#9ca3af]' : 'text-gray-600'}`}>
                      {prompt.description}
                    </p>
                  </div>
                  
                  <button className={`w-full py-2.5 rounded-lg border font-medium text-sm cursor-pointer transition-colors
                    ${isDark 
                      ? 'border-[#374151] bg-transparent text-[#e5e7eb] hover:bg-[#374151]' 
                      : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}>
                    Use Template
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromptLibrary;