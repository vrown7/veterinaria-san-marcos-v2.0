// Molécula: campo de búsqueda del catálogo. Una sola responsabilidad: "buscar".
// No filtra por sí misma: avisa el texto escrito a quien la usa (onChange).
import { Form, InputGroup } from 'react-bootstrap'
import CampoTexto from '../atoms/CampoTexto'

function BuscadorServicios({ valor, onChange }) {
  return (
    <Form onSubmit={(e) => e.preventDefault()} role="search">
      <InputGroup>
        <InputGroup.Text id="icono-buscar" aria-hidden="true">
          🔍
        </InputGroup.Text>
        <CampoTexto
          type="search"
          placeholder="Buscar por nombre, categoría o especie"
          aria-label="Buscar servicios"
          value={valor}
          onChange={(e) => onChange(e.target.value)}
        />
      </InputGroup>
    </Form>
  )
}

export default BuscadorServicios
