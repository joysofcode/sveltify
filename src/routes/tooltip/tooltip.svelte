<script lang="ts">
  import { computePosition, offset } from '@floating-ui/dom'

  // get reference to dom elements
  let buttonEl: HTMLButtonElement
  let tooltipEl: HTMLDivElement

  // state
  let showTooltip = false

  async function updateTooltipPosition() {
    // use the Floating UI API
    const { x, y } = await computePosition(buttonEl, tooltipEl, {
      placement: 'bottom',
      middleware: [offset(8)],
    })

    Object.assign(tooltipEl.style, {
      left: `${x}px`,
      top: `${y}px`,
    })
  }

  // run when `showTooltip` changes
  $: if (showTooltip) {
    updateTooltipPosition()
  }
</script>

<button
  bind:this={buttonEl}
  on:mouseenter={() => (showTooltip = true)}
  on:mouseleave={() => (showTooltip = false)}
  aria-describedby="tooltip"
>
  Hover
</button>

<div bind:this={tooltipEl} class:show={showTooltip} class="tooltip" role="tooltip">
  Component
</div>

<style>
  .tooltip {
    display: none;
    width: max-content;
    position: absolute;
    top: 0;
    left: 0;
    font-weight: 600;
    background: var(--tooltip-bg);
    color: var(--tooltip-clr);
    padding: var(--tooltip-padding);
    border-radius: var(--tooltip-rounded);

    &.show {
      display: block;
    }
  }
</style>
