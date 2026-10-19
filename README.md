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

### Nicolás Ortega — Catálogo y solicitud de cita

| Archivo | Aporte |
|---|---|
| `TarjetaServicio`, `ListaServicios`, `BuscadorServicios` | Tarjeta del catálogo (con ofertas y botón para agregar), grilla responsiva y buscador. |
| `Inicio`, `Servicios`, `Categorias`, `DetalleServicio`, `Ofertas` | Páginas del catálogo y de ofertas. |
| `solicitudService`, `citaService`, `SolicitudContext`, `CitasContext` | Solicitud en curso y CRUD de citas. |
| `MiSolicitud`, `ConfirmarSolicitud`, `ResultadoSolicitud`, `FormularioSolicitudCita` | Flujo de solicitud de cita: resumen, checkout y resultado. |
| `precios.js`, `agenda.js` | Ofertas, total de la solicitud y reglas de la agenda. |
| `Nosotros`, `Blog`, `BlogDetalle` | Páginas institucionales y blog. |
| `AdminCategorias`, `FormularioCategoria`, `categoriaService`, `ServiciosContext` | CRUD de categorías. |
| `AdminReportes`, `Footer`, `Hero`, `PlantillaPublica`, `estilos.css` | Reportes, estructura común y estilos. |

### Martín Vásquez — Cuentas, sesión y usuarios

| Archivo | Aporte |
|---|---|
| `CampoTexto`, `Selector`, `CampoFormulario`, `CampoSelector` | Átomos y moléculas de formulario con mensaje de error. |
| `FormularioLogin`, `FormularioRegistro`, `FormularioContacto` | Formularios con validación en React. |
| `usuarioService`, `AuthContext`, `RutaProtegida` | Sesión simulada, roles y protección de rutas. |
| `MisCitas`, `ListaMisCitas`, `Navbar` | Citas del dueño y menú con sesión. |
| `AdminUsuarios`, `FormularioUsuario`, `AdminUsuarioDetalle`, `AdminPerfil` | CRUD de usuarios, historial y perfil. |
| `validaciones.js`, documento de cobertura | Reglas de validación y análisis de las pruebas. |

### Justin Galleguillos — Panel de administración

| Archivo | Aporte |
|---|---|
| `PlantillaAdmin`, `MenuAdmin`, `TarjetaResumen` | Estructura del panel y dashboard. |
| `AdminCitas`, `AdminCitaDetalle`, `TablaCitas`, `EtiquetaEstadoCita` | Solicitudes y ficha de atención. |
| `AdminServicios`, `AdminServicioFormulario`, `AdminServicioDetalle`, `FormularioServicio` | CRUD de servicios y servicios críticos. |

