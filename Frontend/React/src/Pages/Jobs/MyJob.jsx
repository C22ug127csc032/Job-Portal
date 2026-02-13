import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyJob() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("https://job-portal-omy9.onrender.com/job/my-job", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJob();
  }, []);
  const deleteJob=async(id)=>{
    const confirmDelete=window.confirm("Are you sure you want to delete this job?")
    if (!confirmDelete) return;
        try {
            const token=localStorage.getItem("token")
            const res=await fetch(`https://job-portal-omy9.onrender.com/job/${id}`,{
                method:"DELETE",
                headers:{
                     Authorization: `Bearer ${token}`,
                }
            })
            const data=await res.json()
            if(res.ok){
                alert("Job deleted successfully")
                setJobs(jobs.filter((job)=>job._id !==id))
            }
            else{
             alert(data.message)   

            }
            
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">
          My Jobs
        </h2>

        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white border rounded-xl shadow-sm p-5 mb-4 hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {job.title}
            </h3>

            <p className="text-gray-600 mb-1">
              <span className="font-medium">Location:</span> {job.location}
            </p>

            <p className="text-gray-600 mb-1">
              <span className="font-medium">Skills:</span> {job.skillsRequired}
            </p>

            <p className="text-gray-600 mb-1">
              <span className="font-medium">Job Type:</span> {job.jobType}
            </p>

            <p className="text-gray-600 mb-1">
              <span className="font-medium">Experience:</span> {job.experience}
            </p>

            <p className="text-gray-600 mb-1">
              <span className="font-medium">Salary:</span> {job.salary}
            </p>

            <p className="text-gray-600 mt-2">
              {job.description}
            </p>

            <button
              onClick={() => navigate(`/update-job/${job._id}`)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition" >Edit</button>
              <button onClick={() => (deleteJob(job._id))} className="mt-4 ml-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200" >Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyJob;
