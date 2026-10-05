// Organismo: formulario de contacto (RF06) con contador de caracteres.
import { useState } from 'react'
import { Alert, Form } from 'react-bootstrap'
import Boton from '../atoms/Boton'
import CampoFormulario from '../molecules/CampoFormulario'
import { useFormulario } from '../../hooks/useFormulario'
import { validarContacto } from '../../utils/validaciones'

const MAXIMO_COMENTARIO = 500

function FormularioContacto() {
  const { valores, errores, manejarCambio, manejarSalida, validarTodo, reiniciar } = useFormulario(
    { nombre: '', correo: '', comentario: '' },
    validarContacto,
  )
  const [exito, setExito] = useState('')

  function manejarEnvio(evento) {
    evento.preventDefault()
    setExito('')
    if (!validarTodo()) return
    setExito('¡Gracias por tu comentario! Te responderemos a la brevedad.')
    reiniciar()
  }

  return (
    <Form noValidate onSubmit={manejarEnvio}>
      <CampoFormulario
        id="nombre-contacto"
        name="nombre"
        etiqueta="Nombre completo"
        autoComplete="name"
        value={valores.nombre}
        onChange={manejarCambio}
        onBlur={manejarSalida}
        error={errores.nombre}
      />
      <CampoFormulario
        id="correo-contacto"
        name="correo"
        etiqueta="Correo electrónico"
        type="email"
        autoComplete="email"
        value={valores.correo}
        onChange={manejarCambio}
        onBlur={manejarSalida}
        error={errores.correo}
      />
      <CampoFormulario
        id="comentario"
        name="comentario"
        etiqueta="Comentario"
        as="textarea"
        rows={5}
        maxLength={MAXIMO_COMENTARIO}
        value={valores.comentario}
        onChange={manejarCambio}
        onBlur={manejarSalida}
        error={errores.comentario}
        ayuda={`${valores.comentario.length} / ${MAXIMO_COMENTARIO} caracteres`}
      />
      <Boton tipo="submit" texto="Enviar mensaje" />
      {exito && (
        <Alert variant="success" className="mt-3 mb-0" role="status">
          {exito}
        </Alert>
      )}
    </Form>
  )
}

export default FormularioContacto
