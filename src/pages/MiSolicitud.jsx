// Página: solicitud en curso (el "carrito" de la plantilla). Se guarda en localStorage.
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import DetalleSolicitud from '../components/organisms/DetalleSolicitud'
import Boton from '../components/atoms/Boton'
import Precio from '../components/atoms/Precio'
import { useSolicitud } from '../context/SolicitudContext'

function MiSolicitud() {
  const { items, total, cantidadTotal, cambiarCantidad, quitar, limpiar } = useSolicitud()
  const navegar = useNavigate()

  return (
    <PlantillaPublica>
      <Container as="section" className="py-5">
        <h1 className="seccion__titulo">Mi solicitud de cita</h1>
        <p className="seccion__intro">
          Revisa los servicios que elegiste. La cantidad corresponde al número de mascotas que necesitan ese
          servicio.
        </p>

        {items.length === 0 ? (
          <Card className="tarjeta-formulario text-center p-4">
            <p className="mb-3">Tu solicitud está vacía.</p>
            <div>
              <Link to="/servicios" className="btn btn-vsm">
                Ver servicios
              </Link>
            </div>
          </Card>
        ) : (
          <Row className="g-4">
            <Col xs={12} lg={8}>
              <Card className="tarjeta-formulario">
                <Card.Body>
                  <DetalleSolicitud items={items} editable onCambiarCantidad={cambiarCantidad} onQuitar={quitar} />
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} lg={4}>
              <Card className="tarjeta-formulario">
                <Card.Body>
                  <h2 className="fs-5">Resumen</h2>
                  <p className="mb-1">{cantidadTotal} servicio(s)</p>
                  <p className="mb-3">
                    Total estimado: <Precio valor={total} className="fs-4" />
                  </p>
                  <div className="d-grid gap-2">
                    <Boton texto="Continuar con la cita" size="lg" onClick={() => navegar('/solicitud/confirmar')} />
                    <Boton variante="outline-secondary" texto="Vaciar solicitud" onClick={limpiar} />
                    <Link to="/servicios" className="btn btn-link">
                      Seguir agregando servicios
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </PlantillaPublica>
  )
}

export default MiSolicitud
