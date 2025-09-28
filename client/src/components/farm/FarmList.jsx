import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../../services/api"
import FarmForm from "./FarmForm"

export default function FarmList() {
  const [farms, setFarms] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchFarms = async () => {
    setLoading(true)
    try {
      const res = await api.get("/farms")
      setFarms(res.data || [])
    } catch (err) {
      console.error("Failed to fetch farms:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFarms()
  }, [])

  return (
    <div className="p-6">
      {/* Add New Farm Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Add New Farm</h2>
        <FarmForm onCreated={fetchFarms} />
      </div>

      {/* Farm List */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Your Farms</h2>
        {loading ? (
          <div className="p-4 bg-white rounded shadow">Loading farms...</div>
        ) : farms.length === 0 ? (
          <div className="p-4 bg-white rounded shadow">No farms yet</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {farms.map((f) => (
              <div
                key={f._id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="font-medium text-lg">{f.name}</div>
                  <div className="text-sm text-slate-500">
                    {f.type} • {f.location?.address || "No address"}
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Link
                    to={`/farm/${f._id}`}
                    className="py-1 px-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Open
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
