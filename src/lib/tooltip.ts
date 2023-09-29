import { computePosition, offset, type Placement } from '@floating-ui/dom'

type TooltipOptions = {
  text?: string
  placement?: Placement
}

// https://learn.svelte.dev/tutorial/actions
export function tooltip(targetEl: HTMLElement, options?: TooltipOptions) {
  const tooltipEl = createTooltip(targetEl)

  function createTooltip(targetEl: HTMLElement) {
    const tooltipEl = Object.assign(document.createElement('div'), {
      role: 'tooltip',
      innerHTML: options?.text ?? 'Tooltip',
      style: `
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
      `,
    })

    targetEl.after(tooltipEl)

    return tooltipEl
  }

  async function updateTooltipPosition(targetEl: HTMLElement, tooltipEl: HTMLElement) {
    const { x, y } = await computePosition(targetEl, tooltipEl, {
      placement: options?.placement,
      middleware: [offset(8)],
    })

    Object.assign(tooltipEl.style, {
      left: `${x}px`,
      top: `${y}px`,
    })
  }

  function showTooltip() {
    tooltipEl.style.display = 'block'
    updateTooltipPosition(targetEl, tooltipEl)
  }

  function hideTooltip() {
    tooltipEl.style.display = 'none'
  }

  // add event listeners
  targetEl.addEventListener('mouseenter', showTooltip)
  targetEl.addEventListener('mouseleave', hideTooltip)

  return {
    destroy() {
      // remove event listeners when element is removed
      targetEl.removeEventListener('mouseenter', showTooltip)
      targetEl.removeEventListener('mouseLeave', hideTooltip)
    },
  }
}
