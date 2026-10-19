import {
  aplicaRecargoUrgencia,
  aplicarDescuento,
  calcularPrecioConRecargo,
  calcularTotal,
  formatearPrecio,
  precioFinal,
} from './precios'

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

describe('aplicarDescuento y precioFinal (ofertas)', () => {
  test('aplica un 15% de descuento a la vacuna séxtuple', () => {
    expect(aplicarDescuento(18000, 15)).toBe(15300)
  })

  test('lanza un error si el porcentaje es mayor a 100', () => {
    expect(() => aplicarDescuento(10000, 150)).toThrow('entre 0 y 100')
  })

  test('precioFinal usa el descuento del servicio, o el precio normal si no tiene', () => {
    expect(precioFinal({ precio: 9500, descuento: 10 })).toBe(8550)
    expect(precioFinal({ precio: 15000 })).toBe(15000)
  })
})

describe('calcularTotal', () => {
  test('suma precio unitario por cantidad de cada ítem', () => {
    // Arrange: 2 vacunas para dos perros y 1 consulta
    const items = [
      { precioUnitario: 12000, cantidad: 2 },
      { precioUnitario: 15000, cantidad: 1 },
    ]
    // Act + Assert
    expect(calcularTotal(items)).toBe(39000)
  })

  test('devuelve 0 si la solicitud está vacía', () => {
    expect(calcularTotal([])).toBe(0)
  })
})
