import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ✅ i18n

export default function FarmPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [farm, setFarm] = useState(null);
  const [logs, setLogs] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    setFarm({
      name: "Sunnydale Farm",
      type: "Dairy & Crop",
      owner: { name: "John Doe" },
      location: { address: "123 Farm Lane, Green Valley" },
      size: { count: 50, unit: "animals" },
      livestock: ["Cows", "Goats"],
      crops: ["Maize", "Wheat"],
    });

    setLogs([
      { id: 1, description: t("farmPage.logs.monthlyHealth"), status: "Pending" },
      { id: 2, description: t("farmPage.logs.waterReport"), status: "Approved" },
      { id: 3, description: t("farmPage.logs.feedInspection"), status: "Rejected" },
    ]);

    setAssessments([
      { id: 1, title: t("farmPage.assessments.footMouth"), risk: "High" },
      { id: 2, title: t("farmPage.assessments.waterContamination"), risk: "Medium" },
      { id: 3, title: t("farmPage.assessments.cropDisease"), risk: "Low" },
    ]);

    setTrainings([
      { title: t("farmPage.trainings.vaccination"), progress: 80 },
      { title: t("farmPage.trainings.cropManagement"), progress: 40 },
    ]);

    setAlerts([
      { id: 1, title: t("farmPage.alerts.footMouthTitle"), message: t("farmPage.alerts.footMouthMessage") },
      { id: 2, title: t("farmPage.alerts.waterAlertTitle"), message: t("farmPage.alerts.waterAlertMessage") },
    ]);
  }, [t]);

  if (!farm) return <div className="p-4 text-gray-500">{t("farmPage.loading")}</div>;

  const Card = ({ children }) => (
    <section className="bg-white p-6 rounded-lg shadow">{children}</section>
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate("/farmer-dashboard")}
        className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 mb-4"
      >
        ← {t("farmPage.back")}
      </button>

      {/* Farm Basic Info */}
      <Card>
        <h2 className="text-2xl font-semibold mb-3">{farm.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div><strong>{t("farmPage.info.type")}:</strong> {farm.type}</div>
          <div><strong>{t("farmPage.info.owner")}:</strong> {farm.owner?.name || "—"}</div>
          <div><strong>{t("farmPage.info.address")}:</strong> {farm.location?.address || "—"}</div>
          <div><strong>{t("farmPage.info.size")}:</strong> {farm.size?.count || "—"} {farm.size?.unit || t("farmPage.units.default")}</div>
          <div><strong>{t("farmPage.info.livestock")}:</strong> {farm.livestock.join(", ")}</div>
          <div><strong>{t("farmPage.info.crops")}:</strong> {farm.crops.join(", ")}</div>
        </div>
      </Card>

      {/* Compliance Logs */}
      <Card>
        <h3 className="text-xl font-semibold mb-3">{t("farmPage.logs.title")}</h3>
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
        <h3 className="text-xl font-semibold mb-3">{t("farmPage.assessments.title")}</h3>
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
        <h3 className="text-xl font-semibold mb-3">{t("farmPage.trainings.title")}</h3>
        <ul className="space-y-2">
          {trainings.map((tModule, idx) => (
            <li key={idx} className="p-2 border rounded bg-gray-50">
              <div className="flex justify-between items-center">
                <span>{tModule.title}</span>
                <span className="text-sm text-gray-600">{tModule.progress}% {t("farmPage.trainings.completed")}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded mt-1">
                <div className="h-2 bg-green-500 rounded" style={{ width: `${tModule.progress}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {/* Alerts & Notifications */}
      <Card>
        <h3 className="text-xl font-semibold mb-3">{t("farmPage.alerts.title")}</h3>
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
        <h3 className="text-xl font-semibold mb-3">{t("farmPage.actions.title")}</h3>
        <div className="flex flex-col gap-2">
          <button className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700">{t("farmPage.actions.submitLog")}</button>
          <button className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{t("farmPage.actions.requestVet")}</button>
          <button className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">{t("farmPage.actions.scheduleInspection")}</button>
        </div>
      </Card>
    </div>
  );
}
