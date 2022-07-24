<script>
import { createEventDispatcher } from 'svelte'

export let title = null
export let image = null

let doctitle = document.title
const observer = new MutationObserver(() => {
  doctitle = document.title
})
observer.observe(document, {
  attributes: true,
  childList: false,
  subtree: false
})

export let hidden = false
export let autoHide = true

if ('windowControlsOverlay' in navigator) {
  hidden = !navigator.windowControlsOverlay.visible
  navigator.windowControlsOverlay.ongeometrychange = ({ visible }) => { if (autoHide) hidden = !visible }
}

export let controls = false
const dispatch = createEventDispatcher()
</script>

<!-- eslint-disable-next-line svelte/valid-compile -->
<svelte:options tag='title-bar' />
{#if !hidden}
  <div class='title-bar {$$restProps.class || ''}'>
    <div class='w-full h-full d-flex'>
      <div class='d-flex w-full draggable h-full align-items-center'>
        <img src={image || document.querySelector('link[rel="icon"]')?.href} alt='ico' />
        {title || doctitle}
      </div>
      <slot />
      {#if controls}
        <div class='controls d-flex h-full pointer'>
          <div class='d-flex align-items-center' on:click={() => { dispatch(new CustomEvent('minimize')) }}>
            <svg viewBox='0 0 24 24'>
              <path d='M19 13H5v-2h14v2z' />
            </svg>
          </div>
          <div class='d-flex align-items-center' on:click={() => { dispatch(new CustomEvent('maximize')) }}>
            <svg viewBox='0 0 24 24'>
              <path d='M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z' />
            </svg>
          </div>
          <div class='d-flex align-items-center close' on:click={() => { dispatch(new CustomEvent('close')) }}>
            <svg viewBox='0 0 24 24'>
              <path d='M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z' />
            </svg>
          </div>
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .d-flex {
    display: flex;
  }
  .align-items-center {
    align-items: center;
  }
  .w-full {
    width: 100%
  }
  .h-full {
    height: 100%
  }
  .pointer {
    cursor: pointer;
  }
  .draggable {
    -webkit-app-region: drag;
    app-region: drag;
    color: var(--dm-text-muted-color);
    font-size: 11.2px;
  }
  img {
    margin: 0 8px;
    height: 16px;
    width: 16px;
  }
  .controls > div {
    width: 40px;
    transition: background 0.15s ease;
  }
  .controls > div:hover {
    background-color: #ffffff33;
    color: #fff;
  }
  .controls > .close:hover {
    background-color: #e81123 !important;
  }
  svg {
    width: 18px;
    height: 18px;
    width: 100%;
  }
  path {
    fill: currentColor;
  }
  .title-bar {
    /* Use the environment variable with a fallback. */
    left: env(titlebar-area-x, 0);
    top: env(titlebar-area-y, 0);
    width: env(titlebar-area-width, 100%);
    height: env(titlebar-area-height, 33px);
  }
</style>
