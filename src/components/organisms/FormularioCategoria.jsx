// Organismo: formulario corto para crear o editar una categoría.
import { Form } from 'react-bootstrap'
import Boton from '../atoms/Boton'
import CampoFormulario from '../molecules/CampoFormulario'
import { useFormulario } from '../../hooks/useFormulario'
import { validarCategoria } from '../../utils/validaciones'

function FormularioCategoria({ categoria, nombresUsados, onGuardar, onCancelar }) {
  const validar = (datos) => validarCategoria(datos, nombresUsados)
  const { valores, errores, manejarCambio, manejarSalida, validarTodo } = useFormulario(
    { nombre: categoria?.nombre ?? '', descripcion: categoria?.descripcion ?? '' },
    validar,
  )

  function manejarEnvio(evento) {
    evento.preventDefault()
    if (validarTodo()) onGuardar({ nombre: valores.nombre.trim(), descripcion: valores.descripcion.trim() })
  }

  return (
    <Form noValidate onSubmit={manejarEnvio}>
      <CampoFormulario
        id="categoria-nombre"
        name="nombre"
        etiqueta="Nombre"
        value={valores.nombre}
        onChange={manejarCambio}
        onBlur={manejarSalida}
        error={errores.nombre}
      />
      <CampoFormulario
        id="categoria-descripcion"
        name="descripcion"
        etiqueta="Descripción"
        as="textarea"
        rows={2}
        value={valores.descripcion}
        onChange={manejarCambio}
        onBlur={manejarSalida}
        error={errores.descripcion}
      />
      <div className="d-flex gap-2">
        <Boton tipo="submit" texto={categoria ? 'Guardar cambios' : 'Crear categoría'} />
        <Boton variante="outline-secondary" texto="Cancelar" onClick={onCancelar} />
      </div>
    </Form>
  )
}

export default FormularioCategoria
