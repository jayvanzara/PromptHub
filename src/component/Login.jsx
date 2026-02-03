import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    navigate("/dashboard"); // Navigate to dashboard after login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-10 rounded-xl shadow-xl bg-gray-800 text-white">

        {/* Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="text-3xl font-semibold text-indigo-400">
            PromptHub
          </div>
          <div className="text-3xl font-semibold mt-2 text-white">
            Log In
          </div>
        </div>

        {/* Form */}
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

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-600" />
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-grow h-px bg-gray-600" />
        </div>

        {/* Google Login */}
        <button
          className="w-full py-2 rounded-md border border-gray-600
                     flex items-center justify-center gap-3
                     bg-gray-900 hover:bg-gray-700 transition"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.1 1.54 7.5 2.83l5.46-5.46C33.14 3.69 28.9 1.5 24 1.5 14.73 1.5 6.91 6.88 3.69 14.64l6.35 4.93C11.64 13.09 17.4 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.1 24.5c0-1.54-.14-3.02-.41-4.45H24v8.42h12.5c-.54 2.9-2.16 5.36-4.59 7.04l7.07 5.49C43.91 36.84 46.1 31.13 46.1 24.5z"/>
            <path fill="#FBBC05" d="M10.04 28.57c-.5-1.49-.79-3.08-.79-4.72s.29-3.23.79-4.72l-6.35-4.93C2.05 17.02 1.5 20.45 1.5 24s.55 6.98 2.19 9.8l6.35-5.23z"/>
            <path fill="#34A853" d="M24 46.5c6.48 0 11.92-2.14 15.89-5.82l-7.07-5.49c-1.96 1.32-4.47 2.1-8.82 2.1-6.6 0-12.36-3.59-15.96-8.78l-6.35 5.23C6.91 41.12 14.73 46.5 24 46.5z"/>
          </svg>

          <span className="text-white font-medium">
            Continue with Google
          </span>
        </button>

        {/* Admin Navigation Link */}
        <div className="mt-6 text-center">
          <button 
            onClick={() => navigate("/admin/login")}
            className="text-sm text-gray-400 hover:text-indigo-400 transition"
          >
            Go to Admin Login
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;