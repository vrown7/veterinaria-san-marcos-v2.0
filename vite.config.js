import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configuración de las pruebas unitarias (Vitest + Testing Library)
  test: {
    environment: 'jsdom', // simula el navegador (document, localStorage) dentro de Node
    globals: true, // permite usar describe, test y expect sin importarlos
    setupFiles: './src/setupTests.js',
    css: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      // Igual que la guía 15: se mide la lógica y los componentes. Las páginas (src/pages)
      // solo arman componentes ya probados, por eso quedan fuera del reporte.
      include: ['src/utils/**', 'src/components/**', 'src/services/**', 'src/hooks/**', 'src/routes/**'],
      exclude: ['src/**/*.test.{js,jsx}'],
    },
  },
})
