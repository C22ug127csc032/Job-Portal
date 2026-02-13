import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function CreateUserProfile() {
  const navigate=useNavigate()
  const [formData, setformData] = useState({
    skills: "",
    education: "",
    location: "",
    resume: ""
  });

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const payload = {
    skills: formData.skills.split(",").map(skill => skill.trim()),
    education: formData.education,
    location: formData.location,
    resume: formData.resume
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const response = await fetch("https://job-portal-omy9.onrender.com/userprofile/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      setformData({
        skills: "",
        education: "",
        location: "",
        resume: ""
      });
      setTimeout(()=>{
        navigate("/")
      },1000)
    }  
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Create User Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="skills" value={formData.skills}  placeholder="Skills (React, Node, MongoDB)" required onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input type="text" name="education" value={formData.education} placeholder="Education" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>

          <input type="text" name="location" value={formData.location}  placeholder="Location" onChange={handleChange} aria-required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>

          <input type="text" name="resume" value={formData.resume} placeholder="Resume Link"  onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"> Create Profile</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUserProfile;
