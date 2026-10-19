import {
  aceptarPropuesta,
  crearCita,
  listarCitas,
  listarCitasPorCorreo,
  obtenerCita,
  proponerHorario,
} from './citaService'
import citasIniciales from '../data/citas.json'

const datos = {
  nombre: 'Luis',
  apellidos: 'Mora',
  correo: 'luis@gmail.com',
  telefono: '987654321',
  mascota: 'Rocky',
  especie: 'Perro',
  fecha: '2026-10-28',
  hora: '11:00',
  items: [{ clave: '1', servicioId: 1, codigo: 'SV001', nombre: 'Consulta general', precioUnitario: 15000, cantidad: 1 }],
  total: 15000,
}

describe('services/citaService', () => {
  beforeEach(() => localStorage.clear())

  test('crear asigna id, número de solicitud y estado Pendiente', () => {
    const cita = crearCita(datos)
    expect(cita.id).toBe(citasIniciales.length + 1)
    expect(cita.numero).toBe(`SOL-0000${citasIniciales.length + 1}`)
    expect(cita.estado).toBe('Pendiente')
    expect(listarCitas()).toHaveLength(citasIniciales.length + 1)
  })

  test('el historial de un usuario se busca por correo, sin importar mayúsculas', () => {
    crearCita(datos)
    expect(listarCitasPorCorreo('LUIS@gmail.com')).toHaveLength(1)
    expect(listarCitasPorCorreo('ana@gmail.com')).toHaveLength(2)
  })

  test('proponer horario deja la cita Reprogramada y al aceptar se confirma con la nueva fecha', () => {
    const { id } = crearCita(datos)
    proponerHorario(id, '2026-10-29', '15:00')
    expect(obtenerCita(id).estado).toBe('Reprogramada')

    const aceptada = aceptarPropuesta(id)
    expect(aceptada).toMatchObject({ estado: 'Confirmada', fecha: '2026-10-29', hora: '15:00', propuesta: null })
  })

  test('aceptar una propuesta que no existe lanza un error', () => {
    const { id } = crearCita(datos)
    expect(() => aceptarPropuesta(id)).toThrow('no tiene un horario propuesto')
  })
})
