import { useState } from "react";

const CreatePrompt = ({ theme }) => {
  const colors = {
    dark: {
      pageBg: "#181e2a",
      cardBg: "#181e2a",
      text: "#e5e7eb",
      label: "#cbd5e1",
      inputBg: "#1e293b",
      border: "#334155",
      buttonBg: "#6366f1",
      buttonText: "#ffffff",
      hoverBg: "#4f46e5",
      shadow: "0 8px 30px rgba(0,0,0,0.35)"
    },
    light: {
      pageBg: "#ffffff",
      cardBg: "#ffffff",
      text: "#111827",
      label: "#4b5563",
      inputBg: "#ffffff",
      border: "#d1d5db",
      buttonBg: "#6366f1",
      buttonText: "#ffffff",
      hoverBg: "#4f46e5",

      // ✅ MATCHES PROMPT LIBRARY FLOATING FEEL
      shadow: "0 10px 35px rgba(0,0,0,0.35)"
    }
  };

  const current = theme === "light" ? colors.light : colors.dark;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");

  const handleGenerate = () => {
    setGeneratedPrompt(
      "This is a generated prompt based on your selected title, category, and tone."
    );
  };

  return (
    <div
      style={{
        backgroundColor: current.pageBg,
        minHeight: "calc(100vh - 56px)",
        padding: "24px",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "flex-start"
      }}
    >
      <div
        style={{
          backgroundColor: current.cardBg,
          borderRadius: "16px",
          padding: "32px",
          width: "100%",
          maxWidth: "700px",
          boxShadow: current.shadow,
          display: "flex",
          flexDirection: "column",
          gap: "24px"
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "700",
            color: current.text
          }}
        >
          Create New Prompt
        </h1>

        <div style={styles.formGroup}>
          <label style={{ ...styles.label, color: current.label }}>
            Prompt Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              ...styles.input,
              backgroundColor: current.inputBg,
              borderColor: current.border,
              color: current.text
            }}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={{ ...styles.label, color: current.label }}>
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              ...styles.input,
              backgroundColor: current.inputBg,
              borderColor: current.border,
              color: current.text
            }}
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

        <div style={styles.formGroup}>
          <label style={{ ...styles.label, color: current.label }}>
            Tone
          </label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            style={{
              ...styles.input,
              backgroundColor: current.inputBg,
              borderColor: current.border,
              color: current.text
            }}
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
          style={{
            ...styles.button,
            backgroundColor: current.buttonBg,
            color: current.buttonText,
            borderRadius: "12px",
            fontWeight: "600"
          }}
          onClick={handleGenerate}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = current.hoverBg)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = current.buttonBg)
          }
        >
          Generate Prompt
        </button>

        <div style={styles.formGroup}>
          <label style={{ ...styles.label, color: current.label }}>
            Generated Prompt
          </label>
          <div
            style={{
              ...styles.generatedOutput,
              backgroundColor: current.inputBg,
              borderColor: current.border,
              color: current.text,
              borderRadius: "12px",
              padding: "16px",
              minHeight: "100px"
            }}
          >
            {generatedPrompt || "Your generated prompt will appear here."}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  label: {
    fontWeight: "500"
  },
  input: {
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid",
    outline: "none",
    fontSize: "14px"
  },
  button: {
    padding: "12px 16px",
    border: "none",
    cursor: "pointer",
    fontSize: "15px"
  },
  generatedOutput: {
    border: "1px solid"
  }
};

export default CreatePrompt;