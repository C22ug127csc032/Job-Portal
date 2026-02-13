import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function UpdateJob() {
    const {id}=useParams()
    const navigate=useNavigate()
    const [loading,setloading]=useState(false)
    const[formData,setFormData]=useState({
        title: "",
        description: "",
        location: "",
        skillsRequired: "",
        jobType: "",
        experience: "",
        salary: "",
    })
    useEffect(()=>{
        const fetchJob=async()=>{
            try {
                const res=await fetch(`https://job-portal-omy9.onrender.com/job/${id}`)
                const data=await res.json()
                if (res.ok) {
                setFormData({
                    title: data.job.title,
                    description: data.job.description,
                    location: data.job.location,
                    skillsRequired: data.job.skillsRequired,
                    jobType: data.job.jobType,
                    experience: data.job.experience,
                    salary: data.job.salary
                });
               }
                
            } catch (error) {
                console.log(error);
            }finally {
      setloading(false);
      }
        }
        fetchJob();
    },[id])

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleUpdate=async(e)=>{
        e.preventDefault()
    try {
         const token=localStorage.getItem("token")
      const res= await fetch(`https://job-portal-omy9.onrender.com/job/${id}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json",
                authorization:`Bearer ${token}`
            },
            body:JSON.stringify(formData)
        })
        const data=await res.json()
        if (res.ok) {
          alert("Job updated successfully");
          navigate("/");
         } else {
          alert(data.message);
         }
        
    } catch (error) {
        console.log(error);
    }
    }
    if (loading) return <p className="text-center mt-10">Loading...</p>;
  return (
    <>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
            <h1 className="text-3xl font-bold text-center mb-6">Update Job</h1>
            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <input type="text" name='title' value={formData.title} required placeholder='Job Name' onChange={handleChange}  className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                 <input type="text" name='location' value={formData.location} required placeholder='Location' onChange={handleChange}  className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                 <input type="text" name='skillsRequired' value={formData.skillsRequired} required placeholder='Skills' onChange={handleChange}  className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                 <input type="text" name='jobType' value={formData.jobType} required placeholder='Job Type' onChange={handleChange}  className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                 <input type="text" name='experience' value={formData.experience} required placeholder='Experience' onChange={handleChange}  className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                 <input type="text" name='salary' value={formData.salary} required placeholder='Salary' onChange={handleChange}  className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                 <textarea name="description" placeholder='Description 'value={formData.description} required onChange={handleChange}  className="border rounded-lg p-3 md:col-span-2 h-28 focus:outline-none focus:ring-2 focus:ring-blue-500"/> 
                 <button type='submit'  className="md:col-span-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">update</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default UpdateJob