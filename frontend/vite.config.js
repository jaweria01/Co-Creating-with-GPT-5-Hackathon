import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  css: {
    postcss: './postcss.config.js',
  },
  optimizeDeps: {
    include: ['chart.js', 'react-chartjs-2'],
    esbuildOptions: {
      target: 'esnext',
    },
  },
});