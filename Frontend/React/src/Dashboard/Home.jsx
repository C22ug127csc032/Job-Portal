import React, { useEffect, useState } from 'react'
import Navbar from "../Components/Navbar";
import { useNavigate } from 'react-router-dom';

function Home() {
  const [jobs,setJobs]=useState([])
const navigate=useNavigate()
  useEffect(()=>{
    const getAllJobs=async()=>{
      try {
        const res=await fetch("http://localhost:3000/job",{
          method:"GET",
          headers:{"Content-type":"application/json"}
        })
        const data=await res.json()
        setJobs(data.jobs)
        
      } catch (error) {
         console.log(error);
      }
    }
    
    getAllJobs()
  },[])
  const applyJob=async(jobId)=>{
    const token=localStorage.getItem("token")
    if (!token) {
    navigate("/signup"); 
    return;
  }
    try {
      const res=await fetch(`http://localhost:3000/apply/${jobId}`,{
        method:"POST",
        headers:{"content-Type":"application/json",
        Authorization: `Bearer ${token}`,
        }
      })
      const data=await res.json()
       if (!res.ok && data.message === "Please create profile before applying") {
      navigate("/create-profile");
      return;
    }

    if (data.success) {
      alert("Applied successfully");
      }else{
        navigate("/my-application")
      }
      
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
    <Navbar/>
        <div className="min-h-screen bg-gray-100 p-6">
      {jobs.map((job) => (
        <div key={job._id}className="bg-white p-6 mb-4 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>

          <p className="text-gray-600 mt-1">
            <span className="font-medium">Company:</span>{" "}
            {job.employer?.companyName}
          </p>

          <p className="text-gray-600">
            <span className="font-medium">Location:</span> {job.location}
          </p>

          <p className="text-gray-600">
            <span className="font-medium">Salary:</span> {job.salary}
          </p>
          <button
            onClick={() => applyJob(job._id)}
            className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Apply Now
          </button>
        </div>
      ))}
    </div>
    </>
  )
}

export default Home