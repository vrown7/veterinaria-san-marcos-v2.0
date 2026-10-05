// Funciones chicas de precios. Son JavaScript puro (sin React), por eso viven en utils
// y se pueden probar solas con Vitest.

// Recargo de la consulta de urgencia fuera de horario (observaciones del catálogo SV002).
export const RECARGO_URGENCIA = 10000

// Formatea un número como pesos chilenos: 15000 -> "$15.000"
export function formatearPrecio(valor) {
  return valor.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })
}

// Devuelve el precio final: si la atención es fuera de horario, suma el recargo.
export function calcularPrecioConRecargo(precioBase, fueraDeHorario) {
  return fueraDeHorario ? precioBase + RECARGO_URGENCIA : precioBase
}

// Solo la consulta de urgencia tiene recargo fuera de horario.
export function aplicaRecargoUrgencia(servicio) {
  return servicio?.codigo === 'SV002'
}
