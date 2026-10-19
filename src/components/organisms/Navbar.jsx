// Organismo: barra de navegación (logo + enlaces + solicitud + sesión).
// Se adapta a celular con el botón hamburguesa.
import { Badge, Container, Nav, NavDropdown, Navbar as BsNavbar } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useSolicitud } from '../../context/SolicitudContext'

const enlaces = [
  { ruta: '/', texto: 'Inicio' },
  { ruta: '/servicios', texto: 'Servicios' },
  { ruta: '/categorias', texto: 'Categorías' },
  { ruta: '/ofertas', texto: 'Ofertas' },
  { ruta: '/nosotros', texto: 'Nosotros' },
  { ruta: '/blog', texto: 'Blog' },
  { ruta: '/contacto', texto: 'Contacto' },
]

function Navbar() {
  const { usuario, esPersonal } = useAuth()
  const { cantidadTotal } = useSolicitud()

  return (
    <BsNavbar expand="xl" variant="dark" className="barra-navegacion" collapseOnSelect>
      <Container>
        <BsNavbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <img src="/img/logo.jpg" alt="Logo Veterinaria San Marcos" className="barra-navegacion__logo" />
          <span className="barra-navegacion__nombre">Veterinaria San Marcos</span>
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="menu-principal" />
        <BsNavbar.Collapse id="menu-principal">
          <Nav className="ms-auto align-items-xl-center" as="ul">
            {enlaces.map((enlace) => (
              <Nav.Item as="li" key={enlace.ruta}>
                <Nav.Link as={NavLink} to={enlace.ruta} end={enlace.ruta === '/'} eventKey={enlace.ruta}>
                  {enlace.texto}
                </Nav.Link>
              </Nav.Item>
            ))}
            <Nav.Item as="li">
              <Nav.Link as={NavLink} to="/solicitud" eventKey="/solicitud" className="barra-navegacion__solicitud">
                Mi solicitud{' '}
                <Badge bg="light" text="dark" pill aria-label={`${cantidadTotal} servicios`}>
                  {cantidadTotal}
                </Badge>
              </Nav.Link>
            </Nav.Item>
            {usuario ? (
              <NavDropdown as="li" title={`Hola, ${usuario.nombre}`} id="menu-usuario" align="end">
                <NavDropdown.Item as={Link} to="/mis-citas">
                  Mis citas
                </NavDropdown.Item>
                {esPersonal && (
                  <NavDropdown.Item as={Link} to="/admin">
                    Panel de administración
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/salir">
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Item as="li" className="ms-xl-2">
                <Nav.Link as={NavLink} to="/login" eventKey="/login" className="btn btn-acento px-3">
                  Iniciar sesión
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  )
}

export default Navbar
