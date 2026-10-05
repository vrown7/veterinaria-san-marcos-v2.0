// Molécula: tarjeta de un servicio del catálogo. Recibe el servicio por props.
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import EtiquetaEspecie from '../atoms/EtiquetaEspecie'
import Precio from '../atoms/Precio'

function TarjetaServicio({ servicio }) {
  return (
    <Card className="tarjeta-servicio h-100">
      <Card.Img variant="top" src={servicio.imagen} alt={servicio.nombre} className="tarjeta-servicio__imagen" />
      <Card.Body className="d-flex flex-column">
        <p className="tarjeta-servicio__categoria mb-1">{servicio.categoria}</p>
        <Card.Title as="h3" className="tarjeta-servicio__nombre">
          {servicio.nombre}
        </Card.Title>
        <div className="mb-3">
          <EtiquetaEspecie especie={servicio.especie} />
        </div>
        <div className="mt-auto d-flex justify-content-between align-items-center gap-2">
          <Precio valor={servicio.precio} className="fs-5" />
          <Link to={`/servicios/${servicio.id}`} className="btn btn-outline-vsm btn-sm">
            Ver detalle
          </Link>
        </div>
      </Card.Body>
    </Card>
  )
}

export default TarjetaServicio
