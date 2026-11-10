// Protege una ruta: sin sesión manda al login; con un rol no permitido, al inicio.
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RutaProtegida(props) {
  const { usuario } = useAuth()
  const ubicacion = useLocation()

  if (!usuario) {
    // "state.desde" permite volver a esta página después de iniciar sesión.
    return <Navigate to="/login" replace state={{ desde: ubicacion.pathname }} />
  }
  if (props.roles && !props.roles.includes(usuario.tipo)) {
    return <Navigate to="/" replace />
  }
  return props.children
}

export default RutaProtegida
