// Organismo: barra de navegación (logo + enlaces). Se adapta a celular con el botón hamburguesa.
import { Container, Nav, Navbar as BsNavbar } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'

const enlaces = [
  { ruta: '/', texto: 'Inicio' },
  { ruta: '/servicios', texto: 'Servicios' },
  { ruta: '/categorias', texto: 'Categorías' },
  { ruta: '/nosotros', texto: 'Nosotros' },
  { ruta: '/blog', texto: 'Blog' },
  { ruta: '/contacto', texto: 'Contacto' },
]

function Navbar() {
  return (
    <BsNavbar expand="lg" variant="dark" className="barra-navegacion" collapseOnSelect>
      <Container>
        <BsNavbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <img src="/img/logo.jpg" alt="Logo Veterinaria San Marcos" className="barra-navegacion__logo" />
          <span className="barra-navegacion__nombre">Veterinaria San Marcos</span>
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="menu-principal" />
        <BsNavbar.Collapse id="menu-principal">
          <Nav className="ms-auto align-items-lg-center" as="ul">
            {enlaces.map((enlace) => (
              <Nav.Item as="li" key={enlace.ruta}>
                <Nav.Link as={NavLink} to={enlace.ruta} end={enlace.ruta === '/'} eventKey={enlace.ruta}>
                  {enlace.texto}
                </Nav.Link>
              </Nav.Item>
            ))}
            <Nav.Item as="li" className="ms-lg-2">
              <Nav.Link as={NavLink} to="/login" eventKey="/login" className="btn btn-acento px-3">
                Iniciar sesión
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  )
}

export default Navbar
