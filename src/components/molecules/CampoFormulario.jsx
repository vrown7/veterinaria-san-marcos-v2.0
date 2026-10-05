// Molécula: etiqueta + campo de texto + mensaje de error.
// Junta tres piezas con un solo propósito: que el usuario complete un dato y vea si está mal.
import { Form } from 'react-bootstrap'
import CampoTexto from '../atoms/CampoTexto'

function CampoFormulario({ id, etiqueta, error, ayuda, ...resto }) {
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>{etiqueta}</Form.Label>
      <CampoTexto isInvalid={Boolean(error)} {...resto} />
      {ayuda && !error && <Form.Text muted>{ayuda}</Form.Text>}
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  )
}

export default CampoFormulario
