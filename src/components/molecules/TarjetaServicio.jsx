// Molécula: tarjeta de un servicio del catálogo. Recibe el servicio por props y, si se
// le pasa "onAgregar", muestra el botón para sumarlo a la solicitud de cita.
import { useState } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Boton from '../atoms/Boton'
import EtiquetaEspecie from '../atoms/EtiquetaEspecie'
import EtiquetaOferta from '../atoms/EtiquetaOferta'
import Precio from '../atoms/Precio'
import { precioFinal } from '../../utils/precios'

function TarjetaServicio({ servicio, onAgregar }) {
  // Estado propio de la tarjeta: muestra "Agregado" por un momento después del clic.
  const [agregado, setAgregado] = useState(false)
  const enOferta = (servicio.descuento ?? 0) > 0
  const sinCupos = servicio.stock === 0

  function manejarAgregar() {
    onAgregar(servicio)
    setAgregado(true)
    setTimeout(() => setAgregado(false), 1500)
  }

  return (
    <Card className="tarjeta-servicio h-100">
      <div className="position-relative">
        <Card.Img variant="top" src={servicio.imagen} alt={servicio.nombre} className="tarjeta-servicio__imagen" />
        {enOferta && (
          <div className="tarjeta-servicio__oferta">
            <EtiquetaOferta descuento={servicio.descuento} />
          </div>
        )}
      </div>
      <Card.Body className="d-flex flex-column">
        <p className="tarjeta-servicio__categoria mb-1">{servicio.categoria}</p>
        <Card.Title as="h3" className="tarjeta-servicio__nombre">
          {servicio.nombre}
        </Card.Title>
        <div className="mb-3">
          <EtiquetaEspecie especie={servicio.especie} />
        </div>
        <div className="mt-auto">
          <div className="d-flex align-items-baseline gap-2 mb-2">
            <Precio valor={precioFinal(servicio)} className="fs-5" />
            {enOferta && <Precio valor={servicio.precio} tachado className="small" />}
          </div>
          <div className="d-flex gap-2 flex-wrap">
            <Link to={`/servicios/${servicio.id}`} className="btn btn-outline-vsm btn-sm">
              Ver detalle
            </Link>
            {onAgregar && (
              <Boton
                size="sm"
                texto={sinCupos ? 'Sin cupos' : agregado ? '✓ Agregado' : 'Agregar a mi solicitud'}
                disabled={sinCupos}
                onClick={manejarAgregar}
              />
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default TarjetaServicio
