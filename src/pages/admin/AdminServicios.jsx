// Página admin: listado de servicios con acciones de mostrar, editar y eliminar.
import { useState } from 'react'
import { Alert, Badge, Card, Modal, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PlantillaAdmin from '../../components/templates/PlantillaAdmin'
import Boton from '../../components/atoms/Boton'
import Precio from '../../components/atoms/Precio'
import { useServicios } from '../../context/ServiciosContext'
import { useAuth } from '../../context/AuthContext'

function AdminServicios({ soloCriticos = false }) {
  const { servicios, eliminar } = useServicios()
  const { usuario } = useAuth()
  const esAdmin = usuario.tipo === 'Administrador'
  const [porEliminar, setPorEliminar] = useState(null)
  const [mensaje, setMensaje] = useState('')

  const visibles = soloCriticos ? servicios.filter((s) => s.stock <= s.stockCritico) : servicios

  function confirmarEliminacion() {
    eliminar(porEliminar.id)
    setMensaje(`Se eliminó "${porEliminar.nombre}".`)
    setPorEliminar(null)
  }

  return (
    <PlantillaAdmin
      titulo={soloCriticos ? 'Servicios críticos' : 'Servicios'}
      acciones={
        esAdmin &&
        !soloCriticos && (
          <Link to="/admin/servicios/nuevo" className="btn btn-vsm">
            + Nuevo servicio
          </Link>
        )
      }
    >
      {soloCriticos && (
        <p className="seccion__intro">Servicios con los cupos semanales en el mínimo crítico o por debajo.</p>
      )}
      {mensaje && (
        <Alert variant="success" dismissible onClose={() => setMensaje('')}>
          {mensaje}
        </Alert>
      )}
      <Card className="tarjeta-formulario">
        <Card.Body>
          {visibles.length === 0 ? (
            <p className="text-muted mb-0">No hay servicios para mostrar.</p>
          ) : (
            <Table responsive hover className="tabla-vsm align-middle mb-0">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th className="text-end">Precio</th>
                  <th className="text-center">Cupos</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {visibles.map((s) => (
                  <tr key={s.id}>
                    <td>{s.codigo}</td>
                    <td>
                      {s.nombre}{' '}
                      {s.descuento > 0 && (
                        <Badge bg="" className="etiqueta-oferta ms-1">
                          -{s.descuento}%
                        </Badge>
                      )}
                    </td>
                    <td>{s.categoria}</td>
                    <td className="text-end">
                      <Precio valor={s.precio} />
                    </td>
                    <td className="text-center">
                      <Badge bg={s.stock <= s.stockCritico ? 'danger' : 'light'} text={s.stock <= s.stockCritico ? undefined : 'dark'}>
                        {s.stock} / mín. {s.stockCritico}
                      </Badge>
                    </td>
                    <td className="text-end text-nowrap">
                      <Link to={`/admin/servicios/${s.id}`} className="btn btn-sm btn-outline-vsm me-1">
                        Ver
                      </Link>
                      {esAdmin && (
                        <>
                          <Link to={`/admin/servicios/${s.id}/editar`} className="btn btn-sm btn-outline-vsm me-1">
                            Editar
                          </Link>
                          <Boton size="sm" variante="outline-danger" texto="Eliminar" onClick={() => setPorEliminar(s)} />
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Modal show={Boolean(porEliminar)} onHide={() => setPorEliminar(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fs-5">Eliminar servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Seguro que quieres eliminar "{porEliminar?.nombre}"? Esta acción no se puede deshacer.</Modal.Body>
        <Modal.Footer>
          <Boton variante="outline-secondary" texto="Cancelar" onClick={() => setPorEliminar(null)} />
          <Boton variante="danger" texto="Eliminar" onClick={confirmarEliminacion} />
        </Modal.Footer>
      </Modal>
    </PlantillaAdmin>
  )
}

export default AdminServicios
