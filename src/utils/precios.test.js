import { aplicaRecargoUrgencia, calcularPrecioConRecargo, formatearPrecio } from './precios'

describe('utils/precios', () => {
  test('formatea un número como pesos chilenos', () => {
    // toLocaleString puede poner un espacio especial: se compara solo la parte numérica
    expect(formatearPrecio(15000)).toMatch(/\$\s?15\.000/)
  })

  test('suma $10.000 a la consulta de urgencia fuera de horario', () => {
    expect(calcularPrecioConRecargo(25000, true)).toBe(35000)
  })

  test('no suma recargo dentro del horario normal', () => {
    expect(calcularPrecioConRecargo(25000, false)).toBe(25000)
  })

  test('solo la consulta de urgencia (SV002) tiene recargo', () => {
    expect(aplicaRecargoUrgencia({ codigo: 'SV002' })).toBe(true)
    expect(aplicaRecargoUrgencia({ codigo: 'SV001' })).toBe(false)
  })
})
