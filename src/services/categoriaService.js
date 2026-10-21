// categoriaService: CRUD de las categorías del catálogo (panel de administración).
import categoriasIniciales from '../data/categorias.json'
import { guardarLista, leerLista, siguienteId } from './almacenamiento'

const CLAVE = 'vsm_categorias'

const leer = () => leerLista(CLAVE, categoriasIniciales)
const guardar = (lista) => guardarLista(CLAVE, lista)

export function listarCategorias() {
  return leer()
}

export function obtenerCategoria(id) {
  return leer().find((c) => c.id === id) ?? null
}

export function crearCategoria(datos) {
  const lista = leer()
  const nueva = { ...datos, id: siguienteId(lista) }
  guardar([...lista, nueva])
  return nueva
}

export function actualizarCategoria(id, cambios) {
  const lista = leer().map((c) => (c.id === id ? { ...c, ...cambios } : c))
  guardar(lista)
  return lista.find((c) => c.id === id) ?? null
}

export function eliminarCategoria(id) {
  guardar(leer().filter((c) => c.id !== id))
}
