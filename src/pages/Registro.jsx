// Página: registro de usuario.
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import FormularioRegistro from '../components/organisms/FormularioRegistro'

function Registro() {
  return (
    <PlantillaPublica>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} lg={8}>
            <Card className="tarjeta-formulario">
              <Card.Body className="p-4">
                <h1 className="seccion__titulo fs-3">Crear cuenta</h1>
                <p className="text-muted">
                  ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
                <FormularioRegistro />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </PlantillaPublica>
  )
}

export default Registro
