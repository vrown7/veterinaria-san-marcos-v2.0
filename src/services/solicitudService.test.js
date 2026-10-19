import { agregarItem, cambiarCantidad, limpiarSolicitud, obtenerItems, quitarItem } from './solicitudService'

const consulta = { id: 1, codigo: 'SV001', nombre: 'Consulta general' }
const urgencia = { id: 2, codigo: 'SV002', nombre: 'Consulta urgencia' }

describe('services/solicitudService (solicitud en curso)', () => {
  beforeEach(() => localStorage.clear())

  test('empieza vacía', () => {
    expect(obtenerItems()).toEqual([])
  })

  test('agregar dos veces el mismo servicio suma la cantidad en vez de repetirlo', () => {
    agregarItem(consulta, 15000)
    const items = agregarItem(consulta, 15000)
    expect(items).toHaveLength(1)
    expect(items[0].cantidad).toBe(2)
  })

  test('la urgencia fuera de horario queda como un ítem aparte, con su recargo', () => {
    agregarItem(urgencia, 25000)
    const items = agregarItem(urgencia, 35000, true)
    expect(items).toHaveLength(2)
    expect(items[1]).toMatchObject({ clave: '2-fh', precioUnitario: 35000, nombre: 'Consulta urgencia (fuera de horario)' })
  })

  test('la cantidad queda entre 1 y 5', () => {
    agregarItem(consulta, 15000)
    expect(cambiarCantidad('1', 9)[0].cantidad).toBe(5)
    expect(cambiarCantidad('1', 0)[0].cantidad).toBe(1)
  })

  test('quitar y limpiar vacían la solicitud guardada', () => {
    agregarItem(consulta, 15000)
    agregarItem(urgencia, 25000)
    expect(quitarItem('1')).toHaveLength(1)
    limpiarSolicitud()
    expect(obtenerItems()).toEqual([])
  })
})
