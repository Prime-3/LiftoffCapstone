import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // https://youtu.be/eYiLt2gQuME?feature=shared&t=760
  // - Routes for React App -> Vite -> ASP.NET Core (maybe)
  // - docs:
  //   - https://vitejs.dev/config/server-options#server-proxy
  //   - https://stackoverflow.com/questions/64677212/how-to-configure-proxy-in-vite
  server: {
    proxy: {
      '^/api': {
        target: 'http://localhost:5111/',
        secure: false,
      },
      '^/register': {
        target: 'http://localhost:5111/',
        secure: false,
      },
      '^/login': {
        target: 'http://localhost:5111/',
        secure: false,
      },
      '^/logout': {
        target: 'http://localhost:5111/',
        secure: false,
      },
      '^/pingauth': {
        target: 'http://localhost:5111/',
        secure: false,
      }
    }
  }
})
