import {
  actualizarServicio,
  crearServicio,
  descontarCupos,
  eliminarServicio,
  listarCriticos,
  listarOfertas,
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

  test('lista los críticos (cupos <= mínimo) y las ofertas (descuento > 0)', () => {
    expect(listarCriticos().every((s) => s.stock <= s.stockCritico)).toBe(true)
    expect(listarOfertas().map((s) => s.codigo)).toEqual(['VA002', 'DE002', 'EX003', 'OT003'])
  })

  test('descontarCupos resta los cupos agendados', () => {
    const antes = obtenerServicio(1).stock
    descontarCupos([{ servicioId: 1, nombre: 'Consulta general', cantidad: 2 }])
    expect(obtenerServicio(1).stock).toBe(antes - 2)
  })

  test('descontarCupos lanza un error y no descuenta nada si faltan cupos', () => {
    const antes = obtenerServicio(1).stock
    expect(() =>
      descontarCupos([
        { servicioId: 1, nombre: 'Consulta general', cantidad: 1 },
        { servicioId: 6, nombre: 'Esterilización macho canino', cantidad: 99 },
      ]),
    ).toThrow('No quedan cupos suficientes para "Esterilización macho canino".')
    expect(obtenerServicio(1).stock).toBe(antes)
  })

  test('los cambios se mantienen al volver a leer (persistencia en localStorage)', () => {
    actualizarServicio(2, { stock: 0 })
    const guardado = JSON.parse(localStorage.getItem('vsm_servicios'))
    expect(guardado.find((s) => s.id === 2).stock).toBe(0)
  })
})
