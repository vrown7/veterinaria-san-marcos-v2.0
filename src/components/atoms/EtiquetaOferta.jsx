// Átomo: etiqueta con el porcentaje de descuento de una oferta.
import { Badge } from 'react-bootstrap'

function EtiquetaOferta({ descuento }) {
  return (
    <Badge bg="" className="etiqueta-oferta">
      -{descuento}%
    </Badge>
  )
}

export default EtiquetaOferta
