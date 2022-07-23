import App from '../src/title-bar.svelte'

const app = new App({
  target: document.body
})

navigator.serviceWorker.register('./sw.js')

export default app
