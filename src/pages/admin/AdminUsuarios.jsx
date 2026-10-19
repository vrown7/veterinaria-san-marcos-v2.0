// Página admin: listado de usuarios (mostrar, editar, eliminar).
import { useState } from 'react'
import { Alert, Badge, Card, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PlantillaAdmin from '../../components/templates/PlantillaAdmin'
import Boton from '../../components/atoms/Boton'
import { useAuth } from '../../context/AuthContext'
import * as usuarioService from '../../services/usuarioService'

const COLOR_TIPO = { Administrador: 'dark', Recepcionista: 'info', 'Dueño de mascota': 'light' }

function AdminUsuarios() {
  const { usuario: sesion } = useAuth()
  const [usuarios, setUsuarios] = useState(() => usuarioService.listarUsuarios())
  const [mensaje, setMensaje] = useState('')

  function eliminar(u) {
    usuarioService.eliminarUsuario(u.id)
    setUsuarios(usuarioService.listarUsuarios())
    setMensaje(`Se eliminó a ${u.nombre} ${u.apellidos}.`)
  }

  return (
    <PlantillaAdmin
      titulo="Usuarios"
      acciones={
        <Link to="/admin/usuarios/nuevo" className="btn btn-vsm">
          + Nuevo usuario
        </Link>
      }
    >
      {mensaje && (
        <Alert variant="success" dismissible onClose={() => setMensaje('')}>
          {mensaje}
        </Alert>
      )}
      <Card className="tarjeta-formulario">
        <Card.Body>
          <Table responsive hover className="tabla-vsm align-middle mb-0">
            <thead>
              <tr>
                <th>RUN</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Tipo</th>
                <th>Comuna</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id}>
                  <td>{u.run}</td>
                  <td>
                    {u.nombre} {u.apellidos}
                  </td>
                  <td>{u.correo}</td>
                  <td>
                    <Badge bg={COLOR_TIPO[u.tipo]} text={u.tipo === 'Dueño de mascota' ? 'dark' : undefined}>
                      {u.tipo}
                    </Badge>
                  </td>
                  <td>{u.comuna}</td>
                  <td className="text-end text-nowrap">
                    <Link to={`/admin/usuarios/${u.id}`} className="btn btn-sm btn-outline-vsm me-1">
                      Ver
                    </Link>
                    <Link to={`/admin/usuarios/${u.id}/editar`} className="btn btn-sm btn-outline-vsm me-1">
                      Editar
                    </Link>
                    {/* No se puede eliminar a uno mismo */}
                    {u.id !== sesion.id && (
                      <Boton size="sm" variante="outline-danger" texto="Eliminar" onClick={() => eliminar(u)} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </PlantillaAdmin>
  )
}

export default AdminUsuarios
