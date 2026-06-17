import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://sreweekly.cn',
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
});
