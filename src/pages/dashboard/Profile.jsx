import React, { useState, useEffect } from "react";
import BASE_URL from "../../services/api";

const Profile = ({ theme }) => {
  const isDark = theme === "dark";
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const [user, setUser] = useState({
    name: "", email: "", phone: "", username: "", prompt_count: 0, created_at: "",
  });

  const [savedUser, setSavedUser] = useState({
    name: "", email: "", phone: "", username: "", prompt_count: 0, created_at: "",
  });

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`${BASE_URL}/api/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          const cleanData = {
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            username: data.username || "",
            prompt_count: data.prompt_count || 0,
            created_at: data.created_at || "",
          };
          setUser(cleanData);
          setSavedUser(cleanData);
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  const validate = () => {
    const newErrors = {};
    if (!user.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (user.name.trim().length > 50) {
      newErrors.name = "Name cannot exceed 50 characters.";
    }
    if (user.username.trim().length > 30) {
      newErrors.username = "Username cannot exceed 30 characters.";
    } else if (user.username && /[^a-zA-Z0-9_]/.test(user.username)) {
      newErrors.username = "Only letters, numbers, and underscores allowed.";
    }
    if (user.phone && user.phone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const hasChanges = () =>
    user.name !== savedUser.name ||
    user.username !== savedUser.username ||
    user.phone !== savedUser.phone;

  const handleSave = async () => {
    if (!validate()) return;
    if (!hasChanges()) { setIsEditing(false); return; }
    setSaveStatus("saving");
    try {
      const response = await fetch(`${BASE_URL}/api/user/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        setSaveStatus("success");
        setSavedUser(user);
        localStorage.setItem("user_name", user.name);
        setTimeout(() => { setSaveStatus("idle"); setIsEditing(false); }, 1500);
      } else {
        alert("Failed to update profile.");
        setSaveStatus("idle");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setSaveStatus("idle");
    }
  };

  const handleCancel = () => { setUser(savedUser); setErrors({}); setIsEditing(false); };

  const handleChange = (key, value) => {
    if (key === "phone") {
      const numeric = value.replace(/\D/g, "");
      if (numeric.length > 10) return;
      setUser({ ...user, [key]: numeric });
    } else {
      setUser({ ...user, [key]: value });
    }
    if (errors[key]) setErrors({ ...errors, [key]: "" });
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
  };

  const formatPhone = (phone) => {
    if (!phone) return "Not set";
    if (phone.length === 10) return `${phone.slice(0, 5)} ${phone.slice(5)}`;
    return phone;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const FieldIcon = ({ path }) => (
    <svg className={`w-4 h-4 ${isDark ? "text-[#6366f1]" : "text-indigo-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );

  const fields = [
    {
      key: "name", label: "Full Name", disabled: !isEditing, maxLength: 50,
      placeholder: isEditing ? "Enter your full name" : "Not set",
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
      value: user.name,
    },
    {
      key: "username", label: "Username", disabled: !isEditing, maxLength: 30,
      placeholder: isEditing ? "e.g. john_doe" : "Not set",
      icon: "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z",
      value: user.username,
    },
    {
      key: "phone", label: "Phone Number", disabled: !isEditing,
      placeholder: isEditing ? "e.g. 9876543210" : "Not set",
      icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
      value: isEditing ? user.phone : formatPhone(user.phone),
    },
    {
      key: "email", label: "Email Address", disabled: true,
      placeholder: "Not set",
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      value: user.email,
      hint: "Email address cannot be changed.",
    },
  ];

  const btnBase = "h-10 px-5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2";
  const primaryBtn = "bg-[#6366f1] text-white hover:bg-indigo-500 border-none shadow-lg shadow-indigo-500/25";
  const successBtn = "bg-green-500 text-white cursor-default border-none";
  const secondaryBtn = isDark
    ? "bg-transparent border border-[#374151] text-[#e5e7eb] hover:bg-[#181e2a]"
    : "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100";

  if (loading) {
    return (
      <div className={`w-full min-h-full flex items-center justify-center ${isDark ? "bg-[#181e2a]" : "bg-gray-50"}`}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#6366f1] border-t-transparent animate-spin" />
          <p className={`text-sm font-bold uppercase tracking-widest ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Loading Profile
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full min-h-full ${isDark ? "bg-[#181e2a]" : "bg-gray-50"}`}>

      <div className="w-full relative overflow-hidden"
        style={{
          background: isDark
            ? "linear-gradient(135deg, #1e1b4b 0%, #2d1d6e 50%, #0f172a 100%)"
            : "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #4338ca 100%)"
        }}>

        <div className="absolute -top-8 -left-8 w-56 h-56 rounded-full opacity-20 blur-3xl bg-indigo-400" />
        <div className="absolute -bottom-8 right-16 w-44 h-44 rounded-full opacity-20 blur-3xl bg-purple-400" />
        <div className="absolute top-4 right-40 w-28 h-28 rounded-full opacity-10 blur-2xl bg-blue-300" />

        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "radial-gradient(circle at 1.5px 1.5px, white 1.5px, transparent 0)", backgroundSize: "28px 28px" }} />

        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />

        <div className="relative max-w-5xl mx-auto px-8 py-6">

          <div className="flex items-center gap-5">
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black shadow-2xl border-4 border-white/20 bg-white/10 backdrop-blur-sm text-white">
                {getInitials(savedUser.name)}
              </div>
              <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-white/30" />
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-black text-white leading-tight truncate">
                {savedUser.name || "User"}
              </h1>
              <p className="text-sm font-semibold text-white/60 mt-0.5 truncate">
                @{savedUser.username || "username"}
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-5">
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-black text-white leading-none">{savedUser.prompt_count}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mt-0.5">Prompts Created</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-black text-white leading-none">{formatDate(savedUser.created_at)}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mt-0.5">Member Since</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-6">
        <div className={`rounded-3xl border overflow-hidden ${isDark ? "bg-[#1e293b] border-[#374151]" : "bg-white border-gray-200 shadow-sm"}`}>

          <div className={`px-8 py-4 border-b flex items-center justify-between ${isDark ? "border-[#374151] bg-[#181e2a]" : "border-gray-100 bg-gray-50"}`}>
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? "bg-[#6366f1]/20" : "bg-indigo-50"}`}>
                <svg className={`w-4 h-4 ${isDark ? "text-[#818cf8]" : "text-indigo-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className={`text-xs font-bold uppercase tracking-widest ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                Personal Details
              </h3>
            </div>

            <div className="flex gap-2">
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className={`${btnBase} ${secondaryBtn}`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2a2 2 0 01.586-1.414z" />
                  </svg>
                  Edit Profile
                </button>
              ) : (
                <>
                  <button onClick={handleCancel} className={`${btnBase} ${secondaryBtn}`}>
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saveStatus === "success"}
                    className={`${btnBase} ${saveStatus === "success" ? successBtn : primaryBtn}`}>
                    {saveStatus === "saving" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : saveStatus === "success" ? (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Saved!
                      </>
                    ) : "Save Changes"}
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {fields.map(({ key, label, disabled, maxLength, placeholder, icon, value, hint }) => (
              <div key={key}>
                <label className={`flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest
                  ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  <FieldIcon path={icon} />
                  {label}
                </label>
                <div className={`rounded-2xl transition-all
                  ${isEditing && !disabled ? "shadow-[0_0_0_2px_#6366f1]" : ""}
                  ${errors[key] ? "shadow-[0_0_0_2px_#ef4444]" : ""}`}>
                  <input
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleChange(key, e.target.value)}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    className={`w-full h-14 rounded-2xl border-none outline-none text-[15px] font-semibold px-4 transition-all
                      ${isDark ? "text-white" : "text-gray-900"}
                      ${disabled
                        ? (isDark ? "bg-[#0f172a] text-gray-500 cursor-not-allowed" : "bg-gray-100 text-gray-400 cursor-not-allowed")
                        : (isDark ? "bg-[#181e2a]" : "bg-gray-50")
                      }`}
                  />
                </div>
                {errors[key] && (
                  <p className="text-red-500 text-xs mt-1.5 font-semibold flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors[key]}
                  </p>
                )}
                {hint && !errors[key] && (
                  <p className={`text-[11px] mt-1.5 font-semibold ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                    {hint}
                  </p>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
};

export default Profile;