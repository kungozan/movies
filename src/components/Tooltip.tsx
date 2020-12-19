import { useRef } from 'react'
import useMousePosition from '../hooks/useMousePosition'
import useWindowDimensions from '../hooks/useWindowDimensions'

type TooltipProps = {
  text: string
}

export default function Tooltip({ text }: TooltipProps) {
  const mousePosition = useMousePosition()
  const windowDimensions = useWindowDimensions()
  const tooltipEl = useRef(null)

  let top: string = `${mousePosition.y}px`
  let right: string = 'auto'
  let bottom: string = 'auto'
  let left: string = `${mousePosition.x}px`

  if (!text) {
    return null
  }

  if (tooltipEl.current) {
    const overflowTop = (mousePosition.y - tooltipEl.current.offsetHeight) < 0
    const overflowRight = windowDimensions.x - (mousePosition.x + tooltipEl.current.offsetWidth) < 0
    const overflowBottom = windowDimensions.y - (mousePosition.y + tooltipEl.current.offsetHeight) < 0
    const overflowLeft = (mousePosition.x - tooltipEl.current.offsetWidth) < 0

    if (overflowTop) {
      top = 'auto'
    }

    if (overflowRight) {
      left = 'auto'
      right = overflowLeft ? 'auto' : `${windowDimensions.x - mousePosition.x}px`
    }

    if (overflowBottom) {
      top = 'auto'
      bottom = overflowTop ? 'auto' : `${windowDimensions.y - mousePosition.y}px`
    }

    if (overflowLeft) {
      left = 'auto'
    }
  }

  return (
    <div ref={tooltipEl}>
      {text}

      <style jsx>{`
        div {
          position: fixed;
          top: ${top};
          right: ${right};
          bottom: ${bottom};
          left: ${left};
          max-width: 100%;
          width: 400px;
          padding: 15px 25px;
          border-radius: 5px;
          background-color: rgba(255, 255, 255, .9);
          z-index: 1;
          pointer-events: none;
        }
      `}</style>
    </div>
  )
}
