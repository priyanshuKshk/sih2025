import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ExtensionDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login"); // redirect to login after logout
  };

  // Dummy data
  const [farms, setFarms] = useState([]);
  const [trainingSessions, setTrainingSessions] = useState([]);
  const [visits, setVisits] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    setFarms([
      { name: "Farm A", risk: "High", type: "Livestock" },
      { name: "Farm B", risk: "Medium", type: "Crops" },
      { name: "Farm C", risk: "Low", type: "Mixed" },
    ]);

    setTrainingSessions([
      { title: "Livestock Care", date: "2025-10-01", enrolled: 12, completed: 8 },
      { title: "Pest Management", date: "2025-10-05", enrolled: 15, completed: 15 },
    ]);

    setVisits([
      { farm: "Farm A", date: "2025-09-25", notes: "Vaccination done" },
      { farm: "Farm B", date: "2025-09-26", notes: "Soil test conducted" },
    ]);

    setAlerts([
      "High-risk outbreak at Farm A",
      "Farm B compliance log missing",
    ]);
  }, []);

  const Card = ({ children }) => (
    <div className="bg-white p-4 rounded shadow">{children}</div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Extension Worker Dashboard</h1>
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

      {/* Main Dashboard */}
      <main className="p-6 space-y-6">
        {/* Regional Farm Map / List */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Regional Farm List</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {farms.map((farm, idx) => (
              <div key={idx} className="p-3 border rounded-lg bg-gray-50">
                <p className="font-semibold">{farm.name}</p>
                <p>Type: {farm.type}</p>
                <p>Risk: <span className={`font-bold ${farm.risk === "High" ? "text-red-500" : farm.risk === "Medium" ? "text-yellow-500" : "text-green-500"}`}>{farm.risk}</span></p>
              </div>
            ))}
          </div>
        </Card>

        {/* Training Schedule */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Training Schedule</h2>
          <div className="space-y-2">
            {trainingSessions.map((session, idx) => (
              <div key={idx} className="p-3 border rounded-lg bg-gray-50">
                <p className="font-semibold">{session.title}</p>
                <p>Date: {session.date}</p>
                <p>Enrolled: {session.enrolled}, Completed: {session.completed}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Farm Visits / Outreach Logs */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Farm Visits / Outreach Logs</h2>
          <ul className="space-y-2">
            {visits.map((visit, idx) => (
              <li key={idx} className="p-3 border rounded-lg bg-gray-50">
                <p className="font-semibold">{visit.farm}</p>
                <p>Date: {visit.date}</p>
                <p>Notes: {visit.notes}</p>
              </li>
            ))}
          </ul>
        </Card>

        {/* Alerts */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Alerts</h2>
          <ul className="space-y-2">
            {alerts.map((alert, idx) => (
              <li key={idx} className="p-2 bg-yellow-50 border border-yellow-300 rounded text-yellow-800">
                {alert}
              </li>
            ))}
          </ul>
        </Card>

        {/* Reports */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Reports</h2>
          <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900">
            View Regional Compliance Report
          </button>
          <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 ml-3">
            View Training Effectiveness
          </button>
        </Card>

        {/* Action Center */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Action Center</h2>
          <div className="flex gap-3 flex-wrap">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Schedule New Training
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Send Alert to Farmers
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
              Request Vet Follow-up
            </button>
          </div>
        </Card>
      </main>
    </div>
  );
}
