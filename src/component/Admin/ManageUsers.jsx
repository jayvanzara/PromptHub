import React from "react";

const ManageUsers = ({ theme = "dark" }) => {
  const isDark = theme === "dark";
  const users = [
    { id: 1, name: "Jay Vanzara", email: "jay@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Sarah Smith", email: "sarah@test.com", role: "User", status: "Active" },
    { id: 3, name: "Mike Johnson", email: "mike@demo.com", role: "User", status: "Inactive" },
  ];

  return (
    <div>
      <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-[#e5e7eb]' : 'text-gray-900'}`}>User Management</h2>
      <div className={`rounded-xl border overflow-hidden
        ${isDark ? 'bg-[#1e293b] border-[#334155]' : 'bg-white border-gray-200'}`}>
        <table className={`w-full border-collapse ${isDark ? 'text-[#e5e7eb]' : 'text-gray-900'}`}>
          <thead className={isDark ? 'bg-[#111827]' : 'bg-gray-50'}>
            <tr>
              {["Name", "Email", "Role", "Status", "Actions"].map((head, i) => (
                <th key={i} className={`p-4 text-left text-sm ${i === 4 ? 'text-right' : ''} ${isDark ? 'text-[#9ca3af]' : 'text-gray-500'}`}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className={`border-t ${isDark ? 'border-[#334155]' : 'border-gray-200'}`}>
                <td className="p-4 font-medium">{user.name}</td>
                <td className={`p-4 ${isDark ? 'text-[#9ca3af]' : 'text-gray-500'}`}>{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${user.status === "Active" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="mr-2 border-none bg-none text-[#6366f1] cursor-pointer hover:underline">Edit</button>
                  <button className="border-none bg-none text-red-500 cursor-pointer hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;