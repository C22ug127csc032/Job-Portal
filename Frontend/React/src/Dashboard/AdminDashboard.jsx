import React, { useEffect, useState } from "react";
import AdminNavbar from "../Components/AdminNavbar";

function AdminDashboard() {
  const [totalJobs, setTotalJobs] = useState(0);
  const [pendingJobs, setPendingJobs] = useState(0);

  useEffect(() => {
    fetchAllJobs();
    fetchPendingJobs();
  }, []);

  const fetchAllJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/job", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setTotalJobs(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPendingJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:3000/admin/pending-job",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setPendingJobs(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div style={{ padding: "20px" }}>
        <h2>Admin Dashboard</h2>

        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          
          <div style={cardStyle}>
            <h3>Total Jobs</h3>
            <h1>{totalJobs}</h1>
          </div>

          <div style={cardStyle}>
            <h3>Pending Jobs</h3>
            <h1>{pendingJobs}</h1>
          </div>

        </div>
      </div>
    </>
  );
}

const cardStyle = {
  background: "#f4f4f4",
  padding: "20px",
  borderRadius: "10px",
  width: "200px",
  textAlign: "center",
  boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
};

export default AdminDashboard;
