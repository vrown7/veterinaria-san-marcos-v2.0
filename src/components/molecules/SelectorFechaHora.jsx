// Molécula: fecha y hora de la cita, con los horarios de atención de la clínica.
import { Col, Row } from 'react-bootstrap'
import CampoFormulario from './CampoFormulario'
import CampoSelector from './CampoSelector'
import { HORARIOS, fechaMinimaCita } from '../../utils/agenda'

function SelectorFechaHora(props) {
  const errores = props.errores || {}
  const prefijo = props.prefijo || 'cita'
  return (
    <Row>
      <Col xs={12} md={6}>
        <CampoFormulario
          id={`${prefijo}-fecha`}
          name="fecha"
          etiqueta="Fecha"
          type="date"
          min={fechaMinimaCita()}
          value={props.fecha}
          onChange={props.onChange}
          onBlur={props.onBlur}
          error={errores.fecha}
          ayuda="Lunes a sábado."
        />
      </Col>
      <Col xs={12} md={6}>
        <CampoSelector
          id={`${prefijo}-hora`}
          name="hora"
          etiqueta="Hora"
          textoInicial="Selecciona un horario"
          opciones={HORARIOS}
          value={props.hora}
          onChange={props.onChange}
          onBlur={props.onBlur}
          error={errores.hora}
        />
      </Col>
    </Row>
  )
}

export default SelectorFechaHora
