// Página: inicio de sesión. Responsiva: ocupa todo el ancho en celular,
// 8 de 12 columnas en tablet y 5 de 12 en escritorio.
import { Card, Col, Container, Row } from 'react-bootstrap'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import FormularioLogin from '../components/organisms/FormularioLogin'

function Login() {
  return (
    <PlantillaPublica>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={5}>
            <Card className="tarjeta-formulario">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <img src="/img/logo.jpg" alt="Logo Veterinaria San Marcos" className="tarjeta-formulario__logo" />
                  <h1 className="seccion__titulo fs-3 mt-3 mb-1">Iniciar sesión</h1>
                  <p className="text-muted mb-0">Veterinaria San Marcos</p>
                </div>
                <FormularioLogin />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </PlantillaPublica>
  )
}

export default Login
