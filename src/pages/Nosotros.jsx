// Página: historia de la clínica y equipo profesional.
import { Col, Container, Row } from 'react-bootstrap'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import TarjetaIntegrante from '../components/molecules/TarjetaIntegrante'
import equipo from '../data/equipo.json'

function Nosotros() {
  return (
    <PlantillaPublica>
      <Container as="section" className="py-5">
        <h1 className="seccion__titulo">Quiénes somos</h1>
        <Row>
          <Col xs={12} lg={8}>
            <p>
              Veterinaria San Marcos nació en 2009 en Rancagua, Región del Libertador General Bernardo O'Higgins,
              con la idea de ofrecer una atención cercana y de calidad para las mascotas de la ciudad. Hoy
              atendemos un promedio de 25 pacientes al día: principalmente perros y gatos, aunque también
              recibimos conejos y aves.
            </p>
            <p>
              Nuestros servicios van desde la consulta general y la vacunación hasta cirugías menores,
              desparasitación y control de peso, siempre pensando en el bienestar a largo plazo de cada paciente.
            </p>
          </Col>
        </Row>

        <h2 className="seccion__titulo mt-5">Nuestro equipo</h2>
        <p className="seccion__intro">
          Contamos con 3 médicos veterinarios, 1 técnico veterinario y 1 recepcionista dedicada a coordinar tu
          atención.
        </p>
        <Row className="g-4">
          {equipo.map((integrante) => (
            <Col key={integrante.id} xs={6} md={4} lg>
              <TarjetaIntegrante integrante={integrante} />
            </Col>
          ))}
        </Row>
      </Container>
    </PlantillaPublica>
  )
}

export default Nosotros
