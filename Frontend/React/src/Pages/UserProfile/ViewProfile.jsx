import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ViewProfile() {
    const [profile,setprofile]=useState(null)
    const[loading,setloading]=useState(true)
    const navigate=useNavigate()

    const token=localStorage.getItem("token")
    
    useEffect(()=>{
        const fetchProfile=async()=>{
            try {
                const res=await fetch("https://job-portal-omy9.onrender.com/userprofile/profile",{
                    method:"GET",
                    headers:{"Content-Type":"application/json",
                        Authorization:`Bearer ${token}`
                    }
                })
                    const data=await res.json()
                    console.log(data)
                    if(res.ok){
                        setprofile(data.profile)
                    }else{
                        alert(data.message || "profile not found")
                    }
            } catch (error) {
                console.error(error)
            }finally{
                setloading(false)
            }
        }
        fetchProfile()
    },[])
    if(loading){
        return(
            <div className="min-h-screen flex items-center justify-center">
            <p className="text-lg font-semibold">Loading profile...</p>
            </div>
        )
    }
    if(!profile){
        return(
             <div className="min-h-screen flex items-center justify-center">
             <p className="text-red-500">No profile found</p>
             </div>
        )
    }

  return (
    <>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800"> My Profile</h1>

        <div className="space-y-4">
          <div>
            <p className="text-gray-500 text-sm">Name</p>
            <p className="font-semibold">{profile.userId?.name}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="font-semibold">{profile.userId?.email}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Skills</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {profile.skills.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">{skill}</span>
                ))}
            </div>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Education</p>
            <p className="font-semibold">{profile.education}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Location</p>
            <p className="font-semibold">{profile.location}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Resume</p>
            <a href={profile.resume} target="_blank" rel="noreferrer" className="text-blue-600 underline font-semibold" >View Resume</a>
          </div>

        </div>
         <button onClick={() => navigate("/update-profile")} className="w-full mt-6 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition">Edit Profile</button>
      </div>
    </div>

    </>
  )
}

export default ViewProfile