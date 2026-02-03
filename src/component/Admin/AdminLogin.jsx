import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ theme = 'dark', onLogin }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (email.trim() === '' || password.trim() === '') {
      setError('Please enter your email and password.');
      return;
    }
    
    onLogin && onLogin({ email });
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#111827] flex items-center justify-center font-sans p-5">
      <div className="w-full max-w-[420px] bg-[#1f2937] rounded-2xl p-12 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)] border border-[#374151]">
        
        <div className="text-center mb-8">
          <h1 className="text-[28px] font-bold text-[#6366f1] mb-2 m-0">
            Admin Portal
          </h1>
          <p className="text-[#9ca3af] text-sm m-0">
            Secure Access for Management
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg text-sm mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-[#9ca3af] text-sm mb-2 font-medium">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@prompthub.com"
              className="w-full p-3 rounded-lg border border-[#374151] bg-[#374151] text-[#f9fafb] text-[15px] outline-none"
            />
          </div>

          <div className="mb-8">
            <label className="block text-[#9ca3af] text-sm mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 rounded-lg border border-[#374151] bg-[#374151] text-[#f9fafb] text-[15px] outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3.5 bg-[#6366f1] text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-colors hover:bg-indigo-600"
          >
            Authenticate
          </button>
        </form>

        <div className="mt-6 text-center">
          <span 
            onClick={() => navigate("/")}
            className="text-[#9ca3af] text-sm cursor-pointer underline hover:text-[#f9fafb]"
          >
            Return to User Login
          </span>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;