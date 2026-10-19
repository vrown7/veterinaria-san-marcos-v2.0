// Página admin: nuevo usuario o editar usuario (la misma página, según la URL).
import { Card } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PlantillaAdmin from '../../components/templates/PlantillaAdmin'
import FormularioUsuario from '../../components/organisms/FormularioUsuario'
import * as usuarioService from '../../services/usuarioService'
import { useAuth } from '../../context/AuthContext'

function AdminUsuarioFormulario() {
  const { id } = useParams()
  const navegar = useNavigate()
  const { usuario: sesion, refrescarSesion } = useAuth()
  const usuario = id ? usuarioService.obtenerUsuario(Number(id)) : null

  if (id && !usuario) {
    return (
      <PlantillaAdmin titulo="Usuario no encontrado">
        <Link to="/admin/usuarios">Volver a usuarios</Link>
      </PlantillaAdmin>
    )
  }

  const correosUsados = usuarioService
    .listarUsuarios()
    .filter((u) => u.id !== usuario?.id)
    .map((u) => u.correo.toLowerCase())

  function guardar(datos) {
    if (usuario) {
      usuarioService.actualizarUsuario(usuario.id, datos)
      if (usuario.id === sesion.id) refrescarSesion()
      navegar(`/admin/usuarios/${usuario.id}`)
    } else {
      const nuevo = usuarioService.crearUsuario(datos)
      navegar(`/admin/usuarios/${nuevo.id}`)
    }
  }

  return (
    <PlantillaAdmin
      titulo={usuario ? `Editar: ${usuario.nombre} ${usuario.apellidos}` : 'Nuevo usuario'}
      acciones={
        <Link to="/admin/usuarios" className="btn btn-outline-vsm btn-sm">
          ← Volver
        </Link>
      }
    >
      <Card className="tarjeta-formulario">
        <Card.Body className="p-4">
          <FormularioUsuario usuario={usuario} correosUsados={correosUsados} onGuardar={guardar} />
        </Card.Body>
      </Card>
    </PlantillaAdmin>
  )
}

export default AdminUsuarioFormulario
