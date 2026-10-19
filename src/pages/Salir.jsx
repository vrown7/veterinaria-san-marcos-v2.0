// Página: cierra la sesión y vuelve al inicio.
// Es una ruta propia para que, al salir desde una página protegida, no se active
// la redirección al login de RutaProtegida.
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Salir() {
  const { cerrarSesion } = useAuth()

  useEffect(() => {
    cerrarSesion()
  }, [cerrarSesion])

  return <Navigate to="/" replace />
}

export default Salir
