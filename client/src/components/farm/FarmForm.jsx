import React, { useState } from "react"
import api from "../../services/api"
import indiaRegions from "../../constants/indiaRegions"

export default function FarmForm({ onCreated }) {
  const [form, setForm] = useState({
    name: "",
    type: "",
    address: "",
    state: "",
    district: "",
    size: "",
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Basic validation
    if (!form.name || !form.type || !form.address || !form.state || !form.district || !form.size) {
      setError("Please fill all required fields")
      return
    }

    setLoading(true)
    setError(null)
    try {
      const payload = {
        name: form.name,
        type: form.type,
        location: {
          address: form.address,
          state: form.state,
          district: form.district,
        },
        size: {
          count: parseInt(form.size),
        },
      }
      await api.post("/farms", payload)
      setForm({
        name: "",
        type: "",
        address: "",
        state: "",
        district: "",
        size: "",
      })
      if (onCreated) onCreated()
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.detail || "Failed to create farm")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow space-y-3"
    >
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>
      )}

      <input
        name="name"
        placeholder="Farm Name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        name="type"
        placeholder="Farm Type (Pig / Poultry)"
        value={form.type}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        name="address"
        placeholder="Farm Address"
        value={form.address}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      {/* State Dropdown */}
      <select
        name="state"
        value={form.state}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="">Select State</option>
        {Object.keys(indiaRegions).map((st) => (
          <option key={st} value={st}>
            {st}
          </option>
        ))}
      </select>

      {/* District Dropdown */}
      {form.state && (
        <select
          name="district"
          value={form.district}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select District</option>
          {indiaRegions[form.state].map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      )}

      <input
        name="size"
        type="number"
        min="1"
        placeholder="Number of Animals"
        value={form.size}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {loading ? "Adding..." : "Add Farm"}
      </button>
    </form>
  )
}
