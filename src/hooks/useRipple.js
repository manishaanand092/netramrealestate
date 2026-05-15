import { useCallback } from 'react'

/**
 * useRipple — returns a click handler that injects a CSS ripple element
 * into the event target (which must have position: relative; overflow: hidden).
 */
export function useRipple() {
  const createRipple = useCallback((e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top  - size / 2

    const ripple = document.createElement('span')
    ripple.className = 'ripple-effect'
    ripple.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
    `
    el.appendChild(ripple)
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true })
  }, [])

  return createRipple
}
