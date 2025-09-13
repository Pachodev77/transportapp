import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function Driver(){
  const [trips, setTrips] = useState([])
  const [accepted, setAccepted] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const token = localStorage.getItem('token')

  useEffect(()=>{ loadPending() }, [refreshKey])

  async function loadPending(){
    try{
      const res = await axios.get('/api/trips/pending')
      setTrips(res.data.trips || [])
    }catch(e){ console.error(e) }
  }

  async function accept(id){
    try{
      const res = await axios.post('/api/trips/'+id+'/accept', { token })
      setAccepted(res.data.trip)
      alert('Viaje aceptado: '+id)
    }catch(e){ alert('Error: '+ (e.response?.data?.error||e.message)) }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 bg-white shadow-md flex items-center justify-between">
        <h1 className="text-xl font-semibold">Conductor</h1>
        <div>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={()=>{ localStorage.clear(); location.href='/' }}>Cerrar</button>
        </div>
      </header>
      <div className="p-4 flex gap-4">
        <div className="w-1/3 bg-white p-4 rounded-lg shadow max-h-[70vh] overflow-auto">
          <h3 className="font-semibold mb-2">Viajes pendientes</h3>
          {trips.length===0 && <p className="text-sm text-gray-500">No hay viajes pendientes</p>}
          {trips.map(t=> (
            <div key={t.id} className="border p-3 rounded mb-2">
              <p className="text-sm">ID: {t.id}</p>
              <p className="text-xs">Origen: {t.origin.lat.toFixed(4)}, {t.origin.lng.toFixed(4)}</p>
              <p className="text-xs">Destino: {t.destination.lat.toFixed(4)}, {t.destination.lng.toFixed(4)}</p>
              <div className="mt-2 flex gap-2">
                <button className="flex-1 bg-blue-600 text-white p-2 rounded" onClick={()=>accept(t.id)}>Aceptar</button>
              </div>
            </div>
          ))}
          <button className="mt-2 w-full bg-gray-200 p-2 rounded" onClick={()=>setRefreshKey(k=>k+1)}>Refrescar</button>
        </div>

        <div className="flex-1 rounded-lg overflow-hidden shadow">
          <MapContainer center={[4.6097,-74.0817]} zoom={13} style={{height:'70vh'}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {accepted && <Marker position={accepted.origin}><Popup>Pasajero</Popup></Marker>}
            {accepted && <Marker position={accepted.destination}><Popup>Destino</Popup></Marker>}
          </MapContainer>
        </div>
      </div>
    </div>
  )
}
