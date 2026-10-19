import {
  correoConDominioValido,
  validarLogin,
  validarRun,
  validarServicio,
  validarSolicitudCita,
} from './validaciones'

describe('utils/validaciones', () => {
  test('acepta un RUN con dígito verificador correcto y rechaza uno incorrecto', () => {
    expect(validarRun('123456785')).toBe(true)
    expect(validarRun('123456789')).toBe(false)
  })

  test('solo acepta correos @duoc.cl, @profesor.duoc.cl o @gmail.com', () => {
    expect(correoConDominioValido('ana@gmail.com')).toBe(true)
    expect(correoConDominioValido('ana@profesor.duoc.cl')).toBe(true)
    expect(correoConDominioValido('ana@hotmail.com')).toBe(false)
  })

  test('validarLogin devuelve un error por cada campo inválido', () => {
    const errores = validarLogin({ correo: '', clave: '12' })
    expect(errores.correo).toBe('El correo es obligatorio.')
    expect(errores.clave).toMatch(/entre 4 y 10/)
  })

  test('validarLogin devuelve un objeto vacío si todo está correcto', () => {
    expect(validarLogin({ correo: 'ana@duoc.cl', clave: 'clave1' })).toEqual({})
  })
})

describe('validarSolicitudCita', () => {
  // Fijamos "hoy" para que la prueba dé lo mismo cualquier día que se ejecute.
  const hoy = new Date('2026-10-19T12:00:00') // lunes
  const datosValidos = {
    nombre: 'Ana',
    apellidos: 'Pérez',
    correo: 'ana@gmail.com',
    telefono: '912345678',
    mascota: 'Toby',
    especie: 'Perro',
    fecha: '2026-10-21', // miércoles
    hora: '10:00',
  }

  test('acepta una solicitud completa para un día hábil futuro', () => {
    expect(validarSolicitudCita(datosValidos, hoy)).toEqual({})
  })

  test('rechaza una fecha de hoy o anterior', () => {
    const errores = validarSolicitudCita({ ...datosValidos, fecha: '2026-10-19' }, hoy)
    expect(errores.fecha).toBe('La cita debe ser desde mañana en adelante.')
  })

  test('rechaza los domingos y un horario fuera de la agenda', () => {
    const errores = validarSolicitudCita({ ...datosValidos, fecha: '2026-10-25', hora: '13:00' }, hoy)
    expect(errores.fecha).toBe('Los domingos la clínica no atiende.')
    expect(errores.hora).toBe('Selecciona un horario.')
  })
})

describe('validarServicio', () => {
  const servicio = {
    codigo: 'sv006',
    nombre: 'Control de peso',
    categoria: 'Consultas',
    especie: 'Perro / Gato',
    duracion: '20 min',
    precio: '12000',
    descuento: '0',
    stock: '10',
    stockCritico: '3',
    descripcion: '',
  }

  test('acepta un servicio válido (el código se compara en mayúsculas)', () => {
    expect(validarServicio(servicio, ['SV001'])).toEqual({})
  })

  test('rechaza un código repetido y un precio no numérico', () => {
    const errores = validarServicio({ ...servicio, precio: 'abc' }, ['SV006'])
    expect(errores.codigo).toBe('Ya existe un servicio con ese código.')
    expect(errores.precio).toMatch(/número entero mayor a 0/)
  })
})
