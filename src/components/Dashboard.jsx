// src/components/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import ExportButton from "./ExportButton";
import { useAppContext } from "../context/AppContext";

const Dashboard = () => {
  const { ipList, deleteIP, loadIPs } = useAppContext();

  return (
    <div className="container mt-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">IP Address Dashboard</h2>
        <div className="d-flex gap-2">
          <Link to="/add" className="btn btn-primary">+ Add New IP</Link>
          <ExportButton />
        </div>
      </div>

      {/* STATS */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm p-3 text-center">
            <h5>Total IPs</h5>
            <h2 className="fw-bold">{ipList.length}</h2>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm p-3 text-center">
            <h5>Used</h5>
            <h2 className="fw-bold text-danger">
              {ipList.filter(x => x.status === "Assigned" || x.status === "Used").length}
            </h2>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm p-3 text-center">
            <h5>Available</h5>
            <h2 className="fw-bold text-success">
              {ipList.filter(x => x.status === "Available").length}
            </h2>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">IP Address Records</h5>
        </div>

        <div className="card-body">
          {ipList.length === 0 ? (
            <p className="text-center text-muted">No IP records found.</p>
          ) : (
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>IP Address</th>
                  <th>Device</th>
                  <th>Status</th>
                  <th>Notes</th>
                  {/* <th>Date Added</th> */}
                  {/* <th>Actions</th> */}
                </tr>
              </thead>

              <tbody>
                {ipList.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.address || "-"}</td>
                    <td>{item.device || "-"}</td>
                    <td>
                      <span className={`badge ${
                        item.status === "Available" ? "bg-success"
                        : item.status === "Assigned" ? "bg-warning text-dark"
                        : "bg-danger"
                      }`}>{item.status || "-"}</span>
                    </td>
                    <td>{item.notes || "-"}</td>
                    {/* <td>{item.dateAdded ? new Date(item.dateAdded).toLocaleString() : "-"}</td> */}
                    <td>
                      <Link to={`/edit/${item._id}`} className="btn btn-sm btn-warning me-2">Edit</Link>
                      <button className="btn btn-sm btn-danger" onClick={async () => {
                        if (confirm("Delete this IP?")) {
                          try {
                            await deleteIP(item._id);
                            alert("Deleted");
                            loadIPs();
                          } catch (err) {
                            console.error(err);
                            alert("Delete failed");
                          }
                        }
                      }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          )}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
