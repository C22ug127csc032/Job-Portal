import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function EmployerSignup() {
   const [formData,setformData]=useState({
        name:"",
        companyName:"",
        email:"",
        password:"",
        companyWebsite:"",
        location:"",
        industry:""
    })
    const handleChange=(e)=>{
      setformData({...formData,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
      e.preventDefault()

      const res=await fetch("http://localhost:3000/employer/register",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(formData)
      })
      const data=await res.json()
      console.log(data)
      if(res.ok){
        alert("Employer register successfully.Wait for Admin approval")
        Navigate("/employer-login")
      }

    }
  return (
    <>
    <div  className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div  className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Employer Signup</h1>
        <form onSubmit={handleSubmit}  className="space-y-4">
          <input type="text" name='name' placeholder='Name' value={formData.name} onChange={handleChange} required className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input type="text" name='companyName' placeholder='Company-Name' value={formData.companyName} required onChange={handleChange} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input type="text" name='email' placeholder='Email' value={formData.email} onChange={handleChange} required className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="password" name='password' placeholder='Password' value={formData.password} onChange={handleChange} required className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" name='companyWebsite' placeholder='Company-Website' value={formData.companyWebsite} onChange={handleChange} required className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input type="text" name='location' placeholder='Location' value={formData.location} onChange={handleChange} required className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" name='industry' placeholder='Industry' value={formData.industry} onChange={handleChange} required className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button type='submit'  className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Register</button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/employer-login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
    </>
  )
}

export default EmployerSignup