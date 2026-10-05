// Página: detalle de un servicio (RF02). El id llega por la URL: /servicios/:id
import { useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import EtiquetaEspecie from '../components/atoms/EtiquetaEspecie'
import Precio from '../components/atoms/Precio'
import { useServicios } from '../context/ServiciosContext'
import { aplicaRecargoUrgencia, calcularPrecioConRecargo, RECARGO_URGENCIA, formatearPrecio } from '../utils/precios'

function DetalleServicio() {
  const { id } = useParams()
  const { servicios } = useServicios()
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
  const precioFinal = calcularPrecioConRecargo(servicio.precio, tieneRecargo && fueraDeHorario)

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

            <p className="mb-0 text-muted small">Precio</p>
            <Precio valor={precioFinal} className="fs-2 d-block mb-3" />
            <Link to="/contacto" className="btn btn-vsm btn-lg">
              Consultar disponibilidad
            </Link>
          </Col>
        </Row>
      </Container>
    </PlantillaPublica>
  )
}

export default DetalleServicio
