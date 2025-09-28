import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/api'


export default function FarmPage() {
const { id } = useParams()
const [farm, setFarm] = useState(null)


useEffect(() => {
const fetch = async () => {
try {
const res = await api.get(`/farms/${id}`)
setFarm(res.data)
} catch (err) {
console.error(err)
}
}
fetch()
}, [id])


if (!farm) return <div className="p-4">Loading...</div>


return (
<div className="p-4">
<h2 className="text-xl font-semibold">{farm.name}</h2>
<div className="mt-2 bg-white p-4 rounded shadow">
<div><strong>Type:</strong> {farm.type}</div>
<div><strong>Address:</strong> {farm.location?.address}</div>
<div><strong>Count:</strong> {farm.size?.count || '—'}</div>
</div>


<section className="mt-4">
<h3 className="font-medium">Assessments</h3>
<p className="text-sm text-slate-500">(Assessment UI will go here)</p>
</section>
</div>
)
}