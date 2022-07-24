import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const config = {
    server: {
      open: './debug/'
    },
    build: {
      lib: {
        entry: './src/main.js',
        name: 'universal-title-bar'
      }
    },
    plugins: null
  }
  if (mode === 'development') {
    config.plugins = [svelte()]
  } else {
    config.plugins = [
      svelte({
        compilerOptions: {
          customElement: true
        },
        include: /universal-title-bar\.svelte$/
      }),
      svelte({
        compilerOptions: {
          customElement: false
        },
        exclude: /universal-title-bar\.svelte$/
      })
    ]
  }
  return config
})
