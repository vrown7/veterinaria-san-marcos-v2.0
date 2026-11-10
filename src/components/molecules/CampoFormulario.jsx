// Molécula: etiqueta + campo de texto + mensaje de error.
// Junta tres piezas con un solo propósito: que el usuario complete un dato y vea si está mal.
import { Form } from 'react-bootstrap'
import CampoTexto from '../atoms/CampoTexto'

function CampoFormulario(props) {
  // Se copian los props y se quitan los propios de la molécula; el resto va al input.
  const atributos = { ...props }
  delete atributos.id
  delete atributos.etiqueta
  delete atributos.error
  delete atributos.ayuda
  return (
    <Form.Group className="mb-3" controlId={props.id}>
      <Form.Label>{props.etiqueta}</Form.Label>
      <CampoTexto isInvalid={Boolean(props.error)} {...atributos} />
      {props.ayuda && !props.error && <Form.Text muted>{props.ayuda}</Form.Text>}
      <Form.Control.Feedback type="invalid">{props.error}</Form.Control.Feedback>
    </Form.Group>
  )
}

export default CampoFormulario
