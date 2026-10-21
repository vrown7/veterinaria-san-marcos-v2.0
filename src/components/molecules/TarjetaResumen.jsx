// Molécula: tarjeta con un número destacado para el dashboard del administrador.
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function TarjetaResumen({ titulo, valor, detalle, enlace, variante = '' }) {
  return (
    <Card className={`tarjeta-resumen h-100 ${variante ? `tarjeta-resumen--${variante}` : ''}`}>
      <Card.Body>
        <p className="tarjeta-resumen__titulo mb-1">{titulo}</p>
        <p className="tarjeta-resumen__valor mb-1">{valor}</p>
        {detalle && <p className="text-muted small mb-2">{detalle}</p>}
        {enlace && (
          <Link to={enlace} className="stretched-link small">
            Ver más
          </Link>
        )}
      </Card.Body>
    </Card>
  )
}

export default TarjetaResumen
