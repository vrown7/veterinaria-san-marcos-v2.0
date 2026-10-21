// Página admin: listado de solicitudes de cita, con filtro por estado.
import { useState } from 'react'
import { Card, Form } from 'react-bootstrap'
import PlantillaAdmin from '../../components/templates/PlantillaAdmin'
import TablaCitas from '../../components/organisms/TablaCitas'
import { useCitas } from '../../context/CitasContext'
import { ESTADOS_CITA } from '../../utils/agenda'

function AdminCitas() {
  const { citas } = useCitas()
  const [estado, setEstado] = useState('')
  const visibles = citas.filter((c) => !estado || c.estado === estado).sort((a, b) => b.id - a.id)

  return (
    <PlantillaAdmin
      titulo="Solicitudes de cita"
      acciones={
        <Form.Select aria-label="Filtrar por estado" value={estado} onChange={(e) => setEstado(e.target.value)} className="w-auto">
          <option value="">Todos los estados</option>
          {ESTADOS_CITA.map((e) => (
            <option key={e}>{e}</option>
          ))}
        </Form.Select>
      }
    >
      <Card className="tarjeta-formulario">
        <Card.Body>
          <TablaCitas citas={visibles} />
        </Card.Body>
      </Card>
    </PlantillaAdmin>
  )
}

export default AdminCitas
