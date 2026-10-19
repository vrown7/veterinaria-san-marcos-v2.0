// Página: detalle de un servicio (RF02). El id llega por la URL: /servicios/:id
import { useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import EtiquetaEspecie from '../components/atoms/EtiquetaEspecie'
import Precio from '../components/atoms/Precio'
import Boton from '../components/atoms/Boton'
import EtiquetaOferta from '../components/atoms/EtiquetaOferta'
import { useServicios } from '../context/ServiciosContext'
import { useSolicitud } from '../context/SolicitudContext'
import {
  aplicaRecargoUrgencia,
  calcularPrecioConRecargo,
  formatearPrecio,
  precioFinal,
  RECARGO_URGENCIA,
} from '../utils/precios'

function DetalleServicio() {
  const { id } = useParams()
  const { servicios } = useServicios()
  const { agregar } = useSolicitud()
  const navegar = useNavigate()
  const [fueraDeHorario, setFueraDeHorario] = useState(false)
  const servicio = servicios.find((s) => s.id === Number(id))

  if (!servicio) {
    return (
      <PlantillaPublica>
        <Container className="py-5 text-center">
          <h1 className="seccion__titulo">Servicio no encontrado</h1>
          <p>El servicio que buscas no existe o fue eliminado del catálogo.</p>
          <Link to="/servicios" className="btn btn-vsm">
            Volver al catálogo
          </Link>
        </Container>
      </PlantillaPublica>
    )
  }

  const tieneRecargo = aplicaRecargoUrgencia(servicio)
  const enOferta = (servicio.descuento ?? 0) > 0
  const precioAPagar = calcularPrecioConRecargo(precioFinal(servicio), tieneRecargo && fueraDeHorario)

  function agregarYVer() {
    agregar(servicio, precioAPagar, tieneRecargo && fueraDeHorario)
    navegar('/solicitud')
  }

  return (
    <PlantillaPublica>
      <Container as="section" className="py-5">
        <p>
          <Link to="/servicios">← Volver al catálogo</Link>
        </p>
        <Row className="g-4 align-items-start">
          <Col xs={12} lg={6}>
            <img className="detalle__imagen" src={servicio.imagen} alt={servicio.nombre} />
          </Col>
          <Col xs={12} lg={6}>
            <p className="tarjeta-servicio__categoria mb-1">{servicio.categoria}</p>
            <h1 className="seccion__titulo mb-2">{servicio.nombre}</h1>
            <EtiquetaEspecie especie={servicio.especie} />
            <p className="mt-3">{servicio.descripcion}</p>

            <dl className="detalle__datos">
              <dt>Código</dt>
              <dd>{servicio.codigo}</dd>
              <dt>Duración aproximada</dt>
              <dd>{servicio.duracion}</dd>
              {servicio.observaciones && (
                <>
                  <dt>Observaciones</dt>
                  <dd>{servicio.observaciones}</dd>
                </>
              )}
            </dl>

            {tieneRecargo && (
              <Form.Check
                type="switch"
                id="fuera-de-horario"
                className="mb-3"
                label={`Atención fuera de horario (+${formatearPrecio(RECARGO_URGENCIA)})`}
                checked={fueraDeHorario}
                onChange={(e) => setFueraDeHorario(e.target.checked)}
              />
            )}

            <p className="mb-0 text-muted small">
              Precio {enOferta && <EtiquetaOferta descuento={servicio.descuento} />}
            </p>
            <div className="d-flex align-items-baseline gap-2 mb-1">
              <Precio valor={precioAPagar} className="fs-2" />
              {enOferta && <Precio valor={servicio.precio} tachado />}
            </div>
            <p className={`small mb-3 ${servicio.stock <= servicio.stockCritico ? 'text-danger' : 'text-muted'}`}>
              {servicio.stock === 0 ? 'Sin cupos esta semana' : `Quedan ${servicio.stock} cupos esta semana`}
            </p>
            <Boton
              texto="Agregar a mi solicitud de cita"
              size="lg"
              disabled={servicio.stock === 0}
              onClick={agregarYVer}
            />
          </Col>
        </Row>
      </Container>
    </PlantillaPublica>
  )
}

export default DetalleServicio
