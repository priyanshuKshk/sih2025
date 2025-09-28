// NationalAdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const dummyOverview = [
  { state: "State A", farms: 120, users: 350, livestock: 500 },
  { state: "State B", farms: 80, users: 200, livestock: 300 },
  { state: "State C", farms: 150, users: 420, livestock: 600 },
];

const dummyCompliance = [
  { district: "District 1", compliance: 90 },
  { district: "District 2", compliance: 75 },
  { district: "District 3", compliance: 85 },
];

const dummyOutbreaks = [
  { region: "State A - District 1", disease: "Avian Flu", severity: "High" },
  { region: "State B - District 3", disease: "Foot & Mouth", severity: "Medium" },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function NationalAdminDashboard() {
  const [overview, setOverview] = useState([]);
  const [compliance, setCompliance] = useState([]);
  const [outbreaks, setOutbreaks] = useState([]);

  useEffect(() => {
    // Fetch from API in real use case
    setOverview(dummyOverview);
    setCompliance(dummyCompliance);
    setOutbreaks(dummyOutbreaks);
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* National Overview */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-4">National Overview</h2>
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
        </CardContent>
      </Card>

      {/* Aggregated Reports */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Aggregated Compliance</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={compliance}>
              <XAxis dataKey="district" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="compliance" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Disease & Outbreak Feed */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Disease & Outbreak Feed</h2>
          <ul className="space-y-2">
            {outbreaks.map((o, idx) => (
              <li key={idx} className="p-3 border rounded-lg flex justify-between items-center bg-white">
                <div>
                  <p className="font-semibold">{o.disease}</p>
                  <p className="text-sm text-gray-500">{o.region}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-white ${
                    o.severity === "High" ? "bg-red-500" : o.severity === "Medium" ? "bg-yellow-500" : "bg-green-500"
                  }`}
                >
                  {o.severity}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* System Configuration */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-4">System Configuration</h2>
          <div className="space-y-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Manage Roles & Permissions</button>
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Configure Workflows</button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Manage Training Modules</button>
          </div>
        </CardContent>
      </Card>

      {/* Data Insights */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Data Insights</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={overview} dataKey="farms" nameKey="state" outerRadius={80} label>
                {overview.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Alerts & Notifications */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Alerts & Notifications</h2>
          <ul className="space-y-2">
            <li className="p-3 border rounded-lg bg-yellow-50 text-yellow-800">High-risk outbreak in State A</li>
            <li className="p-3 border rounded-lg bg-red-50 text-red-800">Compliance logs missing for multiple districts</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
