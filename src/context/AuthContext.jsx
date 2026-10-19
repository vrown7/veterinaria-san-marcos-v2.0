// AuthContext: la sesión del usuario, compartida por toda la aplicación.
// La sesión se guarda en localStorage para que siga activa al recargar la página.
import { createContext, useContext, useState } from 'react'
import * as usuarioService from '../services/usuarioService'

const CLAVE_SESION = 'vsm_sesion'
const AuthContext = createContext(null)

function leerSesion() {
  const guardada = localStorage.getItem(CLAVE_SESION)
  return guardada ? JSON.parse(guardada) : null
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(leerSesion)

  function guardarSesion(datos) {
    if (datos) localStorage.setItem(CLAVE_SESION, JSON.stringify(datos))
    else localStorage.removeItem(CLAVE_SESION)
    setUsuario(datos)
  }

  // Devuelve el usuario si el correo y la contraseña son correctos; si no, null.
  function iniciarSesion(correo, clave) {
    const encontrado = usuarioService.autenticar(correo, clave)
    if (encontrado) guardarSesion(encontrado)
    return encontrado
  }

  function cerrarSesion() {
    guardarSesion(null)
  }

  // El registro público siempre crea un "Dueño de mascota" y deja la sesión iniciada.
  function registrar(datos) {
    const nuevo = usuarioService.crearUsuario({ ...datos, tipo: 'Dueño de mascota' })
    guardarSesion(nuevo)
    return nuevo
  }

  // Vuelve a leer los datos del usuario (por ejemplo, después de editar su perfil).
  function refrescarSesion() {
    if (usuario) guardarSesion(usuarioService.obtenerUsuario(usuario.id))
  }

  const esPersonal = usuario?.tipo === 'Administrador' || usuario?.tipo === 'Recepcionista'

  return (
    <AuthContext.Provider value={{ usuario, esPersonal, iniciarSesion, cerrarSesion, registrar, refrescarSesion }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const contexto = useContext(AuthContext)
  if (!contexto) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return contexto
}
