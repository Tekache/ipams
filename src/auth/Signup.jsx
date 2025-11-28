import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (formData.username.trim() === "" || formData.password.trim() === "") {
      setError("All fields are required");
      return;
    }

    // Save user to localStorage
    localStorage.setItem("appUser", JSON.stringify(formData));

    alert("Signup successful!");
    navigate("/login");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h3 className="fw-bold mb-3">Create Account</h3>

      <div className="card-soft p-4">
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              className="form-control"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <button className="btn btn-primary w-100 mt-2" type="submit">
            Sign Up
          </button>

          <p className="mt-3 text-center">
            Already have an account?{" "}
            <span
              className="text-primary pointer"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
