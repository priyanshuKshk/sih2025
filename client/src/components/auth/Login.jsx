import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()
  const [role, setRole] = useState("Farmer")

  const handleSubmit = (e) => {
    e.preventDefault()

    // Redirect user based on role only
    switch (role) {
      case "Farmer":
        navigate("/farmer-dashboard")
        break
      case "Veterinarian":
        navigate("/vet-dashboard")
        break
      case "Extension Worker":
        navigate("/extension-dashboard")
        break
      case "District Admin":
        navigate("/district-dashboard")
        break
      case "National Admin":
        navigate("/national-dashboard")
        break
      default:
        navigate("/")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-semibold mb-4">Select Role & Login</h2>

        {/* Role Selection */}
        <label className="block mb-2 text-sm">Role</label>
        <select
          className="w-full p-2 border rounded mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Farmer">Farmer</option>
          <option value="Veterinarian">Veterinarian</option>
          <option value="Extension Worker">Extension Worker</option>
          <option value="District Admin">District Admin</option>
          <option value="National Admin">National Admin</option>
        </select>

        {/* Submit */}
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  )
}
