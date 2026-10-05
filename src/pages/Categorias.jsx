// Página: categorías del catálogo, con la cantidad de servicios de cada una.
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import { useServicios } from '../context/ServiciosContext'

function Categorias() {
  const { servicios } = useServicios()

  // Agrupa: { Consultas: [..], Vacunación: [..], ... }
  const grupos = servicios.reduce((acumulado, s) => {
    acumulado[s.categoria] = [...(acumulado[s.categoria] ?? []), s]
    return acumulado
  }, {})

  return (
    <PlantillaPublica>
      <Container as="section" className="py-5">
        <h1 className="seccion__titulo">Categorías de atención</h1>
        <p className="seccion__intro">Explora nuestros servicios según el tipo de atención que necesita tu mascota.</p>
        <Row className="g-4">
          {Object.entries(grupos).map(([categoria, lista]) => (
            <Col key={categoria} xs={12} sm={6} lg={4}>
              <Card className="h-100 tarjeta-categoria">
                <Card.Img variant="top" src={lista[0].imagen} alt="" className="tarjeta-servicio__imagen" />
                <Card.Body>
                  <Card.Title as="h2" className="fs-4">
                    {categoria}
                  </Card.Title>
                  <Card.Text className="text-muted">
                    {lista.length} {lista.length === 1 ? 'servicio' : 'servicios'}
                  </Card.Text>
                  <Link className="btn btn-outline-vsm stretched-link" to={`/servicios?categoria=${encodeURIComponent(categoria)}`}>
                    Ver {categoria.toLowerCase()}
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </PlantillaPublica>
  )
}

export default Categorias
