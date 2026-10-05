// Página: se muestra cuando la URL no coincide con ninguna ruta.
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PlantillaPublica from '../components/templates/PlantillaPublica'

function NoEncontrada() {
  return (
    <PlantillaPublica>
      <Container className="py-5 text-center">
        <h1 className="seccion__titulo">Página no encontrada</h1>
        <p>La dirección que ingresaste no existe.</p>
        <Link to="/" className="btn btn-vsm">
          Ir al inicio
        </Link>
      </Container>
    </PlantillaPublica>
  )
}

export default NoEncontrada
