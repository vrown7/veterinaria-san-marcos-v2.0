// Organismo: formulario de inicio de sesión (actividad de la guía 12).
// Átomos: CampoTexto, Boton · Molécula: CampoFormulario · Organismo: este archivo.
import { useState } from 'react'
import { Alert, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Boton from '../atoms/Boton'
import CampoFormulario from '../molecules/CampoFormulario'
import { useFormulario } from '../../hooks/useFormulario'
import { validarLogin } from '../../utils/validaciones'

function FormularioLogin() {
  const { valores, errores, manejarCambio, manejarSalida, validarTodo, reiniciar } = useFormulario(
    { correo: '', clave: '' },
    validarLogin,
  )
  const [exito, setExito] = useState('')

  function manejarEnvio(evento) {
    evento.preventDefault()
    setExito('')
    if (!validarTodo()) return
    // En el Parcial 2 no hay backend: solo se valida en el navegador.
    setExito('Inicio de sesión correcto. Bienvenido de vuelta.')
    reiniciar()
  }

  return (
    <Form noValidate onSubmit={manejarEnvio}>
      <CampoFormulario
        id="correo-login"
        name="correo"
        etiqueta="Correo electrónico"
        type="email"
        autoComplete="email"
        placeholder="tucorreo@gmail.com"
        value={valores.correo}
        onChange={manejarCambio}
        onBlur={manejarSalida}
        error={errores.correo}
      />
      <CampoFormulario
        id="clave-login"
        name="clave"
        etiqueta="Contraseña"
        type="password"
        autoComplete="current-password"
        value={valores.clave}
        onChange={manejarCambio}
        onBlur={manejarSalida}
        error={errores.clave}
      />
      <div className="d-grid">
        <Boton tipo="submit" texto="Iniciar sesión" size="lg" />
      </div>
      {exito && (
        <Alert variant="success" className="mt-3 mb-0" role="status">
          {exito}
        </Alert>
      )}
      <p className="text-center mt-3 mb-0">
        ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
      </p>
    </Form>
  )
}

export default FormularioLogin
