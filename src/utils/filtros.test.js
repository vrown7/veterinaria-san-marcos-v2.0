import { filtrarServicios } from './filtros'

const servicios = [
  { id: 1, nombre: 'Consulta general', categoria: 'Consultas', especie: 'Perro / Gato' },
  { id: 2, nombre: 'Vacuna antirrábica canina', categoria: 'Vacunación', especie: 'Perro' },
  { id: 3, nombre: 'Vacuna bivalente felina', categoria: 'Vacunación', especie: 'Gato' },
]

describe('utils/filtros', () => {
  test('busca sin importar mayúsculas ni tildes', () => {
    expect(filtrarServicios(servicios, 'VACUNACION')).toHaveLength(2)
  })

  test('combina texto y categoría', () => {
    const resultado = filtrarServicios(servicios, 'gato', 'Vacunación')
    expect(resultado.map((s) => s.id)).toEqual([3])
  })
})
