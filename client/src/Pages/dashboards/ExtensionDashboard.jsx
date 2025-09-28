import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ExtensionDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // State
  const [farms, setFarms] = useState([]);
  const [trainingSessions, setTrainingSessions] = useState([]);
  const [visits, setVisits] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [dashboardMetrics, setDashboardMetrics] = useState({
    totalFarms: 0,
    highRiskFarms: 0,
    mediumRiskFarms: 0,
    lowRiskFarms: 0,
    upcomingTrainings: 0,
    scheduledVisits: 0,
  });

  useEffect(() => {
    // Sample farms
    const farmList = [
      { name: "Farm A", risk: "High", type: "Livestock" },
      { name: "Farm B", risk: "Medium", type: "Crops" },
      { name: "Farm C", risk: "Low", type: "Mixed" },
    ];
    setFarms(farmList);

    // Trainings
    const trainings = [
      { title: "Livestock Care", date: "2025-10-01", enrolled: 12, completed: 8 },
      { title: "Pest Management", date: "2025-10-05", enrolled: 15, completed: 15 },
    ];
    setTrainingSessions(trainings);

    // Visits
    const visitLogs = [
      { farm: "Farm A", date: "2025-09-25", notes: "Vaccination done" },
      { farm: "Farm B", date: "2025-09-26", notes: "Soil test conducted" },
    ];
    setVisits(visitLogs);

    // Alerts
    setAlerts([
      { message: "High-risk outbreak at Farm A", acknowledged: false },
      { message: "Farm B compliance log missing", acknowledged: false },
    ]);

    // Dashboard Metrics
    const highRisk = farmList.filter(f => f.risk === "High").length;
    const mediumRisk = farmList.filter(f => f.risk === "Medium").length;
    const lowRisk = farmList.filter(f => f.risk === "Low").length;

    setDashboardMetrics({
      totalFarms: farmList.length,
      highRiskFarms: highRisk,
      mediumRiskFarms: mediumRisk,
      lowRiskFarms: lowRisk,
      upcomingTrainings: trainings.length,
      scheduledVisits: visitLogs.length,
    });
  }, []);

  // Handlers
  const acknowledgeAlert = (index) => {
    const updatedAlerts = [...alerts];
    updatedAlerts[index].acknowledged = true;
    setAlerts(updatedAlerts);
    // TODO: send acknowledgment to backend API
  };

  const updateFarmRisk = (index, newRisk) => {
    const updatedFarms = [...farms];
    updatedFarms[index].risk = newRisk;
    setFarms(updatedFarms);
    // TODO: send update to backend API
  };

  const Card = ({ children }) => (
    <div className="bg-white p-4 rounded shadow hover:shadow-md transition">{children}</div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow p-4 flex items-center justify-between sticky top-0 z-10">
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

      <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dashboard Metrics */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">Dashboard Metrics</h2>
          <ul className="space-y-1">
            <li>Total Farms: {dashboardMetrics.totalFarms}</li>
            <li>High Risk Farms: {dashboardMetrics.highRiskFarms}</li>
            <li>Medium Risk Farms: {dashboardMetrics.mediumRiskFarms}</li>
            <li>Low Risk Farms: {dashboardMetrics.lowRiskFarms}</li>
            <li>Upcoming Trainings: {dashboardMetrics.upcomingTrainings}</li>
            <li>Scheduled Visits: {dashboardMetrics.scheduledVisits}</li>
          </ul>
        </Card>

        {/* Regional Farm List */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">Regional Farms</h2>
          <ul className="space-y-2">
            {farms.map((farm, idx) => (
              <li key={idx} className="p-3 border rounded bg-gray-50 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{farm.name}</p>
                  <p>Type: {farm.type}</p>
                  <p>
                    Risk:{" "}
                    <span className={`font-bold ${
                      farm.risk === "High"
                        ? "text-red-500"
                        : farm.risk === "Medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}>
                      {farm.risk}
                    </span>
                  </p>
                </div>
                <select
                  value={farm.risk}
                  onChange={(e) => updateFarmRisk(idx, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </li>
            ))}
          </ul>
        </Card>

        {/* Training Sessions */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">Training Sessions</h2>
          <ul className="space-y-2">
            {trainingSessions.map((t, idx) => (
              <li key={idx} className="p-3 border rounded bg-gray-50">
                <p className="font-semibold">{t.title}</p>
                <p>Date: {t.date}</p>
                <p>Enrolled: {t.enrolled}, Completed: {t.completed}</p>
              </li>
            ))}
          </ul>
        </Card>

        {/* Farm Visits */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">Farm Visits / Outreach Logs</h2>
          <ul className="space-y-2">
            {visits.map((v, idx) => (
              <li key={idx} className="p-3 border rounded bg-gray-50">
                <p className="font-semibold">{v.farm}</p>
                <p>Date: {v.date}</p>
                <p>Notes: {v.notes}</p>
              </li>
            ))}
          </ul>
        </Card>

        {/* Alerts */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">Alerts</h2>
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

        {/* Reports */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">Reports</h2>
          <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900">
            View Regional Compliance Report
          </button>
          <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 ml-3">
            View Training Effectiveness
          </button>
        </Card>

        {/* Action Center */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">Action Center</h2>
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
