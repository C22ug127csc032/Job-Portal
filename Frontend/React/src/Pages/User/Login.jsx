import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://job-portal-omy9.onrender.com/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (!response.ok) {
        alert("Login failed: " + data.message);
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      const role = data.role?.trim().toLowerCase();

      if (role === "admin") {
        navigate("/admin-dashboard");
      } 
      else if (role === "employer") {
        navigate("/employer-dashboard");
      } 
      else {
        navigate("/");
      }
      setFormData({ email: "", password: "" });

    } catch (error) {
      console.error(error);
      alert("Server error. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email Address"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login;
