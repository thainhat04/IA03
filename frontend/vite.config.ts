import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    // Load env variables based on mode (development/production)
    const env = loadEnv(mode, process.cwd(), '')

    // Get API URL from environment variable, fallback to localhost for dev
    const apiUrl = env.VITE_API_URL || env.VITE_API_PROXY_URL || 'http://localhost:3000'

    return {
        plugins: [react()],
        server: {
            port: 5173,
            proxy: {
                '/api': {
                    target: apiUrl,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },
    }
})
