import { createContext } from 'react'

const TooltipContext = createContext({ setTooltip: (value: { text: string }) => null });

export default TooltipContext
