import React from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import Chatbot from "./Chatbot"

export default function Home() {
  const { t, i18n } = useTranslation()

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
    localStorage.setItem("lang", lang)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-lg md:text-xl max-w-2xl mb-6">{t("subtitle")}</p>
          <div className="space-x-4">
            <Link to="/login" className="bg-white text-green-700 px-6 py-3 rounded-lg shadow">
              {t("login")}
            </Link>
            <Link to="/register" className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg shadow">
              {t("register")}
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">{t("why_choose")}</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
              <h3 className="font-semibold text-lg mb-2 text-green-700">🛡 {t("risk_assessment")}</h3>
              <p className="text-gray-600 text-sm">{t("risk_assessment_desc")}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
              <h3 className="font-semibold text-lg mb-2 text-blue-700">📚 {t("training")}</h3>
              <p className="text-gray-600 text-sm">{t("training_desc")}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
              <h3 className="font-semibold text-lg mb-2 text-purple-700">✅ {t("compliance")}</h3>
              <p className="text-gray-600 text-sm">{t("compliance_desc")}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
              <h3 className="font-semibold text-lg mb-2 text-red-700">🚨 {t("alerts")}</h3>
              <p className="text-gray-600 text-sm">{t("alerts_desc")}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
              <h3 className="font-semibold text-lg mb-2 text-yellow-600">🌍 {t("multilingual")}</h3>
              <p className="text-gray-600 text-sm">{t("multilingual_desc")}</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-green-700 text-white py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("cta_title")}</h2>
          <p className="mb-6">{t("cta_subtitle")}</p>
          <Link to="/register" className="bg-white text-green-700 px-8 py-3 rounded-lg shadow">
            {t("cta_button")}
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6">
        <p>&copy; {new Date().getFullYear()} {t("footer")}</p>
      </footer>

      <Chatbot />
    </div>
  )
}
