// src/components/ExportButton.jsx
import React from "react";
import { useAppContext } from "../context/AppContext";

const ExportButton = () => {
  const { ipList } = useAppContext();

  const exportCSV = () => {
    if (ipList.length === 0) {
      alert("No data available to export");
      return;
    }

    const header = ["ID", "IP", "Device", "Status", "Notes", "Date"];
    const rows = ipList.map((item) =>
      [item._id, item.ip, item.device, item.status, (item.notes || ""), item.date].map(cell => {
        // escape commas/newlines
        if (typeof cell === "string" && (cell.includes(",") || cell.includes("\n"))) {
          return `"${cell.replace(/"/g, '""')}"`;
        }
        return cell ?? "";
      }).join(",")
    );

    const csvContent = [header.join(","), ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "ip_data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button className="btn btn-success" onClick={exportCSV}>
      Export CSV
    </button>
  );
};

export default ExportButton;
