// Átomo: etiqueta con la especie a la que está dirigido un servicio.
import { Badge } from 'react-bootstrap'

function EtiquetaEspecie(props) {
  return (
    <Badge pill bg="" className="etiqueta-especie">
      {props.especie}
    </Badge>
  )
}

export default EtiquetaEspecie
