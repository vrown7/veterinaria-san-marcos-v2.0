// Página admin: nuevo servicio o editar servicio (la misma página, según la URL).
import { Card } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PlantillaAdmin from '../../components/templates/PlantillaAdmin'
import FormularioServicio from '../../components/organisms/FormularioServicio'
import { useServicios } from '../../context/ServiciosContext'

function AdminServicioFormulario() {
  const { id } = useParams()
  const { servicios, categorias, crear, actualizar } = useServicios()
  const navegar = useNavigate()
  const servicio = id ? servicios.find((s) => s.id === Number(id)) : null

  if (id && !servicio) {
    return (
      <PlantillaAdmin titulo="Servicio no encontrado">
        <Link to="/admin/servicios">Volver a servicios</Link>
      </PlantillaAdmin>
    )
  }

  // Al editar, el propio código no cuenta como repetido.
  const codigosUsados = servicios.filter((s) => s.id !== servicio?.id).map((s) => s.codigo)

  function guardar(datos) {
    if (servicio) {
      actualizar(servicio.id, datos)
      navegar(`/admin/servicios/${servicio.id}`)
    } else {
      const nuevo = crear(datos)
      navegar(`/admin/servicios/${nuevo.id}`)
    }
  }

  return (
    <PlantillaAdmin
      titulo={servicio ? `Editar: ${servicio.nombre}` : 'Nuevo servicio'}
      acciones={
        <Link to="/admin/servicios" className="btn btn-outline-vsm btn-sm">
          ← Volver
        </Link>
      }
    >
      <Card className="tarjeta-formulario">
        <Card.Body className="p-4">
          <FormularioServicio
            servicio={servicio}
            categorias={categorias}
            codigosUsados={codigosUsados}
            onGuardar={guardar}
            textoBoton={servicio ? 'Guardar cambios' : 'Crear servicio'}
          />
        </Card.Body>
      </Card>
    </PlantillaAdmin>
  )
}

export default AdminServicioFormulario
