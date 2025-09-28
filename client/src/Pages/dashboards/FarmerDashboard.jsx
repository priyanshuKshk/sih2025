import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function FarmerDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // State
  const [riskAssessments, setRiskAssessments] = useState([]);
  const [complianceLogs, setComplianceLogs] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [dashboardMetrics, setDashboardMetrics] = useState({
    overallCompliance: 0,
    highRiskFarms: 0,
    mediumRiskFarms: 0,
    lowRiskFarms: 0,
  });

  // Load data
  useEffect(() => {
    setRiskAssessments([
      { farm: "Farm A", date: "2025-09-20", risk: "High" },
      { farm: "Farm B", date: "2025-09-18", risk: "Medium" },
    ]);

    setComplianceLogs([
      { farm: "Farm A", status: "Pending" },
      { farm: "Farm B", status: "Approved" },
    ]);

    setTrainings([
      { title: "Livestock Care", progress: 70 },
      { title: "Pest Management", progress: 100 },
    ]);

    setAlerts([
      "Vaccination reminder for Farm A",
      "Regulatory update: new inspection guidelines",
    ]);
  }, []);

  // Calculate dashboard metrics after data is loaded
  useEffect(() => {
    const totalFarms = complianceLogs.length;
    const approvedCount = complianceLogs.filter((c) => c.status === "Approved").length;
    const highRisk = riskAssessments.filter((r) => r.risk === "High").length;
    const mediumRisk = riskAssessments.filter((r) => r.risk === "Medium").length;
    const lowRisk = riskAssessments.filter((r) => r.risk === "Low").length;

    setDashboardMetrics({
      overallCompliance: totalFarms ? Math.round((approvedCount / totalFarms) * 100) : 0,
      highRiskFarms: highRisk,
      mediumRiskFarms: mediumRisk,
      lowRiskFarms: lowRisk,
    });
  }, [riskAssessments, complianceLogs]);

  // Card Component
  const Card = ({ children }) => (
    <section className="bg-white p-5 rounded-lg shadow hover:shadow-md transition">
      {children}
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow p-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-green-700">Farmer Dashboard</h1>

        <div className="flex items-center gap-3">
            {/* View Farms */}
            <button
            type="button"
            onClick={() => navigate("/farmlist")}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
            My Farms
            </button>

            {/* Logout */}
            <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
            Logout
            </button>

            {/* User Name */}
            <span className="text-gray-700 font-medium px-2 py-1 bg-gray-100 rounded">
            {user?.name}
            </span>
        </div>
        </header>


      {/* Main Content */}
      <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dashboard Metrics */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">Farm Dashboard Metrics</h2>
          <ul className="space-y-1">
            <li>Overall Compliance: {dashboardMetrics.overallCompliance}%</li>
            <li>High Risk Farms: {dashboardMetrics.highRiskFarms}</li>
            <li>Medium Risk Farms: {dashboardMetrics.mediumRiskFarms}</li>
            <li>Low Risk Farms: {dashboardMetrics.lowRiskFarms}</li>
          </ul>
        </Card>

        {/* Discussion Forum */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">Discussion Forum</h2>
          <p className="text-gray-600 mb-3">Share ideas and updates with other farmers.</p>
          <button
            type="button"
            onClick={() => navigate("/discussion")}
            className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Go to Forum
          </button>
        </Card>

        {/* Farm Overview */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">Farm Overview</h2>
          <p className="text-gray-600 mb-3">See overall details and statistics of your farm(s).</p>
          <button
            type="button"
            onClick={() => navigate("/farm")}
            className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            View Overview
          </button>
        </Card>

        {/* Risk Assessment Summary */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">Risk Assessment Summary</h2>
          <ul className="space-y-2">
            {riskAssessments.map((r, idx) => (
              <li key={idx} className="p-2 border rounded bg-gray-50 flex justify-between">
                <span>{r.farm} ({r.date})</span>
                <span className={`font-bold ${
                  r.risk === "High" ? "text-red-500" :
                  r.risk === "Medium" ? "text-yellow-500" :
                  "text-green-500"
                }`}>{r.risk}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Compliance Logs */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">Compliance Logs</h2>
          <ul className="space-y-2">
            {complianceLogs.map((log, idx) => (
              <li key={idx} className="p-2 border rounded bg-gray-50 flex justify-between">
                <span>{log.farm}</span>
                <span className={`font-bold ${
                  log.status === "Pending" ? "text-yellow-500" :
                  log.status === "Approved" ? "text-green-500" :
                  "text-red-500"
                }`}>{log.status}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Training Modules */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">Training Modules</h2>
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
                <button
                  type="button"
                  onClick={() => navigate(`/training/${idx}`)}
                  className="mt-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  Open Training
                </button>
              </li>
            ))}
          </ul>
        </Card>

        {/* Alerts & Notifications */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">Alerts & Notifications</h2>
          <ul className="space-y-2">
            {alerts.map((a, idx) => (
              <li key={idx} className="p-2 border rounded bg-yellow-50 text-yellow-800">
                {a}
              </li>
            ))}
          </ul>
        </Card>

        {/* Action Center */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">Action Center</h2>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => navigate("/submit-log")}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit New Log
            </button>
            <button
              type="button"
              onClick={() => navigate("/request-vet")}
              className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Request Vet Advice
            </button>
            <button
              type="button"
              onClick={() => navigate("/schedule-inspection")}
              className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Schedule Farm Inspection
            </button>
          </div>
        </Card>
      </main>
    </div>
  );
}
