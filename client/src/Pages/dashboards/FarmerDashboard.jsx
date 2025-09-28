import React from "react"
import { useAuth } from "../../context/AuthContext"

export default function FarmerDashboard() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Farmer Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{user?.name}</span>
          <button onClick={logout} className="py-1 px-3 border rounded">
            Logout
          </button>
        </div>
      </header>

      <main className="p-6 space-y-6">
        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Your Farms</h2>
          <p>Manage your farm(s), update compliance logs, and track risks.</p>
        </section>

        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Risk Assessments</h2>
          <p>Perform self-assessments for diseases and biosecurity practices.</p>
        </section>

        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Training & Alerts</h2>
          <p>View training modules and receive real-time alerts.</p>
        </section>
      </main>
    </div>
  )
}
