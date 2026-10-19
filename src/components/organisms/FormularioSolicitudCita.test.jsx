import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormularioSolicitudCita from './FormularioSolicitudCita'

const usuario = { nombre: 'Ana', apellidos: 'Pérez Soto', correo: 'ana@gmail.com' }

describe('organismo FormularioSolicitudCita', () => {
  test('con sesión iniciada completa solo los datos de la persona (props)', () => {
    render(<FormularioSolicitudCita usuario={usuario} onConfirmar={vi.fn()} />)

    expect(screen.getByLabelText('Nombre')).toHaveValue('Ana')
    expect(screen.getByLabelText('Apellidos')).toHaveValue('Pérez Soto')
    expect(screen.getByLabelText('Correo electrónico')).toHaveValue('ana@gmail.com')
  })

  test('si faltan datos muestra los errores y no confirma la solicitud', async () => {
    const onConfirmar = vi.fn()
    render(<FormularioSolicitudCita onConfirmar={onConfirmar} />)

    await userEvent.click(screen.getByRole('button', { name: 'Confirmar solicitud de cita' }))

    expect(screen.getByText('Indica el nombre de tu mascota.')).toBeInTheDocument()
    expect(screen.getByText('Selecciona una fecha.')).toBeInTheDocument()
    expect(onConfirmar).not.toHaveBeenCalled()
  })
})
