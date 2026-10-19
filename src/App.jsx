// Componente raíz: comparte los datos (providers) y asocia cada URL con su página.
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CitasProvider } from './context/CitasContext'
import { ServiciosProvider } from './context/ServiciosContext'
import { SolicitudProvider } from './context/SolicitudContext'
import RutaProtegida from './routes/RutaProtegida'
// Páginas públicas
import Inicio from './pages/Inicio'
import Servicios from './pages/Servicios'
import Categorias from './pages/Categorias'
import DetalleServicio from './pages/DetalleServicio'
import Ofertas from './pages/Ofertas'
import Nosotros from './pages/Nosotros'
import Blog from './pages/Blog'
import BlogDetalle from './pages/BlogDetalle'
import Contacto from './pages/Contacto'
import Login from './pages/Login'
import Registro from './pages/Registro'
import MiSolicitud from './pages/MiSolicitud'
import ConfirmarSolicitud from './pages/ConfirmarSolicitud'
import ResultadoSolicitud from './pages/ResultadoSolicitud'
import MisCitas from './pages/MisCitas'
import Salir from './pages/Salir'
import NoEncontrada from './pages/NoEncontrada'
// Panel de administración
import AdminInicio from './pages/admin/AdminInicio'
import AdminCitas from './pages/admin/AdminCitas'
import AdminCitaDetalle from './pages/admin/AdminCitaDetalle'
import AdminServicios from './pages/admin/AdminServicios'
import AdminServicioDetalle from './pages/admin/AdminServicioDetalle'
import AdminServicioFormulario from './pages/admin/AdminServicioFormulario'
import AdminCategorias from './pages/admin/AdminCategorias'
import AdminUsuarios from './pages/admin/AdminUsuarios'
import AdminUsuarioDetalle from './pages/admin/AdminUsuarioDetalle'
import AdminUsuarioFormulario from './pages/admin/AdminUsuarioFormulario'
import AdminReportes from './pages/admin/AdminReportes'
import AdminPerfil from './pages/admin/AdminPerfil'

const PERSONAL = ['Administrador', 'Recepcionista']
const SOLO_ADMIN = ['Administrador']

// Atajo para envolver una página en RutaProtegida.
const protegida = (pagina, roles) => <RutaProtegida roles={roles}>{pagina}</RutaProtegida>

function App() {
  return (
    <AuthProvider>
      <ServiciosProvider>
        <CitasProvider>
          <SolicitudProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/servicios" element={<Servicios />} />
                <Route path="/servicios/:id" element={<DetalleServicio />} />
                <Route path="/categorias" element={<Categorias />} />
                <Route path="/ofertas" element={<Ofertas />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetalle />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/solicitud" element={<MiSolicitud />} />
                <Route path="/solicitud/confirmar" element={<ConfirmarSolicitud />} />
                <Route path="/solicitud/resultado" element={<ResultadoSolicitud />} />
                <Route path="/mis-citas" element={protegida(<MisCitas />)} />
                <Route path="/salir" element={<Salir />} />

                <Route path="/admin" element={protegida(<AdminInicio />, PERSONAL)} />
                <Route path="/admin/citas" element={protegida(<AdminCitas />, PERSONAL)} />
                <Route path="/admin/citas/:id" element={protegida(<AdminCitaDetalle />, PERSONAL)} />
                <Route path="/admin/servicios" element={protegida(<AdminServicios />, PERSONAL)} />
                <Route path="/admin/servicios/nuevo" element={protegida(<AdminServicioFormulario />, SOLO_ADMIN)} />
                <Route path="/admin/servicios/:id" element={protegida(<AdminServicioDetalle />, PERSONAL)} />
                <Route path="/admin/servicios/:id/editar" element={protegida(<AdminServicioFormulario />, SOLO_ADMIN)} />
                <Route path="/admin/criticos" element={protegida(<AdminServicios soloCriticos />, PERSONAL)} />
                <Route path="/admin/categorias" element={protegida(<AdminCategorias />, SOLO_ADMIN)} />
                <Route path="/admin/usuarios" element={protegida(<AdminUsuarios />, SOLO_ADMIN)} />
                <Route path="/admin/usuarios/nuevo" element={protegida(<AdminUsuarioFormulario />, SOLO_ADMIN)} />
                <Route path="/admin/usuarios/:id" element={protegida(<AdminUsuarioDetalle />, SOLO_ADMIN)} />
                <Route path="/admin/usuarios/:id/editar" element={protegida(<AdminUsuarioFormulario />, SOLO_ADMIN)} />
                <Route path="/admin/reportes" element={protegida(<AdminReportes />, SOLO_ADMIN)} />
                <Route path="/admin/perfil" element={protegida(<AdminPerfil />, PERSONAL)} />

                <Route path="*" element={<NoEncontrada />} />
              </Routes>
            </BrowserRouter>
          </SolicitudProvider>
        </CitasProvider>
      </ServiciosProvider>
    </AuthProvider>
  )
}

export default App
