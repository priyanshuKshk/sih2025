// src/pages/farm/FarmList.jsx
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"   // ✅ i18n hook
import api from "../../services/api"

// ✨ Inline FarmForm with proper labels
function FarmForm({ onCreated }) {
  const { t } = useTranslation()  // ✅ Use translation
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    address: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post("/farms", formData)
      onCreated()
      setFormData({ name: "", type: "", address: "" })
    } catch (err) {
      alert(t("farmList.errors.createFailed"))
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="farm-name" className="block text-sm font-medium text-gray-700 mb-1">
          {t("farmList.form.name")} *
        </label>
        <input
          id="farm-name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
          placeholder={t("farmList.form.namePlaceholder")}
        />
      </div>

      <div>
        <label htmlFor="farm-type" className="block text-sm font-medium text-gray-700 mb-1">
          {t("farmList.form.type")}
        </label>
        <select
          id="farm-type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
        >
          <option value="">{t("farmList.form.selectType")}</option>
          <option value="Dairy">{t("farmList.types.dairy")}</option>
          <option value="Poultry">{t("farmList.types.poultry")}</option>
          <option value="Crop">{t("farmList.types.crop")}</option>
          <option value="Mixed">{t("farmList.types.mixed")}</option>
          <option value="Aquaculture">{t("farmList.types.aquaculture")}</option>
          <option value="Other">{t("farmList.types.other")}</option>
        </select>
      </div>

      <div>
        <label htmlFor="farm-address" className="block text-sm font-medium text-gray-700 mb-1">
          {t("farmList.form.address")}
        </label>
        <textarea
          id="farm-address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows="2"
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
          placeholder={t("farmList.form.addressPlaceholder")}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2.5 px-4 rounded-lg font-medium text-white transition ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? t("farmList.form.creating") : t("farmList.form.add")}
      </button>
    </form>
  )
}

// ✅ Main FarmList Component
export default function FarmList() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [farms, setFarms] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchFarms = async () => {
    setLoading(true)
    try {
      const res = await api.get("/farms")
      setFarms(res.data || [])
    } catch (err) {
      console.error(t("farmList.errors.fetchFailed"), err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFarms()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 relative">
      {/* Back to Dashboard Button */}
      <button
        onClick={() => navigate("/farmer-dashboard")}
        className="absolute top-4 left-4 flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
      >
        ← {t("farmList.back")}
      </button>

      <div className="max-w-6xl mx-auto pt-2">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {t("farmList.title")}
          </h1>
          <p className="text-gray-600 mt-1">{t("farmList.subtitle")}</p>
        </div>

        {/* Add New Farm Section */}
        <section className="mb-10 bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span>➕</span> {t("farmList.addSection")}
          </h2>
          <div className="border-t border-gray-100 pt-4">
            <FarmForm onCreated={fetchFarms} />
          </div>
        </section>

        {/* Farm List Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">{t("farmList.listTitle")}</h2>
            {farms.length > 0 && (
              <span className="text-sm text-gray-500">
                {farms.length} {t("farmList.count", { count: farms.length })}
              </span>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 animate-pulse">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                  <div className="h-8 bg-gray-200 rounded w-20 ml-auto"></div>
                </div>
              ))}
            </div>
          ) : farms.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">{t("farmList.noFarmsTitle")}</h3>
              <p className="text-gray-600 mb-4">{t("farmList.noFarmsDesc")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {farms.map((f) => (
                <div
                  key={f._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col"
                >
                  <div className="p-5 flex-grow">
                    <h3 className="font-semibold text-gray-800 text-lg mb-1 truncate">{f.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{f.type || t("farmList.defaultType")}</p>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {f.location?.address || t("farmList.noAddress")}
                    </p>
                  </div>
                  <div className="px-5 pb-5 mt-auto">
                    <Link
                      to={`/farm/${f._id}`}
                      className="w-full block text-center py-2 px-4 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition"
                    >
                      {t("farmList.viewDetails")}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
