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

// Aplica un descuento en porcentaje (ofertas). 10% de 10.000 -> 9.000
export function aplicarDescuento(precio, porcentaje) {
  if (porcentaje < 0 || porcentaje > 100) {
    throw new Error('El descuento debe estar entre 0 y 100')
  }
  return Math.round(precio * (1 - porcentaje / 100))
}

// Precio que paga el cliente por un servicio: con su descuento si está en oferta.
export function precioFinal(servicio) {
  return aplicarDescuento(servicio.precio, servicio.descuento ?? 0)
}

// Total de una solicitud: suma precio unitario por cantidad de cada ítem.
export function calcularTotal(items) {
  return items.reduce((total, item) => total + item.precioUnitario * item.cantidad, 0)
}
