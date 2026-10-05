// Organismo: portada de la página de inicio (texto, botón e imagen).
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Hero({ titulo, texto, imagen, alt }) {
  return (
    <section className="hero">
      <Container>
        <Row className="align-items-center gy-4">
          <Col xs={12} lg={6}>
            <h1 className="hero__titulo">{titulo}</h1>
            <p className="hero__texto">{texto}</p>
            <Link to="/servicios" className="btn btn-acento btn-lg">
              Ver servicios disponibles
            </Link>
          </Col>
          <Col xs={12} lg={6}>
            <img className="hero__imagen" src={imagen} alt={alt} />
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Hero
