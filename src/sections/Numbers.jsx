import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const STATS = [
  { value: 100, suffix: '', label: 'Lighthouse score' },
  { value: 3, suffix: 'wk', label: 'Avg. turnaround' },
  { value: 180, suffix: '%', label: 'Avg. lead lift' },
  { value: 24, suffix: '/7', label: 'Support access' },
]

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf
    const start = performance.now()
    const dur = 1400
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <span ref={ref} className="numstat__val">
      {n}
      <span className="numstat__suf">{suffix}</span>
    </span>
  )
}

export default function Numbers() {
  return (
    <section className="numbers">
      <div className="wrap numbers__grid">
        {STATS.map((s, i) => (
          <div className="numstat" key={i}>
            <Counter value={s.value} suffix={s.suffix} />
            <span className="numstat__label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
