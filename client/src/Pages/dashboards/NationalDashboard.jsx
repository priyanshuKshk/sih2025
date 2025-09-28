import React from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function NationalDashboard() {
  const { user, logout } = useAuth()
const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/login") // redirect to login after logout
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">National Admin Dashboard</h1>
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

      <main className="p-6 space-y-6">
        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">System Configuration</h2>
          <p>Manage national-level settings and permissions.</p>
        </section>

        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">National Reports</h2>
          <p>View aggregated farm and disease data across all districts.</p>
        </section>

        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Outbreak Feed</h2>
          <p>Monitor and update national disease/outbreak data feeds.</p>
        </section>
      </main>
    </div>
  )
}

