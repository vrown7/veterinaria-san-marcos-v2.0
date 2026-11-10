// Átomo: muestra un precio ya formateado en pesos chilenos.
// Con "tachado" se usa para el precio anterior de una oferta.
import { formatearPrecio } from '../../utils/precios'

function Precio(props) {
  const className = props.className || ''
  if (props.tachado) {
    return <del className={`precio precio--anterior ${className}`}>{formatearPrecio(props.valor)}</del>
  }
  return <span className={`precio ${className}`}>{formatearPrecio(props.valor)}</span>
}

export default Precio
