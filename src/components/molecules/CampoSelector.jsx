// Molécula: etiqueta + selector + mensaje de error.
import { Form } from 'react-bootstrap'
import Selector from '../atoms/Selector'

function CampoSelector(props) {
  // Se copian los props y se quitan los propios de la molécula; el resto va al selector.
  const atributos = { ...props }
  delete atributos.id
  delete atributos.etiqueta
  delete atributos.error
  return (
    <Form.Group className="mb-3" controlId={props.id}>
      <Form.Label>{props.etiqueta}</Form.Label>
      <Selector isInvalid={Boolean(props.error)} {...atributos} />
      <Form.Control.Feedback type="invalid">{props.error}</Form.Control.Feedback>
    </Form.Group>
  )
}

export default CampoSelector
