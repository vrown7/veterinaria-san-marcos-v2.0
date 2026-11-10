// Molécula: tarjeta con un número destacado para el dashboard del administrador.
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function TarjetaResumen(props) {
  const variante = props.variante || ''
  return (
    <Card className={`tarjeta-resumen h-100 ${variante ? `tarjeta-resumen--${variante}` : ''}`}>
      <Card.Body>
        <p className="tarjeta-resumen__titulo mb-1">{props.titulo}</p>
        <p className="tarjeta-resumen__valor mb-1">{props.valor}</p>
        {props.detalle && <p className="text-muted small mb-2">{props.detalle}</p>}
        {props.enlace && (
          <Link to={props.enlace} className="stretched-link small">
            Ver más
          </Link>
        )}
      </Card.Body>
    </Card>
  )
}

export default TarjetaResumen
