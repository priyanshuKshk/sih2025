import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import FarmForm from './FarmForm'


export default function FarmList() {
const [farms, setFarms] = useState([])
const [loading, setLoading] = useState(true)


const fetchFarms = async () => {
setLoading(true)
try {
const res = await api.get('/farms')
setFarms(res.data || [])
} catch (err) {
console.error(err)
} finally { setLoading(false) }
}


useEffect(() => { fetchFarms() }, [])


return (
<div>
<FarmForm onCreated={fetchFarms} />
{loading ? (
<div className="p-4 bg-white rounded shadow">Loading farms...</div>
) : (
<div className="grid gap-4 mt-4">
{farms.length === 0 && <div className="p-4 bg-white rounded shadow">No farms yet</div>}
{farms.map(f => (
<div key={f._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
<div>
<div className="font-medium">{f.name}</div>
<div className="text-sm text-slate-500">{f.type} • {f.location?.address || 'No address'}</div>
</div>
<div className="flex gap-2">
<Link to={`/farm/${f._id}`} className="py-1 px-3 border rounded">Open</Link>
</div>
</div>
))}
</div>
)}
</div>
)
}