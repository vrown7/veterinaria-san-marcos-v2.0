// SolicitudContext: la solicitud en curso (servicios elegidos antes de agendar).
// La guarda solicitudService en localStorage; aquí se comparte con el Navbar,
// el catálogo, el detalle y la página "Mi solicitud".
import { createContext, useContext, useState } from 'react'
import * as solicitudService from '../services/solicitudService'
import { calcularTotal } from '../utils/precios'

const SolicitudContext = createContext(null)

export function SolicitudProvider({ children }) {
  const [items, setItems] = useState(() => solicitudService.obtenerItems())

  const agregar = (servicio, precioUnitario, fueraDeHorario) =>
    setItems(solicitudService.agregarItem(servicio, precioUnitario, fueraDeHorario))
  const cambiarCantidad = (clave, cantidad) => setItems(solicitudService.cambiarCantidad(clave, cantidad))
  const quitar = (clave) => setItems(solicitudService.quitarItem(clave))
  const limpiar = () => setItems(solicitudService.limpiarSolicitud())

  const total = calcularTotal(items)
  const cantidadTotal = items.reduce((suma, item) => suma + item.cantidad, 0)

  return (
    <SolicitudContext.Provider value={{ items, total, cantidadTotal, agregar, cambiarCantidad, quitar, limpiar }}>
      {children}
    </SolicitudContext.Provider>
  )
}

export function useSolicitud() {
  const contexto = useContext(SolicitudContext)
  if (!contexto) {
    throw new Error('useSolicitud debe usarse dentro de un SolicitudProvider')
  }
  return contexto
}
