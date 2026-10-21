// Página admin: categorías del catálogo (nueva, editar y eliminar).
import { useState } from 'react'
import { Alert, Card, Col, Row, Table } from 'react-bootstrap'
import PlantillaAdmin from '../../components/templates/PlantillaAdmin'
import Boton from '../../components/atoms/Boton'
import FormularioCategoria from '../../components/organisms/FormularioCategoria'
import { useServicios } from '../../context/ServiciosContext'

function AdminCategorias() {
  const { categorias, servicios, crearCategoria, actualizarCategoria, eliminarCategoria } = useServicios()
  // null = sin formulario, 'nueva' = crear, objeto = editar esa categoría
  const [editando, setEditando] = useState(null)
  const [aviso, setAviso] = useState({ tipo: '', texto: '' })

  const nombresUsados = categorias
    .filter((c) => c.id !== editando?.id)
    .map((c) => c.nombre.toLowerCase())

  function guardar(datos) {
    if (editando === 'nueva') crearCategoria(datos)
    else actualizarCategoria(editando.id, datos)
    setAviso({ tipo: 'success', texto: `Categoría "${datos.nombre}" guardada.` })
    setEditando(null)
  }

  function eliminar(categoria) {
    try {
      eliminarCategoria(categoria.id)
      setAviso({ tipo: 'success', texto: `Se eliminó "${categoria.nombre}".` })
    } catch (error) {
      setAviso({ tipo: 'danger', texto: error.message })
    }
  }

  return (
    <PlantillaAdmin
      titulo="Categorías"
      acciones={<Boton texto="+ Nueva categoría" onClick={() => setEditando('nueva')} />}
    >
      {aviso.texto && (
        <Alert variant={aviso.tipo} dismissible onClose={() => setAviso({ tipo: '', texto: '' })}>
          {aviso.texto}
        </Alert>
      )}
      <Row className="g-4">
        <Col xs={12} xl={editando ? 7 : 12}>
          <Card className="tarjeta-formulario">
            <Card.Body>
              <Table responsive className="tabla-vsm align-middle mb-0">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th className="text-center">Servicios</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {categorias.map((c) => (
                    <tr key={c.id}>
                      <td className="fw-semibold">{c.nombre}</td>
                      <td className="text-muted small">{c.descripcion}</td>
                      <td className="text-center">{servicios.filter((s) => s.categoria === c.nombre).length}</td>
                      <td className="text-end text-nowrap">
                        <Boton size="sm" variante="outline-vsm" texto="Editar" className="me-1" onClick={() => setEditando(c)} />
                        <Boton size="sm" variante="outline-danger" texto="Eliminar" onClick={() => eliminar(c)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        {editando && (
          <Col xs={12} xl={5}>
            <Card className="tarjeta-formulario">
              <Card.Body>
                <h2 className="fs-5">{editando === 'nueva' ? 'Nueva categoría' : `Editar: ${editando.nombre}`}</h2>
                <FormularioCategoria
                  key={editando === 'nueva' ? 'nueva' : editando.id}
                  categoria={editando === 'nueva' ? null : editando}
                  nombresUsados={nombresUsados}
                  onGuardar={guardar}
                  onCancelar={() => setEditando(null)}
                />
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </PlantillaAdmin>
  )
}

export default AdminCategorias
