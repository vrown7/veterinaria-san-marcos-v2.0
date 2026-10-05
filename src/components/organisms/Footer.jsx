// Organismo: pie de página con datos de contacto de la clínica.
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ANIO_ACTUAL = new Date().getFullYear()

function Footer() {
  return (
    <footer className="pie mt-5">
      <Container>
        <Row className="gy-3">
          <Col xs={12} md={5}>
            <strong>Veterinaria San Marcos</strong>
            <p className="mb-0">Av. Libertador Bernardo O'Higgins 1234, Rancagua</p>
          </Col>
          <Col xs={12} md={4}>
            <p className="mb-0">Tel: +56 9 1234 5678</p>
            <p className="mb-0">contacto@veterinariasanmarcos.cl</p>
          </Col>
          <Col xs={12} md={3}>
            <nav aria-label="Enlaces del pie de página">
              <Link to="/nosotros">Nosotros</Link> · <Link to="/contacto">Contacto</Link>
            </nav>
          </Col>
        </Row>
        <p className="pie__copy mb-0 mt-3">© {ANIO_ACTUAL} Veterinaria San Marcos · Desde 2009</p>
      </Container>
    </footer>
  )
}

export default Footer
