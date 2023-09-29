<script lang="ts">
  import LeafletMap from './map.svelte'
  import { Map, Marker } from '$lib/map'
</script>

<!-- Leaflet -->
<LeafletMap />

<!-- Composition -->
<Map lat={45.815399} lon={15.966568} zoom={6}>
  <Marker
    on:open={() => console.log('open')}
    on:close={() => console.log('close')}
    lat={45.815399}
    lon={15.966568}
    label="Zagreb"
  />
  <Marker lat={44.119371} lon={15.231365} label="Zadar" />
</Map>
