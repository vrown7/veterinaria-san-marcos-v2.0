// Átomo: etiqueta de color según el estado de una cita.
import { Badge } from 'react-bootstrap'

const COLORES = {
  Pendiente: 'warning',
  Confirmada: 'success',
  Reprogramada: 'info',
  Cancelada: 'secondary',
}

function EtiquetaEstadoCita({ estado }) {
  return (
    <Badge bg={COLORES[estado] ?? 'secondary'} text={estado === 'Pendiente' || estado === 'Reprogramada' ? 'dark' : undefined}>
      {estado}
    </Badge>
  )
}

export default EtiquetaEstadoCita
