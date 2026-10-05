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
      include: ['src/**/*.{js,jsx}'],
      exclude: ['src/main.jsx', 'src/setupTests.js', 'src/**/*.test.{js,jsx}'],
    },
  },
})
