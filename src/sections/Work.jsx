import { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { Reveal } from '../components/Reveal.jsx'

const CASES = [
  {
    id: '01',
    name: 'Karthik Raja',
    type: 'Founder portfolio',
    year: '2025',
    stat: '2.1s load time',
    color: '#7db8e6',
    href: 'https://karthikraja.in',
  },
  {
    id: '02',
    name: 'DreamzDezignerz',
    type: 'Brand & website · client',
    year: '2025',
    stat: '+180% leads',
    color: '#e6c079',
    href: '#contact',
  },
  {
    id: '03',
    name: 'Vystra Studio',
    type: 'This website',
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
          <span className="eyebrow"><span className="num">02</span> What We Build</span>
          <h2 className="section__title">
            We build for clients — <span className="serif gold">and for ourselves.</span>
          </h2>
        </Reveal>

        <Reveal className="flagship" delay={0.08} y={26}>
          <div className="flagship__info">
            <span className="flagship__badge">◆ Built &amp; run by Vystra</span>
            <h3 className="flagship__name">BuildVystra</h3>
            <p className="flagship__cat">Construction Management Platform · Web + Mobile App</p>
            <p className="flagship__desc">
              Our own SaaS product — a complete platform to plan projects, track sites, manage
              teams, materials and progress in real time. Designed, engineered and operated
              end-to-end by us. If we can build and run our own software, we can build yours.
            </p>
            <div className="flagship__tags">
              <span>Web app</span>
              <span>Mobile app</span>
              <span>SaaS</span>
              <span>Dashboard</span>
            </div>
            <a href="https://build.vystra.in" target="_blank" rel="noreferrer" className="btn btn--gold">
              Visit BuildVystra →
            </a>
          </div>
          <a className="flagship__visual" href="https://build.vystra.in" target="_blank" rel="noreferrer" aria-label="Visit BuildVystra">
            <div className="flagship__window">
              <div className="flagship__bar">
                <span></span><span></span><span></span>
                <em>build.vystra.in</em>
              </div>
              <div className="flagship__screen">
                <div className="fs__side">
                  <span className="fs__logo">B</span>
                  <span className="fs__dot" />
                  <span className="fs__dot" />
                  <span className="fs__dot" />
                </div>
                <div className="fs__main">
                  <div className="fs__row fs__row--head">
                    <span className="fs__pill" />
                    <span className="fs__pill fs__pill--sm" />
                  </div>
                  <div className="fs__cards">
                    <div className="fs__card"><span /><b>18</b><i>Projects</i></div>
                    <div className="fs__card"><span /><b>92%</b><i>On track</i></div>
                    <div className="fs__card"><span /><b>240</b><i>Workers</i></div>
                  </div>
                  <div className="fs__bars">
                    <div style={{ height: '40%' }} /><div style={{ height: '70%' }} />
                    <div style={{ height: '55%' }} /><div style={{ height: '85%' }} />
                    <div style={{ height: '60%' }} /><div style={{ height: '95%' }} />
                  </div>
                </div>
              </div>
            </div>
          </a>
        </Reveal>

        <span className="work__label">Recent work</span>
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
