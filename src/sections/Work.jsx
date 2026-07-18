import { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { Reveal } from '../components/Reveal.jsx'

const CASES = [
  {
    id: '01',
    name: 'DreamzDezignerz',
    type: 'Design agency platform',
    year: '2025',
    stat: '+180% leads',
    color: '#e6c079',
    href: 'https://build.vystra.in',
  },
  {
    id: '02',
    name: 'Karthik Raja',
    type: 'Founder portfolio',
    year: '2025',
    stat: '2.1s load time',
    color: '#7db8e6',
    href: 'https://karthikraja.in',
  },
  {
    id: '03',
    name: 'Vystra Studio',
    type: 'Web studio · this site',
    year: '2026',
    stat: '100 Lighthouse',
    color: '#c79de6',
    href: '#top',
  },
]

export default function Work() {
  const [hover, setHover] = useState(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 400, damping: 30, mass: 0.5 })
  const y = useSpring(my, { stiffness: 400, damping: 30, mass: 0.5 })

  function onMove(e) {
    mx.set(e.clientX)
    my.set(e.clientY)
  }

  return (
    <section className="section work" id="work" onMouseMove={onMove}>
      <div className="wrap">
        <Reveal className="section__head">
          <span className="eyebrow"><span className="num">02</span> Selected Work</span>
          <h2 className="section__title">
            Proof over <span className="serif gold">promises.</span>
          </h2>
        </Reveal>

        <div className="rows" onMouseLeave={() => setHover(null)}>
          {CASES.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.08} y={20}>
              <a
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className={`case ${hover !== null && hover !== i ? 'is-dim' : ''}`}
                onMouseEnter={() => setHover(i)}
              >
                <span className="case__id">{c.id}</span>
                <div className="case__main">
                  <h3 className="case__name">{c.name}</h3>
                  <span className="case__type">{c.type}</span>
                </div>
                <span className="case__stat" style={{ color: c.color }}>{c.stat}</span>
                <span className="case__year">{c.year}</span>
                <span className="case__arrow">↗</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {hover !== null && (
          <motion.div
            className="work__cursor"
            style={{ x, y, background: CASES[hover].color }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            View ↗
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
