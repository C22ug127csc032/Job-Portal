import React, { useEffect, useState } from 'react';

function GetAllApplication() {
  const [applications, setApplications] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    setIsLoggedIn(true);

    const fetchApplications = async () => {
      try {
        const res = await fetch("http://localhost:3000/apply/all", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (res.ok) {
          setApplications(data.applications || []);
        } else {
          console.log("Error fetching applications:", data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6">Applications</h2>

      {!isLoggedIn ? (
        <p className="text-red-500 mb-6">
          Please login to view applications.
        </p>
      ) : applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {applications.map((app) => (
            <div key={app._id} className="bg-white p-4 rounded shadow">
              <p className="font-semibold text-lg">{app.job?.title}</p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Employer:</span> {app.job?.employer?.companyName || app.job?.employer?.name}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Location:</span> {app.job?.location}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Salary:</span> {app.job?.salary}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Applicant:</span> {app.user?.name} ({app.user?.email})
              </p>
              <p className="text-blue-600 font-medium">
                Status: {app.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GetAllApplication;
