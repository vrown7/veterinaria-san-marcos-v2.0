// Organismo: tabla de solicitudes de cita (panel de administración e historial de un usuario).
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import EtiquetaEstadoCita from '../atoms/EtiquetaEstadoCita'
import Precio from '../atoms/Precio'
import { formatearFecha } from '../../utils/agenda'

function TablaCitas({ citas, mostrarDueno = true }) {
  if (citas.length === 0) {
    return <p className="text-muted mb-0">No hay solicitudes para mostrar.</p>
  }
  return (
    <Table responsive hover className="tabla-vsm align-middle mb-0">
      <thead>
        <tr>
          <th>N.º</th>
          {mostrarDueno && <th>Dueño</th>}
          <th>Mascota</th>
          <th>Fecha y hora</th>
          <th className="text-end">Total</th>
          <th>Estado</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {citas.map((cita) => (
          <tr key={cita.id}>
            <td className="text-nowrap">{cita.numero}</td>
            {mostrarDueno && (
              <td>
                {cita.nombre} {cita.apellidos}
              </td>
            )}
            <td>
              {cita.mascota} <span className="text-muted small">({cita.especie})</span>
            </td>
            <td className="text-nowrap">
              {formatearFecha(cita.fecha)} · {cita.hora}
            </td>
            <td className="text-end">
              <Precio valor={cita.total} />
            </td>
            <td>
              <EtiquetaEstadoCita estado={cita.estado} />
            </td>
            <td className="text-end">
              <Link to={`/admin/citas/${cita.id}`} className="btn btn-outline-vsm btn-sm">
                Ver ficha
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default TablaCitas
