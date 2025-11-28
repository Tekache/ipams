// src/components/AddIP.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const AddIP = () => {
  const navigate = useNavigate();
  const { addIP } = useAppContext();

  const [formData, setFormData] = useState({
    address: "",
    device: "",
    status: "Available",
    notes: "",
  });

  const [error, setError] = useState("");

  const autoAssignIP = () => {
    const base = "192.168.1.";
    const next = Math.floor(Math.random() * 200) + 10;
    setFormData({ ...formData, address: base + next });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.address || formData.address.trim() === "") {
      setError("IP Address is required");
      return;
    }

    const payload = {
      ...formData,
      dateAdded: new Date().toISOString(),
    };

    try {
      await addIP(payload);
      alert("IP added successfully");
      navigate("/");
    } catch (err) {
      console.error("Add IP failed:", err);
      alert("Failed to add IP. Check console.");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 700 }}>
      <h3 className="fw-bold mb-3">Add New IP Address</h3>
      <div className="card-soft p-4">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">IP Address</label>
            <div className="d-flex gap-2">
              <input
                type="text"
                className="form-control"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
              <button type="button" className="btn btn-outline-primary" onClick={autoAssignIP}>Auto</button>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Device Name</label>
            <input
              type="text"
              className="form-control"
              value={formData.device}
              onChange={(e) => setFormData({ ...formData, device: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Status</label>
            <select className="form-select" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
              <option>Available</option>
              <option>Assigned</option>
              <option>Reserved</option>
              <option>Down</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Notes</label>
            <textarea className="form-control" rows="3" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })}></textarea>
          </div>

          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/")}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save IP</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIP;
