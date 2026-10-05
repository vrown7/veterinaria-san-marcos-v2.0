import {
  actualizarServicio,
  crearServicio,
  eliminarServicio,
  listarServicios,
  obtenerServicio,
} from './servicioService'
import serviciosIniciales from '../data/servicios.json'

describe('services/servicioService (CRUD)', () => {
  // Cada prueba parte con localStorage vacío, así no se afectan entre sí
  beforeEach(() => localStorage.clear())

  test('listar devuelve los servicios de partida la primera vez', () => {
    expect(listarServicios()).toHaveLength(serviciosIniciales.length)
  })

  test('crear agrega un servicio con un id nuevo y lo guarda', () => {
    const nuevo = crearServicio({ codigo: 'OT002', nombre: 'Limpieza dental', precio: 55000 })
    expect(nuevo.id).toBe(serviciosIniciales.length + 1)
    expect(listarServicios()).toHaveLength(serviciosIniciales.length + 1)
    expect(obtenerServicio(nuevo.id).nombre).toBe('Limpieza dental')
  })

  test('actualizar cambia solo los campos indicados', () => {
    const actualizado = actualizarServicio(1, { precio: 16000 })
    expect(actualizado.precio).toBe(16000)
    expect(actualizado.nombre).toBe(serviciosIniciales[0].nombre)
  })

  test('eliminar quita el servicio de la lista', () => {
    eliminarServicio(1)
    expect(obtenerServicio(1)).toBeNull()
    expect(listarServicios()).toHaveLength(serviciosIniciales.length - 1)
  })
})
