import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function FarmerDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t} = useTranslation();

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

  useEffect(() => {
    setRiskAssessments([
      { farm: "Farm A", date: "2025-09-20", risk: "High" },
      { farm: "Farm B", date: "2025-09-18", risk: "Medium" }
    ]);

    setComplianceLogs([
      { farm: "Farm A", status: "Pending" },
      { farm: "Farm B", status: "Approved" }
    ]);

    setTrainings([
      { title: "Livestock Care", progress: 70 },
      { title: "Pest Management", progress: 100 }
    ]);

    setAlerts([
      "Vaccination reminder for Farm A",
      "Regulatory update: new inspection guidelines"
    ]);
  }, []);

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
      lowRiskFarms: lowRisk
    });
  }, [riskAssessments, complianceLogs]);

  const Card = ({ children }) => (
    <section className="bg-white p-5 rounded-lg shadow hover:shadow-md transition">
      {children}
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow p-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-green-700">
          {t("farmerDashboard.title")}
        </h1>

        <div className="flex items-center gap-3">
          {/* View Farms */}
          <button
            type="button"
            onClick={() => navigate("/farmlist")}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            {t("farmerDashboard.myFarms")}
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            {t("farmerDashboard.logout")}
          </button>

          {/* User Name */}
          <span className="text-gray-700 font-medium px-2 py-1 bg-gray-100 rounded">
            {user?.name}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Metrics */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">{t("farmerDashboard.metrics")}</h2>
          <ul className="space-y-1">
            <li>{t("farmerDashboard.overallCompliance")}: {dashboardMetrics.overallCompliance}%</li>
            <li>{t("farmerDashboard.highRisk")}: {dashboardMetrics.highRiskFarms}</li>
            <li>{t("farmerDashboard.mediumRisk")}: {dashboardMetrics.mediumRiskFarms}</li>
            <li>{t("farmerDashboard.lowRisk")}: {dashboardMetrics.lowRiskFarms}</li>
          </ul>
        </Card>

        {/* Forum */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">{t("farmerDashboard.forum")}</h2>
          <p className="text-gray-600 mb-3">{t("farmerDashboard.forumDesc")}</p>
          <button
            type="button"
            onClick={() => navigate("/discussion")}
            className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            {t("farmerDashboard.goForum")}
          </button>
        </Card>

        {/* Overview */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">{t("farmerDashboard.overview")}</h2>
          <p className="text-gray-600 mb-3">{t("farmerDashboard.overviewDesc")}</p>
          <button
            type="button"
            onClick={() => navigate("/farm")}
            className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {t("farmerDashboard.viewOverview")}
          </button>
        </Card>

        {/* Risk Assessment */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">{t("farmerDashboard.riskSummary")}</h2>
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
          <h2 className="text-lg font-semibold mb-2">{t("farmerDashboard.complianceLogs")}</h2>
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

        {/* Trainings */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">{t("farmerDashboard.training")}</h2>
          <ul className="space-y-2">
            {trainings.map((tItem, idx) => (
              <li key={idx} className="p-2 border rounded bg-gray-50">
                <div className="flex justify-between items-center">
                  <span>{tItem.title}</span>
                  <span className="text-sm text-gray-600">
                    {tItem.progress}% {t("farmerDashboard.completed")}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded mt-1">
                  <div className="h-2 bg-green-500 rounded" style={{ width: `${tItem.progress}%` }} />
                </div>
                <button
                  type="button"
                  onClick={() => navigate(`/training/${idx}`)}
                  className="mt-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  {t("farmerDashboard.openTraining")}
                </button>
              </li>
            ))}
          </ul>
        </Card>

        {/* Alerts */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">{t("farmerDashboard.alerts")}</h2>
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
          <h2 className="text-lg font-semibold mb-2">{t("farmerDashboard.actionCenter")}</h2>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => navigate("/submit-log")}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {t("farmerDashboard.submitLog")}
            </button>
            <button
              type="button"
              onClick={() => navigate("/request-vet")}
              className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {t("farmerDashboard.requestVet")}
            </button>
            <button
              type="button"
              onClick={() => navigate("/schedule-inspection")}
              className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              {t("farmerDashboard.scheduleInspection")}
            </button>
          </div>
        </Card>
      </main>
    </div>
  );
}
