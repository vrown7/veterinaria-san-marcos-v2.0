// Página: servicios en oferta (los que tienen descuento).
import { Container } from 'react-bootstrap'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import ListaServicios from '../components/organisms/ListaServicios'
import { useServicios } from '../context/ServiciosContext'

function Ofertas() {
  const { servicios } = useServicios()
  const ofertas = servicios.filter((s) => (s.descuento ?? 0) > 0)

  return (
    <PlantillaPublica>
      <Container as="section" className="py-5">
        <h1 className="seccion__titulo">Ofertas del mes</h1>
        <p className="seccion__intro">
          Servicios con descuento por tiempo limitado. El precio con descuento se mantiene al agregarlos a tu
          solicitud de cita.
        </p>
        <ListaServicios servicios={ofertas} />
      </Container>
    </PlantillaPublica>
  )
}

export default Ofertas
