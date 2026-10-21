// Template: esqueleto del panel de administración. Barra superior, menú lateral a la
// izquierda (arriba en celular) y el contenido a la derecha.
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MenuAdmin from '../organisms/MenuAdmin'
import { useAuth } from '../../context/AuthContext'

function PlantillaAdmin({ titulo, acciones, children }) {
  const { usuario } = useAuth()
  return (
    <div className="d-flex flex-column min-vh-100 fondo-admin">
      <header className="barra-navegacion py-2">
        <Container fluid className="d-flex justify-content-between align-items-center gap-2">
          <Link to="/admin" className="d-flex align-items-center gap-2 text-white text-decoration-none">
            <img src="/img/logo.jpg" alt="" className="barra-navegacion__logo" />
            <span className="barra-navegacion__nombre">Panel San Marcos</span>
          </Link>
          <div className="text-white-50 small text-end">
            {usuario?.nombre} · {usuario?.tipo}{' '}
            <Link to="/" className="text-white ms-2">
              Ver sitio
            </Link>
          </div>
        </Container>
      </header>
      <Container fluid className="flex-grow-1">
        <Row>
          <Col xs={12} lg={3} xl={2} as="aside" className="menu-admin__contenedor py-lg-4">
            <MenuAdmin />
          </Col>
          <Col xs={12} lg={9} xl={10} as="main" className="py-4 px-lg-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
              <h1 className="seccion__titulo mb-0">{titulo}</h1>
              {acciones}
            </div>
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default PlantillaAdmin
