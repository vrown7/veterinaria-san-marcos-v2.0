// servicioService: aquí vive el CRUD (Crear, Leer, Actualizar, Eliminar) de los servicios
// veterinarios. Son funciones de JavaScript puro: no usan React, así que se pueden probar solas.
// Basado en el productoService de la guía 13.

import serviciosIniciales from '../data/servicios.json'
import { guardarLista, leerLista, siguienteId } from './almacenamiento'

// Nombre del "cajón" de localStorage donde se guarda la lista.
const CLAVE = 'vsm_servicios'

const leer = () => leerLista(CLAVE, serviciosIniciales)
const guardar = (lista) => guardarLista(CLAVE, lista)

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
  const nuevo = { ...datos, id: siguienteId(lista) }
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

// Servicios con cupos en el mínimo crítico o por debajo (vista "Ítems críticos" del admin).
export function listarCriticos() {
  return leer().filter((s) => s.stock <= s.stockCritico)
}

// Servicios en oferta (con descuento mayor a 0).
export function listarOfertas() {
  return leer().filter((s) => (s.descuento ?? 0) > 0)
}

// Cuando se renombra una categoría, sus servicios pasan a la categoría nueva.
export function renombrarCategoria(nombreAnterior, nombreNuevo) {
  guardar(leer().map((s) => (s.categoria === nombreAnterior ? { ...s, categoria: nombreNuevo } : s)))
}

// Descuenta cupos al agendar. Si algún servicio no tiene cupos suficientes, no descuenta
// nada y lanza un error con el nombre del servicio.
export function descontarCupos(items) {
  const lista = leer()
  for (const item of items) {
    const servicio = lista.find((s) => s.id === item.servicioId)
    if (!servicio || servicio.stock < item.cantidad) {
      throw new Error(`No quedan cupos suficientes para "${item.nombre}".`)
    }
  }
  guardar(
    lista.map((s) => {
      const pedido = items.filter((i) => i.servicioId === s.id).reduce((suma, i) => suma + i.cantidad, 0)
      return pedido ? { ...s, stock: s.stock - pedido } : s
    }),
  )
}
