import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function VetDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Dummy data
  const [linkedFarms, setLinkedFarms] = useState([]);
  const [pendingLogs, setPendingLogs] = useState([]);
  const [correctiveActions, setCorrectiveActions] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [guidelines, setGuidelines] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    setLinkedFarms([
      { name: "Farm A", type: "Livestock", risk: "High" },
      { name: "Farm B", type: "Crops", risk: "Medium" },
    ]);

    setPendingLogs([
      { farmer: "John Doe", farm: "Farm A", submittedAt: "2025-09-25" },
      { farmer: "Jane Smith", farm: "Farm B", submittedAt: "2025-09-24" },
    ]);

    setCorrectiveActions([
      { farm: "Farm A", action: "Vaccination required", status: "Pending" },
      { farm: "Farm B", action: "Pest control", status: "Completed" },
    ]);

    setAlerts([
      "High-risk outbreak at Farm A",
      "Compliance log missing at Farm B",
    ]);

    setGuidelines([
      "Vaccination Protocol 2025",
      "Pest Management Guidelines",
    ]);

    setReports([
      { name: "Farm A Report", link: "#" },
      { name: "Farm B Report", link: "#" },
    ]);
  }, []);

  const Card = ({ children }) => (
    <div className="bg-white p-4 rounded shadow">{children}</div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Veterinarian Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{user?.name}</span>
          <button
            onClick={handleLogout}
            className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="p-6 space-y-6">
        {/* Linked Farms */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Linked Farms Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {linkedFarms.map((farm, idx) => (
              <div key={idx} className="p-3 border rounded-lg bg-gray-50">
                <p className="font-semibold">{farm.name}</p>
                <p>Type: {farm.type}</p>
                <p>
                  Risk:{" "}
                  <span
                    className={`font-bold ${
                      farm.risk === "High"
                        ? "text-red-500"
                        : farm.risk === "Medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {farm.risk}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Compliance Logs Pending Review */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">
            Compliance Logs Pending Review
          </h2>
          <table className="w-full text-left border border-gray-200 rounded">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border-b">Farmer</th>
                <th className="p-2 border-b">Farm</th>
                <th className="p-2 border-b">Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {pendingLogs.map((log, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-2 border-b">{log.farmer}</td>
                  <td className="p-2 border-b">{log.farm}</td>
                  <td className="p-2 border-b">{log.submittedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Corrective Actions Tracker */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Corrective Actions Tracker</h2>
          <ul className="space-y-2">
            {correctiveActions.map((action, idx) => (
              <li
                key={idx}
                className="p-3 border rounded-lg bg-gray-50 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{action.farm}</p>
                  <p>{action.action}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-white ${
                    action.status === "Pending"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  {action.status}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Alerts */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Alerts</h2>
          <ul className="space-y-2">
            {alerts.map((alert, idx) => (
              <li
                key={idx}
                className="p-2 bg-red-50 border border-red-300 rounded text-red-800"
              >
                {alert}
              </li>
            ))}
          </ul>
        </Card>

        {/* Training / Guidelines */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Training / Guidelines</h2>
          <ul className="space-y-2 list-disc list-inside">
            {guidelines.map((g, idx) => (
              <li key={idx}>{g}</li>
            ))}
          </ul>
        </Card>

        {/* Reports */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Reports</h2>
          <ul className="space-y-2">
            {reports.map((r, idx) => (
              <li key={idx}>
                <a
                  href={r.link}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {r.name}
                </a>
              </li>
            ))}
          </ul>
        </Card>
      </main>
    </div>
  );
}
