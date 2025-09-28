import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function NationalDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Dummy Data
  const [overview, setOverview] = useState([]);
  const [compliance, setCompliance] = useState([]);
  const [outbreaks, setOutbreaks] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [trainingModules, setTrainingModules] = useState([]);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  useEffect(() => {
    setOverview([
      { state: "State A", farms: 120, users: 350, livestock: 500 },
      { state: "State B", farms: 80, users: 200, livestock: 300 },
      { state: "State C", farms: 150, users: 420, livestock: 600 },
    ]);

    setCompliance([
      { district: "District 1", compliance: 90 },
      { district: "District 2", compliance: 75 },
      { district: "District 3", compliance: 85 },
    ]);

    setOutbreaks([
      { region: "State A - District 1", disease: "Avian Flu", severity: "High" },
      { region: "State B - District 3", disease: "Foot & Mouth", severity: "Medium" },
    ]);

    setAlerts([
      { message: "High-risk outbreak in State A", severity: "High" },
      { message: "Compliance logs missing for multiple districts", severity: "Medium" },
    ]);

    setTrainingModules([
      { title: "National Biosecurity Training", state: "State A", assigned: 50 },
      { title: "Avian Flu Management", state: "State B", assigned: 40 },
    ]);
  }, []);

  const Card = ({ children }) => (
    <div className="bg-white p-4 rounded shadow">{children}</div>
  );

  const handleAcknowledge = (idx) => {
    const updated = [...alerts];
    updated[idx].acknowledged = true;
    setAlerts(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow p-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-semibold">National Admin Dashboard</h1>
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
        {/* National Overview */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">National Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {overview.map((item, idx) => (
              <div key={idx} className="p-4 border rounded-lg shadow-sm bg-white">
                <h3 className="font-semibold">{item.state}</h3>
                <p>Farms: {item.farms}</p>
                <p>Users: {item.users}</p>
                <p>Livestock: {item.livestock}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Aggregated Compliance */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Aggregated Compliance</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={compliance}>
              <XAxis dataKey="district" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="compliance" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* National Risk Map */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">National Risk Map</h2>
          <div className="h-60 bg-gray-100 flex items-center justify-center rounded">
            <p className="text-gray-500">
              Interactive map with high-risk farms/districts (placeholder)
            </p>
          </div>
        </Card>

        {/* Outbreak Feed */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Outbreak Feed</h2>
          <ul className="space-y-2">
            {outbreaks.map((o, idx) => (
              <li
                key={idx}
                className="p-3 border rounded-lg flex justify-between items-center bg-white"
              >
                <div>
                  <p className="font-semibold">{o.disease}</p>
                  <p className="text-sm text-gray-500">{o.region}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-white ${
                    o.severity === "High"
                      ? "bg-red-500"
                      : o.severity === "Medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  {o.severity}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Alerts & Notifications */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Alerts & Notifications</h2>
          <ul className="space-y-2">
            {alerts.map((a, idx) => (
              <li
                key={idx}
                className={`p-3 border rounded-lg flex justify-between items-center ${
                  a.severity === "High" ? "bg-red-50 text-red-800" : "bg-yellow-50 text-yellow-800"
                }`}
              >
                <span>{a.message}</span>
                {!a.acknowledged && (
                  <button
                    onClick={() => handleAcknowledge(idx)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    Acknowledge
                  </button>
                )}
                {a.acknowledged && <span className="text-sm text-green-600">Acknowledged</span>}
              </li>
            ))}
          </ul>
        </Card>

        {/* Training Module Management */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Training Modules</h2>
          <ul className="space-y-2">
            {trainingModules.map((t, idx) => (
              <li key={idx} className="p-3 border rounded-lg flex justify-between items-center bg-gray-50">
                <span>{t.title} - {t.state}</span>
                <span className="text-sm text-gray-600">Assigned: {t.assigned}</span>
              </li>
            ))}
          </ul>
          <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Add New Module
          </button>
        </Card>

        {/* System Configuration */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">System Configuration</h2>
          <div className="space-y-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Manage Roles & Permissions
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
              Configure Workflows
            </button>
          </div>
        </Card>

        {/* Data Insights */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Data Insights</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={overview}
                dataKey="farms"
                nameKey="state"
                outerRadius={80}
                label
              >
                {overview.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Export Reports */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Export Reports</h2>
          <div className="flex gap-3 flex-wrap">
            <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900">
              Export CSV
            </button>
            <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800">
              Export PDF
            </button>
          </div>
        </Card>
      </main>
    </div>
  );
}
