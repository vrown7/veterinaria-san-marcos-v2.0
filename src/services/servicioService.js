// servicioService: aquí vive el CRUD (Crear, Leer, Actualizar, Eliminar) de los servicios
// veterinarios. Son funciones de JavaScript puro: no usan React, así que se pueden probar solas.
// Basado en el productoService de la guía 13.

import serviciosIniciales from '../data/servicios.json'

// Nombre del "cajón" de localStorage donde se guarda la lista.
const CLAVE = 'servicios'

// Devuelve la lista actual. La primera vez copia los datos de partida a localStorage.
function leer() {
  const guardado = localStorage.getItem(CLAVE)
  if (guardado === null) {
    localStorage.setItem(CLAVE, JSON.stringify(serviciosIniciales))
    return [...serviciosIniciales]
  }
  return JSON.parse(guardado)
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista))
}

// READ: todos los servicios
export function listarServicios() {
  return leer()
}

// READ: un servicio por su id (o null si no existe)
export function obtenerServicio(id) {
  return leer().find((s) => s.id === id) ?? null
}

// CREATE: agrega un servicio nuevo con el siguiente id disponible
export function crearServicio(datos) {
  const lista = leer()
  const nuevoId = Math.max(0, ...lista.map((s) => s.id)) + 1
  const nuevo = { ...datos, id: nuevoId }
  guardar([...lista, nuevo])
  return nuevo
}

// UPDATE: cambia solo los campos indicados en "cambios"
export function actualizarServicio(id, cambios) {
  const lista = leer().map((s) => (s.id === id ? { ...s, ...cambios } : s))
  guardar(lista)
  return lista.find((s) => s.id === id) ?? null
}

// DELETE: quita el servicio con ese id
export function eliminarServicio(id) {
  guardar(leer().filter((s) => s.id !== id))
}

// Lista de categorías sin repetir, en el orden en que aparecen.
export function listarCategorias() {
  return [...new Set(leer().map((s) => s.categoria))]
}
