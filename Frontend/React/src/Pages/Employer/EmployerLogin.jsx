import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function EmployerLogin() {
    const navigate=useNavigate()
    const[formData,setformData]=useState({
        email:"",
        password:""
    })
    const handleChange=(e)=>{
        setformData({...formData,[e.target.name]:e.target.value})
    }
    const handleSubmit=async (e)=>{
        e.preventDefault()

        const res=await fetch("https://job-portal-omy9.onrender.com/employer/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(formData)
        })
        const data=await res.json()
        
        if(res.ok){
            localStorage.setItem("token",data.token)
            setformData({
                email:"",
                password:""
            })
            setTimeout(()=>{
                navigate("/employer-dashboard")
            },1000)
        }
    }
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name='email' placeholder='Email'required value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="password"  name='password' placeholder='Password' required value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <div className="text-right"><Link to="/employer-forgot-password" className="text-sm text-blue-600 hover:underline">Forgot Password?</Link>
            </div>
                <button type='submit' className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"  >Login</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default EmployerLogin