import React, { useState } from 'react'
import api from '../../services/api'


export default function FarmForm({ onCreated }) {
const [form, setForm] = useState({ name: '', type: 'poultry', address: '', count: '' })
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)


const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })


const submit = async (e) => {
e.preventDefault()
setLoading(true)
setError(null)
try {
await api.post('/farms', {
name: form.name,
type: form.type,
location: { address: form.address },
size: { count: Number(form.count) }
})
setForm({ name: '', type: 'poultry', address: '', count: '' })
onCreated?.()
} catch (err) {
setError(err.response?.data?.detail || 'Create failed')
} finally { setLoading(false) }
}


return (
<form onSubmit={submit} className="bg-white p-4 rounded shadow">
<div className="grid grid-cols-1 md:grid-cols-4 gap-2">
<input name="name" placeholder="Farm name" className="p-2 border rounded col-span-2" value={form.name} onChange={handle} required />
<select name="type" value={form.type} onChange={handle} className="p-2 border rounded">
<option value="poultry">Poultry</option>
<option value="pig">Pig</option>
</select>
<input name="count" placeholder="Count" className="p-2 border rounded" value={form.count} onChange={handle} />
<input name="address" placeholder="Address" className="p-2 border rounded md:col-span-3" value={form.address} onChange={handle} />
</div>
<div className="mt-3 flex items-center gap-2">
<button className="py-1 px-3 bg-indigo-600 text-white rounded" disabled={loading}>{loading ? 'Saving...' : 'Create Farm'}</button>
{error && <div className="text-red-600 text-sm">{error}</div>}
</div>
</form>
)
}