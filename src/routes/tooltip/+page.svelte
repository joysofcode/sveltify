<script lang="ts">
  import Tooltip from './tooltip.svelte'
  import { tooltip } from '$lib/tooltip'
</script>

<!-- Floating UI  -->
<Tooltip />

<!-- Action -->
<button use:tooltip={{ text: 'Action' }}>Hover</button>
