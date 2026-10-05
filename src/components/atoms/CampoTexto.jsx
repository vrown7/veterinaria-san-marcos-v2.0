// Átomo: campo de texto (input). Recibe todo por props (type, value, onChange...).
import { Form } from 'react-bootstrap'

function CampoTexto(props) {
  return <Form.Control {...props} />
}

export default CampoTexto
