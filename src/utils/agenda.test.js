import { esDomingo, fechaMinimaCita, formatearFecha, formatearNumeroSolicitud } from './agenda'

describe('utils/agenda', () => {
  test('la fecha mínima para agendar es mañana, también al cambiar de mes', () => {
    expect(fechaMinimaCita(new Date('2026-10-31T09:00:00'))).toBe('2026-11-01')
  })

  test('reconoce los domingos', () => {
    expect(esDomingo('2026-10-25')).toBe(true)
    expect(esDomingo('2026-10-24')).toBe(false)
  })

  test('formatea la fecha y el número de solicitud para mostrarlos', () => {
    expect(formatearFecha('2026-10-20')).toBe('20-10-2026')
    expect(formatearNumeroSolicitud(7)).toBe('SOL-00007')
  })
})
