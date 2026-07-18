import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Magnetic from '../components/Magnetic.jsx'

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

function scrollTo(href) {
  const el = document.querySelector(href)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -20 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function go(e, href) {
    e.preventDefault()
    setOpen(false)
    scrollTo(href)
  }

  return (
    <motion.header
      className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      <div className="nav__inner wrap">
        <a href="#top" className="logo" onClick={(e) => go(e, '#top')}>
          <span className="logo__mark">V</span>
          <span className="logo__txt">Vystra</span>
        </a>

        <nav className="nav__links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}>
              {l.label}
            </a>
          ))}
        </nav>

        <Magnetic className="nav__cta-wrap" strength={0.25}>
          <a href="#contact" className="btn btn--gold" onClick={(e) => go(e, '#contact')}>
            Start a project
          </a>
        </Magnetic>

        <button className={`burger ${open ? 'burger--open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
          <span></span>
          <span></span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}>
                {l.label}
              </a>
            ))}
            <a href="#contact" className="btn btn--gold" onClick={(e) => go(e, '#contact')}>
              Start a project
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
