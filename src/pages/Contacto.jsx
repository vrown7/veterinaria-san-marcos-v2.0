// Página: contacto con la clínica.
import { Card, Col, Container, Row } from 'react-bootstrap'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import FormularioContacto from '../components/organisms/FormularioContacto'

function Contacto() {
  return (
    <PlantillaPublica>
      <Container as="section" className="py-5">
        <h1 className="seccion__titulo">Contáctanos</h1>
        <p className="seccion__intro">Escríbenos tus dudas sobre servicios, precios o disponibilidad de horas.</p>
        <Row className="g-4">
          <Col xs={12} lg={7}>
            <Card className="tarjeta-formulario">
              <Card.Body className="p-4">
                <FormularioContacto />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} lg={5}>
            <h2 className="fs-5">Datos de la clínica</h2>
            <p className="mb-1">Av. Libertador Bernardo O'Higgins 1234, Rancagua</p>
            <p className="mb-1">Tel: +56 9 1234 5678</p>
            <p>contacto@veterinariasanmarcos.cl</p>
          </Col>
        </Row>
      </Container>
    </PlantillaPublica>
  )
}

export default Contacto
