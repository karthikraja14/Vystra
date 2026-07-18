import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

// Magnetic hover wrapper — element follows the cursor slightly
export default function Magnetic({ children, strength = 0.35, className, ...rest }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  function handleMove(e) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * strength
    const y = (e.clientY - (r.top + r.height / 2)) * strength
    setPos({ x, y })
  }

  function reset() {
    setPos({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.4 }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
