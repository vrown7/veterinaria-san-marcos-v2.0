// Átomo: etiqueta con el porcentaje de descuento de una oferta.
import { Badge } from 'react-bootstrap'

function EtiquetaOferta(props) {
  return (
    <Badge bg="" className="etiqueta-oferta">
      -{props.descuento}%
    </Badge>
  )
}

export default EtiquetaOferta
