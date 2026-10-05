import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BuscadorServicios from './BuscadorServicios'

describe('molécula BuscadorServicios', () => {
  test('avisa por onChange lo que escribe la persona', async () => {
    const alCambiar = vi.fn()
    render(<BuscadorServicios valor="" onChange={alCambiar} />)

    await userEvent.type(screen.getByLabelText('Buscar servicios'), 'v')

    expect(alCambiar).toHaveBeenCalledWith('v')
  })
})
