// Funciones comunes para guardar listas en localStorage. Las usan todos los services,
// así cada service solo se preocupa de su CRUD y no de cómo se guarda.

// Lee la lista guardada bajo "clave". La primera vez guarda una copia de los datos de partida.
export function leerLista(clave, iniciales = []) {
  const guardado = localStorage.getItem(clave)
  if (guardado === null) {
    localStorage.setItem(clave, JSON.stringify(iniciales))
    return structuredClone(iniciales)
  }
  return JSON.parse(guardado)
}

export function guardarLista(clave, lista) {
  localStorage.setItem(clave, JSON.stringify(lista))
}

// Siguiente id disponible: el mayor + 1 (0 si la lista está vacía).
export function siguienteId(lista) {
  return Math.max(0, ...lista.map((elemento) => elemento.id)) + 1
}
