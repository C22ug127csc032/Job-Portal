import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UpdateUserProfile() {
    const navigate=useNavigate()
    const [formData,setformData]=useState({
        skills:"",
        education:"",
        location:"",
        resume:""
    })
    const token=localStorage.getItem("token");

    useEffect(()=>{
       const fetchUserProfile=async()=>{
         const response=await fetch("http://localhost:3000/userprofile/profile",{
            method:"GET",
            headers:{"Content-Type":"application/json",
            Authorization:`Bearer ${token}`
            } 
        })
        const data=await response.json()
        if(response.ok){
            setformData({
            skills:data.profile.skills.join(","),
            education:data.profile.education || "",
            location:data.profile.location || "",
            resume:data.profile.resume || ""
        })
        }
       }
      fetchUserProfile();
    },[])
     const handleChange=(e)=>{
        setformData({...formData,[e.target.name]:e.target.value})
     }

     const payload={
        skills:formData.skills.split(",").map(skill=>skill.trim()),
        education:formData.education,
        location:formData.location,
        resume:formData.resume
     }
     const handleSubmit=async(e)=>{
        e.preventDefault()

        const res=await fetch("http://localhost:3000/userprofile/profile",{
            method:"PUT",
            headers:{"Content-Type":"application/json",
                Authorization:`Bearer ${token}`           
            },
            body:JSON.stringify(payload)  
        })
        const data=await res.json()
        console.log(data)
        if(res.ok){
         setTimeout(()=>{
            navigate("/view-profile")
         },1000)
        }
     }
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Update profile</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="skills" placeholder="Skills (React, Node, MongoDB)" value={formData.skills}  onChange={handleChange}  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                <input type="text" name='education' placeholder='Education' value={formData.education} onChange={handleChange}  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                <input type="text" name='location' placeholder='Location' value={formData.location} onChange={handleChange}  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                <input type="text" name='resume' placeholder='Resume' value={formData.resume} onChange={handleChange}  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition">Update Profile</button>
            </form>
        </div>

    </div>
    </>
  )
}

export default UpdateUserProfile