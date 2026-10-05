// Molécula: etiqueta + selector + mensaje de error.
import { Form } from 'react-bootstrap'
import Selector from '../atoms/Selector'

function CampoSelector({ id, etiqueta, error, ...resto }) {
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>{etiqueta}</Form.Label>
      <Selector isInvalid={Boolean(error)} {...resto} />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  )
}

export default CampoSelector
