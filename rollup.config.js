import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/main.js', // Ton point d'entrée
  output: {
    file: 'dist/avatar-weather-card.js', // Le fichier unique pour HACS
    format: 'es',
  },
  plugins: [nodeResolve()],
};