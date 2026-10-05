// Template: el esqueleto de toda página pública. Define DÓNDE va cada organismo
// (barra arriba, contenido al centro, pie abajo), sin decidir el contenido.
import Footer from '../organisms/Footer'
import Navbar from '../organisms/Navbar'

function PlantillaPublica({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">{children}</main>
      <Footer />
    </div>
  )
}

export default PlantillaPublica
