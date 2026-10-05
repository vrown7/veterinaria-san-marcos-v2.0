// Componente raíz: comparte los datos (ServiciosProvider) y asocia cada URL con su página.
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ServiciosProvider } from './context/ServiciosContext'
import Inicio from './pages/Inicio'
import Servicios from './pages/Servicios'
import Categorias from './pages/Categorias'
import DetalleServicio from './pages/DetalleServicio'
import Nosotros from './pages/Nosotros'
import Blog from './pages/Blog'
import BlogDetalle from './pages/BlogDetalle'
import Contacto from './pages/Contacto'
import Login from './pages/Login'
import Registro from './pages/Registro'
import NoEncontrada from './pages/NoEncontrada'

function App() {
  return (
    <ServiciosProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/servicios/:id" element={<DetalleServicio />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetalle />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          {/* Semana 10: /solicitar-cita, /mis-citas, /admin/servicios, /admin/citas */}
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </BrowserRouter>
    </ServiciosProvider>
  )
}

export default App
