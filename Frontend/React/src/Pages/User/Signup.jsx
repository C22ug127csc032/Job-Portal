import React, { useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom'

function Signup() {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const navigate=useNavigate()

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch("https://job-portal-omy9.onrender.com/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })

    const data = await response.json()
    console.log(data)

    if (response.ok) {
      alert("User registered successfully")
      setformData({ name: "", email: "", password: "" })
      setTimeout(()=>{
        navigate("/")
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" value={formData.name} placeholder="Full Name" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input type="email" name="email" value={formData.email} placeholder="Email Address" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input type="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">Sign Up</button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account? <span className="text-blue-600 cursor-pointer"><Link to="/login">Login</Link></span>
        </p>

      </div>
    </div>
  )
}

export default Signup
