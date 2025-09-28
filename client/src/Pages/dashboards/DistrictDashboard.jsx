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

  // State
  const [overview, setOverview] = useState({});
  const [complianceLogs, setComplianceLogs] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [complianceSummary, setComplianceSummary] = useState([]);

  useEffect(() => {
    // Simulate API fetch
    setOverview({
      farms: 120,
      farmers: 85,
      vets: 10,
      extWorkers: 15,
    });

    setComplianceSummary([
      { type: "Submitted", count: 90 },
      { type: "Approved", count: 75 },
      { type: "Rejected", count: 15 },
    ]);

    setComplianceLogs([
      { farmer: "John Doe", farm: "Farm A", type: "Livestock", submittedAt: "2025-09-25", status: "Pending" },
      { farmer: "Jane Smith", farm: "Farm B", type: "Crops", submittedAt: "2025-09-24", status: "Pending" },
    ]);

    setAlerts([
      { message: "High-risk outbreak in District 3", acknowledged: false },
      { message: "Compliance logs missing for 5 farms", acknowledged: false },
    ]);
  }, []);

  // Handlers
  const handleApprove = (index) => {
    const updated = [...complianceLogs];
    updated[index].status = "Approved";
    setComplianceLogs(updated);
    // TODO: API call to approve
  };

  const handleReject = (index) => {
    const updated = [...complianceLogs];
    updated[index].status = "Rejected";
    setComplianceLogs(updated);
    // TODO: API call to reject
  };

  const acknowledgeAlert = (index) => {
    const updatedAlerts = [...alerts];
    updatedAlerts[index].acknowledged = true;
    setAlerts(updatedAlerts);
    // TODO: API call to acknowledge
  };

  const Card = ({ children }) => (
    <div className="bg-white p-4 rounded shadow hover:shadow-md transition">{children}</div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow p-4 flex items-center justify-between sticky top-0 z-10">
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

      <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Overview Metrics */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">District Overview</h2>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(overview).map(([key, value], idx) => (
              <div key={idx} className="p-3 border rounded-lg bg-gray-50 text-center cursor-pointer hover:bg-gray-100">
                <p className="text-sm text-gray-500">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                <p className="text-xl font-bold">{value}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Compliance Summary Chart */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">Compliance Summary</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={complianceSummary}>
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Compliance Logs Table */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">Pending Compliance Logs</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-200 rounded">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border-b">Farmer</th>
                  <th className="p-2 border-b">Farm</th>
                  <th className="p-2 border-b">Type</th>
                  <th className="p-2 border-b">Submitted At</th>
                  <th className="p-2 border-b">Status</th>
                  <th className="p-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {complianceLogs.map((log, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-2 border-b">{log.farmer}</td>
                    <td className="p-2 border-b">{log.farm}</td>
                    <td className="p-2 border-b">{log.type}</td>
                    <td className="p-2 border-b">{log.submittedAt}</td>
                    <td className="p-2 border-b">{log.status}</td>
                    <td className="p-2 border-b flex gap-2">
                      {log.status === "Pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(idx)}
                            className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(idx)}
                            className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Risk Map Placeholder */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">Risk Map</h2>
          <div className="h-60 bg-gray-100 flex items-center justify-center rounded">
            <p className="text-gray-500">Interactive map of high-risk farms (placeholder)</p>
          </div>
        </Card>

        {/* Alerts */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">Alerts & Notifications</h2>
          <ul className="space-y-2">
            {alerts.map((a, idx) => (
              <li
                key={idx}
                className={`p-2 border rounded ${
                  a.acknowledged ? "bg-green-50 text-green-800" : "bg-yellow-50 text-yellow-800"
                } flex justify-between items-center`}
              >
                <span>{a.message}</span>
                {!a.acknowledged && (
                  <button
                    onClick={() => acknowledgeAlert(idx)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    Acknowledge
                  </button>
                )}
              </li>
            ))}
          </ul>
        </Card>

        {/* User Management */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">User Management</h2>
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
          <h2 className="text-lg font-semibold mb-2">Reports & Exports</h2>
          <div className="flex gap-3 flex-wrap">
            <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900">
              Generate CSV Report
            </button>
            <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800">
              Generate PDF Report
            </button>
          </div>
        </Card>
      </main>
    </div>
  );
}
