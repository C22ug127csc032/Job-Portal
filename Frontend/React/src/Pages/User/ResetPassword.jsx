import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:3000/user/reset-password/${token}`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      }
    );

    const data = await res.json();
    alert(data.message);

    if (res.ok) 
        navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded">
        <h2 className="text-xl mb-4">Reset Password</h2>

        <input
          type="password"
          placeholder="New Password"
          className="border p-2 w-full mb-3"
          value={password}  onChange={(e) => setPassword(e.target.value)} required/>

        <button className="bg-blue-600 text-white px-4 py-2 w-full">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
