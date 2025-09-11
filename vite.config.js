import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // String mágica que diz ao Vite: "se vir uma URL começando com /pf-api, 
      // redirecione para a Petfinder"
      '/pf-api': {
        target: 'https://api.petfinder.com/v2', // O alvo da requisição
        changeOrigin: true, // Necessário para o proxy funcionar
        rewrite: (path) => path.replace(/^\/pf-api/, ''), // Remove /pf-api da URL final
      },
    }
  }
})
