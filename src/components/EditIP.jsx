// src/components/EditIP.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const EditIP = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ipList, updateIP, loading } = useAppContext();

  const [formData, setFormData] = useState({
    address: "",
    device: "",
    status: "Available",
    notes: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading) {
      const selected = ipList.find((item) => item._id === id);
      if (!selected) {
        alert("IP not found");
        navigate("/");
        return;
      }
      setFormData({
        address: selected.address || "",
        device: selected.device || "",
        status: selected.status || "Available",
        notes: selected.notes || "",
      });
    }
  }, [loading, ipList, id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.address || formData.address.trim() === "") {
      setError("IP Address is required");
      return;
    }

    try {
      await updateIP(id, formData);
      alert("IP updated");
      navigate("/");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed. See console.");
    }
  };

  const releaseIP = () => {
    setFormData({ ...formData, device: "", status: "Available" });
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 700 }}>
      <h3 className="fw-bold mb-3">Edit IP Address</h3>
      <div className="card-soft p-4">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">IP Address</label>
            <input type="text" className="form-control" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Device Name</label>
            <input type="text" className="form-control" value={formData.device} onChange={(e) => setFormData({ ...formData, device: e.target.value })} />
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
            <button type="button" className="btn btn-warning" onClick={releaseIP}>Release IP</button>
            <div>
              <button type="button" className="btn btn-secondary me-2" onClick={() => navigate("/")}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditIP;
