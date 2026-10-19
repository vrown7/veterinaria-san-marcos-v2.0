// Organismo: grilla responsiva de servicios. 1 columna en celular, 2 en tablet, 3 en escritorio.
// Cada tarjeta puede agregar su servicio a la solicitud en curso (SolicitudContext).
import { Col, Row } from 'react-bootstrap'
import TarjetaServicio from '../molecules/TarjetaServicio'
import { useSolicitud } from '../../context/SolicitudContext'
import { precioFinal } from '../../utils/precios'

function ListaServicios({ servicios }) {
  const { agregar } = useSolicitud()

  if (servicios.length === 0) {
    return <p className="text-muted">No encontramos servicios con ese criterio.</p>
  }

  return (
    <Row className="g-4">
      {servicios.map((servicio) => (
        <Col key={servicio.id} xs={12} md={6} lg={4}>
          <TarjetaServicio servicio={servicio} onAgregar={(s) => agregar(s, precioFinal(s))} />
        </Col>
      ))}
    </Row>
  )
}

export default ListaServicios
