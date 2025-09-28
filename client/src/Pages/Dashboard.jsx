// src/pages/Dashboard.jsx
import React from 'react'
import { useAuth } from '../context/AuthContext'
import FarmList from '../components/farm/FarmList'

export default function Dashboard() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6">Farm Biosecurity</h2>
        <nav className="space-y-3">
          <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-100">Dashboard</button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-100">Farms</button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-100">Reports</button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-100">Training</button>
        </nav>
        <div className="mt-8">
          <p className="text-sm text-gray-500">Logged in as</p>
          <p className="font-medium">{user?.name}</p>
          <button
            onClick={logout}
            className="mt-3 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {/* Header for small screens */}
        <header className="md:hidden flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Farm Biosecurity</h1>
          <button
            onClick={logout}
            className="py-1 px-3 border rounded bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </header>

        {/* Dashboard summary */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white shadow rounded-xl p-4">
            <h3 className="text-sm text-gray-500">Total Farms</h3>
            <p className="text-2xl font-bold text-blue-600">5</p>
          </div>
          <div className="bg-white shadow rounded-xl p-4">
            <h3 className="text-sm text-gray-500">Active Alerts</h3>
            <p className="text-2xl font-bold text-red-500">2</p>
          </div>
          <div className="bg-white shadow rounded-xl p-4">
            <h3 className="text-sm text-gray-500">Training Modules Completed</h3>
            <p className="text-2xl font-bold text-green-600">8</p>
          </div>
        </section>

        {/* Your farms */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Your Farms</h2>
          <FarmList />
        </section>

        {/* Competitor & Market Analysis */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Competitor Landscape</h2>

          {/* Direct Competitors */}
          <div className="mb-6">
            <h3 className="text-md font-bold text-blue-700 mb-2">Direct Competitors</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-white p-4 rounded-xl shadow">
                <h4 className="font-semibold">Farm Health Guardian</h4>
                <p className="text-sm text-gray-600">Strengths: Proven PRRS prevention, GPS tracking, compliance reporting</p>
                <p className="text-sm text-gray-600">Gaps: Expensive, large-farm focused, US market only</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow">
                <h4 className="font-semibold">LANXESS Biosecurity Solutions</h4>
                <p className="text-sm text-gray-600">Strengths: Product tools, disease alerts</p>
                <p className="text-sm text-gray-600">Gaps: Product-centric, limited training</p>
              </div>
            </div>
          </div>

          {/* Indirect Competitors */}
          <div>
            <h3 className="text-md font-bold text-green-700 mb-2">Indirect Competitors</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-white p-4 rounded-xl shadow">
                <h4 className="font-semibold">Farmonaut</h4>
                <p className="text-sm text-gray-600">Strengths: IoT + satellite farm analytics</p>
                <p className="text-sm text-gray-600">Gaps: Expensive tech, not biosecurity-focused</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow">
                <h4 className="font-semibold">AgriWebb & Mobble</h4>
                <p className="text-sm text-gray-600">Strengths: Livestock management & grazing optimization</p>
                <p className="text-sm text-gray-600">Gaps: Not disease-prevention focused</p>
              </div>
            </div>
          </div>

          {/* Market Gap */}
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4 shadow">
            <h3 className="text-md font-bold text-yellow-800 mb-2">Market Gap</h3>
            <p className="text-gray-700 text-sm">
              There is a clear need for a **dedicated biosecurity management platform** that is affordable, farmer-friendly, and tailored to smallholders in resource-constrained environments.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
