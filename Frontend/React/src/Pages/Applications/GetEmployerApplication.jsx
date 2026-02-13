import React, { useEffect, useState } from 'react';

function EmployerApplications() {
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
        const res = await fetch("https://job-portal-omy9.onrender.com/apply/employer", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) setApplications(data.applications || []);
        else console.log("Error fetching employer applications:", data.message);
      } catch (err) {
        console.log(err);
      }
    };

    fetchApplications();
  }, []);


  const updateStatus = async (applicationId, status) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://job-portal-omy9.onrender.com/apply/status/${applicationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );
      const data = await res.json();

      if (data.success) {
        setApplications(prev =>
          prev.map(app =>
            app._id === applicationId ? { ...app, status: status } : app)
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6">Applications for Your Jobs</h2>

      {!isLoggedIn ? (
        <p className="text-red-500 mb-6">Please login to view applications.</p>
      ) : applications.length === 0 ? (
        <p>No applications received yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {applications.map(app => (
            <div key={app._id} className="bg-white p-4 rounded shadow">
              <p className="font-semibold text-lg">{app.job?.title || "Job not found"}</p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Location:</span> {app.job?.location || "N/A"}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Salary:</span> {app.job?.salary || "N/A"}
              </p>

              <hr className="my-2" />

              <p className="text-gray-800 mb-1">
                <span className="font-medium">Applicant:</span> {app.userProfile?.name || app.user?.name || "N/A"} ({app.user?.email})
              </p>

              {app.userProfile && (
                <>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Skills:</span> {app.userProfile.skills?.join(", ") || "N/A"}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Education:</span> {app.userProfile.education || "N/A"}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Location:</span> {app.userProfile.location || "N/A"}
                  </p>
                  {app.userProfile.resume && (
                    <p className="text-gray-600 mb-1">
                      <span className="font-medium">Resume:</span>{" "}
                      <a href={app.userProfile.resume} target="_blank" className="text-blue-500 underline">View</a>
                    </p>
                  )}
                </>
              )}
              <p className="font-medium mb-2">Status:
                <span
                  className={`ml-2 px-2 py-1 rounded text-white text-sm ${app.status === "accepted"
                      ? "bg-green-500"
                      : app.status === "rejected"
                        ? "bg-red-500"
                        : app.status === "under review"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                    }`}
                >
                  {app.status}
                </span>
              </p>

              {app.status !== "accepted" && app.status !== "rejected" && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => updateStatus(app._id, "under review")}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Under Review
                  </button>

                  <button
                    onClick={() => updateStatus(app._id, "accepted")}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => updateStatus(app._id, "rejected")}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmployerApplications;
