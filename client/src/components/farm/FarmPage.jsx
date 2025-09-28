import React, { useState, useEffect } from "react";

export default function FarmPage() {
  const [farm, setFarm] = useState(null);
  const [logs, setLogs] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    // Dummy farm data
    setFarm({
      name: "Sunnydale Farm",
      type: "Dairy & Crop",
      owner: { name: "John Doe" },
      location: { address: "123 Farm Lane, Green Valley" },
      size: { count: 50, unit: "animals" },
      livestock: ["Cows", "Goats"],
      crops: ["Maize", "Wheat"],
    });

    // Dummy compliance logs
    setLogs([
      { id: 1, description: "Monthly health log", status: "Pending" },
      { id: 2, description: "Water quality report", status: "Approved" },
      { id: 3, description: "Feed inspection", status: "Rejected" },
    ]);

    // Dummy risk assessments
    setAssessments([
      { id: 1, title: "Foot & Mouth Risk", risk: "High" },
      { id: 2, title: "Water contamination", risk: "Medium" },
      { id: 3, title: "Crop disease check", risk: "Low" },
    ]);

    // Dummy trainings
    setTrainings([
      { title: "Animal Vaccination Basics", progress: 80 },
      { title: "Crop Disease Management", progress: 40 },
    ]);

    // Dummy alerts
    setAlerts([
      { id: 1, title: "Foot & Mouth outbreak nearby", message: "Vaccinate livestock immediately." },
      { id: 2, title: "Water contamination alert", message: "Check water source before use." },
    ]);
  }, []);

  if (!farm) return <div className="p-4 text-gray-500">Loading dummy farm data...</div>;

  const Card = ({ children }) => (
    <section className="bg-white p-6 rounded-lg shadow">{children}</section>
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Farm Basic Info */}
      <Card>
        <h2 className="text-2xl font-semibold mb-3">{farm.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div><strong>Type:</strong> {farm.type}</div>
          <div><strong>Owner:</strong> {farm.owner?.name || "—"}</div>
          <div><strong>Address:</strong> {farm.location?.address || "—"}</div>
          <div><strong>Size:</strong> {farm.size?.count || "—"} {farm.size?.unit || "units"}</div>
          <div><strong>Livestock:</strong> {farm.livestock.join(", ")}</div>
          <div><strong>Crops:</strong> {farm.crops.join(", ")}</div>
        </div>
      </Card>

      {/* Compliance Logs */}
      <Card>
        <h3 className="text-xl font-semibold mb-3">Compliance Logs</h3>
        <ul className="divide-y">
          {logs.map((log) => (
            <li key={log.id} className="py-2 flex justify-between">
              <span>{log.description}</span>
              <span className={`font-semibold ${
                  log.status === "Pending" ? "text-yellow-500" :
                  log.status === "Approved" ? "text-green-500" :
                  "text-red-500"
                }`}>
                {log.status}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Risk Assessments */}
      <Card>
        <h3 className="text-xl font-semibold mb-3">Risk Assessments</h3>
        <ul className="divide-y">
          {assessments.map((a) => (
            <li key={a.id} className="py-2 flex justify-between">
              <span>{a.title}</span>
              <span className={`font-bold ${
                  a.risk === "High" ? "text-red-500" :
                  a.risk === "Medium" ? "text-yellow-500" :
                  "text-green-500"
                }`}>
                {a.risk}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Training Modules */}
      <Card>
        <h3 className="text-xl font-semibold mb-3">Training Modules</h3>
        <ul className="space-y-2">
          {trainings.map((t, idx) => (
            <li key={idx} className="p-2 border rounded bg-gray-50">
              <div className="flex justify-between items-center">
                <span>{t.title}</span>
                <span className="text-sm text-gray-600">{t.progress}% completed</span>
              </div>
              <div className="h-2 bg-gray-200 rounded mt-1">
                <div className="h-2 bg-green-500 rounded" style={{ width: `${t.progress}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {/* Alerts & Notifications */}
      <Card>
        <h3 className="text-xl font-semibold mb-3">Alerts & Notifications</h3>
        <ul className="space-y-2">
          {alerts.map((alert) => (
            <li key={alert.id} className="p-3 rounded bg-yellow-50 border border-yellow-200">
              <strong>{alert.title}</strong>
              <p className="text-sm">{alert.message}</p>
            </li>
          ))}
        </ul>
      </Card>

      {/* Action Center */}
      <Card>
        <h3 className="text-xl font-semibold mb-3">Action Center</h3>
        <div className="flex flex-col gap-2">
          <button className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Submit New Log
          </button>
          <button className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Request Vet Advice
          </button>
          <button className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
            Schedule Farm Inspection
          </button>
        </div>
      </Card>
    </div>
  );
}
