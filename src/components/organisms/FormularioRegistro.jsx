// Organismo: formulario de registro de usuario (RF04 de la ERS), con selects
// dependientes de región y comuna y validación hecha en React.
import { useState } from 'react'
import { Alert, Col, Form, Row } from 'react-bootstrap'
import Boton from '../atoms/Boton'
import CampoFormulario from '../molecules/CampoFormulario'
import CampoSelector from '../molecules/CampoSelector'
import { useFormulario } from '../../hooks/useFormulario'
import { validarRegistro } from '../../utils/validaciones'
import regiones from '../../data/regiones.json'

const valoresIniciales = {
  run: '',
  nombre: '',
  apellidos: '',
  correo: '',
  clave: '',
  claveConfirmar: '',
  fechaNacimiento: '',
  region: '',
  comuna: '',
  direccion: '',
}

function FormularioRegistro() {
  const { valores, setValores, errores, manejarCambio, manejarSalida, validarTodo, reiniciar } = useFormulario(
    valoresIniciales,
    validarRegistro,
  )
  const [exito, setExito] = useState('')
  const comunas = regiones[valores.region] ?? []

  // Al cambiar la región, la comuna elegida deja de ser válida: se limpia.
  function cambiarRegion(evento) {
    setValores({ ...valores, region: evento.target.value, comuna: '' })
  }

  function manejarEnvio(evento) {
    evento.preventDefault()
    setExito('')
    if (!validarTodo()) return
    setExito(`¡Cuenta creada correctamente, ${valores.nombre.trim()}! Ya puedes iniciar sesión.`)
    reiniciar()
  }

  // Props comunes a todos los campos, para no repetirlas.
  const campo = (nombre) => ({
    name: nombre,
    value: valores[nombre],
    onChange: manejarCambio,
    onBlur: manejarSalida,
    error: errores[nombre],
  })

  return (
    <Form noValidate onSubmit={manejarEnvio}>
      <Row>
        <Col xs={12} md={6}>
          <CampoFormulario id="run" etiqueta="RUN" placeholder="123456785" ayuda="Sin puntos ni guion." {...campo('run')} />
        </Col>
        <Col xs={12} md={6}>
          <CampoFormulario id="fecha-nacimiento" etiqueta="Fecha de nacimiento (opcional)" type="date" {...campo('fechaNacimiento')} />
        </Col>
        <Col xs={12} md={6}>
          <CampoFormulario id="nombre" etiqueta="Nombre" autoComplete="given-name" {...campo('nombre')} />
        </Col>
        <Col xs={12} md={6}>
          <CampoFormulario id="apellidos" etiqueta="Apellidos" autoComplete="family-name" {...campo('apellidos')} />
        </Col>
        <Col xs={12}>
          <CampoFormulario id="correo-registro" etiqueta="Correo electrónico" type="email" autoComplete="email" {...campo('correo')} />
        </Col>
        <Col xs={12} md={6}>
          <CampoFormulario id="clave" etiqueta="Contraseña" type="password" autoComplete="new-password" ayuda="Entre 4 y 10 caracteres." {...campo('clave')} />
        </Col>
        <Col xs={12} md={6}>
          <CampoFormulario id="clave-confirmar" etiqueta="Confirmar contraseña" type="password" autoComplete="new-password" {...campo('claveConfirmar')} />
        </Col>
        <Col xs={12} md={6}>
          <CampoSelector
            id="region"
            etiqueta="Región"
            textoInicial="Selecciona tu región"
            opciones={Object.keys(regiones)}
            {...campo('region')}
            onChange={cambiarRegion}
          />
        </Col>
        <Col xs={12} md={6}>
          <CampoSelector
            id="comuna"
            etiqueta="Comuna"
            textoInicial={valores.region ? 'Selecciona tu comuna' : 'Selecciona primero tu región'}
            opciones={comunas}
            disabled={!valores.region}
            {...campo('comuna')}
          />
        </Col>
        <Col xs={12}>
          <CampoFormulario id="direccion" etiqueta="Dirección" autoComplete="street-address" {...campo('direccion')} />
        </Col>
      </Row>
      <div className="d-grid">
        <Boton tipo="submit" texto="Crear cuenta" size="lg" />
      </div>
      {exito && (
        <Alert variant="success" className="mt-3 mb-0" role="status">
          {exito}
        </Alert>
      )}
    </Form>
  )
}

export default FormularioRegistro
