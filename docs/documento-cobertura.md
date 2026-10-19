# Documento de cobertura del testing

**Proyecto:** Veterinaria San Marcos v2.0 (React)
**Asignatura:** DSY1104 Desarrollo Fullstack II, Evaluación Parcial 2
**Integrantes:** Nicolás Ortega, Martín Vásquez, Justin Galleguillos

---

## 1. Herramientas y versiones

| Herramienta | Versión (`package.json`) | Para qué se usa |
|---|---|---|
| Vitest | ^5.0.3 | Corredor de pruebas: `describe`, `test`, `expect` y `vi` (mocks) |
| @testing-library/react | ^16.3.3 | Dibuja los componentes en las pruebas (`render`, `screen`) |
| @testing-library/user-event | ^14.6.7 | Simula clics y escritura de una persona |
| @testing-library/jest-dom | ^7.0.1 | Aserciones del DOM: `toBeInTheDocument`, `toBeDisabled`, `toHaveClass`… |
| jsdom | ^29.1.1 | Simula el navegador dentro de la terminal (sin abrir Chrome) |
| @vitest/coverage-v8 | ^5.0.3 | Genera el reporte de cobertura |

Se usa **Vitest** en lugar de Jasmine y Karma, según el lineamiento de la Coordinación (guía 15, sección 7).
La sintaxis `describe` / `test` / `expect` es la misma. Los mocks se crean con `vi.fn()` en vez de
`jasmine.createSpy()`.

### Instalación

