// src/components/Charts.jsx
import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { useAppContext } from "../context/AppContext";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Charts = () => {
  const { ipList } = useAppContext();

  const totalIPs = ipList.length;
  const assigned = ipList.filter(i => i.status === "Assigned" || i.status === "Used").length;
  const available = ipList.filter(i => i.status === "Available").length;

  const pieData = {
    labels: ["Assigned", "Available"],
    datasets: [
      {
        data: [assigned, available],
        backgroundColor: ["#198754", "#ffc107"],
        borderColor: ["#198754", "#ffc107"],
        borderWidth: 1,
      },
    ],
  };

  // Weekly chart is still mock - kept as-is but you can replace with real-time history later
  const barData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "New IP Assignments",
        data: [5, 8, 4, 10], // placeholder values — replace if you store history
        backgroundColor: "#0d6efd",
      },
    ],
  };

  return (
    <div className="container app-container mt-4">
      <h3 className="fw-bold mb-3">IP Statistics & Charts</h3>

      {/* Stats Row */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card-soft p-3 text-center">
            <h6 className="text-muted">Total IPs</h6>
            <div className="h3 fw-bold">{totalIPs}</div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card-soft p-3 text-center">
            <h6 className="text-muted">Assigned</h6>
            <div className="h3 fw-bold text-success">{assigned}</div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card-soft p-3 text-center">
            <h6 className="text-muted">Available</h6>
            <div className="h3 fw-bold text-warning">{available}</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card-soft p-4">
            <h5 className="mb-3">Assigned vs Available</h5>
            <Pie data={pieData} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="card-soft p-4">
            <h5 className="mb-3">Weekly IP Assignments</h5>
            <Bar data={barData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
