import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [hasProfile, setHasProfile] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [menuOpen, setMenuOpen] = useState(false); 

  useEffect(() => {
    const checkProfile = async () => {
      if (!token) return;
      try {
        const res = await fetch("http://localhost:3000/userprofile/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        setHasProfile(res.ok);
      } catch (error) {
        console.log(error);
        setHasProfile(false);
      }
    };
    checkProfile();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        <h1
          className="text-2xl font-bold text-green-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          JobPortal
        </h1>

        <div className="hidden md:flex items-center gap-6 font-medium">
          <Link to="/" className="hover:text-green-600 transition">
            Home
          </Link>

          {token && (
            <Link to="/my-application" className="hover:text-green-600 transition">
              Applied Jobs
            </Link>
          )}

          {token && (
            <button
              onClick={() =>
                navigate(hasProfile ? "/view-profile" : "/create-profile")
              }
              className="hover:text-green-600 transition"
            >
              {hasProfile ? "View Profile" : "Create Profile"}
            </button>
          )}
        </div>
        <div className="hidden md:flex items-center gap-3">
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/signup")}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Job Seeker
              </button>
              <button
                onClick={() => navigate("/employer-signup")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Employer
              </button>
            </>
          )}
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4 font-medium bg-white shadow-md">

          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          {token && (
            <>
              <Link
                to="/my-application"
                onClick={() => setMenuOpen(false)}
              >
                Applied Jobs
              </Link>

              <button
                onClick={() => {
                  navigate(hasProfile ? "/view-profile" : "/create-profile");
                  setMenuOpen(false);
                }}
                className="text-left"
              >
                {hasProfile ? "View Profile" : "Create Profile"}
              </button>

              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          )}

          {!token && (
            <>
              <button
                onClick={() => {
                  navigate("/signup");
                  setMenuOpen(false);
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Job Seeker
              </button>

              <button
                onClick={() => {
                  navigate("/employer-signup");
                  setMenuOpen(false);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Employer
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
