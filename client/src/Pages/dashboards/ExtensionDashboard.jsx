import React from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function ExtensionDashboard() {
  const { user, logout } = useAuth()
const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/login") // redirect to login after logout
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4 flex items-center justify-between">
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

      <main className="p-6 space-y-6">
        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Assigned Region</h2>
          <p>View farms in your assigned area for outreach activities.</p>
        </section>

        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Training Sessions</h2>
          <p>Schedule and conduct farmer training sessions.</p>
        </section>
      </main>
    </div>
  )
}
