import { HORARIOS, esDomingo, fechaMinimaCita } from './agenda'

// Reglas de validación de formularios (migradas desde js/cuentas.js de la versión 1).
// Cada función "validarX" recibe los valores del formulario y devuelve un objeto con
// un mensaje por cada campo con error. Si el objeto viene vacío, el formulario es válido.

// Calcula el dígito verificador de un RUN chileno (módulo 11).
export function calcularDigitoVerificador(cuerpoRun) {
  let suma = 0
  let multiplo = 2
  for (let i = cuerpoRun.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpoRun[i], 10) * multiplo
    multiplo = multiplo < 7 ? multiplo + 1 : 2
  }
  const resto = 11 - (suma % 11)
  if (resto === 11) return '0'
  if (resto === 10) return 'K'
  return String(resto)
}

// RUN sin puntos ni guion, de 7 a 9 caracteres, con dígito verificador correcto.
export function validarRun(valor) {
  const run = valor.trim().toUpperCase()
  if (!/^[0-9]+[0-9K]$/.test(run)) return false
  if (run.length < 7 || run.length > 9) return false
  return calcularDigitoVerificador(run.slice(0, -1)) === run.slice(-1)
}

// Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com
export function correoConDominioValido(valor) {
  return /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(valor.trim())
}

// La fecha no puede ser futura ni anterior a 1900.
export function fechaNacimientoValida(valor) {
  const fecha = new Date(`${valor}T00:00:00`)
  if (Number.isNaN(fecha.getTime())) return false
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)
  return fecha <= hoy && fecha >= new Date('1900-01-01T00:00:00')
}

function errorCorreo(correo) {
  if (!correo.trim()) return 'El correo es obligatorio.'
  if (correo.trim().length > 100) return 'El correo no puede superar los 100 caracteres.'
  if (!correoConDominioValido(correo)) return 'Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.'
  return ''
}

function errorClave(clave) {
  if (!clave || clave.length < 4 || clave.length > 10) return 'La contraseña debe tener entre 4 y 10 caracteres.'
  return ''
}

// Quita del objeto los campos sin error, para que {} signifique "todo válido".
function soloConError(errores) {
  return Object.fromEntries(Object.entries(errores).filter(([, mensaje]) => mensaje))
}

export function validarLogin({ correo, clave }) {
  return soloConError({
    correo: errorCorreo(correo),
    clave: errorClave(clave),
  })
}

export function validarRegistro(datos) {
  const { run, nombre, apellidos, correo, clave, claveConfirmar, fechaNacimiento, region, comuna, direccion } = datos
  return soloConError({
    run: !run.trim()
      ? 'El RUN es obligatorio.'
      : !validarRun(run)
        ? 'RUN inválido. Ingresa entre 7 y 9 caracteres, sin puntos ni guion (ej. 123456785).'
        : '',
    nombre: !nombre.trim()
      ? 'El nombre es obligatorio.'
      : nombre.trim().length > 50
        ? 'El nombre no puede superar los 50 caracteres.'
        : '',
    apellidos: !apellidos.trim()
      ? 'Los apellidos son obligatorios.'
      : apellidos.trim().length > 100
        ? 'Los apellidos no pueden superar los 100 caracteres.'
        : '',
    correo: errorCorreo(correo),
    clave: errorClave(clave),
    claveConfirmar: !claveConfirmar
      ? 'Confirma tu contraseña.'
      : claveConfirmar !== clave
        ? 'Las contraseñas no coinciden.'
        : '',
    fechaNacimiento:
      fechaNacimiento && !fechaNacimientoValida(fechaNacimiento)
        ? 'Ingresa una fecha de nacimiento válida y anterior a hoy.'
        : '',
    region: region ? '' : 'Selecciona tu región.',
    comuna: comuna ? '' : 'Selecciona tu comuna.',
    direccion: !direccion.trim()
      ? 'La dirección es obligatoria.'
      : direccion.trim().length > 300
        ? 'La dirección no puede superar los 300 caracteres.'
        : '',
  })
}

export function validarContacto({ nombre, correo, comentario }) {
  return soloConError({
    nombre: !nombre.trim()
      ? 'El nombre es obligatorio.'
      : nombre.trim().length > 100
        ? 'El nombre no puede superar los 100 caracteres.'
        : '',
    correo: errorCorreo(correo),
    comentario: !comentario.trim()
      ? 'El comentario es obligatorio.'
      : comentario.length > 500
        ? 'El comentario no puede superar los 500 caracteres.'
        : '',
  })
}

