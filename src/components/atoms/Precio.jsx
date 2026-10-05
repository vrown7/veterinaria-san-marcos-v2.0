// Átomo: muestra un precio ya formateado en pesos chilenos.
import { formatearPrecio } from '../../utils/precios'

function Precio({ valor, className = '' }) {
  return <span className={`precio ${className}`}>{formatearPrecio(valor)}</span>
}

export default Precio
