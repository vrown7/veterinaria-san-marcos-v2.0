// Página admin: mostrar un usuario y su historial de solicitudes de cita.
import { Card } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import PlantillaAdmin from '../../components/templates/PlantillaAdmin'
import TablaCitas from '../../components/organisms/TablaCitas'
import Precio from '../../components/atoms/Precio'
import { useCitas } from '../../context/CitasContext'
import { obtenerUsuario } from '../../services/usuarioService'

function AdminUsuarioDetalle() {
  const { id } = useParams()
  const { citas } = useCitas()
  const usuario = obtenerUsuario(Number(id))

  if (!usuario) {
    return (
      <PlantillaAdmin titulo="Usuario no encontrado">
        <Link to="/admin/usuarios">Volver a usuarios</Link>
      </PlantillaAdmin>
    )
  }

  const historial = citas.filter((c) => c.correo.toLowerCase() === usuario.correo.toLowerCase())
  const totalConfirmado = historial.filter((c) => c.estado === 'Confirmada').reduce((suma, c) => suma + c.total, 0)

  return (
    <PlantillaAdmin
      titulo={`${usuario.nombre} ${usuario.apellidos}`}
      acciones={
        <div className="d-flex gap-2">
          <Link to="/admin/usuarios" className="btn btn-outline-vsm btn-sm">
            ← Volver
          </Link>
          <Link to={`/admin/usuarios/${usuario.id}/editar`} className="btn btn-vsm btn-sm">
            Editar
          </Link>
        </div>
      }
    >
      <Card className="tarjeta-formulario mb-4">
        <Card.Body>
          <dl className="detalle__datos my-0">
            <dt>RUN</dt>
            <dd>{usuario.run}</dd>
            <dt>Correo</dt>
            <dd>{usuario.correo}</dd>
            <dt>Tipo</dt>
            <dd>{usuario.tipo}</dd>
            <dt>Dirección</dt>
            <dd>
              {usuario.direccion}, {usuario.comuna}
            </dd>
            <dt>Región</dt>
            <dd>{usuario.region}</dd>
          </dl>
        </Card.Body>
      </Card>
      <Card className="tarjeta-formulario">
        <Card.Body>
          <div className="d-flex flex-wrap justify-content-between align-items-baseline gap-2 mb-3">
            <h2 className="fs-5 mb-0">Historial de solicitudes ({historial.length})</h2>
            <span className="small text-muted">
              Total confirmado: <Precio valor={totalConfirmado} />
            </span>
          </div>
          <TablaCitas citas={historial} mostrarDueno={false} />
        </Card.Body>
      </Card>
    </PlantillaAdmin>
  )
}

export default AdminUsuarioDetalle
