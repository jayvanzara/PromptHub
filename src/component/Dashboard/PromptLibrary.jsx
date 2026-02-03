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
    },
    {
      name: "Blog",
      prompts: [
        { id: 9, title: "SEO Blog Ideas", description: "Get blog topic ideas with SEO in mind." },
        { id: 10, title: "Headline Optimizer", description: "Improve your blog headlines for more clicks." }
      ]
    }
  ];

  return (
    <div className={`min-h-screen p-0 box-border ${isDark ? 'bg-[#181e2a] text-[#e5e7eb]' : 'bg-white text-gray-900'}`}>
      <div className="max-w-[900px] m-0 px-4 pt-8 pb-12 flex flex-col items-start">
        <div className={`w-full rounded-[22px] p-7 md:p-9 flex flex-col gap-8 shadow-[0_8px_32px_rgba(0,0,0,0.35)]
          ${isDark ? 'bg-[#181e2a]' : 'bg-white'}`}>
          
          <h1 className={`text-[28px] font-bold tracking-tight m-0 mb-2 ${isDark ? 'text-[#e5e7eb]' : 'text-gray-900'}`}>
            Prompt Library
          </h1>

          <div className="flex flex-col gap-9">
            {promptCategories.map((cat, idx) => (
              <div key={cat.name}>
                <div className="flex items-center mb-3 gap-2.5">
                  <div className={`h-7 min-w-[28px] rounded-full flex items-center justify-center font-semibold text-base tracking-wide
                    ${isDark ? 'bg-[#1e2535] text-[#a5b4fc]' : 'bg-slate-100 text-[#6366f1]'}`}>
                    {cat.name[0]}
                  </div>
                  <span className={`font-semibold text-xl tracking-tight ${isDark ? 'text-[#a5b4fc]' : 'text-[#6366f1]'}`}>
                    {cat.name}
                  </span>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-5">
                  {cat.prompts.map((prompt) => (
                    <div key={prompt.id} className={`rounded-[14px] p-5 flex flex-col gap-2.5 items-start border transition-shadow duration-200
                      ${isDark 
                        ? 'bg-[#181e2a] border-[#232a3d] shadow-[0_4px_24px_0_rgba(30,41,59,0.32)]' 
                        : 'bg-white border-slate-200 shadow-[0_4px_24px_0_rgba(100,116,139,0.12)]'
                      }`}>
                      <div className={`font-semibold text-[17px] m-0 mb-0.5 ${isDark ? 'text-[#e5e7eb]' : 'text-gray-900'}`}>
                        {prompt.title}
                      </div>
                      <div className={`text-[15px] mb-2 min-h-[36px] ${isDark ? 'text-[#a1a7bb]' : 'text-slate-500'}`}>
                        {prompt.description}
                      </div>
                      <button className={`px-[18px] py-[7px] rounded-lg border-none font-semibold text-[15px] cursor-pointer transition-all duration-200
                        ${isDark 
                          ? 'bg-[#232a3d] text-[#6366f1] hover:bg-[#2d3650] hover:shadow-[0_2px_8px_0_rgba(99,102,241,0.08)]' 
                          : 'bg-[#eef2ff] text-[#6366f1] hover:bg-[#e0e7ff]'
                        }`}>
                        View Prompt
                      </button>
                    </div>
                  ))}
                </div>

                {idx !== promptCategories.length - 1 && (
                  <div className={`h-px w-full mt-7 rounded-full ${isDark ? 'bg-[#232a3d]' : 'bg-slate-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptLibrary;