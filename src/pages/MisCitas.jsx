// Página: citas del dueño que inició sesión, con su estado.
import { Container } from 'react-bootstrap'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import ListaMisCitas from '../components/organisms/ListaMisCitas'
import { useAuth } from '../context/AuthContext'
import { useCitas } from '../context/CitasContext'

function MisCitas() {
  const { usuario } = useAuth()
  const { citas, aceptarPropuesta, cambiarEstado } = useCitas()
  const mias = citas
    .filter((c) => c.correo.toLowerCase() === usuario.correo.toLowerCase())
    .sort((a, b) => b.id - a.id)

  return (
    <PlantillaPublica>
      <Container as="section" className="py-5">
        <h1 className="seccion__titulo">Mis citas</h1>
        <p className="seccion__intro">Revisa el estado de tus solicitudes y responde a los cambios de horario.</p>
        <ListaMisCitas
          citas={mias}
          onAceptarPropuesta={aceptarPropuesta}
          onCancelar={(id) => cambiarEstado(id, 'Cancelada')}
        />
      </Container>
    </PlantillaPublica>
  )
}

export default MisCitas
