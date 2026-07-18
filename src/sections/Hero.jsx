import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TextReveal } from '../components/Reveal.jsx'
import Magnetic from '../components/Magnetic.jsx'

const EASE = [0.22, 1, 0.36, 1]

function scrollTo(href) {
  const el = document.querySelector(href)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -20 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 160])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero__glow" aria-hidden />
      <motion.div className="hero__inner wrap" style={{ y, opacity }}>
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
        >
          <span className="dot" /> Bookings open — accepting new projects
        </motion.div>

        <h1 className="hero__title">
          <TextReveal text="We build websites that" delay={0.5} />
          <br />
          <TextReveal text="don't just look good —" delay={0.75} />
          <br />
          <span className="hero__accent">
            <TextReveal text="they" delay={1.0} />
            <span className="serif gold">&nbsp;print revenue.</span>
          </span>
        </h1>

        <motion.p
          className="hero__sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.3 }}
        >
          Vystra is a boutique web studio for ambitious brands. Fast, distinctive,
          conversion-obsessed sites — designed and shipped in weeks, not months.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.5 }}
        >
          <Magnetic strength={0.3}>
            <a href="#contact" className="btn btn--gold btn--lg" onClick={(e) => { e.preventDefault(); scrollTo('#contact') }}>
              Start a project →
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a href="#work" className="btn btn--ghost btn--lg" onClick={(e) => { e.preventDefault(); scrollTo('#work') }}>
              See our work
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span>Scroll</span>
        <div className="hero__scroll-line"><span /></div>
      </motion.div>
    </section>
  )
}
