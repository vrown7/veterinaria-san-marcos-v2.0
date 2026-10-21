// ServiciosContext: el puente entre los services (los datos) y las pantallas (React).
// Guarda en el estado de React los servicios y las categorías, y llama al service cuando
// alguien crea, edita o elimina. Así el catálogo y el panel de administración ven siempre lo mismo.
import { createContext, useContext, useState } from 'react'
import * as servicioService from '../services/servicioService'
import * as categoriaService from '../services/categoriaService'

const ServiciosContext = createContext(null)

export function ServiciosProvider({ children }) {
  // La función flecha hace que la lista se lea del service solo la primera vez.
  const [servicios, setServicios] = useState(() => servicioService.listarServicios())
  const [categorias, setCategorias] = useState(() => categoriaService.listarCategorias())

  function recargar() {
    setServicios(servicioService.listarServicios())
    setCategorias(categoriaService.listarCategorias())
  }

  // ---- Servicios ----
  function crear(datos) {
    const nuevo = servicioService.crearServicio(datos)
    recargar()
    return nuevo
  }

  function actualizar(id, cambios) {
    servicioService.actualizarServicio(id, cambios)
    recargar()
  }

  function eliminar(id) {
    servicioService.eliminarServicio(id)
    recargar()
  }

  // ---- Categorías ----
  function crearCategoria(datos) {
    categoriaService.crearCategoria(datos)
    recargar()
  }

  // Si cambia el nombre, los servicios de esa categoría se mueven al nombre nuevo.
  function actualizarCategoria(id, cambios) {
    const anterior = categoriaService.obtenerCategoria(id)
    categoriaService.actualizarCategoria(id, cambios)
    if (anterior && cambios.nombre && cambios.nombre !== anterior.nombre) {
      servicioService.renombrarCategoria(anterior.nombre, cambios.nombre)
    }
    recargar()
  }

  // Una categoría con servicios no se puede eliminar (quedarían servicios sin categoría).
  function eliminarCategoria(id) {
    const categoria = categoriaService.obtenerCategoria(id)
    if (servicios.some((s) => s.categoria === categoria?.nombre)) {
      throw new Error('No se puede eliminar: la categoría tiene servicios asociados.')
    }
    categoriaService.eliminarCategoria(id)
    recargar()
  }

  return (
    <ServiciosContext.Provider
      value={{
        servicios,
        categorias,
        crear,
        actualizar,
        eliminar,
        recargar,
        crearCategoria,
        actualizarCategoria,
        eliminarCategoria,
      }}
    >
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
