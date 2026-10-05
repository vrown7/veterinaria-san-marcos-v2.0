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
npm run test:run   # ejecuta las pruebas
npm run coverage   # pruebas + informe de cobertura
```

---

## Tecnologías

React + Vite · React Bootstrap · React Router · Vitest + Testing Library

---

## Estructura del proyecto

```
src/
├── components/
│   ├── atoms/          Piezas mínimas: botón, campo de texto, selector, etiqueta, precio
│   ├── molecules/      Campo de formulario, tarjeta de servicio, buscador, tarjetas de blog y equipo
│   ├── organisms/      Navbar, footer, hero, lista de servicios y formularios
│   └── templates/      PlantillaPublica (navbar + contenido + footer)
├── pages/              Una página por ruta (Inicio, Servicios, Detalle, Login, etc.)
├── data/               Datos de partida (servicios del Excel del caso, equipo, regiones, blog)
├── services/           CRUD de servicios guardado en localStorage
├── context/            Estado compartido de los servicios
├── hooks/              Lógica común de los formularios
├── utils/              Precios, recargo de urgencia, validaciones y filtros
└── styles/             Estilos propios (paleta de la versión 1)
```

---

## Distribución del trabajo

### Nicolás Ortega — Catálogo de servicios

| Archivo | Aporte |
|---|---|
| `TarjetaServicio`, `ListaServicios`, `BuscadorServicios` | Tarjeta del catálogo, grilla responsiva y buscador. |
| `Inicio`, `Servicios`, `Categorias`, `DetalleServicio` | Páginas del catálogo, filtro por categoría y detalle con recargo de urgencia. |
| `servicioService.js`, `ServiciosContext.jsx` | CRUD de servicios y estado compartido. |
| `Nosotros`, `Blog`, `BlogDetalle` | Páginas institucionales y blog. |

### Martín Vásquez — Cuentas y contacto

| Archivo | Aporte |
|---|---|
| `CampoTexto`, `Selector`, `CampoFormulario`, `CampoSelector` | Átomos y moléculas de formulario con mensaje de error. |
| `FormularioLogin`, `FormularioRegistro`, `FormularioContacto` | Formularios con validación en React (RUN, dominios de correo, región y comuna). |
| `Login`, `Registro`, `Contacto`, `validaciones.js` | Páginas y reglas de validación. |

### Justin Galleguillos — Plantilla y contenido

| Archivo | Aporte |
|---|---|
| `Navbar`, `Footer`, `Hero`, `PlantillaPublica` | Estructura común de todas las páginas. |
| `estilos.css` | Estilos de la marca sobre Bootstrap. |

---
