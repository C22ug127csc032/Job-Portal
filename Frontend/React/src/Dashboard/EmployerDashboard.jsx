import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function EmployerNavbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [employerName, setEmployerName] = useState("");
  const [jobs, setEmployerJobs] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchEmployerProfile = async () => {
      if (!token) return;

      try {
        const res = await fetch("https://job-portal-omy9.onrender.com/employer/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setEmployerName(data.employer.name);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchEmployerJobs = async () => {
      if (!token) return;
      try {
        const res = await fetch("https://job-portal-omy9.onrender.com/job/my-job", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setEmployerJobs(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployerProfile();
    fetchEmployerJobs();
  }, [token]);

  const deleteJob = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://job-portal-omy9.onrender.com/job/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert("Job deleted successfully");
        setEmployerJobs(jobs.filter((job) => job._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <>
     
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

          <h1
            className="text-2xl font-bold text-green-600 cursor-pointer"
            onClick={() => navigate("/employer-dashboard")}
          >
            EmployerPortal
          </h1>
          {token && (
            <div className="hidden md:flex items-center gap-6 font-medium">
              <span className="text-gray-700">
                Hello, {employerName}
              </span>

              <button onClick={() => navigate("/employer-profile")}>
                View Profile
              </button>

              <button onClick={() => navigate("/employer-dashboard")}>
                My Jobs
              </button>

              <button onClick={() => navigate("/employer-application")}>
                Employer-Application
              </button>

              <button onClick={() => navigate("/create-job")}>
                Create Job
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </div>
          )}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
        {menuOpen && token && (
          <div className="md:hidden flex flex-col gap-4 px-6 pb-4 bg-white shadow-md">
            <span>Hello, {employerName}</span>

            <button
              onClick={() => {
                navigate("/employer-profile");
                setMenuOpen(false);
              }}
            >
              View Profile
            </button>

            <button
              onClick={() => {
                navigate("/employer-dashboard");
                setMenuOpen(false);
              }}
            >
              My Jobs
            </button>

            <button
              onClick={() => {
                navigate("/employer-application");
                setMenuOpen(false);
              }}
            >
              Employer-Application
            </button>

            <button
              onClick={() => {
                navigate("/create-job");
                setMenuOpen(false);
              }}
            >
              Create Job
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          {jobs.length === 0 && (
            <p className="text-center text-gray-600 text-lg mb-6">
              You have not created any jobs yet.
            </p>
          )}

          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white border rounded-xl shadow-sm p-5 mb-4"
            >
              <h3 className="text-xl font-semibold">{job.title}</h3>

              <p>Location: {job.location}</p>
              <p>Skills: {job.skillsRequired}</p>
              <p>Job Type: {job.jobType}</p>
              <p>Experience: {job.experience}</p>
              <p>Salary: {job.salary}</p>

              <p className="mt-2">{job.description}</p>

              <button
                onClick={() => navigate(`/update-job/${job._id}`)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={() => deleteJob(job._id)}
                className="mt-4 ml-3 bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default EmployerNavbar;
