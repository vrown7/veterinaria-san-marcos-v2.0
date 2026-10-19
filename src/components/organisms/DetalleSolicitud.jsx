// Organismo: tabla con los servicios de la solicitud y su total.
// "editable" agrega los botones de cantidad y quitar (página Mi solicitud).
import { Table } from 'react-bootstrap'
import FilaSolicitud from '../molecules/FilaSolicitud'
import Precio from '../atoms/Precio'
import { calcularTotal } from '../../utils/precios'

function DetalleSolicitud({ items, editable = false, onCambiarCantidad, onQuitar }) {
  return (
    <Table responsive className="tabla-vsm align-middle mb-0">
      <thead>
        <tr>
          <th>Servicio</th>
          <th className="text-center">Cantidad</th>
          <th className="text-end">Subtotal</th>
          {editable && <th className="text-end">Acción</th>}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <FilaSolicitud
            key={item.clave}
            item={item}
            onCambiarCantidad={editable ? onCambiarCantidad : undefined}
            onQuitar={onQuitar}
          />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th colSpan={2} className="text-end">
            Total
          </th>
          <th className="text-end">
            <Precio valor={calcularTotal(items)} className="fs-5" />
          </th>
          {editable && <th />}
        </tr>
      </tfoot>
    </Table>
  )
}

export default DetalleSolicitud
