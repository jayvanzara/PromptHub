import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("user_name", data.name);
        navigate("/dashboard"); 
      } else {
        alert(data.error); 
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Server error. Make sure your Python backend is running!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-10 rounded-xl shadow-xl bg-gray-800 text-white">

        <div className="flex flex-col items-center mb-8">
          <div className="text-3xl font-semibold text-indigo-400">
            PromptHub
          </div>
          <div className="text-3xl font-semibold mt-2 text-white">
            Log In
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-indigo-600 font-semibold text-white
                       hover:bg-indigo-700 transition"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 flex flex-col items-center gap-2">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <button 
              onClick={() => navigate("/signup")}
              className="text-indigo-400 font-semibold hover:underline"
            >
              Sign Up
            </button>
          </p>

          <button 
            onClick={() => navigate("/admin/login")}
            className="text-sm text-gray-500 hover:text-indigo-400 transition"
          >
            Go to Admin Login
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;