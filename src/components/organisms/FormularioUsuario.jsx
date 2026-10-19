// Organismo: formulario de usuario del panel de administración (nuevo y editar).
import { Col, Form, Row } from 'react-bootstrap'
import Boton from '../atoms/Boton'
import CampoFormulario from '../molecules/CampoFormulario'
import CampoSelector from '../molecules/CampoSelector'
import { useFormulario } from '../../hooks/useFormulario'
import { validarUsuario } from '../../utils/validaciones'
import regiones from '../../data/regiones.json'

const TIPOS = ['Administrador', 'Recepcionista', 'Dueño de mascota']

function FormularioUsuario({ usuario, correosUsados, onGuardar }) {
  const esNuevo = !usuario
  const validar = (datos) => validarUsuario(datos, { correosUsados, esNuevo })
  const { valores, setValores, errores, manejarCambio, manejarSalida, validarTodo } = useFormulario(
    {
      run: usuario?.run ?? '',
      nombre: usuario?.nombre ?? '',
      apellidos: usuario?.apellidos ?? '',
      correo: usuario?.correo ?? '',
      clave: '',
      tipo: usuario?.tipo ?? '',
      region: usuario?.region ?? '',
      comuna: usuario?.comuna ?? '',
      direccion: usuario?.direccion ?? '',
    },
    validar,
  )

  function manejarEnvio(evento) {
    evento.preventDefault()
    if (validarTodo()) onGuardar({ ...valores, run: valores.run.trim().toUpperCase() })
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
      <Row>
        <Col xs={12} md={4}>
          <CampoFormulario id="usuario-run" etiqueta="RUN" placeholder="123456785" ayuda="Sin puntos ni guion." {...campo('run')} />
        </Col>
        <Col xs={12} md={4}>
          <CampoFormulario id="usuario-nombre" etiqueta="Nombre" {...campo('nombre')} />
        </Col>
        <Col xs={12} md={4}>
          <CampoFormulario id="usuario-apellidos" etiqueta="Apellidos" {...campo('apellidos')} />
        </Col>
        <Col xs={12} md={6}>
          <CampoFormulario id="usuario-correo" etiqueta="Correo" type="email" {...campo('correo')} />
        </Col>
        <Col xs={12} md={6}>
          <CampoFormulario
            id="usuario-clave"
            etiqueta="Contraseña"
            type="password"
            autoComplete="new-password"
            ayuda={esNuevo ? 'Entre 4 y 10 caracteres.' : 'Déjala vacía para mantener la actual.'}
            {...campo('clave')}
          />
        </Col>
        <Col xs={12} md={4}>
          <CampoSelector id="usuario-tipo" etiqueta="Tipo de usuario" textoInicial="Selecciona el tipo" opciones={TIPOS} {...campo('tipo')} />
        </Col>
        <Col xs={12} md={4}>
          <CampoSelector
            id="usuario-region"
            etiqueta="Región"
            textoInicial="Selecciona la región"
            opciones={Object.keys(regiones)}
            {...campo('region')}
            onChange={(e) => setValores({ ...valores, region: e.target.value, comuna: '' })}
          />
        </Col>
        <Col xs={12} md={4}>
          <CampoSelector
            id="usuario-comuna"
            etiqueta="Comuna"
            textoInicial={valores.region ? 'Selecciona la comuna' : 'Selecciona primero la región'}
            opciones={regiones[valores.region] ?? []}
            disabled={!valores.region}
            {...campo('comuna')}
          />
        </Col>
        <Col xs={12}>
          <CampoFormulario id="usuario-direccion" etiqueta="Dirección" {...campo('direccion')} />
        </Col>
      </Row>
      <Boton tipo="submit" texto={esNuevo ? 'Crear usuario' : 'Guardar cambios'} />
    </Form>
  )
}

export default FormularioUsuario
