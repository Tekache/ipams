import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("appUser"));

    if (!savedUser) {
      setError("No user found, please sign up first.");
      return;
    }

    if (
      formData.username === savedUser.username &&
      formData.password === savedUser.password
    ) {
      localStorage.setItem("loggedIn", "true");
      alert("Login successful!");
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h3 className="fw-bold mb-3">Login</h3>

      <div className="card-soft p-4">
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
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
            Login
          </button>

          <p className="mt-3 text-center">
            Don't have an account?{" "}
            <span
              className="text-primary pointer"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/signup")}
            >
              Create one
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
