import { useState, useEffect } from 'react'

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({ x: null, y: null })

  const updateWindowDimensions = () => {
    setWindowDimensions({ x: window.innerWidth, y: window.innerHeight })
  }

  useEffect(() => {
    window.addEventListener('load', updateWindowDimensions)
    window.addEventListener('resize', updateWindowDimensions)

    return () => {
      window.removeEventListener('load', updateWindowDimensions)
      window.removeEventListener('resize', updateWindowDimensions)
    }
  }, [])

  return windowDimensions
}
