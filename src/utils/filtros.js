// Filtra servicios por texto (nombre, categoría o especie) y, opcionalmente, por categoría.
// No distingue mayúsculas ni tildes: "vacunacion" encuentra "Vacunación".
export function normalizar(texto) {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}

export function filtrarServicios(servicios, texto = '', categoria = '') {
  const buscado = normalizar(texto)
  return servicios.filter((s) => {
    const calzaCategoria = !categoria || s.categoria === categoria
    const calzaTexto =
      !buscado || [s.nombre, s.categoria, s.especie].some((campo) => normalizar(campo).includes(buscado))
    return calzaCategoria && calzaTexto
  })
}
