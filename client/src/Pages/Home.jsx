import React from "react"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Digital Farm Management for Pig & Poultry Biosecurity
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-6">
            Empowering farmers with tools to protect livestock, improve compliance, and
            prevent disease outbreaks through a user-friendly digital portal.
          </p>
          <div className="space-x-4">
            <Link
              to="/login"
              className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold shadow hover:bg-yellow-300"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">
            Why Choose Our Platform?
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
              <h3 className="font-semibold text-lg mb-2 text-green-700">
                🛡 Risk Assessment
              </h3>
              <p className="text-gray-600 text-sm">
                Customizable tools to assess farm-level biosecurity risks based on local
                conditions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
              <h3 className="font-semibold text-lg mb-2 text-blue-700">
                📚 Training Modules
              </h3>
              <p className="text-gray-600 text-sm">
                Interactive learning resources and best practices for pig and poultry
                farmers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
              <h3 className="font-semibold text-lg mb-2 text-purple-700">
                ✅ Compliance Tracking
              </h3>
              <p className="text-gray-600 text-sm">
                Easy digital record-keeping to meet regulatory requirements and disease-free
                recognition.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
              <h3 className="font-semibold text-lg mb-2 text-red-700">
                🚨 Real-time Alerts
              </h3>
              <p className="text-gray-600 text-sm">
                Stay updated with instant notifications on disease outbreaks and
                biosecurity breaches.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
              <h3 className="font-semibold text-lg mb-2 text-yellow-600">
                🌍 Multilingual & Mobile-first
              </h3>
              <p className="text-gray-600 text-sm">
                Designed for accessibility in rural areas with local language support and
                mobile optimization.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-green-700 text-white py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Started Today</h2>
          <p className="mb-6">
            Join the movement toward healthier farms and stronger biosecurity practices.
          </p>
          <Link
            to="/register"
            className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold shadow hover:bg-gray-100"
          >
            Register Now
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6">
        <p>&copy; {new Date().getFullYear()} Farm Biosecurity Portal. All rights reserved.</p>
      </footer>
    </div>
  )
}
