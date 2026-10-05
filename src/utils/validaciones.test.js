import { correoConDominioValido, validarLogin, validarRun } from './validaciones'

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
