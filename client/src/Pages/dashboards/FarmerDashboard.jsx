import React from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function FarmerDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/login") // redirect to login after logout
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow p-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-green-700">
          Farmer Dashboard
        </h1>
 
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

      {/* Main Content */}
      <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <section className="bg-white p-5 rounded-lg shadow hover:shadow-md transition">
  <h2 className="text-lg font-semibold mb-2">Discussion Forum</h2>
  <p className="text-gray-600 mb-3">Share ideas and updates with other farmers.</p>
  <button
    onClick={() => navigate("/discussion")}
    className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
  >
    Go to Forum
  </button>
</section>
        {/* Farm Overview */}
        <section className="bg-white p-5 rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-lg font-semibold mb-2">Farm Overview</h2>
          <p className="text-gray-600 mb-3">
            See overall details and statistics of your farm(s).
          </p>
          <button
            onClick={() => navigate("/farm")}
            className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            View Overview
          </button>
        </section>

        {/* Farm List */}
        <section className="bg-white p-5 rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-lg font-semibold mb-2">Your Farms</h2>
          <p className="text-gray-600 mb-3">
            View and manage all registered farms.
          </p>
          <button
            onClick={() => navigate("/farmlist")}
            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View Farms
          </button>
        </section>
      </main>
    </div>
  )
}
