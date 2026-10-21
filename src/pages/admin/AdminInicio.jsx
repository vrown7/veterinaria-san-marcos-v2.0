// Página admin: dashboard con el resumen de solicitudes, catálogo y usuarios.
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PlantillaAdmin from '../../components/templates/PlantillaAdmin'
import TarjetaResumen from '../../components/molecules/TarjetaResumen'
import TablaCitas from '../../components/organisms/TablaCitas'
import { useCitas } from '../../context/CitasContext'
import { useServicios } from '../../context/ServiciosContext'
import { useAuth } from '../../context/AuthContext'
import { listarUsuarios } from '../../services/usuarioService'

function AdminInicio() {
  const { citas } = useCitas()
  const { servicios } = useServicios()
  const { usuario } = useAuth()
  const pendientes = citas.filter((c) => c.estado === 'Pendiente')
  const criticos = servicios.filter((s) => s.stock <= s.stockCritico)
  const recientes = [...citas].sort((a, b) => b.id - a.id).slice(0, 5)

  return (
    <PlantillaAdmin titulo={`Hola, ${usuario.nombre}`}>
      <Row className="g-3 mb-4">
        <Col xs={6} xl={3}>
          <TarjetaResumen titulo="Solicitudes pendientes" valor={pendientes.length} detalle={`${citas.length} en total`} enlace="/admin/citas" variante={pendientes.length ? 'alerta' : ''} />
        </Col>
        <Col xs={6} xl={3}>
          <TarjetaResumen titulo="Servicios" valor={servicios.length} detalle="en el catálogo" enlace="/admin/servicios" />
        </Col>
        <Col xs={6} xl={3}>
          <TarjetaResumen titulo="Servicios críticos" valor={criticos.length} detalle="con pocos cupos" enlace="/admin/criticos" variante={criticos.length ? 'peligro' : ''} />
        </Col>
        <Col xs={6} xl={3}>
          <TarjetaResumen
            titulo="Usuarios"
            valor={listarUsuarios().length}
            detalle="registrados"
            enlace={usuario.tipo === 'Administrador' ? '/admin/usuarios' : undefined}
          />
        </Col>
      </Row>
      <Card className="tarjeta-formulario">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="fs-5 mb-0">Últimas solicitudes</h2>
            <Link to="/admin/citas" className="small">
              Ver todas
            </Link>
          </div>
          <TablaCitas citas={recientes} />
        </Card.Body>
      </Card>
    </PlantillaAdmin>
  )
}

export default AdminInicio
