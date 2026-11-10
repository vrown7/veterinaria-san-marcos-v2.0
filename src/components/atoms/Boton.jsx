// Átomo: botón genérico. No sabe en qué pantalla se usa; solo muestra el texto
// y ejecuta lo que le pasen por onClick.
import { Button } from 'react-bootstrap'

function Boton(props) {
  const variante = props.variante || 'vsm'
  const tipo = props.tipo || 'button'
  return (
    <Button
      variant={variante}
      type={tipo}
      size={props.size}
      disabled={props.disabled}
      className={props.className}
      onClick={props.onClick}
    >
      {props.texto}
    </Button>
  )
}

export default Boton
