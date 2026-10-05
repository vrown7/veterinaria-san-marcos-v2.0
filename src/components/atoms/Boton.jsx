// Átomo: botón genérico. No sabe en qué pantalla se usa; solo muestra el texto
// y ejecuta lo que le pasen por onClick.
import { Button } from 'react-bootstrap'

function Boton({ texto, variante = 'vsm', tipo = 'button', onClick, ...resto }) {
  return (
    <Button variant={variante} type={tipo} onClick={onClick} {...resto}>
      {texto}
    </Button>
  )
}

export default Boton
