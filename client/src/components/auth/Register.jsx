import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../../services/api"
import indiaRegions from "../../constants/indiaRegions"

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "farmer",
    farmName: "",
    district: "",
    region: "",
  })
  const [error, setError] = useState(null)

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    try {
      await api.post("/auth/register", form)
      navigate("/login")
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed")
    }
  }

  // Conditional fields based on role
  const renderRoleFields = () => {
    switch (form.role) {
      case "farmer":
        return (
          <input
            name="farmName"
            placeholder="Farm Name"
            className="w-full p-2 border rounded mb-3"
            value={form.farmName}
            onChange={handleChange}
          />
        )
      case "vet":
        return (
          <input
            name="district"
            placeholder="District Assigned"
            className="w-full p-2 border rounded mb-3"
            value={form.district}
            onChange={handleChange}
          />
        )
      case "ext_worker":
        return (
          <input
            name="region"
            placeholder="Region Assigned"
            className="w-full p-2 border rounded mb-3"
            value={form.region}
            onChange={handleChange}
          />
        )
      case "district_admin":
        return (
          <input
            name="district"
            placeholder="District Name"
            className="w-full p-2 border rounded mb-3"
            value={form.district}
            onChange={handleChange}
          />
        )
      case "national_admin":
        return (
          <p className="text-sm text-gray-500 mb-3">
            National Admins are assigned by system config.
          </p>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-semibold mb-4">Create account</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-3">{error}</div>
        )}

        {/* Name */}
        <input
          name="name"
          placeholder="Full name"
          className="w-full p-2 border rounded mb-3"
          value={form.name}
          onChange={handleChange}
        />

        {/* Email */}
        <input
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          value={form.email}
          onChange={handleChange}
        />

        {/* Mobile */}
        <input
          name="mobile"
          placeholder="Mobile Number"
          className="w-full p-2 border rounded mb-3"
          value={form.mobile}
          onChange={handleChange}
        />

        {/* Password */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-3"
          value={form.password}
          onChange={handleChange}
        />

        {/* Role */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="farmer">Farmer</option>
          <option value="vet">Veterinarian</option>
          <option value="ext_worker">Extension Worker</option>
          <option value="district_admin">District Admin</option>
          <option value="national_admin">National Admin</option>
        </select>

        
{/* State Select */}
<select
  name="state"
  value={form.state || ""}
  onChange={handleChange}
  className="w-full p-2 border rounded mb-3"
>
  <option value="">Select State</option>
  {Object.keys(indiaRegions).map((st) => (
    <option key={st} value={st}>{st}</option>
  ))}
</select>

{/* District Select */}
{form.state && (
  <select
    name="district"
    value={form.district || ""}
    onChange={handleChange}
    className="w-full p-2 border rounded mb-3"
  >
    <option value="">Select District</option>
    {indiaRegions[form.state].map((d) => (
      <option key={d} value={d}>{d}</option>
    ))}
  </select>
)}

        {/* Conditional fields */}
        {renderRoleFields()}

        {/* Submit */}
        <button className="w-full p-2 bg-green-600 text-white rounded">
          Register
        </button>

        <div className="text-sm mt-3 text-center">
          <Link to="/login" className="text-blue-600">
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  )
}
