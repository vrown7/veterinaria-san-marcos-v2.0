# Veterinaria San Marcos

Sitio web de la clínica veterinaria San Marcos (Rancagua), migrado a **React**.

- **Caso:** Forma A — Veterinaria San Marcos
- **Integrantes:** Nicolás Ortega, Martín Vásquez, Justin Galleguillos
- **Versión 1 (HTML, CSS y JS):** https://github.com/vrown7/veterinaria-san-marcos

---

## Cómo ejecutar el proyecto

```bash
npm install
npm run dev        # abre http://localhost:5173
```

Pruebas unitarias:

```bash
npm run test:run   # ejecuta las 66 pruebas
npm run test:cov   # pruebas + reporte de cobertura
```

Cuentas de prueba (datos simulados, sin backend):

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | admin@duoc.cl | admin123 |
| Recepcionista | recepcion@duoc.cl | recep123 |
| Dueño de mascota | ana@gmail.com | ana123 |

---

## Tecnologías

React + Vite · React Bootstrap · React Router · Vitest + Testing Library

---

## Funcionalidades

- **Parte pública:** inicio, catálogo con buscador y filtro, categorías, detalle, ofertas, nosotros, blog,
  contacto, registro e inicio de sesión.
- **Solicitud de cita:** el dueño elige servicios ("Mi solicitud", guardada en localStorage), completa los
  datos de la mascota, la fecha y la hora, y recibe un número de solicitud. Si no quedan cupos, ve un
  aviso y puede volver a intentarlo.
- **Mis citas:** el dueño ve el estado de sus citas y acepta los cambios de horario.
- **Panel de administración:**
  - Dashboard, solicitudes y su ficha (confirmar, proponer otro horario, cancelar).
  - CRUD de servicios, servicios críticos y categorías.
  - Usuarios con su historial, reportes y perfil.
  - La recepcionista solo ve lo que le corresponde.

---

## Estructura del proyecto

```
src/
├── components/
│   ├── atoms/          Piezas mínimas: botón, campo, selector, etiquetas, precio
│   ├── molecules/      Campos de formulario, tarjetas, buscador, fila de solicitud, fecha y hora
│   ├── organisms/      Navbar, footer, listas, tablas, menú del panel y formularios
│   └── templates/      PlantillaPublica y PlantillaAdmin
├── pages/              Una página por ruta (pages/admin para el panel)
├── data/               Datos de partida (servicios, categorías, usuarios, citas, regiones, blog)
├── services/           CRUD de servicios, categorías, citas, usuarios y solicitud (localStorage)
├── context/            Estado compartido: servicios, sesión, solicitud y citas
├── hooks/              Lógica común de los formularios
├── routes/             RutaProtegida (sesión y rol)
├── utils/              Precios, ofertas, agenda, validaciones y filtros
└── styles/             Estilos propios (paleta de la versión 1)
```

Cada prueba (`*.test.js` / `*.test.jsx`) está al lado del archivo que prueba.

---

## Distribución del trabajo

Según el historial de commits del repositorio (`main`).

### Nicolás Ortega — Base del proyecto, catálogo y solicitud de cita (17 commits)

| Archivo | Aporte |
|---|---|
| `package.json`, `vite.config.js`, `index.html`, `main.jsx`, `setupTests.js`, `App.jsx`, `.gitignore`, `.oxlintrc.json` | Proyecto React + Vite, Bootstrap, React Router, Vitest y rutas de toda la aplicación. |
| `Boton`, `CampoTexto`, `Selector`, `EtiquetaEspecie`, `Precio`, `EtiquetaOferta` | Átomos. |
| `CampoFormulario`, `CampoSelector`, `TarjetaServicio`, `BuscadorServicios`, `FilaSolicitud`, `SelectorFechaHora`, `TarjetaBlog`, `TarjetaIntegrante` | Moléculas. |
| `Navbar`, `Footer`, `Hero`, `ListaServicios`, `DetalleSolicitud`, `FormularioSolicitudCita`, `FormularioContacto`, `PlantillaPublica` | Organismos y plantilla pública. |
| `Inicio`, `Servicios`, `Categorias`, `DetalleServicio`, `Ofertas`, `Nosotros`, `Blog`, `BlogDetalle`, `Contacto`, `Login`, `Registro` | Páginas públicas. |
| `MiSolicitud`, `ConfirmarSolicitud`, `ResultadoSolicitud` | Flujo de solicitud de cita: resumen, confirmación y resultado. |
| `almacenamiento`, `servicioService`, `solicitudService`, `citaService` | CRUD de servicios (cupos, ofertas y críticos), solicitud en curso y citas, con persistencia en localStorage. |
| `ServiciosContext`, `SolicitudContext`, `CitasContext`, `useFormulario` | Estado compartido y lógica común de formularios. |
| `precios.js`, `agenda.js`, `filtros.js` y datos en `src/data` | Ofertas, recargo de urgencia, total, agenda, filtros y datos de partida. |
| Pruebas de utils, services, átomos y moléculas; `estilos.css`; capturas | Pruebas unitarias, estilos de la marca y evidencias. |

### Martín Vásquez — Sesión, usuarios y documentación de pruebas (7 commits)

| Archivo | Aporte |
|---|---|
| `usuarioService`, `usuarios.json` | CRUD de usuarios e inicio de sesión simulado. |
| `validaciones.js` | Reglas de validación de cita, servicio, usuario y categoría. |
| `AuthContext`, `RutaProtegida`, `Salir` | Sesión por roles y protección de rutas. |
| `FormularioLogin`, `FormularioRegistro`, `Navbar` | Login, registro y menú conectados a la sesión. |
| `ListaMisCitas`, `MisCitas` | Citas del dueño de mascota y respuesta a cambios de horario. |
| `FormularioUsuario`, `AdminUsuarios`, `AdminUsuarioFormulario`, `AdminUsuarioDetalle`, `AdminPerfil` | Gestión de usuarios, historial de solicitudes y perfil. |
| `docs/documento-cobertura.md`, README | Documento de cobertura y documentación. |

### Justin Galleguillos — Panel de administración (5 commits)

| Archivo | Aporte |
|---|---|
| `PlantillaAdmin`, `MenuAdmin`, `TarjetaResumen`, `EtiquetaEstadoCita`, `TablaCitas` | Plantilla, menú y componentes del panel. |
| `AdminInicio`, `AdminCitas`, `AdminCitaDetalle` | Dashboard, solicitudes y ficha de atención. |
| `FormularioServicio`, `AdminServicios`, `AdminServicioDetalle`, `AdminServicioFormulario` | CRUD de servicios y servicios críticos. |
| `categoriaService`, `categorias.json`, `FormularioCategoria`, `AdminCategorias`, `AdminReportes` | CRUD de categorías y reportes. |

---

## Pruebas unitarias y cobertura

- 66 pruebas en 17 archivos, todas pasan (`npm run test:run`).
- Cobertura con `npm run test:cov`: 65,34 % de líneas (services 91,66 %).
- Informe completo: [docs/documento-cobertura.md](docs/documento-cobertura.md)

