// usuarioService: CRUD de usuarios e inicio de sesión simulado (sin backend en el Parcial 2).
import usuariosIniciales from '../data/usuarios.json'
import { guardarLista, leerLista, siguienteId } from './almacenamiento'

const CLAVE = 'vsm_usuarios'

const leer = () => leerLista(CLAVE, usuariosIniciales)
const guardar = (lista) => guardarLista(CLAVE, lista)

// Nunca se entrega la contraseña fuera del service.
function sinClave(usuario) {
  if (!usuario) return null
  const { clave: _clave, ...resto } = usuario
  return resto
}

const normalizar = (correo) => correo.trim().toLowerCase()

export function listarUsuarios() {
  return leer().map(sinClave)
}

export function obtenerUsuario(id) {
  return sinClave(leer().find((u) => u.id === id))
}

export function existeCorreo(correo, idIgnorado = null) {
  return leer().some((u) => normalizar(u.correo) === normalizar(correo) && u.id !== idIgnorado)
}

export function crearUsuario(datos) {
  if (existeCorreo(datos.correo)) throw new Error('Ya existe un usuario con ese correo.')
  const lista = leer()
  const nuevo = { ...datos, correo: normalizar(datos.correo), id: siguienteId(lista) }
  guardar([...lista, nuevo])
  return sinClave(nuevo)
}

// Si "cambios.clave" viene vacía, se mantiene la contraseña anterior.
export function actualizarUsuario(id, cambios) {
  const { clave, ...resto } = cambios
  const lista = leer().map((u) =>
    u.id === id ? { ...u, ...resto, ...(clave ? { clave } : {}), ...(resto.correo ? { correo: normalizar(resto.correo) } : {}) } : u,
  )
  guardar(lista)
  return sinClave(lista.find((u) => u.id === id))
}

export function eliminarUsuario(id) {
  guardar(leer().filter((u) => u.id !== id))
}

// Devuelve el usuario (sin contraseña) si el correo y la contraseña coinciden; si no, null.
export function autenticar(correo, clave) {
  const usuario = leer().find((u) => normalizar(u.correo) === normalizar(correo) && u.clave === clave)
  return sinClave(usuario)
}
