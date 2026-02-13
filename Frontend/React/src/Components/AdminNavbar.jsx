import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <h1
          className="text-2xl font-bold text-green-600 cursor-pointer"
          onClick={() => navigate("/admin-dashboard")}
        >
          Admin Dashboard
        </h1>
        <div className="hidden md:flex gap-6 font-medium items-center">
          <Link to="/admin-all-job" className="hover:text-green-600">
            All Jobs
          </Link>

          <Link to="/admin-pending-job" className="hover:text-green-600">
            Approve Jobs
          </Link>

          <Link to="/all-application" className="hover:text-green-600">
            All-Application
          </Link>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 font-medium">
          <Link
            to="/admin-all-job"
            onClick={() => setMenuOpen(false)}
            className="hover:text-green-600"
          >
            All Jobs
          </Link>

          <Link
            to="/admin-pending-job"
            onClick={() => setMenuOpen(false)}
            className="hover:text-green-600"
          >
            Approve Jobs
          </Link>

          <Link
            to="/all-application"
            onClick={() => setMenuOpen(false)}
            className="hover:text-green-600"
          >
            All-Application
          </Link>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-full"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default AdminNavbar;
