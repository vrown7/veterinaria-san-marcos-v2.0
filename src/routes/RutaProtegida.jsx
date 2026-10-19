// Protege una ruta: sin sesión manda al login; con un rol no permitido, al inicio.
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RutaProtegida({ roles, children }) {
  const { usuario } = useAuth()
  const ubicacion = useLocation()

  if (!usuario) {
    // "state.desde" permite volver a esta página después de iniciar sesión.
    return <Navigate to="/login" replace state={{ desde: ubicacion.pathname }} />
  }
  if (roles && !roles.includes(usuario.tipo)) {
    return <Navigate to="/" replace />
  }
  return children
}

export default RutaProtegida
