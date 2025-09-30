import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import FarmerDashboard from "./pages/dash/FarmerDashboard.jsx";
import DistrictDashboard from "./pages/dash/DistrictDashboard.jsx";
import ExtensionDashboard from "./pages/dash/ExtensionDashboard.jsx";
import NationalDashboard from "./pages/dash/NationalDashboard.jsx";
import VetDashboard from "./pages/dash/VetDashboard.jsx";
import Home from './pages/Home';
import DiscussionPage from './pages/DiscussionPage';
import FarmPage from './components/farm/FarmPage';
import FarmList from './components/farm/FarmList';
import { AuthProvider, useAuth } from './context/AuthContext'

function PrivateRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <AuthProvider>
      <div className="flex justify-end p-4 gap-2 bg-gray-100">
        <button
          onClick={() => changeLanguage("en")}
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          English
        </button>
        <button
          onClick={() => changeLanguage("hi")}
          className="px-3 py-1 bg-yellow-500 text-white rounded"
        >
          हिन्दी
        </button>
      </div>

      {/* App Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/discussion" element={<DiscussionPage />} />
        <Route path="/vet-dashboard" element={<VetDashboard />} />
        <Route path="/extension-dashboard" element={<ExtensionDashboard />} />
        <Route path="/district-dashboard" element={<DistrictDashboard />} />
        <Route path="/national-dashboard" element={<NationalDashboard />} />
        <Route path="/farm" element={<FarmPage />} />
        <Route path="/farmlist" element={<FarmList />} />
      </Routes>
    </AuthProvider>
  )
}
