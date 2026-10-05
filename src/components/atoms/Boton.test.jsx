import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Boton from './Boton'

describe('átomo Boton', () => {
  test('muestra el texto y ejecuta onClick al hacer clic', async () => {
    const alHacerClic = vi.fn() // función simulada (mock) para saber si se llamó
    render(<Boton texto="Guardar" onClick={alHacerClic} />)

    await userEvent.click(screen.getByRole('button', { name: 'Guardar' }))

    expect(alHacerClic).toHaveBeenCalledTimes(1)
  })
})
