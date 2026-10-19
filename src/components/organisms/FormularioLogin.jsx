// Organismo: formulario de inicio de sesión (actividad de la guía 12).
// Átomos: CampoTexto, Boton · Molécula: CampoFormulario · Organismo: este archivo.
// Valida en React y luego busca al usuario con AuthContext (sesión simulada).
import { useState } from 'react'
import { Alert, Form } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Boton from '../atoms/Boton'
import CampoFormulario from '../molecules/CampoFormulario'
import { useFormulario } from '../../hooks/useFormulario'
import { useAuth } from '../../context/AuthContext'
import { validarLogin } from '../../utils/validaciones'

function FormularioLogin() {
  const { valores, errores, manejarCambio, manejarSalida, validarTodo } = useFormulario(
    { correo: '', clave: '' },
    validarLogin,
  )
  const { iniciarSesion } = useAuth()
  const navegar = useNavigate()
  const ubicacion = useLocation()
  const [errorAcceso, setErrorAcceso] = useState('')

  function manejarEnvio(evento) {
    evento.preventDefault()
    setErrorAcceso('')
    if (!validarTodo()) return

    const usuario = iniciarSesion(valores.correo, valores.clave)
    if (!usuario) {
      setErrorAcceso('Correo o contraseña incorrectos.')
      return
    }
    // Vuelve a la página que pidió el login; si no, el personal va al panel y el dueño al inicio.
    const esPersonal = usuario.tipo === 'Administrador' || usuario.tipo === 'Recepcionista'
    navegar(ubicacion.state?.desde ?? (esPersonal ? '/admin' : '/'), { replace: true })
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
      {errorAcceso && (
        <Alert variant="danger" className="py-2" role="alert">
          {errorAcceso}
        </Alert>
      )}
      <div className="d-grid">
        <Boton tipo="submit" texto="Iniciar sesión" size="lg" />
      </div>
      <p className="text-center mt-3 mb-0">
        ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
      </p>
    </Form>
  )
}

export default FormularioLogin
