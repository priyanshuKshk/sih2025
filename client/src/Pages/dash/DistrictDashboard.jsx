import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useTranslation } from "react-i18next";
import "../../i18n"; // import i18n config

export default function DistrictDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // State
  const [overview, setOverview] = useState({});
  const [complianceLogs, setComplianceLogs] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [complianceSummary, setComplianceSummary] = useState([]);

  useEffect(() => {
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

  const handleApprove = (index) => {
    const updated = [...complianceLogs];
    updated[index].status = "Approved";
    setComplianceLogs(updated);
  };

  const handleReject = (index) => {
    const updated = [...complianceLogs];
    updated[index].status = "Rejected";
    setComplianceLogs(updated);
  };

  const acknowledgeAlert = (index) => {
    const updatedAlerts = [...alerts];
    updatedAlerts[index].acknowledged = true;
    setAlerts(updatedAlerts);
  };

  const Card = ({ children }) => (
    <div className="bg-white p-4 rounded shadow hover:shadow-md transition">{children}</div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow p-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-semibold">{t("districtDashboard.title")}</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{user?.name}</span>
          <button
            onClick={handleLogout}
            className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600"
          >
            {t("districtDashboard.logout")}
          </button>
        </div>
      </header>

      <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Overview Metrics */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">{t("districtDashboard.overview")}</h2>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(overview).map(([key, value], idx) => (
              <div key={idx} className="p-3 border rounded-lg bg-gray-50 text-center hover:bg-gray-100">
                <p className="text-sm text-gray-500">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                <p className="text-xl font-bold">{value}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Compliance Summary */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">{t("districtDashboard.complianceSummary")}</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={complianceSummary}>
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Compliance Logs */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">{t("districtDashboard.pendingLogs")}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-200 rounded">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border-b">{t("districtDashboard.farmer")}</th>
                  <th className="p-2 border-b">{t("districtDashboard.farm")}</th>
                  <th className="p-2 border-b">{t("districtDashboard.type")}</th>
                  <th className="p-2 border-b">{t("districtDashboard.submittedAt")}</th>
                  <th className="p-2 border-b">{t("districtDashboard.status")}</th>
                  <th className="p-2 border-b">{t("districtDashboard.actions")}</th>
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
                            {t("districtDashboard.approve")}
                          </button>
                          <button
                            onClick={() => handleReject(idx)}
                            className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                          >
                            {t("districtDashboard.reject")}
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

        {/* Risk Map */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">{t("districtDashboard.riskMap")}</h2>
          <div className="h-60 bg-gray-100 flex items-center justify-center rounded">
            <p className="text-gray-500">{t("districtDashboard.riskMapPlaceholder")}</p>
          </div>
        </Card>

        {/* Alerts */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">{t("districtDashboard.alerts")}</h2>
          <ul className="space-y-2">
            {alerts.map((a, idx) => (
              <li
                key={idx}
                className={`p-2 border rounded flex justify-between items-center ${
                  a.acknowledged ? "bg-green-50 text-green-800" : "bg-yellow-50 text-yellow-800"
                }`}
              >
                <span>{a.message}</span>
                {!a.acknowledged && (
                  <button
                    onClick={() => acknowledgeAlert(idx)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    {t("districtDashboard.acknowledge")}
                  </button>
                )}
                {a.acknowledged && (
                  <span className="text-sm font-semibold">{t("districtDashboard.acknowledged")}</span>
                )}
              </li>
            ))}
          </ul>
        </Card>

        {/* User Management */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">{t("districtDashboard.userManagement")}</h2>
          <div className="flex gap-3 flex-wrap">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              {t("districtDashboard.addFarmer")}
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              {t("districtDashboard.addVet")}
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
              {t("districtDashboard.addExtWorker")}
            </button>
          </div>
        </Card>

        {/* Reports & Exports */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">{t("districtDashboard.reportsExports")}</h2>
          <div className="flex gap-3 flex-wrap">
            <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900">
              {t("districtDashboard.generateCSV")}
            </button>
            <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800">
              {t("districtDashboard.generatePDF")}
            </button>
          </div>
        </Card>
      </main>
    </div>
  );
}
