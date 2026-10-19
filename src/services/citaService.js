// citaService: CRUD de las solicitudes de cita. El dueño las crea al confirmar su solicitud;
// la recepcionista las confirma, propone otro horario o las cancela.
import citasIniciales from '../data/citas.json'
import { formatearNumeroSolicitud } from '../utils/agenda'
import { guardarLista, leerLista, siguienteId } from './almacenamiento'

const CLAVE = 'vsm_citas'

const leer = () => leerLista(CLAVE, citasIniciales)
const guardar = (lista) => guardarLista(CLAVE, lista)

export function listarCitas() {
  return leer()
}

export function obtenerCita(id) {
  return leer().find((c) => c.id === id) ?? null
}

// Historial de un usuario (se identifica por su correo).
export function listarCitasPorCorreo(correo) {
  const buscado = correo.trim().toLowerCase()
  return leer().filter((c) => c.correo.toLowerCase() === buscado)
}

// CREATE: toda cita nueva parte "Pendiente" y recibe su número de solicitud.
export function crearCita(datos) {
  const lista = leer()
  const id = siguienteId(lista)
  const nueva = {
    ...datos,
    id,
    numero: formatearNumeroSolicitud(id),
    fechaCreacion: new Date().toISOString(),
    estado: 'Pendiente',
    propuesta: null,
  }
  guardar([...lista, nueva])
  return nueva
}

export function actualizarCita(id, cambios) {
  const lista = leer().map((c) => (c.id === id ? { ...c, ...cambios } : c))
  guardar(lista)
  return lista.find((c) => c.id === id) ?? null
}

// La recepcionista propone otro horario: la cita queda "Reprogramada" hasta que el dueño acepte.
export function proponerHorario(id, fecha, hora) {
  return actualizarCita(id, { estado: 'Reprogramada', propuesta: { fecha, hora } })
}

// El dueño acepta la propuesta: cambia la fecha y la hora, y la cita queda confirmada.
export function aceptarPropuesta(id) {
  const cita = obtenerCita(id)
  if (!cita?.propuesta) throw new Error('La cita no tiene un horario propuesto.')
  return actualizarCita(id, { ...cita.propuesta, estado: 'Confirmada', propuesta: null })
}

export function eliminarCita(id) {
  guardar(leer().filter((c) => c.id !== id))
}
