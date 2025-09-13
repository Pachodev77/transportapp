import React, { useEffect, useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import axios from 'axios'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function LocationSelector({onSelect}){
  useMapEvents({
    click(e){
      onSelect(e.latlng)
    }
  })
  return null
}

export default function Passenger(){
  const [origin, setOrigin] = useState(null)
  const [destination, setDestination] = useState(null)
  const [trip, setTrip] = useState(null)
  const token = localStorage.getItem('token')

  async function createTrip(){
    if(!origin || !destination) return alert('Seleccione origen y destino (dos clics en el mapa)')
    try{
      const res = await axios.post('/api/trips', { token, origin, destination })
      setTrip(res.data.trip)
      alert('Viaje creado! ID: '+res.data.trip.id)
    }catch(e){ alert('Error creando viaje: '+ (e.response?.data?.error||e.message)) }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 bg-white shadow-md flex items-center justify-between">
        <h1 className="text-xl font-semibold">Pasajero</h1>
        <div>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={()=>{ localStorage.clear(); location.href='/' }}>Cerrar</button>
        </div>
      </header>
      <div className="flex-1 p-4">
        <div className="h-[70vh] rounded-lg overflow-hidden shadow">
          <MapContainer center={[4.6097,-74.0817]} zoom={13} style={{height:'100%'}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationSelector onSelect={(latlng)=>{ if(!origin) setOrigin(latlng); else if(!destination) setDestination(latlng); }} />
            {origin && <Marker position={origin}><Popup>Origen</Popup></Marker>}
            {destination && <Marker position={destination}><Popup>Destino</Popup></Marker>}
          </MapContainer>
        </div>

        <div className="mt-4 flex gap-3">
          <button className="flex-1 bg-green-600 text-white p-3 rounded-md" onClick={createTrip}>Solicitar viaje</button>
          <button className="flex-1 bg-gray-200 p-3 rounded-md" onClick={()=>{ setOrigin(null); setDestination(null); setTrip(null); }}>Reset</button>
        </div>

        {trip && (
          <div className="mt-4 bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">Estado del viaje</h3>
            <p>ID: {trip.id}</p>
            <p>Estado: {trip.status}</p>
          </div>
        )}
      </div>
    </div>
  )
}
