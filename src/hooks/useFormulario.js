// Hook propio que reúne la lógica común de los formularios (login, registro, contacto):
// guarda los valores y los errores en el estado, valida en tiempo real y al enviar.
// "validar" es una función de utils/validaciones.js que devuelve { campo: mensaje }.
import { useState } from 'react'

export function useFormulario(valoresIniciales, validar) {
  const [valores, setValores] = useState(valoresIniciales)
  const [errores, setErrores] = useState({})

  // Recalcula el error de UN campo, usando todos los valores (ej.: confirmar contraseña).
  function revisarCampo(nombre, nuevosValores) {
    const mensaje = validar(nuevosValores)[nombre]
    setErrores((anteriores) => {
      const copia = { ...anteriores }
      if (mensaje) copia[nombre] = mensaje
      else delete copia[nombre]
      return copia
    })
  }

  // Al escribir: guarda el valor y, si el campo ya estaba en rojo, lo vuelve a revisar
  // para que el error desaparezca apenas se corrige.
  function manejarCambio(evento) {
    const { name, value } = evento.target
    const nuevosValores = { ...valores, [name]: value }
    setValores(nuevosValores)
    if (errores[name]) revisarCampo(name, nuevosValores)
  }

  // Al salir del campo: lo revisa.
  function manejarSalida(evento) {
    revisarCampo(evento.target.name, valores)
  }

  // Al enviar: revisa todo el formulario y devuelve true si no hay errores.
  function validarTodo() {
    const encontrados = validar(valores)
    setErrores(encontrados)
    return Object.keys(encontrados).length === 0
  }

  function reiniciar() {
    setValores(valoresIniciales)
    setErrores({})
  }

  return { valores, setValores, errores, manejarCambio, manejarSalida, validarTodo, reiniciar }
}
