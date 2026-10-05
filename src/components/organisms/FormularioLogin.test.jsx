import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import FormularioLogin from './FormularioLogin'

function renderizar() {
  render(
    <MemoryRouter>
      <FormularioLogin />
    </MemoryRouter>,
  )
}

describe('organismo FormularioLogin', () => {
  test('muestra los mensajes de error si se envía vacío', async () => {
    renderizar()
    await userEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

    expect(screen.getByText('El correo es obligatorio.')).toBeInTheDocument()
    expect(screen.getByText(/entre 4 y 10 caracteres/)).toBeInTheDocument()
  })

  test('muestra mensaje de éxito con datos válidos', async () => {
    renderizar()
    await userEvent.type(screen.getByLabelText('Correo electrónico'), 'ana@duoc.cl')
    await userEvent.type(screen.getByLabelText('Contraseña'), 'clave1')
    await userEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

    expect(screen.getByRole('status')).toHaveTextContent('Inicio de sesión correcto')
  })
})
