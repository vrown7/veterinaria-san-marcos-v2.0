// Página admin: datos del perfil de quien administra (o de la recepcionista).
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PlantillaAdmin from '../../components/templates/PlantillaAdmin'
import { useAuth } from '../../context/AuthContext'

function AdminPerfil() {
  const { usuario } = useAuth()

  return (
    <PlantillaAdmin titulo="Mi perfil">
      <Card className="tarjeta-formulario">
        <Card.Body>
          <dl className="detalle__datos mt-0">
            <dt>Nombre</dt>
            <dd>
              {usuario.nombre} {usuario.apellidos}
            </dd>
            <dt>RUN</dt>
            <dd>{usuario.run}</dd>
            <dt>Correo</dt>
            <dd>{usuario.correo}</dd>
            <dt>Rol</dt>
            <dd>{usuario.tipo}</dd>
            <dt>Dirección</dt>
            <dd>
              {usuario.direccion}, {usuario.comuna}
            </dd>
          </dl>
          <div className="d-flex gap-2 flex-wrap">
            {usuario.tipo === 'Administrador' && (
              <Link to={`/admin/usuarios/${usuario.id}/editar`} className="btn btn-vsm">
                Editar mis datos
              </Link>
            )}
            <Link to="/salir" className="btn btn-outline-secondary">
              Cerrar sesión
            </Link>
          </div>
        </Card.Body>
      </Card>
    </PlantillaAdmin>
  )
}

export default AdminPerfil
