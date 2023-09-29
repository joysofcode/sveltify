<script lang="ts">
  import { onMount } from 'svelte'
  import 'leaflet/dist/leaflet.css'

  let mapEl: HTMLDivElement

  onMount(async () => {
    // using dynamic import because leaflet runs
    // code on the `window` object during init
    const leaflet = await import('leaflet')

    // create map of Croatia
    const map = leaflet.map(mapEl).setView([45.815399, 15.966568], 6)

    // add map tile
    leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

    // create Zagreb marker
    const markerZagreb = leaflet.marker([45.815399, 15.966568]).addTo(map)
    markerZagreb.bindPopup('Zagreb')

    // create Zadar marker
    const markerZadar = leaflet.marker([44.119371, 15.231365]).addTo(map)
    markerZadar.bindPopup('Zadar')
  })
</script>

<div bind:this={mapEl} class="map" />

<style>
  .map {
    position: absolute;
    inset: 0;
    z-index: 10;
  }
</style>
