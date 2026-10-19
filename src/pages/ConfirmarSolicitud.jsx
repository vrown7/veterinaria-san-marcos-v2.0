// Página: confirmación de la solicitud (checkout). Pide los datos del dueño, la mascota
// y la fecha/hora. Al confirmar: descuenta cupos, crea la cita y muestra el resultado.
import { useRef } from 'react'
import { Alert, Card, Col, Container, Row } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import DetalleSolicitud from '../components/organisms/DetalleSolicitud'
import FormularioSolicitudCita from '../components/organisms/FormularioSolicitudCita'
import { useAuth } from '../context/AuthContext'
import { useCitas } from '../context/CitasContext'
import { useServicios } from '../context/ServiciosContext'
import { useSolicitud } from '../context/SolicitudContext'
import { descontarCupos } from '../services/servicioService'

function ConfirmarSolicitud() {
  const { items, total, limpiar } = useSolicitud()
  const { usuario } = useAuth()
  const { crear } = useCitas()
  const { recargar } = useServicios()
  const navegar = useNavigate()
  // Marca que la solicitud ya se envió: al vaciarla no hay que redirigir a "Mi solicitud",
  // sino dejar que se abra la página de resultado.
  const enviada = useRef(false)

  if (items.length === 0 && !enviada.current) {
    return <Navigate to="/solicitud" replace />
  }

  function confirmar(datos) {
    try {
      descontarCupos(items) // lanza un error si algún servicio se quedó sin cupos
      const cita = crear({ ...datos, items, total })
      enviada.current = true
      recargar()
      limpiar()
      navegar('/solicitud/resultado', { state: { exito: true, cita } })
    } catch (error) {
      // La solicitud no se borra: el dueño puede corregirla y volver a intentarlo.
      navegar('/solicitud/resultado', { state: { exito: false, mensaje: error.message } })
    }
  }

  return (
    <PlantillaPublica>
      <Container as="section" className="py-5">
        <h1 className="seccion__titulo">Confirmar solicitud de cita</h1>
        <p className="seccion__intro">
          Completa los datos. La recepcionista revisará tu solicitud y la confirmará o te propondrá otro horario.
        </p>
        {!usuario && (
          <Alert variant="light" className="border">
            ¿Tienes cuenta? <Link to="/login" state={{ desde: '/solicitud/confirmar' }}>Inicia sesión</Link> y
            completamos tus datos automáticamente.
          </Alert>
        )}
        <Row className="g-4">
          <Col xs={12} lg={7}>
            <Card className="tarjeta-formulario">
              <Card.Body className="p-4">
                <FormularioSolicitudCita usuario={usuario} onConfirmar={confirmar} />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} lg={5}>
            <Card className="tarjeta-formulario">
              <Card.Body>
                <h2 className="fs-5">Servicios solicitados</h2>
                <DetalleSolicitud items={items} />
                <Link to="/solicitud" className="small d-inline-block mt-3">
                  Modificar solicitud
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </PlantillaPublica>
  )
}

export default ConfirmarSolicitud
