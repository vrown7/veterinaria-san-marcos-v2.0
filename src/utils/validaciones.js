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
