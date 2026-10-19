// CitasContext: las solicitudes de cita, compartidas entre "Mis citas" (dueño)
// y el panel de administración (recepcionista y administrador).
import { createContext, useContext, useState } from 'react'
import * as citaService from '../services/citaService'

const CitasContext = createContext(null)

export function CitasProvider({ children }) {
  const [citas, setCitas] = useState(() => citaService.listarCitas())
  const recargar = () => setCitas(citaService.listarCitas())

  function crear(datos) {
    const nueva = citaService.crearCita(datos)
    recargar()
    return nueva
  }

  function cambiarEstado(id, estado) {
    citaService.actualizarCita(id, { estado, propuesta: null })
    recargar()
  }

  function proponerHorario(id, fecha, hora) {
    citaService.proponerHorario(id, fecha, hora)
    recargar()
  }

  function aceptarPropuesta(id) {
    citaService.aceptarPropuesta(id)
    recargar()
  }

  return (
    <CitasContext.Provider value={{ citas, crear, cambiarEstado, proponerHorario, aceptarPropuesta, recargar }}>
      {children}
    </CitasContext.Provider>
  )
}

export function useCitas() {
  const contexto = useContext(CitasContext)
  if (!contexto) {
    throw new Error('useCitas debe usarse dentro de un CitasProvider')
  }
  return contexto
}
