import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../services/api";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }), 
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/"); 
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Failed to connect to backend:", error);
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
            Create Account
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-indigo-600 font-semibold text-white
                       hover:bg-indigo-700 transition mt-2"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <button 
              type="button"
              onClick={() => navigate("/")}
              className="text-indigo-400 font-semibold hover:underline"
            >
              Log In
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default SignUp;