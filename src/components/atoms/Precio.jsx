// Átomo: muestra un precio ya formateado en pesos chilenos.
// Con "tachado" se usa para el precio anterior de una oferta.
import { formatearPrecio } from '../../utils/precios'

function Precio({ valor, tachado = false, className = '' }) {
  if (tachado) {
    return <del className={`precio precio--anterior ${className}`}>{formatearPrecio(valor)}</del>
  }
  return <span className={`precio ${className}`}>{formatearPrecio(valor)}</span>
}

export default Precio
