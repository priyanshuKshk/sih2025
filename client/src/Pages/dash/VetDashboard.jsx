import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function VetDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Language switcher
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // State
  const [linkedFarms, setLinkedFarms] = useState([]);
  const [pendingLogs, setPendingLogs] = useState([]);
  const [correctiveActions, setCorrectiveActions] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [guidelines, setGuidelines] = useState([]);
  const [reports, setReports] = useState([]);
  const [dashboardMetrics, setDashboardMetrics] = useState({
    totalFarms: 0,
    highRiskFarms: 0,
    mediumRiskFarms: 0,
    lowRiskFarms: 0,
    pendingLogs: 0,
    pendingActions: 0,
  });

  useEffect(() => {
    const farms = [
      { name: "Farm A", type: "Livestock", risk: "High" },
      { name: "Farm B", type: "Livestock", risk: "Medium" },
    ];
    setLinkedFarms(farms);

    const logs = [
      { farmer: "John Doe", farm: "Farm A", submittedAt: "2025-09-25" },
      { farmer: "Jane Smith", farm: "Farm B", submittedAt: "2025-09-24" },
    ];
    setPendingLogs(logs);

    const actions = [
      { farm: "Farm A", action: "Vaccination required", status: "Pending" },
      { farm: "Farm B", action: "Pest control", status: "Completed" },
    ];
    setCorrectiveActions(actions);

    setAlerts([
      "High-risk outbreak at Farm A",
      "Compliance log missing at Farm B",
    ]);

    setGuidelines(["Vaccination Protocol 2025", "Pest Management Guidelines"]);

    setReports([
      { name: "Farm A Report", link: "#" },
      { name: "Farm B Report", link: "#" },
    ]);

    const highRisk = farms.filter((f) => f.risk === "High").length;
    const mediumRisk = farms.filter((f) => f.risk === "Medium").length;
    const lowRisk = farms.filter((f) => f.risk === "Low").length;
    const pendingActionsCount = actions.filter(
      (a) => a.status === "Pending"
    ).length;

    setDashboardMetrics({
      totalFarms: farms.length,
      highRiskFarms: highRisk,
      mediumRiskFarms: mediumRisk,
      lowRiskFarms: lowRisk,
      pendingLogs: logs.length,
      pendingActions: pendingActionsCount,
    });
  }, []);

  const markActionCompleted = (index) => {
    const updatedActions = [...correctiveActions];
    updatedActions[index].status = "Completed";
    setCorrectiveActions(updatedActions);
  };

  const updateFarmRisk = (index, newRisk) => {
    const updatedFarms = [...linkedFarms];
    updatedFarms[index].risk = newRisk;
    setLinkedFarms(updatedFarms);
  };

  const Card = ({ children }) => (
    <div className="bg-white p-4 rounded shadow hover:shadow-md transition">
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow p-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-semibold">{t("vetDashboard.title")}</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{user?.name}</span>
          <button
            onClick={handleLogout}
            className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600"
          >
            {t("vetDashboard.logout")}
          </button>
        </div>
      </header>

      <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dashboard Metrics */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">
            {t("vetDashboard.metrics")}
          </h2>
          <ul className="space-y-1">
            <li>{t("vetDashboard.totalFarms")}: {dashboardMetrics.totalFarms}</li>
            <li>{t("vetDashboard.highRisk")}: {dashboardMetrics.highRiskFarms}</li>
            <li>{t("vetDashboard.mediumRisk")}: {dashboardMetrics.mediumRiskFarms}</li>
            <li>{t("vetDashboard.lowRisk")}: {dashboardMetrics.lowRiskFarms}</li>
            <li>{t("vetDashboard.pendingLogs")}: {dashboardMetrics.pendingLogs}</li>
            <li>{t("vetDashboard.pendingActions")}: {dashboardMetrics.pendingActions}</li>
          </ul>
        </Card>

        {/* Linked Farms */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">{t("vetDashboard.linkedFarms")}</h2>
          <ul className="space-y-2">
            {linkedFarms.map((farm, idx) => (
              <li key={idx} className="p-3 border rounded bg-gray-50 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{farm.name}</p>
                  <p>{t("vetDashboard.type")}: {farm.type}</p>
                  <p>
                    {t("vetDashboard.risk")}:{" "}
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

        {/* Compliance Logs */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">{t("vetDashboard.logs")}</h2>
          <table className="w-full text-left border border-gray-200 rounded">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border-b">{t("vetDashboard.farmer")}</th>
                <th className="p-2 border-b">{t("vetDashboard.farm")}</th>
                <th className="p-2 border-b">{t("vetDashboard.submittedAt")}</th>
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

        {/* Corrective Actions */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">{t("vetDashboard.actions")}</h2>
          <ul className="space-y-2">
            {correctiveActions.map((action, idx) => (
              <li key={idx} className="p-3 border rounded bg-gray-50 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{action.farm}</p>
                  <p>{action.action}</p>
                </div>
                <button
                  onClick={() => markActionCompleted(idx)}
                  disabled={action.status === "Completed"}
                  className={`px-3 py-1 rounded text-white ${
                    action.status === "Completed" ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {action.status === "Completed"
                    ? t("vetDashboard.completed")
                    : t("vetDashboard.markCompleted")}
                </button>
              </li>
            ))}
          </ul>
        </Card>

        {/* Alerts */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">{t("vetDashboard.alerts")}</h2>
          <ul className="space-y-2">
            {alerts.map((alert, idx) => (
              <li key={idx} className="p-2 border rounded bg-red-50 text-red-800">{alert}</li>
            ))}
          </ul>
        </Card>

        {/* Guidelines */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">{t("vetDashboard.guidelines")}</h2>
          <ul className="space-y-2 list-disc list-inside">
            {guidelines.map((g, idx) => (
              <li key={idx}>{g}</li>
            ))}
          </ul>
        </Card>

        {/* Reports */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">{t("vetDashboard.reports")}</h2>
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
