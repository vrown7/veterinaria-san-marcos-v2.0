import { autenticar, actualizarUsuario, crearUsuario, listarUsuarios } from './usuarioService'

describe('services/usuarioService', () => {
  beforeEach(() => localStorage.clear())

  test('autenticar devuelve el usuario sin su contraseña cuando los datos son correctos', () => {
    const usuario = autenticar('ADMIN@duoc.cl', 'admin123')
    expect(usuario).toMatchObject({ nombre: 'Daniela', tipo: 'Administrador' })
    expect(usuario).not.toHaveProperty('clave')
  })

  test('autenticar devuelve null con una contraseña incorrecta', () => {
    expect(autenticar('admin@duoc.cl', 'otra')).toBeNull()
  })

  test('crear rechaza un correo ya registrado', () => {
    expect(() => crearUsuario({ nombre: 'Copia', correo: 'ana@gmail.com', clave: 'abcd' })).toThrow(
      'Ya existe un usuario con ese correo.',
    )
  })

  test('actualizar sin contraseña mantiene la anterior', () => {
    actualizarUsuario(3, { nombre: 'Ana María', clave: '' })
    expect(autenticar('ana@gmail.com', 'ana123').nombre).toBe('Ana María')
    expect(listarUsuarios()).toHaveLength(3)
  })
})
