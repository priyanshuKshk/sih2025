import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './pages/Dashboard'
import Home from './Pages/Home'
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
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/farm" element={<FarmPage />} />
      <Route path="/farmlist" element={<FarmList />} />
      <Route path="/farmform" element={<FarmForm />} />

    </Routes>
  </AuthProvider>
)
}