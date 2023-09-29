<script lang="ts">
  import { onMount, setContext } from 'svelte'
  import type L from 'leaflet'
  import { key } from '$lib/map'
  import 'leaflet/dist/leaflet.css'

  export let lat: number
  export let lon: number
  export let zoom: number

  let leaflet: typeof L
  let leafletMap: L.Map
  let mapEl: HTMLDivElement

  setContext(key, {
    getLeaflet: () => leaflet,
    getMap: () => leafletMap,
  })

  onMount(async () => {
    leaflet = await import('leaflet')
    leafletMap = leaflet.map(mapEl).setView([lat, lon], zoom)
    leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(leafletMap)
  })
</script>

<div bind:this={mapEl} class="map" />

{#if leaflet && leafletMap}
  <slot />
{/if}

<style>
  .map {
    position: absolute;
    inset: 0;
    z-index: 10;
  }
</style>
