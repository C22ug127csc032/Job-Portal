import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function EmployerProfile() {
    const[employer,setemployer]=useState(null)
    const navigate=useNavigate()

    const token=localStorage.getItem("token")
    useEffect(()=>{
        const fetchProfile=async()=>{
        try {
            const res=await fetch("http://localhost:3000/employer/profile",{
                method:"GET",
                headers:{"Content-Type":"application/json",
                    authorization:`Bearer ${token}`
                }
    
            })
            const data=await res.json()
            if(res.ok){
                setemployer(data.employer)
            }
            
        } catch (error) {
        console.error(error)
            
        }
    }
    fetchProfile()

    },[])
    if(!employer){
    return <p className="text-center mt-10">Loading...</p>;
  }
    
  return (
    <>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
            <h1 className="text-2xl font-bold text-center mb-6">Employer Profile</h1>
            
           <div className="space-y-3">     
          <p><span className="font-semibold">Name:</span> {employer.name}</p>

          <p><span className="font-semibold">Email:</span> {employer.email}</p>

          <p><span className="font-semibold">Company:</span> {employer.companyName}</p>

          <p><span className="font-semibold">Website:</span> {employer.companyWebsite}</p>

          <p><span className="font-semibold">Location:</span> {employer.location}</p>

          <p><span className="font-semibold">Industry:</span> {employer.industry}</p>

          <p>
            <span className="font-semibold">Joined:</span>{" "}
            {new Date(employer.createdAt).toLocaleDateString()}</p>
            </div>

            <button onClick={() => navigate("/employer-update")} className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Update Profile</button>
        </div>
    </div>

    </>
  )
}

export default EmployerProfile