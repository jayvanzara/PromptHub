const PromptLibrary = ({ theme }) => {
  const colors = {
    dark: {
      pageBg: "#181e2a",
      cardBg: "#181e2a",
      text: "#e5e7eb",
      subtext: "#a1a7bb",
      divider: "#232a3d",
      buttonBg: "#232a3d",
      buttonText: "#6366f1",
      buttonHover: "#2d3650",
      shadow: "0 4px 24px 0 rgba(30,41,59,0.32)",
      categoryBg: "#1e2535",
      categoryTitle: "#a5b4fc"
    },
    light: {
      pageBg: "#ffffff",
      cardBg: "#ffffff",
      text: "#111827",
      subtext: "#64748b",
      divider: "#e2e8f0",
      buttonBg: "#eef2ff",
      buttonText: "#6366f1",
      buttonHover: "#e0e7ff",
      shadow: "0 4px 24px 0 rgba(100,116,139,0.12)",
      categoryBg: "#f1f5f9",
      categoryTitle: "#6366f1"
    }
  };

  const current = theme === "light" ? colors.light : colors.dark;

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
    <div
      style={{
        minHeight: "100vh",
        background: current.pageBg,
        color: current.text,
        padding: 0,
        margin: 0,
        boxSizing: "border-box"
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 0 0 0",
          padding: "32px 16px 48px 16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start"
        }}
      >
        <div
          style={{
            width: "100%",
            background: current.cardBg,
            borderRadius: 22,
            boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
            padding: "36px 28px 32px 28px",
            display: "flex",
            flexDirection: "column",
            gap: "32px"
          }}
        >
          {/* 🔽 FIXED HEADING */}
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              margin: 0,
              marginBottom: 8,
              color: current.text,
              letterSpacing: "-0.5px"
            }}
          >
            Prompt Library
          </h1>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "36px"
            }}
          >
            {promptCategories.map((cat, idx) => (
              <div key={cat.name}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 12,
                    gap: 10
                  }}
                >
                  <div
                    style={{
                      height: 28,
                      minWidth: 28,
                      borderRadius: 14,
                      background: current.categoryBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 8,
                      fontWeight: 600,
                      color: current.categoryTitle,
                      fontSize: 16,
                      letterSpacing: "0.5px"
                    }}
                  >
                    {cat.name[0]}
                  </div>
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: 20,
                      color: current.categoryTitle,
                      letterSpacing: "-0.5px"
                    }}
                  >
                    {cat.name}
                  </span>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
                    gap: "20px"
                  }}
                >
                  {cat.prompts.map((prompt) => (
                    <div
                      key={prompt.id}
                      style={{
                        background: current.bg,
                        borderRadius: 14,
                        boxShadow: current.shadow,
                        padding: "20px 18px 18px 18px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                        alignItems: "flex-start",
                        transition: "box-shadow 0.18s",
                        border: `1.5px solid ${current.divider}`
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: 17,
                          color: current.text,
                          marginBottom: 2
                        }}
                      >
                        {prompt.title}
                      </div>

                      <div
                        style={{
                          fontSize: 15,
                          color: current.subtext,
                          marginBottom: 8,
                          minHeight: 36
                        }}
                      >
                        {prompt.description}
                      </div>

                      <button
                        style={{
                          padding: "7px 18px",
                          borderRadius: 8,
                          border: "none",
                          background: current.buttonBg,
                          color: current.buttonText,
                          fontWeight: 600,
                          fontSize: 15,
                          cursor: "pointer",
                          transition: "background 0.18s, box-shadow 0.18s"
                        }}
                        onMouseOver={e => {
                          e.currentTarget.style.background = current.buttonHover;
                          e.currentTarget.style.boxShadow =
                            "0 2px 8px 0 rgba(99,102,241,0.08)";
                        }}
                        onMouseOut={e => {
                          e.currentTarget.style.background = current.buttonBg;
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        View Prompt
                      </button>
                    </div>
                  ))}
                </div>

                {idx !== promptCategories.length - 1 && (
                  <div
                    style={{
                      height: 1,
                      background: current.divider,
                      borderRadius: 1,
                      margin: "28px 0 0 0",
                      width: "100%"
                    }}
                  />
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