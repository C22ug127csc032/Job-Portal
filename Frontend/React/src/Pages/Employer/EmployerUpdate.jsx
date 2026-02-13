import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function EmployerUpdate() {
    const[formData,setformData]=useState({
        name:"",
        companyName:"",
        companyWebsite:"",
        location:"",
        industry:""

    })
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
                setformData(data.employer)
                
            } catch (error) {
                console.error(error)
            }
        }
        fetchProfile()
    },[])
    const handleChange=(e)=>{
        setformData({...formData,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const res=await fetch("http://localhost:3000/employer/profile",{
            method:"PUT",
            headers:{"Content-Type":"application/json",
                authorization:`Bearer ${token}`
            },
            body:JSON.stringify(formData)
        })
        const data= await res.json()
        if(res.ok){
            alert("Profile updated successfully")
        }
    }
  return (
    <>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
            <h1 className="text-2xl font-bold text-center mb-6">Update Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name='name' value={formData.name} placeholder='Name' onChange={handleChange}  className="w-full border rounded-lg px-3 py-2"/>
                <input type="text" name='companyName' value={formData.companyName} placeholder='company-Name' onChange={handleChange}  className="w-full border rounded-lg px-3 py-2"/>
                <input type="text" name='companyWebsite' value={formData.companyWebsite} placeholder='Company-Website' onChange={handleChange}  className="w-full border rounded-lg px-3 py-2"/>
                <input type="text" name='location' value={formData.location} placeholder='Location' onChange={handleChange}  className="w-full border rounded-lg px-3 py-2" />
                <input type="text" name='industry' value={formData.industry} placeholder='Industry' onChange={handleChange}  className="w-full border rounded-lg px-3 py-2" />
                <button type='submit' className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Update</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default EmployerUpdate