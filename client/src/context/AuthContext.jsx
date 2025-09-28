import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api'


const AuthContext = createContext()


export function AuthProvider({ children }) {
const [user, setUser] = useState(() => {
const raw = localStorage.getItem('fb_user')
return raw ? JSON.parse(raw) : null
})


useEffect(() => {
localStorage.setItem('fb_user', JSON.stringify(user))
}, [user])


const login = async (email, password) => {
const res = await api.post('/auth/login', { email, password })
// assume API returns { access_token, user }
localStorage.setItem('fb_token', res.data.access_token)
setUser(res.data.user)
return res.data
}


const logout = () => {
localStorage.removeItem('fb_token')
setUser(null)
}


return (
    <AuthContext.Provider value={{ user, login, logout }}>
    {children}
    </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext)