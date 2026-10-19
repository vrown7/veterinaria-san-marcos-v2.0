// Página: Inicio. Usa el template público y le pone datos reales.
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import Hero from '../components/organisms/Hero'
import ListaServicios from '../components/organisms/ListaServicios'
import { useServicios } from '../context/ServiciosContext'

// Códigos de los servicios que se muestran como destacados en la portada.
const CODIGOS_DESTACADOS = ['SV001', 'VA001', 'DE002']

function Inicio() {
  const { servicios, categorias } = useServicios()
  const destacados = servicios.filter((s) => CODIGOS_DESTACADOS.includes(s.codigo))
  const ofertas = servicios.filter((s) => (s.descuento ?? 0) > 0).slice(0, 3)

  return (
    <PlantillaPublica>
      <Hero
        titulo="Cuidamos a tu mascota como parte de tu familia"
        texto="Desde 2009 atendemos perros, gatos, conejos y aves en Rancagua, con un equipo de médicos y técnicos veterinarios dedicados a la salud y bienestar de tu compañero de vida."
        imagen="/img/hero-veterinaria.jpg"
        alt="Médico veterinario examinando a un perro en la clínica"
      />
      <Container as="section" className="py-5">
        <h2 className="seccion__titulo">Servicios más solicitados</h2>
        <p className="seccion__intro">
          Una muestra de lo que puedes agendar. Revisa el catálogo completo para ver todas las categorías de
          atención.
        </p>
        <ListaServicios servicios={destacados} />
        <div className="text-center mt-4">
          <Link to="/servicios" className="btn btn-vsm">
            Ver catálogo completo
          </Link>
        </div>
      </Container>

      <section className="franja-categorias py-5">
        <Container>
          <h2 className="seccion__titulo">Áreas de atención</h2>
          <Row className="g-3">
            {categorias.map((categoria) => (
              <Col key={categoria.id} xs={6} md={4} lg={2}>
                <Card className="h-100 text-center tarjeta-categoria-mini">
                  <Card.Body className="d-flex align-items-center justify-content-center">
                    <Link
                      to={`/servicios?categoria=${encodeURIComponent(categoria.nombre)}`}
                      className="stretched-link fw-semibold text-decoration-none"
                    >
                      {categoria.nombre}
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {ofertas.length > 0 && (
        <Container as="section" className="py-5">
          <h2 className="seccion__titulo">Ofertas del mes</h2>
          <p className="seccion__intro">Descuentos por tiempo limitado en servicios seleccionados.</p>
          <ListaServicios servicios={ofertas} />
          <div className="text-center mt-4">
            <Link to="/ofertas" className="btn btn-outline-vsm">
              Ver todas las ofertas
            </Link>
          </div>
        </Container>
      )}
    </PlantillaPublica>
  )
}

export default Inicio
