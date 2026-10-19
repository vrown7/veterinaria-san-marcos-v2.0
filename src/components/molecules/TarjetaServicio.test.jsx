import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import TarjetaServicio from './TarjetaServicio'

const servicio = {
  id: 1,
  codigo: 'SV001',
  categoria: 'Consultas',
  nombre: 'Consulta general',
  especie: 'Perro / Gato',
  precio: 15000,
  descuento: 0,
  stock: 20,
  imagen: '/img/consulta-general.jpg',
}

// MemoryRouter es necesario porque la tarjeta usa <Link>
function renderizar(props) {
  render(
    <MemoryRouter>
      <TarjetaServicio servicio={servicio} {...props} />
    </MemoryRouter>,
  )
}

describe('molécula TarjetaServicio', () => {
  test('muestra nombre, especie, precio y enlace al detalle', () => {
    renderizar()

    expect(screen.getByRole('heading', { name: 'Consulta general' })).toBeInTheDocument()
    expect(screen.getByText('Perro / Gato')).toBeInTheDocument()
    expect(screen.getByText(/15\.000/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ver detalle' })).toHaveAttribute('href', '/servicios/1')
  })

  test('en oferta muestra el descuento, el precio rebajado y el anterior tachado', () => {
    renderizar({ servicio: { ...servicio, descuento: 20 } })

    expect(screen.getByText('-20%')).toBeInTheDocument()
    expect(screen.getByText(/12\.000/)).toBeInTheDocument()
    expect(screen.getByText(/15\.000/).tagName).toBe('DEL')
  })

  test('al agregar avisa al padre con el servicio y cambia el texto del botón (estado)', async () => {
    const onAgregar = vi.fn()
    renderizar({ onAgregar })

    await userEvent.click(screen.getByRole('button', { name: 'Agregar a mi solicitud' }))

    expect(onAgregar).toHaveBeenCalledWith(servicio)
    expect(screen.getByRole('button', { name: '✓ Agregado' })).toBeInTheDocument()
  })

  test('sin cupos el botón queda deshabilitado', () => {
    renderizar({ servicio: { ...servicio, stock: 0 }, onAgregar: vi.fn() })
    expect(screen.getByRole('button', { name: 'Sin cupos' })).toBeDisabled()
  })
})
