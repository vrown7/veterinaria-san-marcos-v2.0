// ServiciosContext: el puente entre el service (los datos) y las pantallas (React).
// Guarda la lista en el estado de React y llama al service cuando alguien crea, edita o
// elimina. Así el catálogo y (más adelante) el panel de administración ven siempre lo mismo.
import { createContext, useContext, useState } from 'react'
import * as servicioService from '../services/servicioService'

const ServiciosContext = createContext(null)

export function ServiciosProvider({ children }) {
  // La función flecha hace que la lista se lea del service solo la primera vez.
  const [servicios, setServicios] = useState(() => servicioService.listarServicios())

  function crear(datos) {
    servicioService.crearServicio(datos)
    setServicios(servicioService.listarServicios())
  }

  function actualizar(id, cambios) {
    servicioService.actualizarServicio(id, cambios)
    setServicios(servicioService.listarServicios())
  }

  function eliminar(id) {
    servicioService.eliminarServicio(id)
    setServicios(servicioService.listarServicios())
  }

  function recargar() {
    setServicios(servicioService.listarServicios())
  }

  return (
    <ServiciosContext.Provider value={{ servicios, crear, actualizar, eliminar, recargar }}>
      {children}
    </ServiciosContext.Provider>
  )
}

// Hook propio: const { servicios, crear } = useServicios()
export function useServicios() {
  const contexto = useContext(ServiciosContext)
  if (!contexto) {
    throw new Error('useServicios debe usarse dentro de un ServiciosProvider')
  }
  return contexto
}
