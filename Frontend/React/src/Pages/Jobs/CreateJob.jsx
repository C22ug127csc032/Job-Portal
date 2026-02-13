import React from 'react'
import { useState } from 'react'

function CreateJob() {
    const [formData,setFormData]=useState({
        title:"",
        description:"",
        location:"",
        skillsRequired:"",
        jobType:"",
        experience:"",
        salary:""
    })
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
   
    const handleSubmit=async(e)=>{
        e.preventDefault()
         const token=localStorage.getItem("token")
        const res=await fetch("http://localhost:3000/job/",{
            method:"POST",
            headers:{"Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify(formData)
        })
        const data=await res.json()
        if(res.ok){
            alert("Job created successfully.Wait for the approve")
            setFormData({
                title:"",
                description:"",
                location:"",
                skillsRequired:"",
                jobType:"",
                experience:"",
                salary:""
            })
        }
    }
  return (
    <>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
            <h1 className="text-3xl font-bold text-center mb-6">Create Job</h1>
            <form onSubmit={handleSubmit}  className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name='title' value={formData.title} required placeholder='Job Name' onChange={handleChange}  className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="text" name='location' value={formData.location} required placeholder='Location' onChange={handleChange}  className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <input type="text" name='skillsRequired' value={formData.skillsRequired} required placeholder='Skills' onChange={handleChange}  className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="text" name='jobType' value={formData.jobType} required placeholder='Job Type' onChange={handleChange}  className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <input type="text" name='experience' value={formData.experience} required placeholder='Experience' onChange={handleChange}  className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="text" name='salary' value={formData.salary} required placeholder='Salary' onChange={handleChange}  className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <textarea name="description" placeholder='Description 'value={formData.description} required onChange={handleChange}  className="border rounded-lg p-3 md:col-span-2 h-28 focus:outline-none focus:ring-2 focus:ring-blue-500"/> 
            <button type='submit'  className="md:col-span-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">Create</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default CreateJob