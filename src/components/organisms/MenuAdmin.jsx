// Organismo: menú lateral del panel de administración.
// La recepcionista ve solo lo que le corresponde (solicitudes, catálogo y críticos).
import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const opciones = [
  { ruta: '/admin', texto: 'Inicio', soloAdmin: false },
  { ruta: '/admin/citas', texto: 'Solicitudes de cita', soloAdmin: false },
  { ruta: '/admin/servicios', texto: 'Servicios', soloAdmin: false },
  { ruta: '/admin/criticos', texto: 'Servicios críticos', soloAdmin: false },
  { ruta: '/admin/categorias', texto: 'Categorías', soloAdmin: true },
  { ruta: '/admin/usuarios', texto: 'Usuarios', soloAdmin: true },
  { ruta: '/admin/reportes', texto: 'Reportes', soloAdmin: true },
  { ruta: '/admin/perfil', texto: 'Mi perfil', soloAdmin: false },
]

function MenuAdmin() {
  const { usuario } = useAuth()
  const esAdmin = usuario?.tipo === 'Administrador'
  const visibles = opciones.filter((o) => esAdmin || !o.soloAdmin)

  return (
    <Nav className="menu-admin flex-lg-column flex-nowrap" as="ul">
      {visibles.map((opcion) => (
        <Nav.Item as="li" key={opcion.ruta}>
          <Nav.Link as={NavLink} to={opcion.ruta} end={opcion.ruta === '/admin'}>
            {opcion.texto}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  )
}

export default MenuAdmin
