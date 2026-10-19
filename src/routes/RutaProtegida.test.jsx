import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import RutaProtegida from './RutaProtegida'
import { useAuth } from '../context/AuthContext'

// Mock del contexto de sesión: cada caso decide qué usuario "inició sesión".
vi.mock('../context/AuthContext', () => ({ useAuth: vi.fn() }))

function renderizarEn(ruta) {
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route path="/" element={<p>Inicio público</p>} />
        <Route path="/login" element={<p>Pantalla de login</p>} />
        <Route
          path="/admin"
          element={
            <RutaProtegida roles={['Administrador', 'Recepcionista']}>
              <p>Panel de administración</p>
            </RutaProtegida>
          }
        />
      </Routes>
    </MemoryRouter>,
  )
}

describe('RutaProtegida', () => {
  afterEach(() => vi.clearAllMocks())

  test('sin sesión manda al login', () => {
    useAuth.mockReturnValue({ usuario: null })
    renderizarEn('/admin')
    expect(screen.getByText('Pantalla de login')).toBeInTheDocument()
  })

  test('un dueño de mascota no puede entrar al panel', () => {
    useAuth.mockReturnValue({ usuario: { tipo: 'Dueño de mascota' } })
    renderizarEn('/admin')
    expect(screen.getByText('Inicio público')).toBeInTheDocument()
  })

  test('la recepcionista sí entra al panel', () => {
    useAuth.mockReturnValue({ usuario: { tipo: 'Recepcionista' } })
    renderizarEn('/admin')
    expect(screen.getByText('Panel de administración')).toBeInTheDocument()
  })
})
