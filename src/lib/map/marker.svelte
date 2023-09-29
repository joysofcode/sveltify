<script lang="ts">
  import { createEventDispatcher, getContext } from 'svelte'
  import { key, type MapContext } from '$lib/map'

  export let lat: number
  export let lon: number
  export let label: string

  // get methods from context
  const { getLeaflet, getMap } = getContext<MapContext>(key)

  // get Leaflet instance and map from context
  const leaflet = getLeaflet()
  const map = getMap()

  // add marker
  const marker = leaflet.marker([lat, lon]).addTo(map)
  marker.bindPopup(label)

  // dispatch custom events
  const dispatch = createEventDispatcher()
  marker.on('popupopen', () => dispatch('open'))
  marker.on('popupclose', () => dispatch('close'))
</script>
