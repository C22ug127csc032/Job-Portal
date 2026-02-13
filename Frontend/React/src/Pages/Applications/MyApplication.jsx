import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function MyApplication() {
      const [application,setApplications]=useState([])
      const [isLoggedIn,setIsLoggedIn]=useState(false)

      useEffect(()=>{
        const token = localStorage.getItem("token");

     if (!token) {
      setIsLoggedIn(false);
      return;
    }

    setIsLoggedIn(true);
         const getMyApplication=async()=>{
      try {
        const token=localStorage.getItem("token")
        const res=await fetch("http://localhost:3000/apply",{
          method:"GET",
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        const data=await res.json()
        if(res.ok){
          setApplications(data.applications)
        }
      } catch (error) {
        console.log(error);
      }
    }
    getMyApplication()
      },[])
  return (
    <>
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">My Applications</h2>
      {!isLoggedIn ? (
        <p className="text-red-500 mb-6">
          Please login to view your applications
        </p>
      ) : application.length === 0 ? (
        <p className="mb-6">No applications yet</p>
      ) : (
        <div className="mb-8">
          {application.map((app)=>(
            <div key={app._id}
              className="bg-white p-4 mb-2 rounded shadow">
              <p className="font-semibold">{app.job?.title}</p>
              <p className="text-gray-600">
                {app.job?.employer?.companyName}
              </p>
            </div>
          ))}
          <button className="mt-4"><Link to='/' className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200" >Back</Link> </button>
        </div>
      )}
        </div>
    </>
  )
}

export default MyApplication