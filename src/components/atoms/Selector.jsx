// Átomo: lista desplegable (select). Las opciones llegan por props.
import { Form } from 'react-bootstrap'

function Selector({ opciones, textoInicial = 'Selecciona una opción', ...resto }) {
  return (
    <Form.Select {...resto}>
      <option value="">{textoInicial}</option>
      {opciones.map((opcion) => (
        <option key={opcion} value={opcion}>
          {opcion}
        </option>
      ))}
    </Form.Select>
  )
}

export default Selector
