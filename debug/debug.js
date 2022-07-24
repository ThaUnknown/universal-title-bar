import App from '../src/title-bar.svelte'

const app = new App({
  target: document.querySelector('div'),
  props: {
    controls: true,
    class: 'bg-very-dark'
  }
})

navigator.serviceWorker.register('./sw.js')

export default app
