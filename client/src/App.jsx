import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import FarmerDashboard from "./pages/dashboards/FarmerDashboard"
import VetDashboard from "./pages/dashboards/VetDashboard"
import ExtensionDashboard from "./pages/dashboards/ExtensionDashboard"
import DistrictDashboard from "./pages/dashboards/DistrictDashboard"
import NationalDashboard from "./pages/dashboards/NationalDashboard"
import Home from './Pages/Home'
import DiscussionPage from './Pages/DiscussionPage'
import FarmPage from './components/farm/FarmPage'
import FarmList from './components/farm/FarmList'
import FarmForm from './components/farm/FarmForm'
import { AuthProvider, useAuth } from './context/AuthContext'



function PrivateRoute({ children }) {
const { user } = useAuth()
if (!user) return <Navigate to="/login" replace />
return children
}


export default function App() {
return (
  <AuthProvider>
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
      <Route path="/farmform" element={<FarmForm />} />

    </Routes>
  </AuthProvider>
)
}