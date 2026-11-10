// Molécula: una fila de la solicitud en curso (servicio, cantidad, subtotal y quitar).
// Sin "onCambiarCantidad" se muestra solo para lectura (resumen del checkout).
import { Button, ButtonGroup } from 'react-bootstrap'
import Precio from '../atoms/Precio'

function FilaSolicitud(props) {
  const item = props.item
  const editable = Boolean(props.onCambiarCantidad)
  return (
    <tr>
      <td>
        <strong className="d-block">{item.nombre}</strong>
        <span className="text-muted small">
          {item.codigo} · <Precio valor={item.precioUnitario} /> c/u
        </span>
      </td>
      <td className="text-center">
        {editable ? (
          <ButtonGroup size="sm" aria-label={`Cantidad de ${item.nombre}`}>
            <Button
              variant="outline-vsm"
              onClick={() => props.onCambiarCantidad(item.clave, item.cantidad - 1)}
              disabled={item.cantidad <= 1}
              aria-label="Restar uno"
            >
              −
            </Button>
            <Button variant="light" disabled className="cantidad">
              {item.cantidad}
            </Button>
            <Button
              variant="outline-vsm"
              onClick={() => props.onCambiarCantidad(item.clave, item.cantidad + 1)}
              disabled={item.cantidad >= 5}
              aria-label="Sumar uno"
            >
              +
            </Button>
          </ButtonGroup>
        ) : (
          item.cantidad
        )}
      </td>
      <td className="text-end">
        <Precio valor={item.precioUnitario * item.cantidad} />
      </td>
      {editable && (
        <td className="text-end">
          <Button variant="link" className="text-danger p-0" onClick={() => props.onQuitar(item.clave)}>
            Quitar
          </Button>
        </td>
      )}
    </tr>
  )
}

export default FilaSolicitud
