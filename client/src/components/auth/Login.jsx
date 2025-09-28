import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("Farmer");
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Redirect user based on role only
    switch (role) {
      case "Farmer":
        navigate("/farmer-dashboard");
        break;
      case "Veterinarian":
        navigate("/vet-dashboard");
        break;
      case "Extension Worker":
        navigate("/extension-dashboard");
        break;
      case "District Admin":
        navigate("/district-dashboard");
        break;
      case "National Admin":
        navigate("/national-dashboard");
        break;
      default:
        navigate("/");
    }
  };

  const handleBackToHome = () => {
    navigate("/");
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
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-semibold mb-4">{t("selectRoleLogin")}</h2>

        {/* Role Selection */}
        <label
          htmlFor="role"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          {t("role")}
        </label>
        <select
          id="role"
          className="w-full p-2 border rounded mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Farmer">{t("farmer")}</option>
          <option value="Veterinarian">{t("veterinarian")}</option>
          <option value="Extension Worker">{t("extensionWorker")}</option>
          <option value="District Admin">{t("districtAdmin")}</option>
          <option value="National Admin">{t("nationalAdmin")}</option>
        </select>

        {/* Submit */}
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {t("login")}
        </button>

        {/* Register Link */}
        <div className="text-sm mt-4 text-center">
          <p className="text-gray-600">
            {t("noAccount")}{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              {t("registerHere")}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
