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

  return (
    <div className={`min-h-screen p-6 box-border ${isDark ? 'bg-[#181e2a]' : 'bg-white'}`}>
      <div className={`max-w-[820px] rounded-[18px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.35)]
        ${isDark ? 'bg-[#181e2a] text-[#e5e7eb]' : 'bg-white text-gray-900'}`}>
        
        <h1 className="text-[26px] font-bold mb-6 m-0">Profile</h1>

        <div className="flex items-center gap-5">
          <div className="w-[72px] h-[72px] rounded-full bg-[#6366f1] flex items-center justify-center text-[28px] font-bold text-white">
            J
          </div>
          <div>
            <div className="text-lg font-semibold">{user.name}</div>
            <div className={`text-sm ${isDark ? 'text-[#9ca3af]' : 'text-gray-500'}`}>@{user.username}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 mt-7">
          {["name", "email", "phone"].map(field => (
            <div key={field}>
              <div className={`text-xs mb-1.5 ${isDark ? 'text-[#9ca3af]' : 'text-gray-500'}`}>
                {field === "name" ? "Full Name" : field === "email" ? "Email" : "Phone Number"}
              </div>
              <input
                value={user[field]}
                disabled={!isEditing}
                onChange={e => handleChange(field, e.target.value)}
                className={`w-full p-2.5 rounded-lg border outline-none
                  ${isDark ? 'border-[#232a3d]' : 'border-gray-200'}
                  ${isEditing 
                    ? (isDark ? 'bg-[#1f2937] text-[#e5e7eb]' : 'bg-white text-gray-900') 
                    : 'bg-transparent text-inherit'
                  }`}
              />
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-7">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-5 py-2.5 rounded-lg bg-[#6366f1] text-white font-semibold border-none cursor-pointer hover:bg-indigo-600 transition-colors"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-5 py-2.5 rounded-lg bg-[#6366f1] text-white font-semibold border-none cursor-pointer hover:bg-indigo-600 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className={`px-5 py-2.5 rounded-lg border bg-transparent cursor-pointer
                  ${isDark ? 'border-[#232a3d] text-[#e5e7eb]' : 'border-gray-200 text-gray-900'}`}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;