// Solicitud de cita (checkout). "hoy" se puede pasar desde la prueba para que no
// dependa del día en que se ejecuta.
export function validarSolicitudCita(datos, hoy = new Date()) {
  const { nombre, apellidos, correo, telefono, mascota, especie, fecha, hora } = datos
  const minima = fechaMinimaCita(hoy)
  return soloConError({
    nombre: nombre.trim() ? '' : 'El nombre es obligatorio.',
    apellidos: apellidos.trim() ? '' : 'Los apellidos son obligatorios.',
    correo: errorCorreo(correo),
    telefono: /^9\d{8}$/.test(telefono.trim()) ? '' : 'Ingresa un celular de 9 dígitos que empiece con 9.',
    mascota: mascota.trim() ? '' : 'Indica el nombre de tu mascota.',
    especie: especie ? '' : 'Selecciona la especie.',
    fecha: !fecha
      ? 'Selecciona una fecha.'
      : fecha < minima
        ? 'La cita debe ser desde mañana en adelante.'
        : esDomingo(fecha)
          ? 'Los domingos la clínica no atiende.'
          : '',
    hora: HORARIOS.includes(hora) ? '' : 'Selecciona un horario.',
  })
}

// Servicio del catálogo (panel de administración). "codigosUsados" evita códigos repetidos.
export function validarServicio(datos, codigosUsados = []) {
  const numero = (valor) => Number(valor)
  const esEnteroNoNegativo = (valor) => valor !== '' && Number.isInteger(numero(valor)) && numero(valor) >= 0
  return soloConError({
    codigo: !/^[A-Z]{2}\d{3}$/.test(datos.codigo.trim().toUpperCase())
      ? 'El código debe tener 2 letras y 3 números (ej. SV006).'
      : codigosUsados.includes(datos.codigo.trim().toUpperCase())
        ? 'Ya existe un servicio con ese código.'
        : '',
    nombre: !datos.nombre.trim()
      ? 'El nombre es obligatorio.'
      : datos.nombre.trim().length > 100
        ? 'El nombre no puede superar los 100 caracteres.'
        : '',
    categoria: datos.categoria ? '' : 'Selecciona una categoría.',
    especie: datos.especie.trim() ? '' : 'Indica la especie (ej. Perro / Gato).',
    duracion: datos.duracion.trim() ? '' : 'Indica la duración (ej. 30 min).',
    precio: esEnteroNoNegativo(datos.precio) && numero(datos.precio) > 0 ? '' : 'El precio debe ser un número entero mayor a 0.',
    descuento:
      esEnteroNoNegativo(datos.descuento) && numero(datos.descuento) <= 90 ? '' : 'El descuento debe ser un número entre 0 y 90.',
    stock: esEnteroNoNegativo(datos.stock) ? '' : 'Los cupos deben ser un número entero mayor o igual a 0.',
    stockCritico: esEnteroNoNegativo(datos.stockCritico) ? '' : 'El mínimo crítico debe ser un número entero mayor o igual a 0.',
    descripcion: datos.descripcion.trim().length > 500 ? 'La descripción no puede superar los 500 caracteres.' : '',
  })
}

// Usuario (panel de administración). En edición la contraseña es opcional.
export function validarUsuario(datos, { correosUsados = [], esNuevo = true } = {}) {
  const base = validarRegistro({ ...datos, claveConfirmar: datos.clave })
  // En edición, si la contraseña viene vacía se mantiene la anterior.
  if (!esNuevo && !datos.clave) delete base.clave
  delete base.claveConfirmar
  delete base.fechaNacimiento
  if (!base.correo && correosUsados.includes(datos.correo.trim().toLowerCase())) {
    base.correo = 'Ya existe un usuario con ese correo.'
  }
  if (!['Administrador', 'Recepcionista', 'Dueño de mascota'].includes(datos.tipo)) {
    base.tipo = 'Selecciona el tipo de usuario.'
  }
  return base
}

export function validarCategoria({ nombre, descripcion }, nombresUsados = []) {
  return soloConError({
    nombre: !nombre.trim()
      ? 'El nombre es obligatorio.'
      : nombresUsados.includes(nombre.trim().toLowerCase())
        ? 'Ya existe una categoría con ese nombre.'
        : '',
    descripcion: descripcion.trim().length > 200 ? 'La descripción no puede superar los 200 caracteres.' : '',
  })
}
