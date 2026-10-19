// solicitudService: la "solicitud en curso" (el carrito de la plantilla). Guarda en
// localStorage los servicios que el dueño va eligiendo antes de confirmar la cita.
import { guardarLista, leerLista } from './almacenamiento'

const CLAVE = 'vsm_solicitud'

const leer = () => leerLista(CLAVE, [])
const guardar = (lista) => guardarLista(CLAVE, lista)

export function obtenerItems() {
  return leer()
}

// Agrega un servicio. Si ya estaba (mismo servicio y misma modalidad), suma 1 a la cantidad.
// "fueraDeHorario" solo aplica a la consulta de urgencia, que tiene recargo.
export function agregarItem(servicio, precioUnitario, fueraDeHorario = false) {
  const clave = fueraDeHorario ? `${servicio.id}-fh` : String(servicio.id)
  const lista = leer()
  const existente = lista.find((item) => item.clave === clave)
  const nuevaLista = existente
    ? lista.map((item) => (item.clave === clave ? { ...item, cantidad: item.cantidad + 1 } : item))
    : [
        ...lista,
        {
          clave,
          servicioId: servicio.id,
          codigo: servicio.codigo,
          nombre: fueraDeHorario ? `${servicio.nombre} (fuera de horario)` : servicio.nombre,
          precioUnitario,
          cantidad: 1,
        },
      ]
  guardar(nuevaLista)
  return nuevaLista
}

// Cambia la cantidad (entre 1 y 5 mascotas por servicio).
export function cambiarCantidad(clave, cantidad) {
  const cantidadValida = Math.min(5, Math.max(1, cantidad))
  const lista = leer().map((item) => (item.clave === clave ? { ...item, cantidad: cantidadValida } : item))
  guardar(lista)
  return lista
}

export function quitarItem(clave) {
  const lista = leer().filter((item) => item.clave !== clave)
  guardar(lista)
  return lista
}

export function limpiarSolicitud() {
  guardar([])
  return []
}
