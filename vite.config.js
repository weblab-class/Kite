import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './',
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    }
  }
}); 