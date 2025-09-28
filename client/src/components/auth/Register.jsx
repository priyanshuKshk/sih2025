import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../services/api'


export default function Register() {
const navigate = useNavigate()
const [form, setForm] = useState({ name: '', email: '', password: '', role: 'farmer' })
const [error, setError] = useState(null)


const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })


const submit = async (e) => {
e.preventDefault()
try {
await api.post('/auth/register', form)
navigate('/login')
} catch (err) {
setError(err.response?.data?.detail || 'Registration failed')
}
}


return (
<div className="min-h-screen flex items-center justify-center p-4">
<form onSubmit={submit} className="w-full max-w-md bg-white p-6 rounded-lg shadow">
<h2 className="text-2xl font-semibold mb-4">Create account</h2>
{error && <div className="bg-red-100 text-red-700 p-2 rounded mb-3">{error}</div>}
<input name="name" placeholder="Full name" className="w-full p-2 border rounded mb-3" value={form.name} onChange={handleChange} />
<input name="email" placeholder="Email" className="w-full p-2 border rounded mb-3" value={form.email} onChange={handleChange} />
<input name="password" type="password" placeholder="Password" className="w-full p-2 border rounded mb-3" value={form.password} onChange={handleChange} />
<select name="role" value={form.role} onChange={handleChange} className="w-full p-2 border rounded mb-4">
<option value="farmer">Farmer</option>
<option value="vet">Veterinarian</option>
<option value="ext_worker">Extension Worker</option>
</select>
<button className="w-full p-2 bg-green-600 text-white rounded">Register</button>
<div className="text-sm mt-3 text-center">
<Link to="/login" className="text-blue-600">Already have an account?</Link>
</div>
</form>
</div>
)
}