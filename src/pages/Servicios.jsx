// Página: catálogo de servicios con buscador y filtro por categoría (?categoria=...).
import { useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import BuscadorServicios from '../components/molecules/BuscadorServicios'
import ListaServicios from '../components/organisms/ListaServicios'
import { useServicios } from '../context/ServiciosContext'
import { filtrarServicios } from '../utils/filtros'

function Servicios() {
  const { servicios } = useServicios()
  const [busqueda, setBusqueda] = useState('')
  const [parametros, setParametros] = useSearchParams()
  const categoria = parametros.get('categoria') ?? ''

  const categorias = [...new Set(servicios.map((s) => s.categoria))]
  const visibles = filtrarServicios(servicios, busqueda, categoria)

  function cambiarCategoria(evento) {
    const valor = evento.target.value
    setParametros(valor ? { categoria: valor } : {})
  }

  return (
    <PlantillaPublica>
      <Container as="section" className="py-5">
        <h1 className="seccion__titulo">Catálogo de servicios</h1>
        <p className="seccion__intro">Elige un servicio para ver su detalle, duración y precio.</p>

        <Row className="g-3 mb-4">
          <Col xs={12} md={8}>
            <BuscadorServicios valor={busqueda} onChange={setBusqueda} />
          </Col>
          <Col xs={12} md={4}>
            <Form.Select aria-label="Filtrar por categoría" value={categoria} onChange={cambiarCategoria}>
              <option value="">Todas las categorías</option>
              {categorias.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        <p className="text-muted small" aria-live="polite">
          {visibles.length} {visibles.length === 1 ? 'servicio encontrado' : 'servicios encontrados'}
        </p>
        <ListaServicios servicios={visibles} />
      </Container>
    </PlantillaPublica>
  )
}

export default Servicios
