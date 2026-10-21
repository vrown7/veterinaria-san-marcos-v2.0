// Organismo: formulario de servicio del catálogo (crear y editar usan el mismo componente).
import { Col, Form, Row } from 'react-bootstrap'
import Boton from '../atoms/Boton'
import CampoFormulario from '../molecules/CampoFormulario'
import CampoSelector from '../molecules/CampoSelector'
import { useFormulario } from '../../hooks/useFormulario'
import { validarServicio } from '../../utils/validaciones'

// Imágenes disponibles en public/img para los servicios.
const IMAGENES = [
  '/img/consulta-general.jpg',
  '/img/vacuna-antirrabica.jpg',
  '/img/vacuna-felina.jpg',
  '/img/cirugia-canina.jpg',
  '/img/desparasitacion.jpg',
  '/img/radiografia.jpg',
  '/img/corte-unas.jpg',
  '/img/microchip.jpg',
]

const vacio = {
  codigo: '',
  nombre: '',
  categoria: '',
  especie: '',
  duracion: '',
  precio: '',
  descuento: '0',
  stock: '',
  stockCritico: '',
  descripcion: '',
  observaciones: '',
  imagen: IMAGENES[0],
}

// Los números se guardan como texto en el formulario y se convierten al guardar.
function aFormulario(servicio) {
  if (!servicio) return vacio
  return Object.fromEntries(Object.keys(vacio).map((k) => [k, String(servicio[k] ?? vacio[k])]))
}

function FormularioServicio({ servicio, categorias, codigosUsados, onGuardar, textoBoton = 'Guardar servicio' }) {
  const validar = (datos) => validarServicio(datos, codigosUsados)
  const { valores, errores, manejarCambio, manejarSalida, validarTodo } = useFormulario(aFormulario(servicio), validar)

  function manejarEnvio(evento) {
    evento.preventDefault()
    if (!validarTodo()) return
    onGuardar({
      ...valores,
      codigo: valores.codigo.trim().toUpperCase(),
      nombre: valores.nombre.trim(),
      precio: Number(valores.precio),
      descuento: Number(valores.descuento),
      stock: Number(valores.stock),
      stockCritico: Number(valores.stockCritico),
    })
  }

  const campo = (nombre) => ({
    name: nombre,
    value: valores[nombre],
    onChange: manejarCambio,
    onBlur: manejarSalida,
    error: errores[nombre],
  })

  const stockEsCritico =
    valores.stock !== '' && valores.stockCritico !== '' && Number(valores.stock) <= Number(valores.stockCritico)

  return (
    <Form noValidate onSubmit={manejarEnvio}>
      <Row>
        <Col xs={12} md={4}>
          <CampoFormulario id="servicio-codigo" etiqueta="Código" placeholder="SV006" {...campo('codigo')} />
        </Col>
        <Col xs={12} md={8}>
          <CampoFormulario id="servicio-nombre" etiqueta="Nombre" {...campo('nombre')} />
        </Col>
        <Col xs={12} md={4}>
          <CampoSelector
            id="servicio-categoria"
            etiqueta="Categoría"
            textoInicial="Selecciona una categoría"
            opciones={categorias.map((c) => c.nombre)}
            {...campo('categoria')}
          />
        </Col>
        <Col xs={12} md={4}>
          <CampoFormulario id="servicio-especie" etiqueta="Especie" placeholder="Perro / Gato" {...campo('especie')} />
        </Col>
        <Col xs={12} md={4}>
          <CampoFormulario id="servicio-duracion" etiqueta="Duración" placeholder="30 min" {...campo('duracion')} />
        </Col>
        <Col xs={6} md={3}>
          <CampoFormulario id="servicio-precio" etiqueta="Precio (CLP)" type="number" min="1" {...campo('precio')} />
        </Col>
        <Col xs={6} md={3}>
          <CampoFormulario id="servicio-descuento" etiqueta="Descuento (%)" type="number" min="0" max="90" {...campo('descuento')} />
        </Col>
        <Col xs={6} md={3}>
          <CampoFormulario id="servicio-stock" etiqueta="Cupos semanales" type="number" min="0" {...campo('stock')} />
        </Col>
        <Col xs={6} md={3}>
          <CampoFormulario id="servicio-critico" etiqueta="Mínimo crítico" type="number" min="0" {...campo('stockCritico')} />
        </Col>
        {stockEsCritico && (
          <Col xs={12}>
            <p className="text-danger small mt-n2">⚠ Con estos valores el servicio quedará como crítico.</p>
          </Col>
        )}
        <Col xs={12}>
          <CampoFormulario id="servicio-descripcion" etiqueta="Descripción" as="textarea" rows={3} {...campo('descripcion')} />
        </Col>
        <Col xs={12} md={6}>
          <CampoFormulario id="servicio-observaciones" etiqueta="Observaciones (opcional)" {...campo('observaciones')} />
        </Col>
        <Col xs={12} md={6}>
          <CampoSelector id="servicio-imagen" etiqueta="Imagen" textoInicial="Selecciona una imagen" opciones={IMAGENES} {...campo('imagen')} />
        </Col>
      </Row>
      <Boton tipo="submit" texto={textoBoton} />
    </Form>
  )
}

export default FormularioServicio
