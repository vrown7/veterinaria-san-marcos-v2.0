// Página: detalle de una publicación. El id llega por la URL: /blog/:id
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import blogs from '../data/blogs'

function BlogDetalle() {
  const { id } = useParams()
  const blog = blogs.find((b) => b.id === Number(id))

  return (
    <PlantillaPublica>
      <Container as="section" className="py-5">
        <p>
          <Link to="/blog">← Volver al blog</Link>
        </p>
        {!blog ? (
          <h1 className="seccion__titulo">Publicación no encontrada</h1>
        ) : (
          <Row className="justify-content-center">
            <Col xs={12} lg={8} as="article" className="articulo-blog">
              <img className="detalle__imagen mb-4" src={blog.imagen} alt={blog.alt} />
              <p className="tarjeta-servicio__categoria mb-1">{blog.categoria}</p>
              <h1 className="seccion__titulo">{blog.titulo}</h1>
              {blog.contenido.map((bloque, i) => {
                if (bloque.tipo === 'h2') return <h2 key={i}>{bloque.texto}</h2>
                if (bloque.tipo === 'ul')
                  return (
                    <ul key={i}>
                      {bloque.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )
                return <p key={i}>{bloque.texto}</p>
              })}
              <p>
                ¿Tienes dudas? <Link to="/contacto">Escríbenos</Link> o revisa nuestro{' '}
                <Link to="/servicios">catálogo de servicios</Link>.
              </p>
            </Col>
          </Row>
        )}
      </Container>
    </PlantillaPublica>
  )
}

export default BlogDetalle
