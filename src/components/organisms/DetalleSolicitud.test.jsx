import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DetalleSolicitud from './DetalleSolicitud'

const items = [
  { clave: '3', codigo: 'VA001', nombre: 'Vacuna antirrábica canina', precioUnitario: 12000, cantidad: 2 },
  { clave: '1', codigo: 'SV001', nombre: 'Consulta general', precioUnitario: 15000, cantidad: 1 },
]

describe('organismo DetalleSolicitud', () => {
  test('muestra cada servicio con su subtotal y el total', () => {
    render(<DetalleSolicitud items={items} />)

    const filaVacuna = screen.getByText('Vacuna antirrábica canina').closest('tr')
    expect(within(filaVacuna).getByText(/24\.000/)).toBeInTheDocument()
    expect(screen.getByText('Total').closest('tr')).toHaveTextContent(/39\.000/)
  })

  test('en modo editable avisa al cambiar la cantidad o quitar un servicio', async () => {
    const onCambiarCantidad = vi.fn()
    const onQuitar = vi.fn()
    render(<DetalleSolicitud items={items} editable onCambiarCantidad={onCambiarCantidad} onQuitar={onQuitar} />)

    const filaVacuna = screen.getByText('Vacuna antirrábica canina').closest('tr')
    await userEvent.click(within(filaVacuna).getByRole('button', { name: 'Sumar uno' }))
    await userEvent.click(within(filaVacuna).getByRole('button', { name: 'Quitar' }))

    expect(onCambiarCantidad).toHaveBeenCalledWith('3', 3)
    expect(onQuitar).toHaveBeenCalledWith('3')
  })
})
