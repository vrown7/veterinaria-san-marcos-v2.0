import { render, screen } from '@testing-library/react'
import EtiquetaEstadoCita from './EtiquetaEstadoCita'

describe('átomo EtiquetaEstadoCita', () => {
  test.each([
    ['Pendiente', 'bg-warning'],
    ['Confirmada', 'bg-success'],
    ['Reprogramada', 'bg-info'],
    ['Cancelada', 'bg-secondary'],
  ])('la cita "%s" se muestra con la clase %s', (estado, clase) => {
    render(<EtiquetaEstadoCita estado={estado} />)
    expect(screen.getByText(estado)).toHaveClass(clase)
  })
})
