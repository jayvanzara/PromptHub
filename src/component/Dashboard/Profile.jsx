import React, { useState } from "react";

const Profile = ({ theme }) => {
  const isDark = theme === "dark";
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "Jay Vanzara",
    email: "jay@example.com",
    phone: "+91 9XXXXXXXXX",
    username: "jayvanzara"
  });

  const handleChange = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  const inputClass = `w-full p-3 rounded-lg border outline-none text-[15px] transition-all font-medium
    ${isDark ? 'border-[#374151]' : 'border-gray-200'}
    ${isEditing 
      ? (isDark ? 'bg-[#1e293b] text-[#e5e7eb] focus:border-[#6366f1]' : 'bg-white text-gray-900 focus:border-indigo-500 shadow-sm') 
      : `bg-transparent border-transparent px-0 ${isDark ? 'text-[#e5e7eb]' : 'text-gray-900'}`
    }`;

  return (
    <div className={`w-full min-h-full p-8 ${isDark ? 'bg-[#181e2a]' : 'bg-transparent'}`}>
      
      <div className="flex items-center gap-6 mb-10">
        <div className="w-[80px] h-[80px] rounded-full bg-[#6366f1] flex items-center justify-center text-3xl font-bold text-white">
          {user.name.charAt(0)}
        </div>
        <div>
          <h1 className={`text-2xl font-bold m-0 ${isDark ? 'text-[#e5e7eb]' : 'text-gray-900'}`}>
            {user.name}
          </h1>
          <p className={`mt-1 text-sm ${isDark ? 'text-[#9ca3af]' : 'text-gray-500'}`}>
            @{user.username} • Student Developer
          </p>
        </div>
      </div>

      <div className="max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {["name", "email", "phone", "username"].map((field) => (
          <div key={field}>
            <label className={`block text-xs uppercase tracking-wider font-semibold mb-2 
              ${isDark ? 'text-[#6366f1]' : 'text-indigo-600'}`}>
              {field === "name" ? "Full Name" : field === "email" ? "Email Address" : field === "phone" ? "Phone Number" : "Username"}
            </label>
            <input
              value={user[field]}
              disabled={!isEditing}
              onChange={e => handleChange(field, e.target.value)}
              className={inputClass}
            />
          </div>
        ))}
      </div>

      <div className={`flex gap-4 border-t pt-8 ${isDark ? 'border-[#374151]' : 'border-gray-200'}`}>
        {!isEditing ? (
          // ✅ FIXED: Removed shadow-lg. Flat button.
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2.5 rounded-lg bg-[#6366f1] text-white font-semibold border-none cursor-pointer hover:bg-indigo-600 transition-colors"
          >
            Edit Profile
          </button>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(false)}
              className="px-6 py-2.5 rounded-lg bg-[#6366f1] text-white font-semibold border-none cursor-pointer hover:bg-indigo-600 transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className={`px-6 py-2.5 rounded-lg border bg-transparent cursor-pointer font-medium transition-colors
                ${isDark 
                  ? 'border-[#374151] text-[#e5e7eb] hover:bg-[#374151]' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-200'}`}
            >
              Cancel
            </button>
          </>
        )}
      </div>

    </div>
  );
};

export default Profile;