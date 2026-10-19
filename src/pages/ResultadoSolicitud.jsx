// Página: resultado de la solicitud. Si salió bien muestra el número, el resumen y el total;
// si falló, un aviso claro y un botón para volver a intentarlo.
import { Alert, Card, Col, Container, Row } from 'react-bootstrap'
import { Link, Navigate, useLocation } from 'react-router-dom'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import DetalleSolicitud from '../components/organisms/DetalleSolicitud'
import EtiquetaEstadoCita from '../components/atoms/EtiquetaEstadoCita'
import { formatearFecha } from '../utils/agenda'

function ResultadoSolicitud() {
  const { state } = useLocation()

  // Si se entra directo a la URL, no hay resultado que mostrar.
  if (!state) return <Navigate to="/solicitud" replace />

  return (
    <PlantillaPublica>
      <Container as="section" className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} lg={8}>
            {state.exito ? (
              <Card className="tarjeta-formulario">
                <Card.Body className="p-4">
                  <Alert variant="success">
                    <h1 className="fs-3 mb-1">¡Solicitud registrada!</h1>
                    <p className="mb-0">
                      Tu número de solicitud es <strong>{state.cita.numero}</strong>.
                    </p>
                  </Alert>
                  <dl className="detalle__datos">
                    <dt>Estado</dt>
                    <dd>
                      <EtiquetaEstadoCita estado={state.cita.estado} />
                    </dd>
                    <dt>Mascota</dt>
                    <dd>
                      {state.cita.mascota} ({state.cita.especie})
                    </dd>
                    <dt>Fecha y hora</dt>
                    <dd>
                      {formatearFecha(state.cita.fecha)} a las {state.cita.hora}
                    </dd>
                    <dt>A nombre de</dt>
                    <dd>
                      {state.cita.nombre} {state.cita.apellidos} · {state.cita.correo}
                    </dd>
                  </dl>
                  <DetalleSolicitud items={state.cita.items} />
                  <p className="text-muted small mt-3">
                    Te avisaremos cuando la recepcionista confirme la hora. Puedes revisar el estado en "Mis citas".
                  </p>
                  <div className="d-flex gap-2 flex-wrap">
                    <Link to="/mis-citas" className="btn btn-vsm">
                      Ver mis citas
                    </Link>
                    <Link to="/" className="btn btn-outline-vsm">
                      Volver al inicio
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            ) : (
              <Card className="tarjeta-formulario">
                <Card.Body className="p-4">
                  <Alert variant="danger">
                    <h1 className="fs-3 mb-1">No pudimos registrar tu solicitud</h1>
                    <p className="mb-0">{state.mensaje}</p>
                  </Alert>
                  <p>Tu solicitud sigue guardada. Puedes quitar el servicio sin cupos o elegir otro y volver a intentarlo.</p>
                  <div className="d-flex gap-2 flex-wrap">
                    <Link to="/solicitud" className="btn btn-vsm">
                      Volver a intentarlo
                    </Link>
                    <Link to="/contacto" className="btn btn-outline-vsm">
                      Contactar a la clínica
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </PlantillaPublica>
  )
}

export default ResultadoSolicitud
