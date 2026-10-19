import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import FormularioLogin from './FormularioLogin'
import { useAuth } from '../../context/AuthContext'

// Mock: reemplazamos el AuthContext real por uno falso. Así la prueba revisa solo el
// formulario, sin depender de localStorage ni de los usuarios guardados.
vi.mock('../../context/AuthContext', () => ({ useAuth: vi.fn() }))

function renderizar() {
  render(
    <MemoryRouter>
      <FormularioLogin />
    </MemoryRouter>,
  )
}

describe('organismo FormularioLogin', () => {
  const iniciarSesion = vi.fn()

  beforeEach(() => {
    useAuth.mockReturnValue({ iniciarSesion })
  })

  afterEach(() => {
    vi.clearAllMocks() // cada caso parte con los contadores del mock en cero
  })

  test('muestra los mensajes de error si se envía vacío y no intenta iniciar sesión', async () => {
    renderizar()
    await userEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

    expect(screen.getByText('El correo es obligatorio.')).toBeInTheDocument()
    expect(screen.getByText(/entre 4 y 10 caracteres/)).toBeInTheDocument()
    expect(iniciarSesion).not.toHaveBeenCalled()
  })

  test('llama a iniciarSesion con el correo y la contraseña escritos', async () => {
    iniciarSesion.mockReturnValue({ id: 3, nombre: 'Ana', tipo: 'Dueño de mascota' })
    renderizar()
    await userEvent.type(screen.getByLabelText('Correo electrónico'), 'ana@gmail.com')
    await userEvent.type(screen.getByLabelText('Contraseña'), 'ana123')
    await userEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

    expect(iniciarSesion).toHaveBeenCalledWith('ana@gmail.com', 'ana123')
  })

  test('avisa si el correo o la contraseña son incorrectos', async () => {
    iniciarSesion.mockReturnValue(null) // el mock simula credenciales malas
    renderizar()
    await userEvent.type(screen.getByLabelText('Correo electrónico'), 'ana@gmail.com')
    await userEvent.type(screen.getByLabelText('Contraseña'), 'mala1')
    await userEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Correo o contraseña incorrectos.')
  })
})
