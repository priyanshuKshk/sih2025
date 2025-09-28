import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../services/api"

export default function FarmPage() {
  const { id } = useParams()
  const [farm, setFarm] = useState(null)
  const [logs, setLogs] = useState([])
  const [assessments, setAssessments] = useState([])
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    const fetchFarm = async () => {
      try {
        const res = await api.get(`/farms/${id}`)
        setFarm(res.data)
      } catch (err) {
        console.error("Farm fetch error:", err)
      }
    }

    const fetchLogs = async () => {
      try {
        const res = await api.get(`/farms/${id}/logs`)
        setLogs(res.data || [])
      } catch (err) {
        console.error("Logs fetch error:", err)
      }
    }

    const fetchAssessments = async () => {
      try {
        const res = await api.get(`/farms/${id}/assessments`)
        setAssessments(res.data || [])
      } catch (err) {
        console.error("Assessments fetch error:", err)
      }
    }

    const fetchAlerts = async () => {
      try {
        const res = await api.get(`/farms/${id}/alerts`)
        setAlerts(res.data || [])
      } catch (err) {
        console.error("Alerts fetch error:", err)
      }
    }

    fetchFarm()
    fetchLogs()
    fetchAssessments()
    fetchAlerts()
  }, [id])

  if (!farm) return <div className="p-4">Loading farm details...</div>

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Farm Basic Info */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-3">{farm.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div>
            <strong>Type:</strong> {farm.type}
          </div>
          <div>
            <strong>Owner:</strong> {farm.owner?.name || "—"}
          </div>
          <div>
            <strong>Address:</strong> {farm.location?.address}
          </div>
          <div>
            <strong>Size:</strong> {farm.size?.count || "—"} animals
          </div>
        </div>
      </section>

      {/* Compliance Logs */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-3">Compliance Logs</h3>
        {logs.length === 0 ? (
          <p className="text-gray-500">No compliance logs available.</p>
        ) : (
          <ul className="divide-y">
            {logs.map((log) => (
              <li key={log.id} className="py-2">
                <div className="flex justify-between">
                  <span>{log.description}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(log.date).toLocaleDateString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
        <button className="mt-3 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          + Add Log
        </button>
      </section>

      {/* Risk Assessments */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-3">Risk Assessments</h3>
        {assessments.length === 0 ? (
          <p className="text-gray-500">No risk assessments yet.</p>
        ) : (
          <ul className="divide-y">
            {assessments.map((a) => (
              <li key={a.id} className="py-2">
                <div className="flex justify-between">
                  <span>
                    {a.title} - <span className="text-gray-600">{a.status}</span>
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(a.date).toLocaleDateString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
        <button className="mt-3 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Run New Assessment
        </button>
      </section>

      {/* Alerts */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-3">Training & Alerts</h3>
        {alerts.length === 0 ? (
          <p className="text-gray-500">No alerts or training notifications.</p>
        ) : (
          <ul className="space-y-2">
            {alerts.map((alert) => (
              <li
                key={alert.id}
                className="p-3 rounded bg-yellow-50 border border-yellow-200"
              >
                <strong>{alert.title}</strong>
                <p className="text-sm">{alert.message}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
