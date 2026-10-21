// Página admin: reportes simples de las operaciones de la clínica.
import { Card, Col, ProgressBar, Row, Table } from 'react-bootstrap'
import PlantillaAdmin from '../../components/templates/PlantillaAdmin'
import TarjetaResumen from '../../components/molecules/TarjetaResumen'
import EtiquetaEstadoCita from '../../components/atoms/EtiquetaEstadoCita'
import Precio from '../../components/atoms/Precio'
import { useCitas } from '../../context/CitasContext'
import { ESTADOS_CITA } from '../../utils/agenda'
import { formatearPrecio } from '../../utils/precios'

function AdminReportes() {
  const { citas } = useCitas()
  const confirmadas = citas.filter((c) => c.estado === 'Confirmada')
  const ingresos = confirmadas.reduce((suma, c) => suma + c.total, 0)
  const ticketPromedio = confirmadas.length ? Math.round(ingresos / confirmadas.length) : 0

  // Cuántas veces se pidió cada servicio (sumando cantidades)
  const porServicio = {}
  citas
    .filter((c) => c.estado !== 'Cancelada')
    .forEach((c) =>
      c.items.forEach((i) => {
        porServicio[i.codigo] = porServicio[i.codigo] ?? { nombre: i.nombre, cantidad: 0, monto: 0 }
        porServicio[i.codigo].cantidad += i.cantidad
        porServicio[i.codigo].monto += i.cantidad * i.precioUnitario
      }),
    )
  const ranking = Object.entries(porServicio).sort((a, b) => b[1].cantidad - a[1].cantidad)
  const maximo = ranking[0]?.[1].cantidad ?? 1

  return (
    <PlantillaAdmin titulo="Reportes">
      <Row className="g-3 mb-4">
        <Col xs={12} md={4}>
          <TarjetaResumen titulo="Solicitudes recibidas" valor={citas.length} />
        </Col>
        <Col xs={6} md={4}>
          <TarjetaResumen titulo="Ingresos confirmados" valor={formatearPrecio(ingresos)} />
        </Col>
        <Col xs={6} md={4}>
          <TarjetaResumen titulo="Ticket promedio" valor={formatearPrecio(ticketPromedio)} />
        </Col>
      </Row>
      <Row className="g-4">
        <Col xs={12} lg={5}>
          <Card className="tarjeta-formulario h-100">
            <Card.Body>
              <h2 className="fs-5">Solicitudes por estado</h2>
              <Table className="tabla-vsm mb-0">
                <tbody>
                  {ESTADOS_CITA.map((estado) => (
                    <tr key={estado}>
                      <td>
                        <EtiquetaEstadoCita estado={estado} />
                      </td>
                      <td className="text-end fw-semibold">{citas.filter((c) => c.estado === estado).length}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={7}>
          <Card className="tarjeta-formulario h-100">
            <Card.Body>
              <h2 className="fs-5">Servicios más solicitados</h2>
              {ranking.length === 0 && <p className="text-muted mb-0">Aún no hay datos.</p>}
              {ranking.map(([codigo, datos]) => (
                <div key={codigo} className="mb-3">
                  <div className="d-flex justify-content-between small">
                    <span>{datos.nombre}</span>
                    <span>
                      {datos.cantidad} · <Precio valor={datos.monto} />
                    </span>
                  </div>
                  <ProgressBar now={(datos.cantidad / maximo) * 100} className="barra-reporte" aria-label={datos.nombre} />
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </PlantillaAdmin>
  )
}

export default AdminReportes
