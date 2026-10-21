import {
  actualizarCategoria,
  crearCategoria,
  eliminarCategoria,
  listarCategorias,
  obtenerCategoria,
} from './categoriaService'
import categoriasIniciales from '../data/categorias.json'

describe('services/categoriaService (CRUD)', () => {
  beforeEach(() => localStorage.clear())

  test('crea una categoría con el siguiente id', () => {
    const nueva = crearCategoria({ nombre: 'Peluquería', descripcion: 'Baño y corte' })
    expect(nueva.id).toBe(categoriasIniciales.length + 1)
    expect(listarCategorias()).toHaveLength(categoriasIniciales.length + 1)
  })

  test('actualiza y elimina una categoría', () => {
    actualizarCategoria(6, { nombre: 'Otros cuidados' })
    expect(obtenerCategoria(6).nombre).toBe('Otros cuidados')

    eliminarCategoria(6)
    expect(obtenerCategoria(6)).toBeNull()
  })
})
