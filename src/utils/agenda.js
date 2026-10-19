// Reglas de la agenda de la clínica (funciones puras, sin React).

// Horarios de atención: lunes a sábado, de 09:00 a 18:30, cada 30 minutos.
export const HORARIOS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
]

export const ESTADOS_CITA = ['Pendiente', 'Confirmada', 'Reprogramada', 'Cancelada']

export const ESPECIES = ['Perro', 'Gato', 'Conejo', 'Ave', 'Otro']

// Convierte un Date a texto "AAAA-MM-DD" (formato de <input type="date">).
export function aTextoFecha(fecha) {
  const anio = fecha.getFullYear()
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const dia = String(fecha.getDate()).padStart(2, '0')
  return `${anio}-${mes}-${dia}`
}

// Primer día que se puede agendar: mañana.
export function fechaMinimaCita(hoy = new Date()) {
  const manana = new Date(hoy)
  manana.setDate(manana.getDate() + 1)
  return aTextoFecha(manana)
}

export function esDomingo(textoFecha) {
  return new Date(`${textoFecha}T00:00:00`).getDay() === 0
}

// "2026-10-20" -> "20-10-2026"
export function formatearFecha(textoFecha) {
  if (!textoFecha) return ''
  const [anio, mes, dia] = textoFecha.split('-')
  return `${dia}-${mes}-${anio}`
}

// Número visible de la solicitud: 7 -> "SOL-00007"
export function formatearNumeroSolicitud(id) {
  return `SOL-${String(id).padStart(5, '0')}`
}
