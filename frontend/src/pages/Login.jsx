import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('passenger')
  const nav = useNavigate()

  const api = (path)=> axios.post('/api/'+path)

  async function register(){
    try{
      await axios.post('/api/register', { email, password, name: '', role })
      alert('Registrado. Ahora inicia sesión.')
    }catch(e){ alert('Error al registrar: '+ (e.response?.data?.error||e.message)) }
  }

  async function login(){
    try{
      const res = await axios.post('/api/login', { email, password })
      const token = res.data.token
      const user = res.data.user || { email, role }
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      if(user.role === 'driver') nav('/driver'); else nav('/passenger')
    }catch(e){ alert('Error al iniciar sesión: '+ (e.response?.data?.error||e.message)) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Inicia sesión / Regístrate</h2>
        <input className="w-full p-3 border rounded-md mb-3" placeholder="Correo" value={email} onChange={e=>setEmail(e.target.value)}/>
        <input className="w-full p-3 border rounded-md mb-3" placeholder="Contraseña" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
        <select className="w-full p-3 border rounded-md mb-4" value={role} onChange={e=>setRole(e.target.value)}>
          <option value="passenger">Pasajero</option>
          <option value="driver">Conductor</option>
        </select>
        <div className="flex gap-2">
          <button className="flex-1 bg-blue-600 text-white p-3 rounded-md" onClick={login}>Entrar</button>
          <button className="flex-1 bg-gray-200 p-3 rounded-md" onClick={register}>Registrar</button>
        </div>
      </div>
    </div>
  )
}
