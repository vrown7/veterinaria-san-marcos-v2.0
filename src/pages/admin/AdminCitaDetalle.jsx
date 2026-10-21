// Página admin: ficha (comprobante) de una solicitud de cita. La recepcionista la
// confirma, propone otro horario o la cancela.
import { useState } from 'react'
import { Alert, Card, Col, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import PlantillaAdmin from '../../components/templates/PlantillaAdmin'
import DetalleSolicitud from '../../components/organisms/DetalleSolicitud'
import EtiquetaEstadoCita from '../../components/atoms/EtiquetaEstadoCita'
import Boton from '../../components/atoms/Boton'
import SelectorFechaHora from '../../components/molecules/SelectorFechaHora'
import { useCitas } from '../../context/CitasContext'
import { esDomingo, fechaMinimaCita, formatearFecha, HORARIOS } from '../../utils/agenda'

function AdminCitaDetalle() {
  const { id } = useParams()
  const { citas, cambiarEstado, proponerHorario } = useCitas()
  const [propuesta, setPropuesta] = useState({ fecha: '', hora: '' })
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState('')
  const cita = citas.find((c) => c.id === Number(id))

  if (!cita) {
    return (
      <PlantillaAdmin titulo="Solicitud no encontrada">
        <Link to="/admin/citas">Volver a las solicitudes</Link>
      </PlantillaAdmin>
    )
  }

  function cambiar(estado) {
    cambiarEstado(cita.id, estado)
    setMensaje(`La solicitud quedó ${estado.toLowerCase()}.`)
  }

  function enviarPropuesta() {
    const encontrados = {}
    if (!propuesta.fecha || propuesta.fecha < fechaMinimaCita()) encontrados.fecha = 'Elige una fecha desde mañana.'
    else if (esDomingo(propuesta.fecha)) encontrados.fecha = 'Los domingos la clínica no atiende.'
    if (!HORARIOS.includes(propuesta.hora)) encontrados.hora = 'Selecciona un horario.'
    setErrores(encontrados)
    if (Object.keys(encontrados).length) return
    proponerHorario(cita.id, propuesta.fecha, propuesta.hora)
    setMensaje('Se envió la propuesta de horario al dueño.')
  }

  const editable = cita.estado !== 'Cancelada'

  return (
    <PlantillaAdmin
      titulo={`Solicitud ${cita.numero}`}
      acciones={
        <Link to="/admin/citas" className="btn btn-outline-vsm btn-sm">
          ← Volver
        </Link>
      }
    >
      {mensaje && (
        <Alert variant="success" dismissible onClose={() => setMensaje('')}>
          {mensaje}
        </Alert>
      )}
      <Row className="g-4">
        <Col xs={12} xl={7}>
          <Card className="tarjeta-formulario comprobante">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <p className="text-muted small mb-0">Ficha de atención</p>
                  <h2 className="fs-4 mb-0">{cita.numero}</h2>
                </div>
                <EtiquetaEstadoCita estado={cita.estado} />
              </div>
              <dl className="detalle__datos">
                <dt>Dueño</dt>
                <dd>
                  {cita.nombre} {cita.apellidos}
                </dd>
                <dt>Contacto</dt>
                <dd>
                  {cita.correo} · {cita.telefono}
                </dd>
                <dt>Mascota</dt>
                <dd>
                  {cita.mascota} ({cita.especie})
                </dd>
                <dt>Fecha y hora</dt>
                <dd>
                  {formatearFecha(cita.fecha)} a las {cita.hora}
                </dd>
                {cita.propuesta && (
                  <>
                    <dt>Propuesta</dt>
                    <dd>
                      {formatearFecha(cita.propuesta.fecha)} a las {cita.propuesta.hora} (esperando respuesta)
                    </dd>
                  </>
                )}
                {cita.comentario && (
                  <>
                    <dt>Comentario</dt>
                    <dd>{cita.comentario}</dd>
                  </>
                )}
              </dl>
              <DetalleSolicitud items={cita.items} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} xl={5}>
          <Card className="tarjeta-formulario">
            <Card.Body>
              <h2 className="fs-5">Acciones</h2>
              {!editable ? (
                <p className="text-muted mb-0">La solicitud está cancelada.</p>
              ) : (
                <>
                  <div className="d-flex gap-2 flex-wrap mb-4">
                    {cita.estado !== 'Confirmada' && <Boton texto="Confirmar cita" onClick={() => cambiar('Confirmada')} />}
                    <Boton variante="outline-danger" texto="Cancelar cita" onClick={() => cambiar('Cancelada')} />
                  </div>
                  <h3 className="fs-6">Proponer otro horario</h3>
                  <SelectorFechaHora
                    fecha={propuesta.fecha}
                    hora={propuesta.hora}
                    errores={errores}
                    onChange={(e) => setPropuesta({ ...propuesta, [e.target.name]: e.target.value })}
                    prefijo="propuesta"
                  />
                  <Boton variante="outline-vsm" texto="Enviar propuesta" onClick={enviarPropuesta} />
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </PlantillaAdmin>
  )
}

export default AdminCitaDetalle
