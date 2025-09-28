import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTranslation } from 'react-i18next'


export default function Login() {
const { t } = useTranslation()
const navigate = useNavigate()
const { login } = useAuth()
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState(null)


const handleSubmit = async (e) => {
e.preventDefault()
try {
await login(email, password)
navigate('/')
} catch (err) {
setError(err.response?.data?.detail || 'Login failed')
}
}


return (
<div className="min-h-screen flex items-center justify-center p-4">
<form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow">
<h2 className="text-2xl font-semibold mb-4">{t('login')}</h2>
{error && <div className="bg-red-100 text-red-700 p-2 rounded mb-3">{error}</div>}
<label className="block mb-2 text-sm">{t('email')}</label>
<input className="w-full p-2 border rounded mb-3" value={email} onChange={e => setEmail(e.target.value)} />
<label className="block mb-2 text-sm">{t('password')}</label>
<input type="password" className="w-full p-2 border rounded mb-4" value={password} onChange={e => setPassword(e.target.value)} />
<button className="w-full p-2 bg-blue-600 text-white rounded">{t('login')}</button>
<div className="text-sm mt-3 text-center">
<Link to="/register" className="text-blue-600">Create account</Link>
</div>
</form>
</div>
)
}