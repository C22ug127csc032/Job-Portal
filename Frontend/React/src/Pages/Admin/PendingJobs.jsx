import React, { useEffect, useState } from "react";
import AdminNavbar from "../../Components/AdminNavbar";

function PendingJobs() {
  const [pendingJobs, setPendingJobs] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPendingJobs();
  }, []);

  const fetchPendingJobs = async () => {
    const res = await fetch(
      "http://localhost:3000/admin/pending-job",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();
    setPendingJobs(data.jobs || []);
  };

  const approveJob = async (id) => {
    await fetch(`http://localhost:3000/admin/approve/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchPendingJobs();
  };

  return (
    <>
      <AdminNavbar />

      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Pending Jobs</h2>

        {pendingJobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-4 mb-2 rounded shadow flex justify-between"
          >
            <div>
              <p className="font-semibold">{job.title}</p>
              <p>{job.employer?.companyName}</p>
            </div>

            <button
              onClick={() => approveJob(job._id)}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Approve
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default PendingJobs;
