import { useState } from 'react'

// context
import TooltipContext from '../context/TooltipContext'

// components
import Tooltip from '../components/Tooltip'

export default function App({ Component, pageProps }) {
  const [tooltip, setTooltip] = useState({ text: null })

  return (
    <TooltipContext.Provider value={{ setTooltip }}>
      <Component {...pageProps} />
      <Tooltip {...tooltip} />

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
      `}</style>
    </TooltipContext.Provider>
  )
}
