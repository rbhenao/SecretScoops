import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Load environment variables from `.env`
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.FRONTEND_PORT || '5173'),  // Use env variable
    host: "0.0.0.0", // Allow access from Docker network
  },
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL)
  }
});

