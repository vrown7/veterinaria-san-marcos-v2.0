// Página admin: mostrar un servicio con todos sus datos.
import { Card, Col, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import PlantillaAdmin from '../../components/templates/PlantillaAdmin'
import Precio from '../../components/atoms/Precio'
import { useServicios } from '../../context/ServiciosContext'
import { useAuth } from '../../context/AuthContext'
import { precioFinal } from '../../utils/precios'

function AdminServicioDetalle() {
  const { id } = useParams()
  const { servicios } = useServicios()
  const { usuario } = useAuth()
  const servicio = servicios.find((s) => s.id === Number(id))

  if (!servicio) {
    return (
      <PlantillaAdmin titulo="Servicio no encontrado">
        <Link to="/admin/servicios">Volver a servicios</Link>
      </PlantillaAdmin>
    )
  }

  return (
    <PlantillaAdmin
      titulo={servicio.nombre}
      acciones={
        <div className="d-flex gap-2">
          <Link to="/admin/servicios" className="btn btn-outline-vsm btn-sm">
            ← Volver
          </Link>
          {usuario.tipo === 'Administrador' && (
            <Link to={`/admin/servicios/${servicio.id}/editar`} className="btn btn-vsm btn-sm">
              Editar
            </Link>
          )}
        </div>
      }
    >
      <Card className="tarjeta-formulario">
        <Card.Body>
          <Row className="g-4">
            <Col xs={12} md={4}>
              <img src={servicio.imagen} alt={servicio.nombre} className="detalle__imagen" />
            </Col>
            <Col xs={12} md={8}>
              <dl className="detalle__datos mt-0">
                <dt>Código</dt>
                <dd>{servicio.codigo}</dd>
                <dt>Categoría</dt>
                <dd>{servicio.categoria}</dd>
                <dt>Especie</dt>
                <dd>{servicio.especie}</dd>
                <dt>Duración</dt>
                <dd>{servicio.duracion}</dd>
                <dt>Precio</dt>
                <dd>
                  <Precio valor={servicio.precio} />
                </dd>
                <dt>Descuento</dt>
                <dd>
                  {servicio.descuento}% {servicio.descuento > 0 && <>(precio final <Precio valor={precioFinal(servicio)} />)</>}
                </dd>
                <dt>Cupos semanales</dt>
                <dd className={servicio.stock <= servicio.stockCritico ? 'text-danger fw-semibold' : ''}>
                  {servicio.stock} (mínimo crítico {servicio.stockCritico})
                </dd>
                <dt>Observaciones</dt>
                <dd>{servicio.observaciones || '—'}</dd>
                <dt>Descripción</dt>
                <dd>{servicio.descripcion || '—'}</dd>
              </dl>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </PlantillaAdmin>
  )
}

export default AdminServicioDetalle
