// Átomo: lista desplegable (select). Las opciones llegan por props.
import { Form } from 'react-bootstrap'

function Selector(props) {
  const textoInicial = props.textoInicial || 'Selecciona una opción'
  // Se copian los props y se quitan los propios del átomo; el resto va al <select>.
  const atributos = { ...props }
  delete atributos.opciones
  delete atributos.textoInicial
  return (
    <Form.Select {...atributos}>
      <option value="">{textoInicial}</option>
      {props.opciones.map((opcion) => (
        <option key={opcion} value={opcion}>
          {opcion}
        </option>
      ))}
    </Form.Select>
  )
}

export default Selector
