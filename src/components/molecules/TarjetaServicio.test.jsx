import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TarjetaServicio from './TarjetaServicio'

const servicio = {
  id: 1,
  codigo: 'SV001',
  categoria: 'Consultas',
  nombre: 'Consulta general',
  especie: 'Perro / Gato',
  precio: 15000,
  imagen: '/img/consulta-general.jpg',
}

describe('molécula TarjetaServicio', () => {
  test('muestra nombre, especie, precio y enlace al detalle', () => {
    // MemoryRouter es necesario porque la tarjeta usa <Link>
    render(
      <MemoryRouter>
        <TarjetaServicio servicio={servicio} />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Consulta general' })).toBeInTheDocument()
    expect(screen.getByText('Perro / Gato')).toBeInTheDocument()
    expect(screen.getByText(/15\.000/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ver detalle' })).toHaveAttribute('href', '/servicios/1')
  })
})
