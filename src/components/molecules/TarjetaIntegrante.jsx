// Molécula: foto, nombre y cargo de un integrante del equipo clínico.
function TarjetaIntegrante({ integrante }) {
  return (
    <figure className="integrante text-center">
      <img className="integrante__foto" src={integrante.foto} alt={`Retrato de ${integrante.nombre}`} />
      <figcaption>
        <strong className="d-block">{integrante.nombre}</strong>
        <span className="integrante__cargo">{integrante.cargo}</span>
      </figcaption>
    </figure>
  )
}

export default TarjetaIntegrante
