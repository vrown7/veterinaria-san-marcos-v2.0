// Organismo: datos del dueño, de la mascota y de la cita (checkout).
// Si hay sesión iniciada, los datos de la persona se completan solos.
import { Col, Form, Row } from 'react-bootstrap'
import Boton from '../atoms/Boton'
import CampoFormulario from '../molecules/CampoFormulario'
import CampoSelector from '../molecules/CampoSelector'
import SelectorFechaHora from '../molecules/SelectorFechaHora'
import { useFormulario } from '../../hooks/useFormulario'
import { validarSolicitudCita } from '../../utils/validaciones'
import { ESPECIES } from '../../utils/agenda'

function FormularioSolicitudCita({ usuario, onConfirmar, deshabilitado = false }) {
  const { valores, errores, manejarCambio, manejarSalida, validarTodo } = useFormulario(
    {
      nombre: usuario?.nombre ?? '',
      apellidos: usuario?.apellidos ?? '',
      correo: usuario?.correo ?? '',
      telefono: '',
      mascota: '',
      especie: '',
      fecha: '',
      hora: '',
      comentario: '',
    },
    validarSolicitudCita,
  )

  function manejarEnvio(evento) {
    evento.preventDefault()
    if (validarTodo()) onConfirmar(valores)
  }

  const campo = (nombre) => ({
    name: nombre,
    value: valores[nombre],
    onChange: manejarCambio,
    onBlur: manejarSalida,
    error: errores[nombre],
  })

  return (
    <Form noValidate onSubmit={manejarEnvio}>
      <h2 className="fs-5 mb-3">Tus datos</h2>
      <Row>
        <Col xs={12} md={6}>
          <CampoFormulario id="solicitud-nombre" etiqueta="Nombre" autoComplete="given-name" {...campo('nombre')} />
        </Col>
        <Col xs={12} md={6}>
          <CampoFormulario id="solicitud-apellidos" etiqueta="Apellidos" autoComplete="family-name" {...campo('apellidos')} />
        </Col>
        <Col xs={12} md={7}>
          <CampoFormulario id="solicitud-correo" etiqueta="Correo electrónico" type="email" autoComplete="email" {...campo('correo')} />
        </Col>
        <Col xs={12} md={5}>
          <CampoFormulario id="solicitud-telefono" etiqueta="Celular" type="tel" placeholder="912345678" autoComplete="tel" {...campo('telefono')} />
        </Col>
      </Row>

      <h2 className="fs-5 mb-3 mt-2">Tu mascota</h2>
      <Row>
        <Col xs={12} md={6}>
          <CampoFormulario id="solicitud-mascota" etiqueta="Nombre de la mascota" {...campo('mascota')} />
        </Col>
        <Col xs={12} md={6}>
          <CampoSelector id="solicitud-especie" etiqueta="Especie" textoInicial="Selecciona la especie" opciones={ESPECIES} {...campo('especie')} />
        </Col>
      </Row>

      <h2 className="fs-5 mb-3 mt-2">Fecha y hora de la atención</h2>
      <SelectorFechaHora
        fecha={valores.fecha}
        hora={valores.hora}
        errores={errores}
        onChange={manejarCambio}
        onBlur={manejarSalida}
        prefijo="solicitud"
      />
      <CampoFormulario
        id="solicitud-comentario"
        etiqueta="Comentario (opcional)"
        as="textarea"
        rows={3}
        maxLength={300}
        {...campo('comentario')}
      />
      <div className="d-grid">
        <Boton tipo="submit" texto="Confirmar solicitud de cita" size="lg" disabled={deshabilitado} />
      </div>
    </Form>
  )
}

export default FormularioSolicitudCita
