// Átomo: etiqueta con la especie a la que está dirigido un servicio.
import { Badge } from 'react-bootstrap'

function EtiquetaEspecie({ especie }) {
  return (
    <Badge pill bg="" className="etiqueta-especie">
      {especie}
    </Badge>
  )
}

export default EtiquetaEspecie
