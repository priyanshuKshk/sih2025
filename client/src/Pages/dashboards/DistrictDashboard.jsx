import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function DistrictDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Dummy data
  const [overview, setOverview] = useState({});
  const [compliance, setCompliance] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Simulate API fetch
    setOverview({
      farms: 120,
      farmers: 85,
      vets: 10,
      extWorkers: 15,
    });

    setCompliance([
      { type: "Submitted", count: 90 },
      { type: "Approved", count: 75 },
      { type: "Rejected", count: 15 },
    ]);

    setAlerts([
      "High-risk outbreak in District 3",
      "Compliance logs missing for 5 farms",
    ]);
  }, []);

  // Simple Card
  const Card = ({ children }) => (
    <div className="bg-white p-4 rounded shadow">{children}</div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">District Admin Dashboard</h1>
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
        {/* District Overview */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">District Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg bg-gray-50 text-center">
              <p className="text-sm text-gray-500">Farms</p>
              <p className="text-xl font-bold">{overview.farms}</p>
            </div>
            <div className="p-4 border rounded-lg bg-gray-50 text-center">
              <p className="text-sm text-gray-500">Farmers</p>
              <p className="text-xl font-bold">{overview.farmers}</p>
            </div>
            <div className="p-4 border rounded-lg bg-gray-50 text-center">
              <p className="text-sm text-gray-500">Vets</p>
              <p className="text-xl font-bold">{overview.vets}</p>
            </div>
            <div className="p-4 border rounded-lg bg-gray-50 text-center">
              <p className="text-sm text-gray-500">Extension Workers</p>
              <p className="text-xl font-bold">{overview.extWorkers}</p>
            </div>
          </div>
        </Card>

        {/* Compliance Summary */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Compliance Summary</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={compliance}>
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Risk Map */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Risk Map</h2>
          <div className="h-60 bg-gray-100 flex items-center justify-center rounded">
            <p className="text-gray-500">Map of high-risk farms (placeholder)</p>
          </div>
        </Card>

        {/* User Management */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">User Management</h2>
          <div className="flex gap-3 flex-wrap">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Add Farmer
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Add Vet
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
              Add Extension Worker
            </button>
          </div>
        </Card>

        {/* Reports & Exports */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Reports & Exports</h2>
          <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900">
            Generate CSV Report
          </button>
          <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 ml-3">
            Generate PDF Report
          </button>
        </Card>

        {/* Alerts & Notifications */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Alerts & Notifications</h2>
          <ul className="space-y-2">
            {alerts.map((a, idx) => (
              <li key={idx} className="p-2 bg-yellow-50 border border-yellow-300 rounded text-yellow-800">
                {a}
              </li>
            ))}
          </ul>
        </Card>
      </main>
    </div>
  );
}
