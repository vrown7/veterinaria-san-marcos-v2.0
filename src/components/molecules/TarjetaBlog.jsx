// Molécula: tarjeta de una publicación del blog.
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function TarjetaBlog({ blog }) {
  return (
    <Card className="h-100 tarjeta-servicio">
      <Card.Img variant="top" src={blog.imagen} alt={blog.alt} className="tarjeta-servicio__imagen" />
      <Card.Body className="d-flex flex-column">
        <p className="tarjeta-servicio__categoria mb-1">{blog.categoria}</p>
        <Card.Title as="h2" className="fs-5">
          {blog.titulo}
        </Card.Title>
        <Card.Text>{blog.resumen}</Card.Text>
        <Link to={`/blog/${blog.id}`} className="btn btn-outline-vsm btn-sm mt-auto align-self-start">
          Leer más
        </Link>
      </Card.Body>
    </Card>
  )
}

export default TarjetaBlog