```bash
npm install -D vitest @vitest/coverage-v8 jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### Configuración del entorno

**`vite.config.js`** (bloque `test`):

- `environment: 'jsdom'`: simula el navegador (`document`, `localStorage`).
- `globals: true`: permite usar `describe`, `test` y `expect` sin importarlos.
- `setupFiles: './src/setupTests.js'`: carga `@testing-library/jest-dom/vitest` antes de las pruebas.
- `coverage.include`: mide `utils`, `components`, `services`, `hooks` y `routes`.

**Ubicación de las pruebas:** cada archivo `*.test.js` o `*.test.jsx` está **al lado del archivo que prueba**
(guía 15, sección 5). La carpeta `coverage/` está en el `.gitignore`.

---

## 2. Comandos

```bash
npm run test:run   # ejecuta todas las pruebas una vez
npm run test:cov   # ejecuta las pruebas y genera el reporte de cobertura
```

**Resultado:** 17 archivos de prueba, **66 pruebas, todas pasan**.

---

## 3. Reporte de cobertura

![Reporte de cobertura](capturas/cobertura-semana11.png)

| Métrica | Semana 9 | Semana 11 |
|---|---|---|
| Statements (instrucciones) | 42,85 % | **64,35 %** |
| Branches (ramas de `if` y ternarios) | 32,35 % | **50,53 %** |
| Functions (funciones) | 44 % | **68,04 %** |
| Lines (líneas) | 43,81 % | **65,34 %** |

Por carpeta (líneas): `services` 91,66 % · `atoms` 100 % · `hooks` 89,47 % · `utils` 76,31 % ·
`molecules` 76,19 % · `organisms` 20,56 %.

> En la semana 9 el reporte medía todo `src`, incluidas las páginas. En la semana 11 se ajustó a lo que
> recomienda la guía 15: se mide la lógica y los componentes, y las páginas quedan fuera del reporte
> (ver sección 5).

---

## 4. Qué se probó

| Archivo probado | Tipo | Casos | Comportamiento verificado |
|---|---|---|---|
| `utils/precios.js` | Unitaria (función pura) | 9 | Formato CLP, recargo de urgencia (+$10.000), descuento de ofertas (incluido el error si es mayor a 100 %), precio final y total de la solicitud (incluida la solicitud vacía). |
| `utils/validaciones.js` | Unitaria | 9 | RUN con dígito verificador, dominios de correo, login, solicitud de cita (fecha pasada, domingo, horario fuera de agenda) y servicio (código repetido, precio inválido). |
| `utils/agenda.js` | Unitaria | 3 | Fecha mínima (mañana, incluso al cambiar de mes), domingos, formato de fecha y número de solicitud. |
| `utils/filtros.js` | Unitaria | 2 | Búsqueda sin tildes ni mayúsculas y filtro combinado por categoría. |
| `services/servicioService.js` | Integración (service + localStorage real) | 8 | CRUD completo, servicios críticos y ofertas, descuento de cupos y error sin cupos (sin descontar nada), persistencia. |
| `services/solicitudService.js` | Integración | 5 | Solicitud vacía, suma de cantidad, urgencia fuera de horario como ítem aparte, cantidad entre 1 y 5, quitar y limpiar. |
| `services/citaService.js` | Integración | 4 | Número y estado al crear, historial por correo, propuesta de horario y aceptación, error sin propuesta. |
| `services/usuarioService.js` | Integración | 4 | Login correcto sin devolver la contraseña, login incorrecto, correo duplicado, edición que mantiene la contraseña. |
| `services/categoriaService.js` | Integración | 2 | Crear, actualizar y eliminar categorías. |
| `atoms/Boton.jsx` | Componente | 1 | Muestra el texto y ejecuta `onClick` (mock `vi.fn()`). |
| `atoms/EtiquetaEstadoCita.jsx` | Componente | 4 | Color correcto para cada estado (`test.each`). |
| `molecules/TarjetaServicio.jsx` | Componente (props y estado) | 4 | Datos y enlace, precio de oferta tachado, aviso al padre y cambio de texto del botón (estado), botón deshabilitado sin cupos. |
| `molecules/BuscadorServicios.jsx` | Componente | 1 | Avisa por `onChange` lo que se escribe (mock). |
| `organisms/DetalleSolicitud.jsx` | Componente | 2 | Subtotales y total; botones de cantidad y quitar avisan al padre (mocks). |
| `organisms/FormularioLogin.jsx` | Componente con **mock de contexto** | 3 | Errores al enviar vacío; llama a `iniciarSesion` con lo escrito; aviso con credenciales incorrectas. `vi.mock` reemplaza el `AuthContext`. |
| `organisms/FormularioSolicitudCita.jsx` | Componente | 2 | Autocompleta los datos con sesión (props); no confirma si faltan datos. |
| `routes/RutaProtegida.jsx` | Componente con **mock de contexto** | 3 | Sin sesión manda al login, un dueño no entra al panel y la recepcionista sí. |
| **Total** | | **66** | |

### Técnicas usadas

- **Estructura Arrange, Act, Assert** en cada caso. Ejemplo: `calcularTotal` en `precios.test.js`.
- **Mocks:**
  - `vi.fn()` para comprobar que un componente avisa a su padre y con qué datos.
  - `vi.mock()` para reemplazar `AuthContext` en `FormularioLogin` y `RutaProtegida`, así la prueba no depende de localStorage.
- **Preparación y limpieza:**
  - `beforeEach(() => localStorage.clear())` en los services, para que cada caso parta de cero.
  - `afterEach(() => vi.clearAllMocks())` para reiniciar los contadores de los mocks.
- **Datos controlados:** `validarSolicitudCita` recibe la fecha de "hoy" como parámetro, así la prueba da el mismo resultado cualquier día.

---

## 5. Qué no se probó y por qué

| Qué | Por qué |
|---|---|
| Páginas (`src/pages`) | Solo arman componentes que ya están probados por separado y leen datos del context. Se revisaron a mano en el navegador a 375, 768 y 1280 px. Están fuera del reporte, como sugiere la guía 15. |
| Componentes solo de presentación (`Footer`, `Hero`, `TarjetaBlog`, `TarjetaIntegrante`, `TarjetaResumen`, plantillas) | No tienen lógica ni estado: muestran lo que reciben por props. Una prueba solo repetiría el texto. |
| `FormularioRegistro`, `FormularioContacto`, `FormularioUsuario`, `FormularioServicio`, `FormularioCategoria` | Usan el mismo hook (`useFormulario`) y las mismas reglas (`validaciones.js`) que ya se prueban con `FormularioLogin` y `FormularioSolicitudCita`. Son la siguiente prioridad si se suman pruebas. |
| Contexts (`src/context`) | Solo conectan los services con React. La lógica que llaman (los services) está probada con un 91,66 % de líneas. |
| Ramas de `validaciones.js` para registro, contacto y usuario | Tienen muchos mensajes de error distintos (largo máximo de cada campo). Se probaron las reglas principales: RUN, correo, contraseña y servicio. |

**Conclusión:** la lógica del negocio (services, precios, agenda) supera el 90 % de cobertura de líneas, y
los componentes con estado o interacción tienen pruebas de comportamiento. 100 % de cobertura no significa
"sin errores" (guía 15, sección 8). Por eso cada caso tiene un nombre que describe el comportamiento y
aserciones concretas.
