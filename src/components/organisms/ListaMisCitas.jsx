// Organismo: las citas del dueño de mascota, con su estado y las acciones que puede hacer.
import { Alert, Card, Col, Row } from 'react-bootstrap'
import Boton from '../atoms/Boton'
import EtiquetaEstadoCita from '../atoms/EtiquetaEstadoCita'
import Precio from '../atoms/Precio'
import { formatearFecha } from '../../utils/agenda'

function ListaMisCitas({ citas, onAceptarPropuesta, onCancelar }) {
  if (citas.length === 0) {
    return <p className="text-muted">Todavía no tienes solicitudes de cita.</p>
  }
  return (
    <Row className="g-3">
      {citas.map((cita) => (
        <Col key={cita.id} xs={12} lg={6}>
          <Card className="tarjeta-formulario h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                <div>
                  <p className="text-muted small mb-0">{cita.numero}</p>
                  <h2 className="fs-5 mb-0">
                    {cita.mascota} <span className="text-muted fs-6">({cita.especie})</span>
                  </h2>
                </div>
                <EtiquetaEstadoCita estado={cita.estado} />
              </div>
              <p className="mb-1">
                <strong>{formatearFecha(cita.fecha)}</strong> a las <strong>{cita.hora}</strong>
              </p>
              <p className="text-muted small mb-2">{cita.items.map((i) => i.nombre).join(' · ')}</p>
              <p className="mb-3">
                Total: <Precio valor={cita.total} />
              </p>
              {cita.estado === 'Reprogramada' && cita.propuesta && (
                <Alert variant="info" className="py-2">
                  La clínica propone el <strong>{formatearFecha(cita.propuesta.fecha)}</strong> a las{' '}
                  <strong>{cita.propuesta.hora}</strong>.
                </Alert>
              )}
              <div className="d-flex gap-2 flex-wrap">
                {cita.estado === 'Reprogramada' && (
                  <Boton size="sm" texto="Aceptar nuevo horario" onClick={() => onAceptarPropuesta(cita.id)} />
                )}
                {(cita.estado === 'Pendiente' || cita.estado === 'Reprogramada') && (
                  <Boton size="sm" variante="outline-danger" texto="Cancelar cita" onClick={() => onCancelar(cita.id)} />
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default ListaMisCitas
