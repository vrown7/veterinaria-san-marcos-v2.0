// Página: listado de publicaciones del blog.
import { Col, Container, Row } from 'react-bootstrap'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import TarjetaBlog from '../components/molecules/TarjetaBlog'
import blogs from '../data/blogs'

function Blog() {
  return (
    <PlantillaPublica>
      <Container as="section" className="py-5">
        <h1 className="seccion__titulo">Blog de Veterinaria San Marcos</h1>
        <p className="seccion__intro">
          Consejos y recomendaciones de nuestro equipo veterinario para el cuidado diario de tu mascota.
        </p>
        <Row className="g-4">
          {blogs.map((blog) => (
            <Col key={blog.id} xs={12} md={6}>
              <TarjetaBlog blog={blog} />
            </Col>
          ))}
        </Row>
      </Container>
    </PlantillaPublica>
  )
}

export default Blog
