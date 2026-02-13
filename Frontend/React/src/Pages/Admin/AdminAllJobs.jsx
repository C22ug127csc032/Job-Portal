import React, { useEffect, useState } from "react";
import AdminNavbar from "../../Components/AdminNavbar";

function AdminAllJobs() {
  const [allJobs, setAllJobs] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const fetchAllJobs = async () => {
    try {
      const res = await fetch("https://job-portal-omy9.onrender.com/job", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setAllJobs(data.jobs || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">All Approved Jobs</h2>

        {allJobs.length === 0 ? (
          <p>No jobs available.</p>
        ) : (
          allJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-5 mb-3 rounded-lg shadow"
            >
              <h3 className="text-lg font-semibold">{job.title}</h3>

              <p className="text-gray-600">
                Company:{" "}
                {job.employer?.companyName || job.employer?.name}
              </p>

              <p className="text-gray-600">
                Location: {job.location}
              </p>

              <p className="text-gray-600">
                Salary: {job.salary}
              </p>

              <p className="text-gray-600">
                Experience: {job.experience}
              </p>

              <p className="text-gray-600">
                Job Type: {job.jobType}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default AdminAllJobs;
