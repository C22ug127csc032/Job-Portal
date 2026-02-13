import React, { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://job-portal-omy9.onrender.com/user/forgot-password",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      }
    );

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded">
        <h2 className="text-xl mb-4">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="border p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="bg-blue-600 text-white px-4 py-2 w-full">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
