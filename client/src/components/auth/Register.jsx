import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ✅ import i18n hook
import api from "../../services/api";
import indiaRegions from "../../constants/indiaRegions";

export default function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation(); // ✅ hook for translations
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "farmer",
    farmName: "",
    district: "",
    region: "",
    state: ""
  });
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed");
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  // ✅ Conditional fields with translations
  const renderRoleFields = () => {
    switch (form.role) {
      case "farmer":
        return (
          <div className="mb-3">
            <label htmlFor="farmName" className="block text-sm font-medium text-gray-700 mb-1">
              {t("farmName")}
            </label>
            <input
              id="farmName"
              name="farmName"
              placeholder={t("enterFarmName")}
              className="w-full p-2 border rounded"
              value={form.farmName}
              onChange={handleChange}
            />
          </div>
        );
      case "vet":
        return (
          <div className="mb-3">
            <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
              {t("districtAssigned")}
            </label>
            <input
              id="district"
              name="district"
              placeholder={t("enterDistrictAssigned")}
              className="w-full p-2 border rounded"
              value={form.district}
              onChange={handleChange}
            />
          </div>
        );
      case "ext_worker":
        return (
          <div className="mb-3">
            <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
              {t("regionAssigned")}
            </label>
            <input
              id="region"
              name="region"
              placeholder={t("enterRegionAssigned")}
              className="w-full p-2 border rounded"
              value={form.region}
              onChange={handleChange}
            />
          </div>
        );
      case "district_admin":
        return (
          <div className="mb-3">
            <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
              {t("districtName")}
            </label>
            <input
              id="district"
              name="district"
              placeholder={t("enterDistrictName")}
              className="w-full p-2 border rounded"
              value={form.district}
              onChange={handleChange}
            />
          </div>
        );
      case "national_admin":
        return (
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("assignment")}
            </label>
            <p className="text-sm text-gray-500">{t("assignmentNote")}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Back to Home Button */}
      <button
        onClick={handleBackToHome}
        className="absolute top-4 left-4 text-blue-600 hover:text-blue-800 font-medium flex items-center"
      >
        ← {t("backToHome")}
      </button>

      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-semibold mb-4">{t("createAccount")}</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
        )}

        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            {t("fullName")}
          </label>
          <input
            id="name"
            name="name"
            placeholder={t("enterFullName")}
            className="w-full p-2 border rounded"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            {t("email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder={t("enterEmail")}
            className="w-full p-2 border rounded"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* Mobile */}
        <div className="mb-3">
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
            {t("mobile")}
          </label>
          <input
            id="mobile"
            name="mobile"
            type="tel"
            placeholder={t("enterMobile")}
            className="w-full p-2 border rounded"
            value={form.mobile}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            {t("password")}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder={t("createPassword")}
            className="w-full p-2 border rounded"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        {/* Role */}
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            {t("role")}
          </label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="farmer">{t("farmer")}</option>
            <option value="vet">{t("vet")}</option>
            <option value="ext_worker">{t("extWorker")}</option>
            <option value="district_admin">{t("districtAdmin")}</option>
            <option value="national_admin">{t("nationalAdmin")}</option>
          </select>
        </div>

        {/* State Select */}
        <div className="mb-3">
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
            {t("state")}
          </label>
          <select
            id="state"
            name="state"
            value={form.state || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">{t("selectState")}</option>
            {Object.keys(indiaRegions).map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

        {/* District Select */}
        {form.state && (
          <div className="mb-3">
            <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
              {t("district")}
            </label>
            <select
              id="district"
              name="district"
              value={form.district || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">{t("selectDistrict")}</option>
              {indiaRegions[form.state].map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        )}

        {/* Conditional fields */}
        {renderRoleFields()}

        {/* Submit */}
        <button
          type="submit"
          className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          {t("register")}
        </button>

        <div className="text-sm mt-4 text-center">
          <Link to="/login" className="text-blue-600 hover:underline">
            {t("alreadyAccount")}
          </Link>
        </div>
      </form>
    </div>
  );
}
